import { BeastEnemy } from "../../entities/enemies/beastEnemy";
import { TinyEnemy } from "../../entities/enemies/tinyEnemy";
import { Enemy } from "../../entities/enemy";
import { PathPlacement } from "../pathPlacement";

export class Level1 extends PathPlacement { 
    protected enemySpec: [typeof Enemy, number][] = [
        [BeastEnemy, 2],
        [TinyEnemy, 2],
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