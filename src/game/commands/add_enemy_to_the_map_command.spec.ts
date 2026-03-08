/**
 * @jest-environment jsdom
 */

import { AddEnemyToTheMapCommand } from './add_enemy_to_the_map_command';
import { Enemies } from '../event_store';
import { Enemy } from '../../enemy/models/enemy';
import { EnemyAddedToTheMapEvent } from '../events/enemy_added_to_the_map_event';
import { EnemyDescription } from '../../enemy/models/enemy_description';

describe('AddEnemyToTheMapCommand', () => {
    beforeEach(() => {
        Enemies.clearHistory();
    })

    test('should add an enemy to an empty map and update the enemy store', () => {
        const enemy = new Enemy();
        const description: EnemyDescription = { health: 100, speed: 1 };

        AddEnemyToTheMapCommand(enemy.uuid, description)
        expect(Enemies.getHistory().length).toBe(1);
        expect(Enemies.getHistory()[0]).toEqual(new EnemyAddedToTheMapEvent(enemy.uuid, description));
    });

    test('should add an enemy to a map with existing enemies and update the enemy store', () => {
        const enemy = new Enemy();
        const description: EnemyDescription = { health: 100, speed: 1 };

        AddEnemyToTheMapCommand(enemy.uuid, description)
        AddEnemyToTheMapCommand(enemy.uuid, description)
        
        expect(Enemies.getHistory().length).toBe(2);
    });
});
