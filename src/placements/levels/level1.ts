import { Enemy } from "../../entities/enemy";
import { getEnemyInRange } from "../../helpers/battle";
import { Enemies } from "../../state/enemies";
import { MoveEnemy } from "../../views/moveEnemy";
import { PathPlacement } from "../pathPlacement";

export class Level1 extends PathPlacement {
    protected numberOfEnemies: number = 10
    protected speed: number = 1000

    public constructor() {
        super()
        this.setupEnemyPath()
    }

    protected setupEnemyPath(): void {
        this.add(0, 0)
        this.add(1, 0)
        this.add(1, 1)
        this.add(1, 2)
        this.add(1, 3)
        this.add(2, 3)
        this.add(3, 3)
        this.add(3, 4)
    }

    public start(): void {
        const enemies = Enemies.getInstance()
        // Create an enemy with the defined path
        let id: number = 1
        const movement = setInterval(() => {
            console.log("Game started")
            const enemyPath = [...this.all()];
            const enemy = new Enemy(enemyPath, id);
            enemies.add(enemy)

            const movement = new MoveEnemy(enemy)
            movement.handle()
            id += 1
        }, 1000)

        const towerShooting = setInterval(() => {
            const towers = [
                { x: 76, y: 16, range: 60, damage: 1 },
                { x: 232, y: 71, range: 60, damage: 1 },
            ]

            towers.forEach(tower => {
                const result = getEnemyInRange(tower)
                
                if (result != null) {
                    result.reduceLife(tower.damage)

                    if (result.isDead()) {
                        enemies.remove(result)
                    }
                }
            })
        }, 1000)





        const stopSpawning = setInterval(() => {
            clearInterval(movement)
            clearInterval(stopSpawning)
        }, 1000 * this.numberOfEnemies)

        const gameEnded = setInterval(() => {
            clearInterval(gameEnded)
            clearInterval(towerShooting)
            console.log("Game ended")
        }, 1000 * this.numberOfEnemies + 10000)
    }
}