import { moveEnemyCommand } from './move_enemy_command';
import { Enemy } from '../models/enemy';
import { IPosition, ENEMY_PATH } from '../../models/position';
import { EnemyMovedEvent } from '../events/enemy_moved_event';
import { EnemyDiedEvent } from '../events/enemy_died_event';

describe('moveEnemyCommand', () => {
  let enemy: Enemy;

  beforeEach(() => {
    enemy = new Enemy();
  });


  it('dead enemies cant move', () => {
    enemy.applyEvent(new EnemyDiedEvent());

    expect(() => moveEnemyCommand(enemy)).toThrow('Dead enemies cant move');
  });

  it('make initial move', () => {
    moveEnemyCommand(enemy);

    expect(enemy.events.length).toBe(1);
    expect(enemy.events[0].position).toEqual({
      col: 100,
      row: 1
    });
  });


  it('make a move', () => {
    enemy.applyEvent(new EnemyMovedEvent(
      {
        col: 100,
        row: 1
      }
    ));

    moveEnemyCommand(enemy);

    expect(enemy.events.length).toBe(2);
    expect(enemy.events[1].position).toEqual({
      col: 100,
      row: 2
    });
  });

  it('makes a last move', () => {
    const lastPosition: IPosition = ENEMY_PATH[ENEMY_PATH.length - 1];
    enemy.applyEvent(new EnemyMovedEvent({
        col: lastPosition.col * 100,
        row: lastPosition.row * 100 - 1
      }));

      moveEnemyCommand(enemy);
      expect(enemy.events[1].position).toEqual({
        col: lastPosition.col * 100,
        row: lastPosition.row * 100
      });
    })

  it('Enemy reached last position', () => {
    const lastPosition: IPosition = ENEMY_PATH[ENEMY_PATH.length - 1];
    enemy.applyEvent(new EnemyMovedEvent({
        col: lastPosition.col * 100,
        row: lastPosition.row * 100
      }));

    expect(() => moveEnemyCommand(enemy)).toThrow('Last position reached');
  });
});
