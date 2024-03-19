import { Enemy } from "../entities/enemy";

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
        this.data = this.data.filter((item) => {
            return item.id !== enemy.id
        })
    }

    public all(): Enemy[] {
        return this.data
    }
}