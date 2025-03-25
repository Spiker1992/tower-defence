import { move_enemy_on_path } from './move_enemy_on_path_command';
import { Enemy } from '../models/enemy';

describe('MoveEnemyOnPathCommand', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('enemy should make 400 steps, at 1 step per ms, when we have 5 entries in the PATH', () => {
    const enemy = new Enemy();
    move_enemy_on_path(enemy);

    jest.advanceTimersByTime(5000);

    expect(enemy.events.length).toEqual(100 * 4)
  });

});