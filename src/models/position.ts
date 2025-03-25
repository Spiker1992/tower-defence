export interface IPosition {
  col: number;
  row: number;
}

// setting for the map
export const GRID_SCALE = 100

export const ENEMY_PATH: IPosition[] = [
  { col: 1, row: 0 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 1, row: 3 },
  { col: 1, row: 4 },
];
