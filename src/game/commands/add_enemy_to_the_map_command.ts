import { Enemies } from "../event_store";
import { EnemyAddedToTheMapEvent } from "../events/enemy_added_to_the_map_event";
import { EnemyDescription } from "../../enemy/models/enemy_description";

export function AddEnemyToTheMapCommand(enemyUuid: string, description: EnemyDescription) {
    Enemies.save(new EnemyAddedToTheMapEvent(enemyUuid, description))
}
