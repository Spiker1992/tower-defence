import { getCenterPoint } from "../helpers/grid";
import { Coordinate } from "../interfaces";

export interface ITowerAttributes {
    x: number;
    y: number;
    range: number;
    damage: number;
    firingSpeed: number;
}

export interface ITower {
    getId(): number;
    getCoords(): Coordinate;
    render(): void;
    attributes(): ITowerAttributes;
    reload(): void;
}

export class Tower implements ITower {
    protected id: number;
    protected coords: Coordinate;
    protected range: number = 60;
    protected damage: number = 1;
    protected firingSpeed: number = 1000;

    // view related settings
    protected towerSize: number = 20
    protected element: HTMLDivElement
    canShoot: boolean = false

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

    public getRange(): number {
        return this.range
    }

    public getSize(): number {
        return this.towerSize
    }

    public render(): void {
        const targetCell = document.querySelector(`#gameTable .cell[row="${this.coords.row}"][col="${this.coords.col}"]`);
        const { x, y } = getCenterPoint(targetCell)

        const tower = document.createElement("div");
        const correction = this.towerSize / 2
        tower.className = "tower";
        tower.id = `tower${this.id}`
        tower.style.top = `${y - correction}px`
        tower.style.left = `${x - correction}px`
        tower.style.outlineOffset = `${this.range - correction}px`;

        document.getElementById("grid").appendChild(tower);
        this.element = tower;
    }

    public attributes(): ITowerAttributes {
        return {
            x: parseInt(this.element.style.left),
            y: parseInt(this.element.style.top),
            range: this.range,
            damage: this.damage,
            firingSpeed: this.firingSpeed,
        }
    }

    public reload(): void {
        this.canShoot = false
        const towerReloading = new CustomEvent("towerReloading", {
            detail: {
                tower: this,
            }
        })
        window.dispatchEvent(towerReloading)

        setTimeout(() => {
            this.towerReady()
        }, this.firingSpeed);
    }

    public towerReady(): void {
        this.canShoot = true
        const towerReloaded = new CustomEvent("towerReloaded", {
            detail: {
                tower: this,
            }
        })
        window.dispatchEvent(towerReloaded)
    }
}