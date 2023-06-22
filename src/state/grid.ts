import { generateGrid } from "../helpers/grid";
import { Coordinate } from "../interfaces";
import { EnemyPlacement } from "../placements/enemyPlacement";
import { PathPlacement } from "../placements/pathPlacement";
import { TowerPlacement } from "../placements/towerPlacement";

export class Grid {
    public path: PathPlacement
    public towers: TowerPlacement
    public enemies: EnemyPlacement
    public baseGrid = []
    private static instance: Grid;

    public static getInstance(): Grid {
        if (!Grid.instance) {
            Grid.instance = new Grid();
        }
        return Grid.instance;
    }

    public static deleteInstance(): void {
        Grid.instance = null
    }

    public generateGrid(numCols: number, numRows: number): void {
        this.baseGrid = generateGrid(numCols, numRows)
    }

    protected placeMarkers(grid: string[][], coords: Coordinate[], marker: string): void {
        coords.forEach(function (coord) {
            grid[coord.row][coord.col] = marker
        });
    }

    public grid(): [][] {
        if (!this.baseGrid) {
            throw new Error("Base Grid is not set")
        }

        const temp = [...this.baseGrid]

        if (this.path?.all()) {
            this.placeMarkers(temp, this.path.all(), this.path.MARKER)
        }
        // this.placeMarkers(temp, this.towers.all(), this.towers.MARKER)
        // this.placeMarkers(temp, this.enemies.all(), this.enemies.MARKER)

        return temp
    }

    public setPath(paths: PathPlacement): void {
        this.path = paths
    }

    public setTowers(towers: TowerPlacement): void {
        this.towers = towers
    }

    public setEnemies(enemies: EnemyPlacement): void {
        this.enemies = enemies
    }

    public getEnemies(): EnemyPlacement {
        return this.enemies
    }
}
