import { Coordinate } from "../../commons/interfaces";

interface IType {
    type: string    
}

export class PlacementManager {
    protected data: (Coordinate & IType)[] = []

    public add(row: number, col: number, type: string): void {
        this.data.push({ row: row, col: col, type: type })
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

    public all(): (Coordinate & IType)[] {
        return this.data
    }
}