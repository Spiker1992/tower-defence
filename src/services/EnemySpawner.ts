import { MoveEnemy } from "../views/moveEnemy"; 
import { Coordinate } from "../interfaces";
import { Enemy } from "../entities/enemy";

export class EnemySpawner {
  private enemySpec: any[];
  private spawnSpeed: number;
  private path: Coordinate[];

  constructor(enemySpec: any[], spawnSpeed: number, path: Coordinate[]) {
    this.enemySpec = enemySpec;
    this.spawnSpeed = spawnSpeed;
    this.path = path
  }

  public startSpawning(): void {
    let enemyId: number = 1;
    let index = 0;
    let spawnedEnemyCount = 1;

    console.log("Start spawning enemies");
    const enemyPath = [...this.path]; 

    const movement = setInterval(() => {
      if (index >= this.enemySpec.length) {
        clearInterval(movement);
        console.log("Finished spawning enemies");
        return
      }

      if (spawnedEnemyCount > this.enemySpec[index][1]) {
        spawnedEnemyCount = 0
        index += 1
        return 
      }

      const EnemyType = this.enemySpec[index][0];
      const enemy: Enemy = new EnemyType(enemyPath, enemyId);

      (new MoveEnemy(enemy)).handle();

      enemyId += 1;
      spawnedEnemyCount += 1;
    }, this.spawnSpeed);
  }
}