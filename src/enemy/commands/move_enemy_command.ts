import { Enemy } from '../models/enemy';
import { ENEMY_PATH, IPosition } from '../../models/position';
import { EnemyMovedEvent } from '../events/enemy_moved_event';

export function moveEnemyCommand(enemy: Enemy, position: IPosition): void {
  const scaledCol = Math.floor(position.col / 100);
  const scaledRow = Math.floor(position.row / 100);

  if (!ENEMY_PATH.some((pos) => pos.col === scaledCol && pos.row === scaledRow)) {
    throw new Error("InvalidPathCoordinate");
  }

  const event = new EnemyMovedEvent(position);
  enemy.persist(event);
}
