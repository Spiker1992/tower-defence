import { Enemy } from './models/enemy';
import { EventStore } from '../commons/event_store';
import { moveEnemyCommand } from './commands/move_enemy_command';

function move_enemy_on_path(enemy: Enemy) {
  const steps = 100;
  const interval = 1000 / steps; // 10ms per step
  let currentStep = 0;

  const movement = setInterval(() => {
    if (currentStep >= steps) {
      clearInterval(movement);
      console.log("Enemy has reached the next position.", enemy.events);
      return;
    }

    moveEnemyCommand(enemy);
    currentStep++;
  }, interval);

  // Example of querying events by type
  const enemyMovedEvents = EventStore.getEventsByType("EnemyMoved");
  console.log("EnemyMoved events:", enemyMovedEvents);
}

// 🏗 Start fresh
const enemy1 = new Enemy();
move_enemy_on_path(enemy1);