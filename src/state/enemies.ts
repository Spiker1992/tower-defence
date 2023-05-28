import { Enemy } from "../entities/enemy";
import { generateGrid } from "../helpers/grid";
import { Coordinate } from "../interfaces";
import { EnemyPlacement } from "../placements/enemyPlacement";
import { PathPlacement } from "../placements/pathPlacement";
import { TowerPlacement } from "../placements/towerPlacement";

export class Enemies {
    protected data: Enemy[] = []
    private static instance: Enemies;

    public static getInstance(): Enemies {
        if (!Enemies.instance) {
            Enemies.instance = new Enemies();
        }
        return Enemies.instance;
    }

    public add(enemy: Enemy): void {
        this.data.push(enemy)
    }

    public remove(enemy: Enemy): void {
        console.log(enemy)
        console.log(this.data)
        this.data = this.data.filter((item) => {
            return item.id !== enemy.id
        })
    }

    public all(): Enemy[] {
        return this.data
    }
}