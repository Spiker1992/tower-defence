import { Grid } from "./state/grid"
import { renderGrid } from "./views/renderGrid"
import { Level1 } from "./placements/levels/level1"

const grid = Grid.getInstance()
grid.generateGrid(5,5)

const paths = new Level1();
grid.setPath(paths);

renderGrid(grid.grid());

paths.start()