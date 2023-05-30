import { Coordinate } from "../interfaces";

export class PlacementManager {
    protected data: Coordinate[] = []

    public add(row: number, col: number): void {
        this.data.push({ row: row, col: col })
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