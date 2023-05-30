import { Enemy } from "./entities/enemy"
import { Grid } from "./state/grid"
import { TowerPlacement } from "./placements/towerPlacement"
import { renderGrid } from "./views/renderGrid"
import { MoveEnemy } from "./views/moveEnemy"
import { Level1 } from "./placements/levels/level1"
import { AddTower } from "./services/addTower"
import { Tower } from "./entities/tower"


const grid = Grid.getInstance()
grid.generateGrid(5,5)

const paths = new Level1();
grid.setPath(paths);

renderGrid(grid.grid());
// const towers = new TowerPlacement()
// towers.add(0,1)
// grid.setTowers(towers)

(new AddTower(new Tower(1, { col: 0, row: 1 }))).handle();
(new AddTower(new Tower(1, { col: 1, row: 4 }))).handle();



paths.start()