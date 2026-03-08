import { IEvent } from '../../commons/events';

export type EnemyDamagedEventType = "EnemyDamaged";

export class EnemyDamagedEvent implements IEvent {
  type: EnemyDamagedEventType = "EnemyDamaged";
  uuid: string;
  amount: number;

  constructor(uuid: string, amount: number) {
    this.uuid = uuid;
    this.amount = amount;
  }
}
