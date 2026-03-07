export interface IPosition {
  col: number;
  row: number;
}

export function validatePath(path: IPosition[]): { valid: boolean; warnings: string[] } {
  const warnings: string[] = [];

  if (path.length < 2) {
    warnings.push('Path must have at least 2 positions');
    return { valid: false, warnings };
  }

  const seenPositions = new Map<string, number>();

  for (let i = 0; i < path.length; i++) {
    const pos = path[i];
    const posKey = `${pos.col},${pos.row}`;

    if (seenPositions.has(posKey)) {
      warnings.push(`Duplicate position at index ${i}: {col:${pos.col},row:${pos.row}} already appears at index ${seenPositions.get(posKey)}`);
    } else {
      seenPositions.set(posKey, i);
    }

    if (i > 0) {
      const prev = path[i - 1];
      const distance = Math.abs(pos.col - prev.col) + Math.abs(pos.row - prev.row);

      if (distance !== 1) {
        warnings.push(`Discontinuity at index ${i - 1}: invalid move from {col:${prev.col},row:${prev.row}} to {col:${pos.col},row:${pos.row}} (distance: ${distance})`);
      }
    }
  }

  return { valid: warnings.length === 0, warnings };
}

// setting for the map
export const GRID_SCALE = 100

export const ENEMY_PATH: IPosition[] = [
  { col: 1, row: 0 },
  { col: 2, row: 0 },
  { col: 2, row: 1 },
];
