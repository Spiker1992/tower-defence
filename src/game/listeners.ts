import { moveEnemyOnPath } from "../enemy/commands/move_enemy_on_path_command"

window.addEventListener("EnemyAddedToTheMap", (event: CustomEvent) => {
    const enemy = event.detail.uuid;
    moveEnemyOnPath(enemy)
})

window.addEventListener("Event", (event: CustomEvent) => {
    const e = event.detail;
    console.log(`Event: ${e.type}`, e);
})
