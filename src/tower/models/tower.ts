import { IPosition } from '../../models/position';
import { IEvent } from '../../commons/events';
import { TowerPlacedEvent, TowerUpgradedEvent } from '../events/tower_events';

export class Tower {
  private events: IEvent[] = [];
  
  public uuid: string;
  public position: IPosition = { col: 0, row: 0 };
  public range: number = 0;
  public damage: number = 0;
  public cooldown: number = 0;

  constructor(events: IEvent[] = [], uuid: string) {
    this.uuid = uuid;
    this.loadFromHistory(events);
  }

  private applyEvent(event: IEvent): void {
    this.events.push(event);

    if (event instanceof TowerPlacedEvent) {
      this.position = event.position;
      this.range = event.initialRange;
      this.damage = event.initialDamage;
      this.cooldown = event.initialCooldown;
    }

    if (event instanceof TowerUpgradedEvent) {
      this.range += event.rangeBonus;
      this.damage += event.damageBonus;
      this.cooldown -= event.cooldownReduction;
    }
  }

  private loadFromHistory(events: IEvent[]): void {
    events.forEach((event) => this.applyEvent(event));
  }

  public is_in_range(targetPosition: IPosition): boolean {
    // Manhattan distance implementation for simplicity
    const distance = Math.abs(this.position.col - targetPosition.col) + 
                     Math.abs(this.position.row - targetPosition.row);
    return distance <= this.range;
  }
}
