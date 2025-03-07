
import { CELL_SIZE } from "../commons/constants";
import { Coordinate } from "../commons/interfaces";
import MaxHeap from "../commons/maxHeap";
import { enemyInRange } from "../commons/utils";
import { Enemy } from "../enemy/enemy";
import { Enemies } from "../enemy/store/enemies";

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
    protected range: number = 30;
    protected damage: number = 1;
    protected firingSpeed: number = 1000;

    // view related settings
    protected towerSize: number = 30
    protected element: HTMLDivElement
    protected canShoot: boolean = true

    public enemies = new MaxHeap()

    constructor(id: number, coords: Coordinate) {
        this.id = id
        this.coords = coords

        window.addEventListener("enemyMoved", event => {
            const enemy: Enemy = event.detail.enemy
            
            if(enemyWithinRange(this, enemy)) {
                this.enemies.insertOrUpdate(enemy.id, enemy.distanceTraveled)
                this.enemies_updated()
            } else if (this.enemies.hasEnemy(enemy.id)) {
                this.enemies.deleteEnemy(enemy.id)
            }

        });
        
        window.addEventListener("enemyRemoved", event => {
            const enemy: Enemy = event.detail.enemy
            
            if (this.enemies.hasEnemy(enemy.id)) {
                this.enemies.deleteEnemy(enemy.id)
            }
        });
    }
    
    protected enemies_updated() {
        const enemy_id = this.enemies.peek()[0]
        const enemy = Enemies.getInstance().hash_map[enemy_id]
        
        this.attack(enemy)
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
    const bounding_position: DOMRect = enemy.element.getBoundingClientRect()

    return enemyInRange(tower, CELL_SIZE, {
        col: bounding_position.y,
        row: bounding_position.x
    }, enemy.size, bounding_position);
}
