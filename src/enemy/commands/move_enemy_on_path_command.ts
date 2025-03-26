import { Enemy } from '../models/enemy';
import { moveEnemyCommand } from '../commands/move_enemy_command';

export function moveEnemyOnPath(enemy: Enemy) {
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
