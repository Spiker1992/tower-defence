import { moveEnemyCommand } from './move_enemy_command';
import { Enemy } from '../models/enemy';
import { IPosition, ENEMY_PATH } from '../../models/position';

// Mock EventStore to avoid side effects in tests
jest.mock('../../commons/event_store', () => ({
  EventStore: {
    save: jest.fn(),
    getEventsByType: jest.fn().mockReturnValue([]),
  },
}));

describe('moveEnemyCommand', () => {
  let enemy: Enemy;

  beforeEach(() => {
    enemy = new Enemy();
  });

  it('should move the enemy to the next position', () => {
    moveEnemyCommand(enemy, { col: 100, row: 0 });

    expect(enemy.events.length).toBe(1);
  });

  it('should throw an error if the position is invalid', () => {
    const invalidPosition: IPosition = { col: 999, row: 999 };

    expect(() => moveEnemyCommand(enemy, invalidPosition)).toThrow('InvalidPathCoordinate');
  });
});
