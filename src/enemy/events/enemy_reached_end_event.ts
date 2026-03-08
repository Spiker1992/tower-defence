import { IEvent } from '../../commons/events';

export type EnemyReachedEndEventType = "EnemyReachedEnd";

export class EnemyReachedEndEvent implements IEvent {
  type: EnemyReachedEndEventType = "EnemyReachedEnd";
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
