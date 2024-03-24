import { Enemy } from "./entities/enemy";
import { Tower } from "./entities/tower";
import { Coordinate } from "./interfaces";
import { TowerShooting } from "./services/towerShooting";
import { Grid } from "./state/grid";
import { enemyInRange } from "./utils";


let enemySpatialGrid = []
let towerSpatialGrid = []
let towerCoverage = []

function getCoordsHash(coord: Coordinate): string {
    return `${coord.row}${coord.col}`
}

window.addEventListener("path-set", event => {
    createSpatialGrids(event.detail.paths)
})

window.addEventListener("towerAdded", event => {
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
    console.log(enemy.life)
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
        const result = enemyInRange(tower, path)

        if (!result) return

        const positionHash = getCoordsHash(path)
          
        towerSpatialGrid[positionHash].push(tower)
        towerCoverage[tower.getId()].push(positionHash)
    });
}

function findEnemiesToAttack(tower: Tower): void {
    const currentCoverage = towerCoverage[tower.getId()]
    
    currentCoverage.forEach(positionHash => {
        const enemiesInTheSquare = enemySpatialGrid[positionHash]
        
        enemiesInTheSquare.forEach(enemy => {
            if (!enemy.element) return
            if (!enemyInRange(tower, enemy.getPosition(), enemy.size)) return

            TowerShooting.attackEnemy(tower, enemy)
        })
    })
}


function notifiyTowers(enemy: Enemy): void {
    if (!enemy.getPosition()) return

    const positionHash = getCoordsHash(enemy.getPosition())
    const towersWithinRange = towerSpatialGrid[positionHash]

    if (!!towersWithinRange === false) return

    towersWithinRange.forEach(tower => {
        if (!tower.canShoot) return 
        if (!enemyInRange(tower, enemy.getPosition(), enemy.size))  return 
        
        TowerShooting.attackEnemy(tower, enemy)
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
