import { IEvent } from '../../commons/events';
import { IPosition } from '../../models/position';

export class TowerPlacedEvent implements IEvent {
  type: string = "TowerPlaced";
  constructor(
    public uuid: string,
    public position: IPosition,
    public initialRange: number,
    public initialDamage: number,
    public initialCooldown: number
  ) {}
}

export class TowerUpgradedEvent implements IEvent {
  type: string = "TowerUpgraded";
  constructor(
    public uuid: string,
    public rangeBonus: number,
    public damageBonus: number,
    public cooldownReduction: number
  ) {}
}

export class TowerAttackedEvent implements IEvent {
  type: string = "TowerAttacked";
  constructor(
    public uuid: string,
    public towerUuid: string,
    public enemyUuid: string,
    public timestamp: number
  ) {}
}

export class TowerRemovedEvent implements IEvent {
  type: string = "TowerRemoved";
  constructor(
    public uuid: string,
    public towerUuid: string,
    public reason: string
  ) {}
}
