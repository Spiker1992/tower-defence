import { AddEnemyToTheMapCommand } from "./game/commands/add_enemy_to_the_map_command";
import "./game/listeners"
import { ENEMY_PATH_GRID, ENEMY_PATH, generatePixelPath, gridPathToSegments } from "./models/position";
import { initDebugPanel } from "./game/debug_panel";
import { initRenderer } from "./game/renderer_raf";
import { v4 as uuidv4 } from 'uuid';

initRenderer();
initDebugPanel();

AddEnemyToTheMapCommand(uuidv4(), { health: 100, speed: 1, path: ENEMY_PATH });
