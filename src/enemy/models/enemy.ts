import { IPosition, ENEMY_PATH } from '../../models/position';
import { EventStore } from '../../commons/event_store';
import { EnemyMovedEvent } from '../events/enemy_moved_event';

export class Enemy {
  events: EnemyMovedEvent[] = [];

  constructor(events: EnemyMovedEvent[] = []) {
    this.events = [];
    this.loadFromHistory(events);
  }

  persist(event: EnemyMovedEvent): void {
    this.applyEvent(event);
    EventStore.save(event);
  }

  applyEvent(event: EnemyMovedEvent): void {
    this.events.push(event);
  }

  loadFromHistory(events: EnemyMovedEvent[]): void {
    events.forEach((event) => this.applyEvent(event));
  }

  get next_position_index(): number {
    return this.events.length;
  }

  get remaining_moves(): number {
    return ENEMY_PATH.length - this.events.length;
  }

  next_position(): IPosition {
    return ENEMY_PATH[this.next_position_index] ?? ENEMY_PATH[ENEMY_PATH.length - 1];
  }
}
