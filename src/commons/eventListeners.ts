import { Tower } from "../tower/tower";
import { Coordinate } from "./interfaces"; 
import { Grid } from "../grid/grid";
import { enemyInRange } from "./utils";
import renderTower from "../grid/commands/renderTower";


let enemySpatialGrid = []
let towerSpatialGrid = []
let towerCoverage = []

window.addEventListener("towerWasPlaced", event => {
    console.log("Tower was placed", event.detail.tower)
    const tower: Tower = event.detail.tower
    renderTower(tower)
});

function getCoordsHash(coord: Coordinate): string {
    return `${coord.row}${coord.col}`
}

window.addEventListener("path-set", event => {
    createSpatialGrids(event.detail.paths)
})

window.addEventListener("towerWasPlaced", event => {
    const tower: Tower = event.detail.tower
    addTowerToTheStore(tower)
    tower.reload()
});

function createSpatialGrids(paths: Coordinate[]): void {
    enemySpatialGrid = []
    towerSpatialGrid = []

    paths.forEach(path => {
        const gridKey = getCoordsHash(path)
        enemySpatialGrid[gridKey] = []
        towerSpatialGrid[gridKey] = []
    });
}

function addTowerToTheStore(tower: Tower): void {
    towerCoverage[tower.getId()] = []
    const grid = Grid.getInstance()
      
    grid.path.all().forEach(path => {
        const result = enemyInRange(tower, 50, path)

        if (!result) return

        const positionHash = getCoordsHash(path)
          
        towerSpatialGrid[positionHash].push(tower)
        towerCoverage[tower.getId()].push(positionHash)
    });
}