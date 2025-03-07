import { generateGrid } from "../helpers/grid";
import { Coordinate } from "../commons/interfaces";
import { EnemyPlacement } from "./placement/enemyPlacement";
import { PathPlacement } from "./placement/pathPlacement";
import { TowerPlacement } from "./placement/towerPlacement";

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

    protected placeMarkers(grid: string[][], coords: (Coordinate & { type: string })[], marker: string): void {
        coords.forEach(function (coord) {
            grid[coord.row][coord.col] = coord.type
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

        window.dispatchEvent(new CustomEvent("path-set", {
            detail: {
                paths: paths.all()
            }
        }))
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
