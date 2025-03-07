import { BeastEnemy } from "../../enemy/enemies/beastEnemy";
import { TinyEnemy } from "../../enemy/enemies/tinyEnemy";
import { Enemy } from "../../enemy/enemy";
import { PathPlacement } from "../placement/pathPlacement";

export class Level1 extends PathPlacement { 
    protected enemySpec: [typeof Enemy, number][] = [
        [TinyEnemy, 1],
        // [BeastEnemy, 2],
    ];

    protected setupEnemyPath(): void {
        this.add(0, 0, 'path1')
        this.add(1, 0, 'path2')
        this.add(1, 1, 'path5')
        this.add(1, 2, 'path5')
        this.add(1, 3, 'path4')
        this.add(2, 3, 'path1')
        this.add(3, 3, 'path2')
        this.add(3, 4, 'path5')
    }
}