import { moveEnemyOnPath } from "../enemy/commands/move_enemy_on_path_command"

window.addEventListener("EnemyAddedToTheMap", (event: CustomEvent) => {
    const enemy = event.detail.enemy

    moveEnemyOnPath(enemy)
})

window.addEventListener("EnemyMoved", (event: CustomEvent) => {
    console.log(event.detail)
})