import { Tower } from "../../tower/tower";
import { Towers } from "../store/towers";
import { getCenterPoint } from "../../helpers/grid";

 
export default function renderTower(tower: Tower): void {
    const coords = tower.getCoords()
    const targetCell = document.querySelector(`#gameTable .cell[row="${coords.row}"][col="${coords.col}"]`);
    const { x, y } = getCenterPoint(targetCell)

    const towerElement = document.createElement("div");
    const correction = tower.getSize() / 2
    towerElement.className = "tower";
    towerElement.id = `tower${tower.getId()}`
    towerElement.style.top = `${y - correction}px`
    towerElement.style.left = `${x - correction}px`
    towerElement.style.outlineOffset = `${tower.getRange() - correction}px`;

    document.getElementById("grid").appendChild(towerElement);

    const store = Towers.getInstance()
    store.add(tower.getId(), towerElement)
}