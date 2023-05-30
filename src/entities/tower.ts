import { getCenterPoint } from "../helpers/grid";
import { Coordinate } from "../interfaces";

export interface ITowerAttributes {
    x: number;
    y: number;
    range: number;
    damage: number;
}

export interface ITower {
    getId(): number;
    getCoords(): Coordinate;
    render(): void;
    attributes(): ITowerAttributes
}

export class Tower implements ITower {
    protected id: number;
    protected coords: Coordinate;
    protected range: number = 60;
    protected damage: number = 1;

    // view related settings
    protected towerSize: number = 20
    protected element: HTMLDivElement

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
        const correction = this.towerSize / 2
        tower.className = "tower";
        tower.id = `tower${this.id}`
        tower.style.top = `${x-correction}px` 
        tower.style.left = `${y-correction}px` 
        tower.style.outlineOffset = `${this.range-correction}px`;
        
        document.getElementById("grid").appendChild(tower);
        this.element = tower;
    }

    public attributes(): ITowerAttributes {
        return {
            x: parseInt(this.element.style.left),
            y: parseInt(this.element.style.top),
            range: this.range,
            damage: this.damage,
        }
    }
}