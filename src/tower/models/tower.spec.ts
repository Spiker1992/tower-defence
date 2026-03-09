import { Tower } from './tower';
import { TowerPlacedEvent, TowerUpgradedEvent } from '../events/tower_events';

describe('Tower', () => {
    const towerUuid = 'tower-1';

    test('should initialize state from TowerPlacedEvent', () => {
        const event = new TowerPlacedEvent(towerUuid, { col: 1, row: 1 }, 5, 10, 100);
        const tower = new Tower([event], towerUuid);

        expect(tower.position).toEqual({ col: 1, row: 1 });
        expect(tower.range).toBe(5);
        expect(tower.damage).toBe(10);
        expect(tower.cooldown).toBe(100);
    });

    test('should update state from TowerUpgradedEvent', () => {
        const placed = new TowerPlacedEvent(towerUuid, { col: 1, row: 1 }, 5, 10, 100);
        const upgraded = new TowerUpgradedEvent(towerUuid, 2, 5, 10);
        const tower = new Tower([placed, upgraded], towerUuid);

        expect(tower.range).toBe(7);
        expect(tower.damage).toBe(15);
        expect(tower.cooldown).toBe(90);
    });

    test('should compute is_in_range correctly', () => {
        const placed = new TowerPlacedEvent(towerUuid, { col: 5, row: 5 }, 2, 10, 100);
        const tower = new Tower([placed], towerUuid);

        // Within range (distance in pixels <= range * GRID_SCALE)
        // Tower at (500, 500) pixels, range 2 => 200 pixels
        // Target at (500, 700). Distance = 200 <= 200. In range.
        expect(tower.is_in_range({ col: 500, row: 700 })).toBe(true);
        
        // Target at (600, 600). Distance = 100 + 100 = 200 <= 200. In range.
        expect(tower.is_in_range({ col: 600, row: 600 })).toBe(true);
        
        // Out of range (Manhattan distance 300 > range 200)
        expect(tower.is_in_range({ col: 500, row: 800 })).toBe(false);
    });
});
