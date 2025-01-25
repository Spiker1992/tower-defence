import { Grid } from "./grid/grid"
import { renderGrid } from "./grid/services/renderGrid"
import { Level1 } from "./grid/levels/level1"
import "./commons/eventListeners"
import "./commons/eventListeners"

const grid = Grid.getInstance()
grid.generateGrid(5,5)

const paths = new Level1();
grid.setPath(paths);

renderGrid(grid.grid());

paths.start()


window.pause_movement = false;
window.make_one_move = (() => {
    setTimeout(() => {
    window.pause_movement = false;

    setTimeout(() => {
        window.pause_movement = true;
    }, 1500); // Set back to false after 1 second
    }, 0); // Set to true immediately
})