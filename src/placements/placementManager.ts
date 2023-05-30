import { Coordinate } from "../interfaces";

export class PlacementManager {
    protected data: Coordinate[] = []

    public add(col: number, row: number): void {
        this.data.push({ col: col, row: row })
    }

    public has(col: number, row: number): boolean {
        return this.data.some((item) => {
            return item.col === col  && item.row === row
        })
    }

    public remove(col: number, row: number): void { 
        this.data = this.data.filter((item) => {
            return item.col != col || item.row != row
        })
    }

    public all(): Coordinate[] {
        return this.data
    }
}