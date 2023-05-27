export function generateGrid(numCols: number, numRows: number): [][] {
    const grid = [];

    for (let row = 0; row < numRows; row++) {
        grid.push([]);
        for (let col = 0; col < numCols; col++) {
            grid[row].push('');
        }
    }

    return grid
}