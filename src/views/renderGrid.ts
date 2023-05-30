import { Tower } from "../entities/tower";
import { AddTower } from "../services/addTower";

export function firstOrCreateGameTable(): HTMLElement {
    let gameTable: HTMLElement = document.getElementById("#gameTable")

    if (!gameTable) {
        gameTable = document.createElement("div");
        gameTable.id = "gameTable"

        const bodyEle = document.getElementsByTagName("body")[0]
        bodyEle.appendChild(gameTable)
    }

    return gameTable
}

export function firstOrCreateGrid(): HTMLElement {
    const gameTable = firstOrCreateGameTable()

    let gridEle = document.getElementById("#grid")

    if (!gridEle) {
        gridEle = document.createElement("div")
        gridEle.id = "grid"

        gameTable.appendChild(gridEle)
    }

    return gridEle
}

export function renderGrid(grid: string[][]) {
    const numRows = 5
    const numCols = 5
    const gridEle = firstOrCreateGrid()

    gridEle.innerHTML = '';
    for (let row = 0; row < numRows; row++) {
        const newRow = document.createElement('tr');
        for (let col = 0; col < numCols; col++) {
            const newCell = document.createElement('td');
            newCell.setAttribute("row", `${row}`)
            newCell.setAttribute("col", `${col}`)
            newCell.onclick = () => {
                (new AddTower(new Tower(1, { col: col, row: row }))).handle();
            }
            newCell.textContent = grid[row][col];
            newCell.className = "cell";
            newRow.appendChild(newCell);
        }
        gridEle.appendChild(newRow);
    }
}