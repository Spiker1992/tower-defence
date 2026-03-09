/**
 * @jest-environment jsdom
 */

import { TowerAttackCommand } from './tower_attack_command';
import { Towers, Enemies } from '../../game/event_store';
import { TowerPlacedEvent, TowerAttackedEvent, TowerRemovedEvent } from '../events/tower_events';
import { EnemyAddedToTheMapEvent } from '../../game/events/enemy_added_to_the_map_event';
import { EnemyDamagedEvent } from '../../enemy/events/enemy_damaged_event';
import { v4 as uuidv4 } from 'uuid';
import { ENEMY_PATH } from '../../models/position';

describe('TowerAttackCommand', () => {
    beforeEach(() => {
        Towers.clearHistory();
        Enemies.clearHistory();
    });

    test('should throw error if enemy does not exist', () => {
        const towerUuid = uuidv4();
        const enemyUuid = uuidv4();
        Towers.save(new TowerPlacedEvent(towerUuid, { col: 0, row: 0 }, 5, 10, 1000));

        expect(() => {
            TowerAttackCommand(towerUuid, enemyUuid);
        }).toThrow('Enemy not found');
    });

    test('should successfully persist TowerAttackedEvent if valid', () => {
        const towerUuid = uuidv4();
        const enemyUuid = uuidv4();
        
        // Increased range from 5 to 500 to cover (100,0)
        Towers.save(new TowerPlacedEvent(towerUuid, { col: 0, row: 0 }, 500, 10, 1000));
        Enemies.save(new EnemyAddedToTheMapEvent(enemyUuid, { health: 10, speed: 1, path: ENEMY_PATH }));

        expect(() => {
            TowerAttackCommand(towerUuid, enemyUuid);
        }).not.toThrow();

        const history = Towers.getHistory();
        expect(history.some(e => e instanceof TowerAttackedEvent)).toBe(true);
    });

    test('should throw error if tower is on cooldown', () => {
        const towerUuid = uuidv4();
        const enemyUuid = uuidv4();
        
        // Increased range from 5 to 500 to cover (100,0)
        Towers.save(new TowerPlacedEvent(towerUuid, { col: 0, row: 0 }, 500, 10, 1000)); // 1s cooldown
        Enemies.save(new EnemyAddedToTheMapEvent(enemyUuid, { health: 10, speed: 1, path: ENEMY_PATH }));

        // First attack
        TowerAttackCommand(towerUuid, enemyUuid);

        // Second attack (should be on cooldown)
        expect(() => {
            TowerAttackCommand(towerUuid, enemyUuid);
        }).toThrow('Tower is on cooldown');
    });

    test('should throw error if tower has been removed', () => {
        const towerUuid = uuidv4();
        const enemyUuid = uuidv4();
        
        Towers.save(new TowerPlacedEvent(towerUuid, { col: 0, row: 0 }, 5, 10, 1000));
        Towers.save(new TowerRemovedEvent(towerUuid, towerUuid, 'sold'));
        Enemies.save(new EnemyAddedToTheMapEvent(enemyUuid, { health: 10, speed: 1, path: ENEMY_PATH }));
        
        expect(() => {
            TowerAttackCommand(towerUuid, enemyUuid);
        }).toThrow('Cannot attack with a removed tower');
    });

    test('should throw error if enemy is out of range', () => {
        const towerUuid = uuidv4();
        const enemyUuid = uuidv4();
        
        // Tower at (0,0), range 0 (only covers its own tile)
        Towers.save(new TowerPlacedEvent(towerUuid, { col: 0, row: 0 }, 0, 10, 1000));
        
        // Enemy at path index 0 is (1,0) grid -> (100,0) px
        Enemies.save(new EnemyAddedToTheMapEvent(enemyUuid, { health: 10, speed: 1, path: ENEMY_PATH }));
        
        expect(() => {
            TowerAttackCommand(towerUuid, enemyUuid);
        }).toThrow('Target out of range');
    });

    test('should throw error if enemy is known but not added to the map', () => {
        const towerUuid = uuidv4();
        const enemyUuid = uuidv4();
        
        Towers.save(new TowerPlacedEvent(towerUuid, { col: 0, row: 0 }, 500, 10, 1000));
        // Add an event but NOT EnemyAddedToTheMapEvent
        Enemies.save(new EnemyDamagedEvent(enemyUuid, 10)); 
        
        expect(() => {
            TowerAttackCommand(towerUuid, enemyUuid);
        }).toThrow('Enemy not on the map');
    });
});
