import { Towers } from '../../game/event_store';
import { Enemies } from '../../game/event_store';
import { TowerAttackedEvent } from '../events/tower_events';
import { EventStore } from '../../commons/event_store';
import { Tower } from '../models/tower';
import { Enemy } from '../../enemy/models/enemy';
import { EnemyAddedToTheMapEvent } from '../../game/events/enemy_added_to_the_map_event';

export function TowerAttackCommand(towerUuid: string, enemyUuid: string) {
    // 1. Load Tower
    const towerEvents = Towers.getByUuid(towerUuid);
    const tower = new Tower(towerEvents, towerUuid);

    // 2. Load Enemy (to check if valid/exists)
    const enemyEvents = Enemies.getByUuid(enemyUuid);
    
    if (enemyEvents.length === 0) {
        throw new Error('Enemy not found');
    }
    
    if (!enemyEvents.some(e => e instanceof EnemyAddedToTheMapEvent)) {
        throw new Error('Enemy not on the map');
    }

    if (tower.is_removed) {
        throw new Error('Cannot attack with a removed tower');
    }

    // 3. Validate Cooldown
    const history = Towers.getHistory();
    const lastAttack = history
        .filter((e): e is TowerAttackedEvent => e.type === "TowerAttacked" && (e as TowerAttackedEvent).towerUuid === towerUuid)
        .sort((a, b) => b.timestamp - a.timestamp)[0];

    const now = Date.now();
    if (lastAttack && (now - lastAttack.timestamp) < tower.cooldown) {
        throw new Error('Tower is on cooldown');
    }

    // 4. Validate Range
    const enemy = new Enemy(enemyEvents, 1, enemyUuid);
    if (!tower.is_in_range(enemy.current_position)) {
        throw new Error('Target out of range');
    }

    // 5. Persist
    const event = new TowerAttackedEvent(towerUuid, towerUuid, enemyUuid, now);
    Towers.save(event);
}
