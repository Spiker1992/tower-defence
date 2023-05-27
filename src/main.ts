import { Enemy } from "./entities/enemy"
import { Grid } from "./state/grid"
import { EnemyPlacement } from "./placements/enemyPlacement"
import { TowerPlacement } from "./placements/towerPlacement"
import { renderGrid } from "./views/renderGrid"
import { MoveEnemy } from "./views/moveEnemy"
import { Level1 } from "./placements/levels/level1"


// we render default game level with path defined
const grid = Grid.getInstance()
grid.generateGrid(5,5)

const paths = new Level1()
grid.setPath(paths)

const towers = new TowerPlacement()
towers.add(0,1)
grid.setTowers(towers)


renderGrid(grid.grid())

// Create an enemy with the defined path

const movement = setInterval(() => {
    
    const enemyPath = [...paths.all()];
    const enemy = new Enemy(enemyPath);

    const movement = new MoveEnemy(enemy)
    movement.handle()
}, 1000)


setInterval(() => {
    clearInterval(movement)
}, 1000 * 10)