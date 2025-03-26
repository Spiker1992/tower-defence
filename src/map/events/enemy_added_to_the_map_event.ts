import { IEvent } from '../../commons/events';
import { Enemy } from '../../enemy/models/enemy';
import { v4 as uuidv4 } from 'uuid';

export class EnemyAddedToTheMapEvent implements IEvent {
  type: string = "EnemyAddedToTheMap";
  uuid: string;
  
  constructor(public enemy: Enemy) {
    this.uuid = uuidv4();
  }
}