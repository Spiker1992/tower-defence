import { BeastEnemy } from "../../enemy/enemies/beastEnemy";
import { TinyEnemy } from "../../enemy/enemies/tinyEnemy";
import { Enemy } from "../../enemy/enemy";
import { PathPlacement } from "../placement/pathPlacement";

export class Level1 extends PathPlacement { 
    protected enemySpec: [typeof Enemy, number][] = [
        [BeastEnemy, 2],
        [TinyEnemy, 1],
    ];

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
}