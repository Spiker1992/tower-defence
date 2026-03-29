import { Enemy } from "../../enemy/models/enemy";
import { AddEnemyToTheMapCommand } from "./add_enemy_to_the_map_command";
import { FastEnemy, TankyEnemy } from "../../enemy/models/enemy_presets";

export function SpawnEnemiesCommand(count: number = 10, type: 'fast' | 'tanky' = 'fast'): void {
    const description = type === 'fast' ? FastEnemy : TankyEnemy;
    let spawned = 0;
    
    const spawnOne = () => {
        const enemy = new Enemy();
        AddEnemyToTheMapCommand(enemy.uuid, description);
        spawned++;
    };
    
    spawnOne();
    
    if (spawned < count) {
        const intervalId = setInterval(() => {
            spawnOne();
            if (spawned >= count) {
                clearInterval(intervalId);
            }
        }, 2000);
    }
}
