import { Enemy } from "./entities/enemy"
import { Grid } from "./state/grid"
import { TowerPlacement } from "./placements/towerPlacement"
import { renderGrid } from "./views/renderGrid"
import { MoveEnemy } from "./views/moveEnemy"
import { Level1 } from "./placements/levels/level1"


const grid = Grid.getInstance()
grid.generateGrid(5,5)

const paths = new Level1()
grid.setPath(paths)

const towers = new TowerPlacement()
towers.add(0,1)
grid.setTowers(towers)


renderGrid(grid.grid())

paths.start()