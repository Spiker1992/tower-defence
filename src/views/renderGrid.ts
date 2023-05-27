export function renderGrid(grid: string[][] ) {
    const numRows = 5
    const numCols = 5
    const gameTable = document.getElementById('gameTable');
    gameTable.innerHTML = '';

    for (let row = 0; row < numRows; row++) {
        const newRow = document.createElement('tr');
        for (let col = 0; col < numCols; col++) {
            const newCell = document.createElement('td');
            newCell.setAttribute("row", `${row}`)
            newCell.setAttribute("col", `${col}`)
            newCell.textContent = grid[row][col];
            newCell.className = "cell";
            newRow.appendChild(newCell);
        }
        gameTable.appendChild(newRow);
    }
}