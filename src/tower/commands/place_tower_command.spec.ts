/**
 * @jest-environment jsdom
 */

import { PlaceTowerCommand } from './place_tower_command';
import { ENEMY_PATH } from '../../models/position';
import { Towers } from '../../game/event_store';
import { TowerPlacedEvent } from '../events/tower_events';

describe('PlaceTowerCommand', () => {
    beforeEach(() => {
        Towers.clearHistory();
    });

    test('should throw error if tower is placed on the enemy path', () => {
        const pathPosition = ENEMY_PATH[0];
        
        expect(() => {
            PlaceTowerCommand('tower-1', pathPosition);
        }).toThrow('Cannot place tower on the enemy path');
    });

    test('should throw error if position is occupied by another tower', () => {
        const pos = { col: 5, row: 5 };
        const event = new TowerPlacedEvent('tower-1', pos, 5, 10, 100);
        Towers.save(event);
        
        expect(() => {
            PlaceTowerCommand('tower-2', pos);
        }).toThrow('Cannot place tower on an occupied position');
    });

    test('should throw error if tower is placed outside of map boundaries', () => {
        expect(() => {
            PlaceTowerCommand('tower-1', { col: -1, row: 0 });
        }).toThrow('Cannot place tower outside of map boundaries');
        
        expect(() => {
            PlaceTowerCommand('tower-1', { col: 10, row: 0 });
        }).toThrow('Cannot place tower outside of map boundaries');
    });
});
