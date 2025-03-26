import { IPosition } from '../../models/position';
import { IEvent } from '../../commons/events';

export type EnemyMovedEventType = "EnemyMoved";

export class EnemyMovedEvent implements IEvent {
  type: EnemyMovedEventType = "EnemyMoved";
  position: IPosition;
  enemy_uuid: string;

  constructor(position: IPosition, enemy_uuid: string) {
    this.position = position;
    this.enemy_uuid = enemy_uuid
  }
}
