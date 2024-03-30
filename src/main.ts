import { Grid } from "./placements/grid"
import { renderGrid } from "./placements/renderGrid"
import { Level1 } from "./placements/levels/level1"
import "./eventListeners"

const grid = Grid.getInstance()
grid.generateGrid(5,5)

const paths = new Level1();
grid.setPath(paths);

renderGrid(grid.grid());

paths.start()