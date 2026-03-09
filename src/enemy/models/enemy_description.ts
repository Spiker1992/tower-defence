import { IPosition } from '../../models/position';

export interface EnemyDescription {
  health: number;
  speed: number;
  path: IPosition[];
}
