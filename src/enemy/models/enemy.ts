import { IPosition, ENEMY_PATH, GRID_SCALE } from '../../models/position';
import { EventStore } from '../../commons/event_store';
import { EnemyMovedEvent } from '../events/enemy_moved_event';
import { EnemyDiedEvent } from '../events/enemy_died_event';
import { v4 as uuidv4 } from 'uuid';

export class Enemy {
  events: EnemyMovedEvent[] = [];
  speed: number;
  uuid: string;

  constructor(events: EnemyMovedEvent[] = [], speed: number = 1) {
    this.events = [];
    this.speed = speed;
    this.loadFromHistory(events);
    this.uuid = uuidv4();
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

  get is_dead(): boolean {
    return this.events.some((event) => event instanceof EnemyDiedEvent);
  }

  get initial_position(): IPosition {
    return {
      col: ENEMY_PATH[0].col * GRID_SCALE,
      row: ENEMY_PATH[0].row * GRID_SCALE,
    };
  }

  get current_position(): IPosition {
    const last_position = this.events[this.events.length - 1];
    
    return last_position ? last_position.position : this.initial_position;
  }

  get next_path(): IPosition | undefined {
    const path_index = Math.floor(this.events.length / 100)
    const new_index = path_index + 1

    if (new_index >= ENEMY_PATH.length) {
      return undefined;
    }

    return ENEMY_PATH[new_index];
  }
}
