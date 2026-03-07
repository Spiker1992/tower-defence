import { IEvent } from '../../commons/events';

export class EnemyAddedToTheMapEvent implements IEvent {
  type: string = "EnemyAddedToTheMap";
  enemy_uuid: string;

  constructor(enemy_uuid: string) {
    this.enemy_uuid = enemy_uuid;
  }
}
