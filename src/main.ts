import { Enemy } from "./enemy/models/enemy"
import { AddEnemyToTheMapCommand } from "./map/commands/add_enemy_to_the_map_command";
import "./map/listeners"



AddEnemyToTheMapCommand(new Enemy())
AddEnemyToTheMapCommand(new Enemy())
