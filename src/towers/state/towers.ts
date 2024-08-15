import { ITower } from "../../entities/tower";

export class Towers {
    protected data: ITower[] = []
    private static instance: Towers;

    public static getInstance(): Towers {
        if (!Towers.instance) {
            Towers.instance = new Towers();
        }
        return Towers.instance;
    }

    public static deleteInstance(): void {
        Towers.instance = null
    }

    public add(tower: ITower): void {
        this.data.push(tower)
    }

    public remove(tower: ITower): void {
        this.data = this.data.filter((item) => {
            return item.getId() !== tower.getId()
        })
    }

    public all(): ITower[] {
        return this.data
    }

    public has(col: number, row: number): boolean {
        return this.data.some((item: ITower) => {
            const coords = item.getCoords()
            return coords.col === col  && coords.row === row
        })
    }
}