import { PATH_MARKER } from "../constants";
import { Enemy } from "../entities/enemy";
import { PlacementManager } from "./placementManager";
import { Enemies } from "../state/enemies";
import { MoveEnemy } from "../views/moveEnemy";
import { TowerShooting } from "../services/towerShooting";

export abstract class PathPlacement extends PlacementManager {
    public MARKER: string = PATH_MARKER
    protected spawnSpeed: number = 1000
    protected enemySpec: [typeof Enemy, number][] = []

    public constructor() {
        super()
        this.setupEnemyPath()
    }

    protected abstract setupEnemyPath(): void;

    public start(): void {
        this.spawnEnemies()
        this.startShooting()
    }

    protected spawnEnemies() {
        const enemies = Enemies.getInstance()

        let id: number = 1;
        let index = 0;
        let count = 0;

        const movement = setInterval(() => {
            console.log("Start spawning enemies");
            const enemyPath = [...this.all()];

            if (count < this.enemySpec[index][1]) {
                const EnemyType = this.enemySpec[index][0];
                const enemy = new EnemyType(enemyPath, id);
                enemies.add(enemy);
                const moveEnemy = new MoveEnemy(enemy);
                moveEnemy.handle();
                id += 1;
                count += 1;
            } else {
                count = 0;
                index += 1;
            }

            if (id == 2) {
                this.startShooting()    
            }

            if (index >= this.enemySpec.length) {
                clearInterval(movement);
                console.log("Finished spawning enemies");
            }
        }, this.spawnSpeed);
    }

    protected startShooting() {
        new TowerShooting().startShooting()
    }
}