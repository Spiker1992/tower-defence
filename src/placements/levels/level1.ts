import { Enemy } from "../../entities/enemy";
import { getEnemyInRange } from "../../helpers/battle";
import { Enemies } from "../../state/enemies";
import { Towers } from "../../state/towers";
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
            const store = Towers.getInstance()
            const towers = store.all()

            towers.forEach(tower => {
                const attributes = tower.attributes()
                const result = getEnemyInRange(attributes)
                
                if (result != null) {
                    result.reduceLife(attributes.damage)

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