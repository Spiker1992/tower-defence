import { MoveEnemy } from "./moveEnemy"; 
import { Coordinate } from "../../commons/interfaces";
import { Enemy } from "../enemy";
import { Enemies } from "../store/enemies";

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
    let spawnedEnemyCount = 0;

    console.log("Start spawning enemies");

    const movement = setInterval(() => {
      if (index >= this.enemySpec.length) {
        clearInterval(movement);
        console.log("Finished spawning enemies");
        return
      }

      if (spawnedEnemyCount >= this.enemySpec[index][1]) {
        spawnedEnemyCount = 0
        index += 1
        return 
      }

      const EnemyType = this.enemySpec[index][0];
      const enemy: Enemy = new EnemyType([...this.path], enemyId);

      const moveEnemy = (new MoveEnemy(enemy))
      moveEnemy.handle();

      Enemies.getInstance().add(enemy)

      enemyId += 1;
      spawnedEnemyCount += 1;
    }, this.spawnSpeed);
  }
}