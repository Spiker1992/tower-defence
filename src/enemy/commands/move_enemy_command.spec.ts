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
import { AddEnemyToTheMapCommand } from '../../game/commands/add_enemy_to_the_map_command';

describe('moveEnemyCommand', () => {
  let enemy: Enemy;

  beforeEach(() => {
    enemy = new Enemy();
    EventStore.clearHistory();
    AddEnemyToTheMapCommand(enemy.uuid, { health: 100, speed: 1, path: ENEMY_PATH })
  });


  it('dead enemies cant move', () => {
    const diedEvent = new EnemyDiedEvent(enemy.uuid);
    EventStore.save(diedEvent);

    expect(() => moveEnemyCommand(enemy.uuid)).toThrow('Dead enemies cant move');
  });

  it('make initial move', () => {
    moveEnemyCommand(enemy.uuid);

    const enemyEvents = EventStore.getByUuid(enemy.uuid);
    expect(enemyEvents.length).toBe(2);
    expect((enemyEvents[1] as EnemyMovedEvent).position).toEqual({
      col: 0,
      row: 50
    });
  });


  it('make a move', () => {
    enemy.persist(new EnemyMovedEvent(
      {
        col: 0,
        row: 50
      },
      enemy.uuid
    ));

    moveEnemyCommand(enemy.uuid);

    const enemyEvents = EventStore.getByUuid(enemy.uuid);
    expect(enemyEvents.length).toBe(3);
    expect((enemyEvents[2] as EnemyMovedEvent).position).toEqual({
      col: 1,
      row: 50
    });
  });

  it('makes a move towards next path position', () => {
    enemy.persist(new EnemyMovedEvent({col: 1, row: 50}, enemy.uuid));
    enemy.persist(new EnemyMovedEvent({col: 2, row: 50}, enemy.uuid));

    moveEnemyCommand(enemy.uuid);
    const enemyEvents = EventStore.getByUuid(enemy.uuid);
    expect((enemyEvents[3] as EnemyMovedEvent).position).toEqual({
      col: 2,
      row: 50
    });
  })

  it('should emit EnemyReachedEndEvent when path is complete', () => {
    const totalSteps = ENEMY_PATH.length + 1;
    
    for (let i = 0; i < totalSteps; i++) {
      try {
        moveEnemyCommand(enemy.uuid);
      } catch(e) {
        // ignore
      }
    }

    const reachedEndEvents = EventStore.getEventsByType('EnemyReachedEnd');
    expect(reachedEndEvents.length).toBe(1);
    expect((reachedEndEvents[0] as EnemyReachedEndEvent).uuid).toBe(enemy.uuid);
  });

});
