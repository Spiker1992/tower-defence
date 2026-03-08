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
