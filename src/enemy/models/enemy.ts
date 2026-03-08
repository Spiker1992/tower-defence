import { IPosition, ENEMY_PATH, GRID_SCALE } from '../../models/position';
import { EventStore } from '../../commons/event_store';
import { EnemyMovedEvent } from '../events/enemy_moved_event';
import { EnemyDiedEvent } from '../events/enemy_died_event';
import { EnemyDamagedEvent } from '../events/enemy_damaged_event';
import { EnemyReachedEndEvent } from '../events/enemy_reached_end_event';
import { EnemyAddedToTheMapEvent } from '../../game/events/enemy_added_to_the_map_event';
import { v4 as uuidv4 } from 'uuid';
import { IEvent } from '../../commons/events';

export class Enemy {
  events: IEvent[] = [];
  speed: number;
  uuid: string;
  health: number = 0;

  constructor(events: IEvent[] = [], speed: number = 1, uuid: string = uuidv4()) {
    this.events = [];
    this.speed = speed;
    this.loadFromHistory(events);
    this.uuid = uuid;
  }

  persist(event: IEvent): void {
    this.applyEvent(event);
    EventStore.save(event);
  }

  applyEvent(event: IEvent): void {
    this.events.push(event);
    if (event instanceof EnemyAddedToTheMapEvent) {
      this.health = event.description.health;
    }
    if (event instanceof EnemyDamagedEvent) {
      this.health -= event.amount;
    }
  }

  loadFromHistory(events: IEvent[]): void {
    events.forEach((event) => this.applyEvent(event));
  }

  get is_dead(): boolean {
    return this.events.some((event) => event instanceof EnemyDiedEvent) || this.health <= 0;
  }

  get has_reached_end(): boolean {
    return this.events.some((event) => event instanceof EnemyReachedEndEvent);
  }

  get initial_position(): IPosition {
    return {
      col: ENEMY_PATH[0].col * GRID_SCALE,
      row: ENEMY_PATH[0].row * GRID_SCALE,
    };
  }

  get current_position(): IPosition {
    const movedEvents = this.events.filter((event) => event instanceof EnemyMovedEvent) as EnemyMovedEvent[];
    const last_position = movedEvents[movedEvents.length - 1];
    
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
