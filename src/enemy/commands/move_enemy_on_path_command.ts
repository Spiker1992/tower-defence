import { Enemy } from '../models/enemy';
import { EventStore } from '../../commons/event_store';
import { moveEnemyCommand } from '../commands/move_enemy_command';

export function move_enemy_on_path(enemy: Enemy) {
  const steps = 100;
  const interval = 1000 / steps; // 10ms per step

  const movement = setInterval(() => {
    try {
        moveEnemyCommand(enemy)
    } catch (e) {
        clearInterval(movement);
    }
  }, interval);
}
