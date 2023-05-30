import { getCenterPoint } from "../helpers/grid";
import { Coordinate } from "../interfaces";

export interface ITower {
    getId(): number;
    getCoords(): Coordinate;
    render(): void;
}

export class Tower implements ITower {
    protected id: number;
    protected coords: Coordinate;

    // view related settings
    protected towerSize: number = 20
    protected element: Element

    constructor(id: number, coords: Coordinate) {
        this.id = id
        this.coords = coords
    }

    public getId(): number {
        return this.id
    }

    public getCoords(): Coordinate {
        return this.coords
    }

    public render(): void {
        const targetCell = document.querySelector(`#gameTable .cell[row="${this.coords.row}"][col="${this.coords.col}"]`);
        const { y, x } = getCenterPoint(targetCell)

        const tower = document.createElement("div");
        tower.className = "tower";
        tower.id = `tower${this.id}`
        tower.style.top = `${x-10}px` 
        tower.style.left = `${y-10}px` 
        
        document.getElementById("grid").appendChild(tower);
        this.element = tower;
    }
}