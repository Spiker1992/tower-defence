import { Tower } from "../entities/tower";
import { InvalidLocationError } from "../exceptions/InvalidLocationError";
import { Grid } from "../state/grid";
import { Towers } from "../state/towers";

export class AddTower {
    protected tower: Tower

    public constructor(tower: Tower) {
        this.tower = tower
    }

    public handle(): void {
        this.isFreeCoordinate()
        

        const store = Towers.getInstance()
        store.add(this.tower)

        this.tower.render()
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