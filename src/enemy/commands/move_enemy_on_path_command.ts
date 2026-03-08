import { EventStore } from '../../commons/event_store';
import { moveEnemyCommand } from '../commands/move_enemy_command';
import { Enemy } from '../models/enemy';
import { EnemyMovedEvent } from '../events/enemy_moved_event';

export function moveEnemyOnPath(enemyUuid: string) {
  const steps = 100;
  const interval = 1000 / steps; // 10ms per step

  const movement = setInterval(() => {
    try {
      moveEnemyCommand(enemyUuid);
    } catch (e) {
      clearInterval(movement);
    }
  }, interval);
}
