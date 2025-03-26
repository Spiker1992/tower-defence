import { IEvent } from '../../commons/events';
import { Enemy } from '../../enemy/models/enemy';

export class EnemyAddedToTheMapEvent implements IEvent {
  type: string = "EnemyAddedToTheMap";
  uuid: string;

  constructor(public enemy: Enemy){};
}