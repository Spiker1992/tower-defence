import { Enemy } from './models/enemy';
import { EventStore } from '../commons/event_store';
import { moveEnemyCommand } from './commands/move_enemy_command';

function move_enemy_on_path(enemy: Enemy) {
  const movement = setInterval(() => {
    if (enemy.remaining_moves <= 0) {
      clearInterval(movement);
      console.log("Enemy has no more moves.", enemy.events);
      return;
    }

    moveEnemyCommand(enemy, enemy.next_position());
  }, 100);

  // Example of querying events by type
  const enemyMovedEvents = EventStore.getEventsByType("EnemyMoved");
  console.log("EnemyMoved events:", enemyMovedEvents);
}

// 🏗 Start fresh
const enemy1 = new Enemy();
move_enemy_on_path(enemy1);