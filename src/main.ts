import { AddEnemyToTheMapCommand } from "./game/commands/add_enemy_to_the_map_command";
import "./game/listeners"
import { ENEMY_PATH, validatePath } from "./models/position";
import { initDebugPanel } from "./game/debug_panel";
import { v4 as uuidv4 } from 'uuid';
import { EnemyDescription } from "./enemy/models/enemy_description";


const validation = validatePath(ENEMY_PATH);
validation.warnings.forEach(w => console.warn(`Path warning: ${w}`));

initDebugPanel();

AddEnemyToTheMapCommand(uuidv4(), { health: 100, speed: 1, path: ENEMY_PATH })
