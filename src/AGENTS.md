# Developer Guide: Agent Workflow

This guide outlines the architectural conventions and the recommended workflow for developing within this codebase.

## Core Architectural Patterns

This codebase relies on three primary patterns to ensure predictability, traceability, and maintainability:

### 1. Test-First Development
Every new feature, command, or modification **must** begin with a test case.
*   **Location**: `src/**/*.spec.ts` or `src/**/*.test.ts`.
*   **Why**: Since this is an event-sourced system, tests serve as the primary documentation of intended behavior and prevent regressions in state transitions.

### 2. Command Pattern
Business logic is encapsulated in **Commands**.
*   **Responsibility**: Commands are the *only* entry point for triggering changes in the game state.
*   **Behavior**: They load the current state from the `EventStore`, validate the action, and if valid, persist a new **Event**.
*   **Rules**:
    *   Never modify model state directly from a command.
    *   Always use `Enemies.save(event)` or `EventStore.save(event)`.
    *   Commands should be stateless (except for reading from the `EventStore`).

### 3. Event-Sourced Models
The game state is a projection of past **Events**.
*   **Responsibility**: Models (e.g., `Enemy`) reconstruct their state by replaying a history of events.
*   **Rule**: The `applyEvent(event: IEvent)` method is the *only* place where state should be modified based on an event.
*   **Flow**:
    1.  Command validates action.
    2.  Command persists new `Event`.
    3.  `EventStore` records the `Event`.
    4.  Model `applyEvent` reacts to the new `Event` to update its local properties.

---

## The "Golden Path" Workflow

When adding or modifying functionality, strictly adhere to this sequence:

### Phase 1: Preparation (Test-First)
1.  **Understand**: Identify the affected `Model` and `Event` chain.
2.  **Test**: Write a failing test in the relevant command's `.spec.ts` file. Ensure it asserts the expected event sequence or state change.

### Phase 2: Implementation
3.  **Define Event**: If a new action is required, define a new `IEvent` class in the appropriate folder (e.g., `src/enemy/events/`).
4.  **Implement Command**: Create/Update the Command to validate state, construct the new `Event`, and persist it.
5.  **Update Model**: If the new event requires state tracking, update the `Model`’s `applyEvent` method and ensure the relevant getters (e.g., `is_dead`) reflect the new state.

### Phase 3: Verification
6.  **Run Tests**: Execute the project tests (`npm test`).
7.  **Verify**: If tests pass, verify manually via the `main.ts` entry point or debug panel if needed.

---

## Essential Rules

*   **No Direct State Mutation**: Never modify a property of a model directly outside of `applyEvent`.
*   **Event Immutability**: Once an event is saved, it is historical truth. Never attempt to edit past events; instead, emit new events to counteract or update state.
*   **Type Safety**: Always define explicit interfaces (like `EnemyDescription`) for payloads passed to events or commands to maintain strict typing across the event-stream.
*   **Dependency Injection**: Use `EventStore` or the appropriate domain-specific store (`Enemies`) to access event history. Avoid hard-coding state.

---

## Code Examples

### 1. Event Definition
Events are immutable records of something that happened in the domain.

```typescript
import { IEvent } from '../../commons/events';

export class EnemyDamagedEvent implements IEvent {
  type: string = "EnemyDamaged";
  uuid: string;
  amount: number;

  constructor(uuid: string, amount: number) {
    this.uuid = uuid;
    this.amount = amount;
  }
}
```

### 2. Command Implementation
Commands are entry points that validate input, load state, and emit events.

```typescript
import { Enemies } from '../../game/event_store';
import { EnemyDamagedEvent } from '../events/enemy_damaged_event';
import { EventStore } from '../../commons/event_store';
import { Enemy } from '../models/enemy';

export function DamageEnemyCommand(uuid: string, amount: number) {
  // 1. Load history to check state
  const history = Enemies.getByUuid(uuid);
  const enemy = new Enemy(history, 1, uuid);

  // 2. Validate action
  if (enemy.is_dead) {
    throw new Error('Cannot damage a dead enemy');
  }

  // 3. Persist Event
  const event = new EnemyDamagedEvent(uuid, amount);
  EventStore.save(event);
}
```