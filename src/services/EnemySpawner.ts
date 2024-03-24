import { Enemies } from "../state/enemies"; 
import { MoveEnemy } from "../views/moveEnemy";
import { EventEmitter } from "events";
import { Coordinate } from "../interfaces";

export class EnemySpawner {
  private enemies: Enemies;
  private enemySpec: any[];
  private spawnSpeed: number;
  private eventEmitter: EventEmitter;
  private path: Coordinate[];

  constructor(enemySpec: any[], spawnSpeed: number, path: Coordinate[]) {
    this.enemies = Enemies.getInstance();
    this.enemySpec = enemySpec;
    this.spawnSpeed = spawnSpeed;
    this.path = path
    this.eventEmitter = new EventEmitter();
  }

  public startSpawning(): void {
    let id: number = 1;
    let index = 0;
    let count = 0;

    const movement = setInterval(() => {
      console.log("Start spawning enemies");
      const enemyPath = [...this.path];

      if (count < this.enemySpec[index][1]) {
        const EnemyType = this.enemySpec[index][0];
        const enemy = new EnemyType(enemyPath, id);
        this.enemies.add(enemy);
        const moveEnemy = new MoveEnemy(enemy);
        moveEnemy.handle();
        id += 1;
        count += 1;
      } else {
        count = 0;
        index += 1;
      }

      if (index >= this.enemySpec.length) {
        clearInterval(movement);
        console.log("Finished spawning enemies");
      }
    }, this.spawnSpeed);
  }

  public on(event: string, listener: (...args: any[]) => void): void {
    this.eventEmitter.on(event, listener);
  }
}