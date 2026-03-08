import { IPosition } from '../../models/position';
import { IEvent } from '../../commons/events';

export type EnemyMovedEventType = "EnemyMoved";

export class EnemyMovedEvent implements IEvent {
  type: EnemyMovedEventType = "EnemyMoved";
  position: IPosition;
  uuid: string;

  constructor(position: IPosition, uuid: string) {
    this.position = position;
    this.uuid = uuid
  }
}
