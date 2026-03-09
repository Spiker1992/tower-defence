import { EnemyDescription } from './enemy_description';
import { ENEMY_PATH } from '../../models/position';

export const FastEnemy: EnemyDescription = {
  health: 50,
  speed: 2,
  path: ENEMY_PATH
};

export const TankyEnemy: EnemyDescription = {
  health: 200,
  speed: 0.5,
  path: ENEMY_PATH
};
