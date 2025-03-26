import { moveEnemyOnPath } from "./enemy/commands/move_enemy_on_path_command"
import { Enemy } from "./enemy/models/enemy"


const enemy = new Enemy();
moveEnemyOnPath(enemy);

window.addEventListener("EnemyMoved", (event: CustomEvent) => {
    console.log(event.detail)
})