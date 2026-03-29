/**
 * @jest-environment jsdom
 */

import { SpawnEnemiesCommand } from './spawn_enemies_command';
import { Enemies } from '../event_store';

describe('SpawnEnemiesCommand', () => {
    beforeEach(() => {
        Enemies.clearHistory();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should spawn 10 enemies by default', () => {
        SpawnEnemiesCommand();
        
        jest.advanceTimersByTime(18000);
        
        expect(Enemies.getHistory().length).toBe(10);
    });

    test('should spawn specified number of enemies', () => {
        SpawnEnemiesCommand(5);
        
        jest.advanceTimersByTime(8000);
        
        expect(Enemies.getHistory().length).toBe(5);
    });

    test('should spawn fast enemies by default', () => {
        SpawnEnemiesCommand(3);
        
        jest.advanceTimersByTime(4000);
        
        const events = Enemies.getHistory();
        expect(events.length).toBe(3);
        events.forEach(event => {
            expect((event as any).description.speed).toBe(2);
            expect((event as any).description.health).toBe(50);
        });
    });

    test('should spawn tanky enemies when specified', () => {
        SpawnEnemiesCommand(3, 'tanky');
        
        jest.advanceTimersByTime(4000);
        
        const events = Enemies.getHistory();
        expect(events.length).toBe(3);
        events.forEach(event => {
            expect((event as any).description.speed).toBe(0.5);
            expect((event as any).description.health).toBe(200);
        });
    });
});
