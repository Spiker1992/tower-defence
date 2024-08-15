import { PATH_MARKER } from "../../commons/constants";
import { Enemy } from "../../enemy/enemy";
import { PlacementManager } from "./placementManager"; 
import { EnemySpawner } from "../../enemy/services/EnemySpawner";

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
    }

    protected spawnEnemies() {
        const spawner = new EnemySpawner(this.enemySpec, this.spawnSpeed, this.all());
        
        spawner.startSpawning();
    }
}