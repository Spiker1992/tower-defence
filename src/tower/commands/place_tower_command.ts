import { IPosition, ENEMY_PATH, MAP_WIDTH, MAP_HEIGHT } from '../../models/position';
import { Towers } from '../../game/event_store';
import { TowerPlacedEvent } from '../events/tower_events';

export function PlaceTowerCommand(uuid: string, position: IPosition) {
    if (position.col < 0 || position.col >= MAP_WIDTH || position.row < 0 || position.row >= MAP_HEIGHT) {
        throw new Error('Cannot place tower outside of map boundaries');
    }

    const isPath = ENEMY_PATH.some(p => p.col === position.col && p.row === position.row);
    if (isPath) {
        throw new Error('Cannot place tower on the enemy path');
    }

    const history = Towers.getHistory();
    const placedEvents = history.filter(e => e instanceof TowerPlacedEvent) as TowerPlacedEvent[];
    const isOccupied = placedEvents.some(e => e.position.col === position.col && e.position.row === position.row);

    if (isOccupied) {
        throw new Error('Cannot place tower on an occupied position');
    }
}
