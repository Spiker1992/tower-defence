/**
 * @jest-environment jsdom
 */

import { moveEnemyCommand } from './move_enemy_command';
import { Enemy } from '../models/enemy';
import { IPosition, ENEMY_PATH, GRID_SCALE } from '../../models/position';
import { EnemyMovedEvent } from '../events/enemy_moved_event';
import { EnemyDiedEvent } from '../events/enemy_died_event';
import { EventStore } from '../../commons/event_store';
import { EnemyReachedEndEvent } from '../events/enemy_reached_end_event';

describe('moveEnemyCommand', () => {
  let enemy: Enemy;

  beforeEach(() => {
    enemy = new Enemy();
    EventStore.clearHistory();
  });


  it('dead enemies cant move', () => {
    const diedEvent = new EnemyDiedEvent();
    (enemy as any).events.push(diedEvent);

    expect(() => moveEnemyCommand(enemy)).toThrow('Dead enemies cant move');
  });

  it('make initial move', () => {
    moveEnemyCommand(enemy);

    expect(enemy.events.length).toBe(1);
    expect(enemy.events[0].position).toEqual({
      col: 101,
      row: 0
    });
  });


  it('make a move', () => {
    enemy.applyEvent(new EnemyMovedEvent(
      {
        col: 101,
        row: 0
      },
      enemy.uuid
    ));

    moveEnemyCommand(enemy);

    expect(enemy.events.length).toBe(2);
    expect(enemy.events[1].position).toEqual({
      col: 102,
      row: 0
    });
  });

  it('makes a move towards next path position', () => {
    enemy.applyEvent(new EnemyMovedEvent({col: 100, row: 0}, enemy.uuid));

    moveEnemyCommand(enemy);
    expect(enemy.events[1].position).toEqual({
      col: 101,
      row: 0
    });
  })

  it('should emit EnemyReachedEndEvent when path is complete', () => {
    const totalSteps = (ENEMY_PATH.length - 1) * 100;
    
    for (let i = 0; i < totalSteps; i++) {
      moveEnemyCommand(enemy);
    }

    const reachedEndEvents = EventStore.getEventsByType('EnemyReachedEnd');
    expect(reachedEndEvents.length).toBe(1);
    expect((reachedEndEvents[0] as EnemyReachedEndEvent).enemy_uuid).toBe(enemy.uuid);
  });
});
