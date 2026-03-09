import { IPosition, GRID_SCALE } from '../../models/position';
import { IEvent } from '../../commons/events';
import { TowerPlacedEvent, TowerUpgradedEvent, TowerRemovedEvent } from '../events/tower_events';

export class Tower {
  private events: IEvent[] = [];
  
  public uuid: string;
  public position: IPosition = { col: 0, row: 0 };
  public range: number = 0;
  public damage: number = 0;
  public cooldown: number = 0;
  public is_removed: boolean = false;

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

    if (event instanceof TowerRemovedEvent) {
      this.is_removed = true;
    }
  }

  private loadFromHistory(events: IEvent[]): void {
    events.forEach((event) => this.applyEvent(event));
  }

  public is_in_range(targetPosition: IPosition): boolean {
    const towerPixelPosition = {
        col: this.position.col * GRID_SCALE,
        row: this.position.row * GRID_SCALE
    };
    
    // We assume range is in grid units for simplicity, so convert to pixel range
    const rangeInPixels = this.range * GRID_SCALE;

    const distance = Math.abs(towerPixelPosition.col - targetPosition.col) + 
                     Math.abs(towerPixelPosition.row - targetPosition.row);
    return distance <= rangeInPixels;
  }
}
