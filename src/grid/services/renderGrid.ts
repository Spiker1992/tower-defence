import { Tower } from "../../tower/tower";
import { PlaceTower } from "../../tower/commands/placeTower";

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
            const cellType = grid[row][col] === '' ? "empty" : grid[row][col].toLowerCase();
            newCell.setAttribute("row", `${row}`)
            newCell.setAttribute("col", `${col}`)
            newCell.onclick = () => {
                (new PlaceTower(new Tower(parseInt(`${col}${row}`) , { col: col, row: row }))).handle();
            }
            newCell.textContent = "";   
            newCell.className = `cell ${cellType}`;
            newRow.appendChild(newCell);
        }
        gridEle.appendChild(newRow);
    }
}