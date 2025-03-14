import { IEvent } from '../../commons/events';

export type EnemyDiedEventType = "EnemyDied";

export class EnemyDiedEvent implements IEvent {
  type: EnemyDiedEventType = "EnemyDied";
}
