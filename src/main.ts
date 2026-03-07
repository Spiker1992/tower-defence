import { Enemy } from "./enemy/models/enemy"
import { AddEnemyToTheMapCommand } from "./map/commands/add_enemy_to_the_map_command";
import "./map/listeners"
import { ENEMY_PATH, validatePath } from "./models/position";


const validation = validatePath(ENEMY_PATH);
validation.warnings.forEach(w => console.warn(`Path warning: ${w}`));

AddEnemyToTheMapCommand(new Enemy())
