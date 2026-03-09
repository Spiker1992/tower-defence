/**
 * @jest-environment jsdom
 */

import { DamageEnemyCommand } from './damage_enemy_command';
import { Enemy } from '../models/enemy';
import { EventStore } from '../../commons/event_store';
import { AddEnemyToTheMapCommand } from '../../game/commands/add_enemy_to_the_map_command';
import { EnemyDamagedEvent } from '../events/enemy_damaged_event';
import { EnemyDiedEvent } from '../events/enemy_died_event';
import { EnemyReachedEndEvent } from '../events/enemy_reached_end_event';
import { ENEMY_PATH } from '../../models/position';

describe('DamageEnemyCommand', () => {
  let enemy: Enemy;

  beforeEach(() => {
    EventStore.clearHistory();
    enemy = new Enemy();
    AddEnemyToTheMapCommand(enemy.uuid, { health: 100, speed: 1, path: ENEMY_PATH });
  });

  it('should damage a healthy enemy', () => {
    DamageEnemyCommand(enemy.uuid, 20);

    const enemyEvents = EventStore.getByUuid(enemy.uuid);
    const lastEvent = enemyEvents[enemyEvents.length - 1];
    
    expect(lastEvent instanceof EnemyDamagedEvent).toBe(true);
    expect((lastEvent as EnemyDamagedEvent).amount).toBe(20);
  });

  it('should damage and kill an enemy', () => {
    DamageEnemyCommand(enemy.uuid, 100);

    const enemyEvents = EventStore.getByUuid(enemy.uuid);
    
    expect(enemyEvents.some(e => e instanceof EnemyDamagedEvent)).toBe(true);
    expect(enemyEvents.some(e => e instanceof EnemyDiedEvent)).toBe(true);
  });

  it('should prevent damage to an already dead enemy', () => {
    DamageEnemyCommand(enemy.uuid, 100); // Kills enemy

    expect(() => DamageEnemyCommand(enemy.uuid, 10)).toThrow('Cannot damage a dead enemy');
  });

  it('should prevent damage to an enemy that reached the end', () => {
    EventStore.save(new EnemyReachedEndEvent(enemy.uuid));

    expect(() => DamageEnemyCommand(enemy.uuid, 10)).toThrow('Cannot damage an enemy that has reached the end');
  });
});
