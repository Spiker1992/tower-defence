import { Enemy } from '../models/enemy';
import { GRID_SCALE, IPosition } from '../../models/position';
import { EnemyMovedEvent } from '../events/enemy_moved_event';
import { EnemyReachedEndEvent } from '../events/enemy_reached_end_event';
import { EventStore } from '../../commons/event_store';
import { Enemies } from '../../game/event_store';

export function moveEnemyCommand(enemyUuid: string): void {
  const enemyEvents = Enemies.getByUuid(enemyUuid);
  const enemy = new Enemy(enemyEvents, 1, enemyUuid);
  if (enemy.is_dead) {
    throw new Error('Dead enemies cant move');
  }

  const next_path = enemy.next_path;
  if (next_path === undefined) {
    const endEvent = new EnemyReachedEndEvent(enemy.uuid);
    EventStore.save(endEvent);
    throw new Error('Reached the end');
    return;
  }

  const next_position = nextPosition(enemy);
  const event = new EnemyMovedEvent(next_position, enemy.uuid);
  enemy.persist(event);
}

function nextPosition(enemy: Enemy): IPosition {
  const nextPath = enemy.next_path;
  const currentPos = enemy.current_position;

  const colDiff = (nextPath!.col * GRID_SCALE) - currentPos.col;
  const rowDiff = (nextPath!.row * GRID_SCALE) - currentPos.row;

  const col = currentPos.col + (colDiff !== 0 ? enemy.speed : 0);
  const row = currentPos.row + (rowDiff !== 0 ? enemy.speed : 0);

  return { col, row };
}