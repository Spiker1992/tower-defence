import { Enemy } from "../../enemy/models/enemy";
import { Enemies } from "../event_store";
import { EnemyAddedToTheMapEvent } from "../events/enemy_added_to_the_map_event";

export function AddEnemyToTheMapCommand(enemy: Enemy) {
    Enemies.save(new EnemyAddedToTheMapEvent(enemy))
}
