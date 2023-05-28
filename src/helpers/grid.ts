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

export function getCenterPoint(element: Element) {
    const { top, left, width, height } = element.getBoundingClientRect();
    const centerX = left + ((width-20) / 2);
    const centerY = top + ((height-20) / 2);
    return { x: centerX, y: centerY };
  }