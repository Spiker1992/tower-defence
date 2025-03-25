import { move_enemy_on_path } from "./enemy/commands/move_enemy_on_path_command"
import { Enemy } from "./enemy/models/enemy"

const enemy = new Enemy();
move_enemy_on_path(enemy);

window.addEventListener("EnemyMoved", (event) => {
    console.log(event.details)
})