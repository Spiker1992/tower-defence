/**
 * @jest-environment jsdom
 */

import { AddEnemyToTheMapCommand } from './add_enemy_to_the_map_command'; // Adjust the import path as needed
import { MapEvents } from '../event_store'; // Assuming you have a Map interface/class
import { Enemy } from '../../enemy/models/enemy';

describe('AddEnemyToTheMapCommand', () => {
    beforeEach(() => {
        MapEvents.clearHistory();
    })

    test('should add an enemy to an empty map and update the enemy store', () => {
        const enemy = new Enemy();

        AddEnemyToTheMapCommand(enemy)
        console.log(MapEvents.getHistory())
        expect(MapEvents.getHistory().length).toBe(1);
    });

    test('should add an enemy to a map with existing enemies and update the enemy store', () => {
        const enemy = new Enemy();

        AddEnemyToTheMapCommand(enemy)
        AddEnemyToTheMapCommand(enemy)
        
        expect(MapEvents.getHistory().length).toBe(2);
    });
});