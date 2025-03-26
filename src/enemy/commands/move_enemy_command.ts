import { Enemy } from '../models/enemy';
import { ENEMY_PATH, GRID_SCALE, IPosition } from '../../models/position';
import { EnemyMovedEvent } from '../events/enemy_moved_event';

export function moveEnemyCommand(enemy: Enemy): void {
  if (enemy.is_dead) {
    throw new Error('Dead enemies cant move');
  }

  if (isLastPosition(enemy.current_position, lastMove())) {
    throw new Error('Last position reached');
  }

  const next_position = nextPosition(enemy);


  const event = new EnemyMovedEvent(next_position, enemy.uuid);
  enemy.persist(event);
}

function isLastPosition(current_position: IPosition, last_position: IPosition): boolean {
  return current_position.col === last_position.col && current_position.row === last_position.row;
}

function lastMove(): IPosition {
  const last_position = ENEMY_PATH[ENEMY_PATH.length - 1];
  return {
    col: last_position.col * GRID_SCALE,
    row: last_position.row * GRID_SCALE,
  }
}

function nextPosition(enemy: Enemy): IPosition {
  const nextPath = enemy.next_path
  const currentPos = enemy.current_position;

  const colDiff = (nextPath.col * GRID_SCALE) - currentPos.col;
  const rowDiff = (nextPath.row * GRID_SCALE) - currentPos.row;

  const col = currentPos.col + (colDiff !== 0 ? enemy.speed : 0);
  const row = currentPos.row + (rowDiff !== 0 ? enemy.speed : 0);

  return { col, row };
}