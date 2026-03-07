/**
 * @jest-environment jsdom
 */

import { groupEventsByEnemy, getEventSummary, truncateUuid, initDebugPanel } from './debug_panel';
import { EventStore } from '../commons/event_store';
import { Enemy } from '../enemy/models/enemy';
import { EnemyMovedEvent } from '../enemy/events/enemy_moved_event';
import { EnemyReachedEndEvent } from '../enemy/events/enemy_reached_end_event';
import { EnemyAddedToTheMapEvent } from './events/enemy_added_to_the_map_event';

describe('groupEventsByEnemy', () => {
    beforeEach(() => {
        EventStore.clearHistory();
    });

    test('should return empty array when no events', () => {
        const result = groupEventsByEnemy(EventStore.getHistory());
        expect(result).toEqual([]);
    });

    test('should group events by enemy_uuid', () => {
        const enemy = new Enemy();
        EventStore.save(new EnemyMovedEvent({ col: 100, row: 0 }, enemy.uuid));
        EventStore.save(new EnemyMovedEvent({ col: 200, row: 0 }, enemy.uuid));

        const result = groupEventsByEnemy(EventStore.getHistory());

        expect(result.length).toBe(1);
        expect(result[0].enemy_uuid).toBe(enemy.uuid);
        expect(result[0].events.length).toBe(2);
    });

    test('should sort by event count descending', () => {
        const enemy1 = new Enemy();
        const enemy2 = new Enemy();

        EventStore.save(new EnemyMovedEvent({ col: 100, row: 0 }, enemy1.uuid));
        EventStore.save(new EnemyMovedEvent({ col: 200, row: 0 }, enemy1.uuid));

        EventStore.save(new EnemyMovedEvent({ col: 100, row: 0 }, enemy2.uuid));

        const result = groupEventsByEnemy(EventStore.getHistory());

        expect(result[0].enemy_uuid).toBe(enemy1.uuid);
        expect(result[1].enemy_uuid).toBe(enemy2.uuid);
    });

    test('should limit to MAX_ENEMIES_DISPLAYED', () => {
        for (let i = 0; i < 105; i++) {
            const enemy = new Enemy();
            EventStore.save(new EnemyMovedEvent({ col: 100, row: 0 }, enemy.uuid));
        }

        const result = groupEventsByEnemy(EventStore.getHistory());

        expect(result.length).toBe(100);
    });

    test('should set latestEvent correctly', () => {
        const enemy = new Enemy();
        EventStore.save(new EnemyMovedEvent({ col: 100, row: 0 }, enemy.uuid));
        EventStore.save(new EnemyReachedEndEvent(enemy.uuid));

        const result = groupEventsByEnemy(EventStore.getHistory());

        expect(result[0].latestEvent.type).toBe('EnemyReachedEnd');
    });
});

describe('getEventSummary', () => {
    test('should return EnemyAddedToMap for EnemyAddedToTheMap', () => {
        const event = { type: 'EnemyAddedToTheMap' };
        expect(getEventSummary(event)).toBe('EnemyAddedToMap');
    });

    test('should include position for EnemyMoved', () => {
        const event = { type: 'EnemyMoved', position: { col: 150, row: 200 } };
        expect(getEventSummary(event)).toBe('Moved to (150, 200)');
    });

    test('should return Reached End for EnemyReachedEnd', () => {
        const event = { type: 'EnemyReachedEnd' };
        expect(getEventSummary(event)).toBe('Reached End');
    });

    test('should return Died for EnemyDied', () => {
        const event = { type: 'EnemyDied' };
        expect(getEventSummary(event)).toBe('Died');
    });

    test('should return type for unknown events', () => {
        const event = { type: 'UnknownEvent' };
        expect(getEventSummary(event)).toBe('UnknownEvent');
    });
});

describe('truncateUuid', () => {
    test('should truncate to 8 chars with ...', () => {
        expect(truncateUuid('12345678-1234-1234-1234-123456789012')).toBe('12345678...');
    });

    test('should handle short uuid', () => {
        expect(truncateUuid('1234567')).toBe('1234567...');
    });
});
