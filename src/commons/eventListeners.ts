import { Enemy } from "../enemy/enemy";
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

window.addEventListener("towerReloaded", event => {
    findEnemiesToAttack(event.detail.tower)
});

window.addEventListener("enemyMoved", event => {
    const enemy: Enemy = event.detail.enemy

    updateAvailableEnemyStore(enemy)
    notifiyTowers(enemy)
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

function findEnemiesToAttack(tower: Tower): void {
    const currentCoverage = towerCoverage[tower.getId()]
    currentCoverage.some(positionHash => {
        const enemiesInTheSquare = enemySpatialGrid[positionHash]
        return enemiesInTheSquare.some(enemy => {
            return tower.attack(enemy)
        })
    })
}


function notifiyTowers(enemy: Enemy): void {
    if (!enemy.getPosition()) return

    const positionHash = getCoordsHash(enemy.getPosition())
    const towersWithinRange: Tower[] = towerSpatialGrid[positionHash]

    if (!!towersWithinRange === false) return

    towersWithinRange.forEach(tower => {
        tower.attack(enemy)
    })
}

function updateAvailableEnemyStore(enemy: Enemy): void {
    if (enemy.getPrevPosition()) {
        const prev_position_key  = `${enemy.getPrevPosition().row}${enemy.getPrevPosition().col}`
        enemySpatialGrid[prev_position_key][enemy.id] = false
        delete enemySpatialGrid[prev_position_key][enemy.id]
    }

    if (enemy.getPosition()) {
        const current_position_key = `${enemy.getPosition().row}${enemy.getPosition().col}`
        enemySpatialGrid[current_position_key][enemy.id] = enemy
    }
}
