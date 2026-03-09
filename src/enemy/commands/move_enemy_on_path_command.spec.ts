/**
 * @jest-environment jsdom
 */

import { moveEnemyOnPath } from './move_enemy_on_path_command';
import { Enemy } from '../models/enemy';
import { EventStore } from '../../commons/event_store';
import { EnemyReachedEndEvent } from '../events/enemy_reached_end_event';
import { ENEMY_PATH } from '../../models/position';
import { AddEnemyToTheMapCommand } from '../../game/commands/add_enemy_to_the_map_command';

describe('MoveEnemyOnPathCommand', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    EventStore.clearHistory();
  });

  it('enemy should emit EnemyReachedEndEvent when path is complete', () => {
    const enemy = new Enemy();
    AddEnemyToTheMapCommand(enemy.uuid, { health: 100, speed: 1, path: ENEMY_PATH });
    moveEnemyOnPath(enemy.uuid);

    const totalSteps = (ENEMY_PATH.length - 1) * 100 + 1;
    for (let i = 0; i < totalSteps; i++) {
      jest.advanceTimersByTime(10);
    }

    const allEvents = EventStore.getHistory();
    const reachedEndEvents = EventStore.getEventsByType('EnemyReachedEnd');
    
    expect(allEvents.length).toBeGreaterThan(0);
    expect(reachedEndEvents.length).toBe(1);
    expect((reachedEndEvents[0] as EnemyReachedEndEvent).uuid).toBe(enemy.uuid);
  });

});
