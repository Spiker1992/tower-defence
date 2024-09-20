
import { Coordinate } from "../commons/interfaces";
import { enemyInRange } from "../commons/utils";
import { Enemy } from "../enemy/enemy";

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
    protected canShoot: boolean = false

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


    public attack(enemy: Enemy): boolean {
        if (!this.canShoot) return false
        if (enemy.isDead()) return false
        if (!enemyWithinRange(this, enemy)) return false

        enemy.reduceLife(this.damage)
        this.reload()

        return true
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
            this.reloaded()
        }, this.firingSpeed);
    }

    public reloaded(): void {
        this.canShoot = true
        
        const towerReloaded = new CustomEvent("towerReloaded", {
            detail: {
                tower: this,
            }
        })
        window.dispatchEvent(towerReloaded)
    }
}

function enemyWithinRange(tower: Tower, enemy: Enemy) {
    return enemyInRange(tower, 50, enemy.getPosition(), enemy.size);
}
