import { Tower } from "../tower";
import { InvalidLocationError } from "../../exceptions/InvalidLocationError";
import { Grid } from "../../grid/grid";
import { Towers } from "../store/towers";

export class PlaceTower {
    protected tower: Tower

    public constructor(tower: Tower) {
        this.tower = tower
    }

    public handle(): void {
        console.log("Placing tower")
        this.isFreeCoordinate()

        this.persistTower()
        this.triggerEvent()
    }

    protected triggerEvent(): void {
        const towerWasPlaced = new CustomEvent("towerWasPlaced", {
            detail: {
                tower: this.tower,
            }
        })
        window.dispatchEvent(towerWasPlaced)
    }

    protected persistTower(): void {
        const store = Towers.getInstance()
        store.add(this.tower)
    }

    protected isFreeCoordinate(): void {
        this.coordTakenByPath()
        this.coordTakenByTower()
    }

    protected coordTakenByPath(): void {
        const grid = Grid.getInstance()
        const coords = this.tower.getCoords()
        
        if (grid.path?.has(coords.col, coords.row)) {
            throw new InvalidLocationError("Location is taken by a path")
        }
    }

    protected coordTakenByTower(): void {
        const towers = Towers.getInstance()
        const coords = this.tower.getCoords()
        
        if (towers.has(coords.col, coords.row)) {
            throw new InvalidLocationError("Location is taken by a tower")
        }
    }
}