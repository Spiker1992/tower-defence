import { validatePath, IPosition } from './position';

describe('validatePath', () => {
  it('should warn about discontinuity (current path)', () => {
    const ENEMY_PATH: IPosition[] = [
      { col: 1, row: 0 },
      { col: 2, row: 0 },
      { col: 2, row: 1 },
      { col: 3, row: 1 },
      { col: 3, row: 2 },
      { col: 4, row: 2 },
      { col: 4, row: 3 },
      { col: 5, row: 3 },
      { col: 5, row: 4 },
      { col: 6, row: 4 },
      { col: 6, row: 5 },
      { col: 1, row: 3 },
      { col: 1, row: 4 },
    ];

    const result = validatePath(ENEMY_PATH);
    expect(result.valid).toBe(false);
    expect(result.warnings.some(w => w.includes('Discontinuity at index 10'))).toBe(true);
  });

  it('should warn about duplicate positions', () => {
    const path: IPosition[] = [
      { col: 1, row: 0 },
      { col: 2, row: 0 },
      { col: 1, row: 0 },
    ];

    const result = validatePath(path);
    expect(result.warnings.some(w => w.includes('Duplicate'))).toBe(true);
  });

  it('should accept valid path with cardinal moves only', () => {
    const validPath: IPosition[] = [
      { col: 1, row: 0 },
      { col: 2, row: 0 },
      { col: 2, row: 1 },
    ];

    const result = validatePath(validPath);
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it('should reject path with less than 2 positions', () => {
    const result = validatePath([{ col: 1, row: 0 }]);
    expect(result.valid).toBe(false);
    expect(result.warnings).toContain('Path must have at least 2 positions');
  });

  it('should warn about multiple issues', () => {
    const path: IPosition[] = [
      { col: 1, row: 0 },
      { col: 1, row: 0 },
      { col: 5, row: 5 },
    ];

    const result = validatePath(path);
    expect(result.valid).toBe(false);
    expect(result.warnings.length).toBe(3);
  });
});
