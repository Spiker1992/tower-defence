import { Enemy } from "../enemy";

export class Enemies {
    protected data: Enemy[] = []
    hash_map = {}
    private static instance: Enemies;

    public static getInstance(): Enemies {
        if (!Enemies.instance) {
            Enemies.instance = new Enemies();
        }
        return Enemies.instance;
    }

    public add(enemy: Enemy): void {
        this.data.push(enemy)
        this.hash_map[enemy.id] = enemy
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