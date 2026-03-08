import { IEvent } from '../../commons/events';
import { EnemyDescription } from '../../enemy/models/enemy_description';

export class EnemyAddedToTheMapEvent implements IEvent {
  type: string = "EnemyAddedToTheMap";
  uuid: string;
  description: EnemyDescription;

  constructor(uuid: string, description: EnemyDescription) {
    this.uuid = uuid;
    this.description = description;
  }
}
