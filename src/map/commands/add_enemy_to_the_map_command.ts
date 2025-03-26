import { Enemy } from "../../enemy/models/enemy";
import { MapEvents } from "../event_store";
import { EnemyAddedToTheMapEvent } from "../events/enemy_added_to_the_map_event";

export function AddEnemyToTheMapCommand(enemy: Enemy) {
    MapEvents.save(new EnemyAddedToTheMapEvent(enemy))
}
