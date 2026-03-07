import { IEvent } from '../../commons/events';

export type EnemyReachedEndEventType = "EnemyReachedEnd";

export class EnemyReachedEndEvent implements IEvent {
  type: EnemyReachedEndEventType = "EnemyReachedEnd";
  enemy_uuid: string;

  constructor(enemy_uuid: string) {
    this.enemy_uuid = enemy_uuid;
  }
}
