
import { Enemy } from '../models/enemy';
import { ENEMY_PATH, IPosition } from '../../models/position';
import { EnemyMovedEvent } from '../events/enemy_moved_event';

export function moveEnemyCommand(enemy: Enemy, position: IPosition): void {
  if (!ENEMY_PATH.some((pos) => pos.col === position.col && pos.row === position.row)) {
    throw new Error("InvalidPathCoordinate");
  }

  const event = new EnemyMovedEvent(position);
  enemy.persist(event);
}
