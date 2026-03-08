import { EventStore } from '../../commons/event_store';
import { Enemy } from '../models/enemy';
import { EnemyDamagedEvent } from '../events/enemy_damaged_event';
import { EnemyDiedEvent } from '../events/enemy_died_event';

export function DamageEnemyCommand(uuid: string, amount: number) {
  // 1. Load history to check state
  const history = EventStore.getByUuid(uuid);
  const enemy = new Enemy(history, 1, uuid);

  // 2. Validate action
  if (enemy.is_dead) {
    throw new Error('Cannot damage a dead enemy');
  }
  if (enemy.has_reached_end) {
    throw new Error('Cannot damage an enemy that has reached the end');
  }

  // 3. Persist Event
  const event = new EnemyDamagedEvent(uuid, amount);
  EventStore.save(event);

  // 4. If enemy dies
  if (enemy.health - amount <= 0) {
    EventStore.save(new EnemyDiedEvent(uuid));
  }
}
