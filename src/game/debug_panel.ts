import { EventStore } from "../commons/event_store";
import { Enemy } from "../enemy/models/enemy";
import { DamageEnemyCommand } from "../enemy/commands/damage_enemy_command";
import { AddEnemyToTheMapCommand } from "./commands/add_enemy_to_the_map_command";
import { FastEnemy, TankyEnemy } from "../enemy/models/enemy_presets";
import { v4 as uuidv4 } from 'uuid';

const REFRESH_INTERVAL_MS = 1000;
const MAX_ENEMIES_DISPLAYED = 100;

interface EnemyEvents {
    uuid: string;
    events: any[];
    latestEvent: any;
}

const expandedEnemies = new Set<string>();

export function groupEventsByEnemy(events: any[]): EnemyEvents[] {
    const grouped = new Map<string, EnemyEvents>();

    for (const event of events) {
        const uuid = event.uuid;
        if (!uuid) continue;

        if (!grouped.has(uuid)) {
            grouped.set(uuid, {
                uuid: uuid,
                events: [],
                latestEvent: null
            });
        }

        const enemyGroup = grouped.get(uuid)!;
        enemyGroup.events.push(event);
        enemyGroup.latestEvent = event;
    }

    return Array.from(grouped.values())
        .sort((a, b) => b.events.length - a.events.length)
        .slice(0, MAX_ENEMIES_DISPLAYED);
}

export function getEventSummary(event: any): string {
    switch (event.type) {
        case 'EnemyAddedToTheMap':
            return 'EnemyAddedToMap';
        case 'EnemyMoved':
            return `Moved to (${event.position.col}, ${event.position.row})`;
        case 'EnemyReachedEnd':
            return 'Reached End';
        case 'EnemyDied':
            return 'Died';
        default:
            return event.type;
    }
}

export function truncateUuid(uuid: string): string {
    if (typeof uuid !== 'string') {
        // Safely cast to string to avoid runtime crash, fulfilling the substring requirement.
        return String(uuid).substring(0, 8) + '...';
    }
    return uuid.substring(0, 8) + '...';
}

export function spawnEnemyDebug(type: 'fast' | 'tanky'): void {
    const uuid = uuidv4();
    const description = type === 'fast' ? FastEnemy : TankyEnemy;
    AddEnemyToTheMapCommand(uuid, description);
    renderDebugPanel();
}

export function damageEnemyDebug(enemyUuid: string): void {
    try {
        DamageEnemyCommand(enemyUuid, 10);
        renderDebugPanel();
    } catch (e) {
        console.error(e);
        alert(e instanceof Error ? e.message : 'Failed to damage enemy');
    }
}

export function toggleEnemy(enemyUuid: string): void {
    if (expandedEnemies.has(enemyUuid)) {
        expandedEnemies.delete(enemyUuid);
    } else {
        expandedEnemies.add(enemyUuid);
    }
    renderDebugPanel();
}

export function renderDebugPanel(): void {
    const panel = document.getElementById('debug-panel');
    if (!panel) return;

    const events = EventStore.getHistory();
    const enemyGroups = groupEventsByEnemy(events);

    if (enemyGroups.length === 0) {
        panel.innerHTML = '<h3>Event Store Debug</h3><p>No events yet</p>';
        return;
    }

    let html = '<h3>Event Store Debug</h3>';
    html += `<p>Total events: ${events.length} | Enemies: ${enemyGroups.length}</p>`;
    html += `<div class="debug-controls">
                <button onclick="window.spawnEnemyDebug('fast')">Spawn Fast</button>
                <button onclick="window.spawnEnemyDebug('tanky')">Spawn Tanky</button>
             </div>`;

    for (const enemy of enemyGroups) {
        const isExpanded = expandedEnemies.has(enemy.uuid);
        const latestEvent = enemy.latestEvent;
        const enemyInstance = new Enemy(enemy.events, 1, enemy.uuid);
        
        html += `<div class="debug-enemy">`;
        html += `  <div class="debug-enemy-header" onclick="window.toggleEnemyDebug('${enemy.uuid}')">`;
        html += `    <span class="debug-toggle">${isExpanded ? '[-]' : '[+]'}</span>`;
        html += `    <span class="debug-enemy-uuid">${truncateUuid(enemy.uuid)}</span>`;
        html += `    <span class="debug-event-count">(${enemy.events.length})</span>`;
        html += `    <span class="debug-health">HP: ${enemyInstance.health}</span>`;
        html += `    <button onclick="window.damageEnemyDebug('${enemy.uuid}'); event.stopPropagation();">Damage</button>`;
        html += `  </div>`;
        html += `  <div class="debug-enemy-latest">`;
        html += `    Latest: ${getEventSummary(latestEvent)}`;
        html += `  </div>`;
        
        if (isExpanded) {
            html += `  <div class="debug-enemy-history">`;
            for (let i = enemy.events.length - 1; i >= 0; i--) {
                const evt = enemy.events[i];
                const isLatest = i === enemy.events.length - 1;
                html += `    <div class="debug-event ${isLatest ? 'latest' : ''}">`;
                html += `      ${i + 1}. ${getEventSummary(evt)}`;
                html += `    </div>`;
            }
            html += `  </div>`;
        }
        
        html += `</div>`;
    }

    panel.innerHTML = html;
}

declare global {
    interface Window {
        toggleEnemyDebug: (enemyUuid: string) => void;
        damageEnemyDebug: (enemyUuid: string) => void;
        spawnEnemyDebug: (type: 'fast' | 'tanky') => void;
    }
}

export function initDebugPanel(): void {
    window.toggleEnemyDebug = toggleEnemy;
    window.damageEnemyDebug = damageEnemyDebug;
    window.spawnEnemyDebug = spawnEnemyDebug;
    renderDebugPanel();
    setInterval(renderDebugPanel, REFRESH_INTERVAL_MS);
}
