import { MAP_WIDTH, MAP_HEIGHT, ENEMY_PATH, GRID_SCALE, IPosition } from "../models/position";
import { Enemies } from "./event_store";
import { EnemyAddedToTheMapEvent } from "./events/enemy_added_to_the_map_event";
import { EnemyMovedEvent } from "../enemy/events/enemy_moved_event";
import { EnemyDiedEvent } from "../enemy/events/enemy_died_event";

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

let cellSize: number;

const enemyPositions = new Map<string, IPosition>();
const enemyHealths = new Map<string, number>();
const enemySpeeds = new Map<string, number>();
const deadEnemies = new Set<string>();

function calculateCellSize(): void {
    const availableWidth = window.innerWidth - 280;
    const availableHeight = window.innerHeight;
    const cellWidth = availableWidth / MAP_WIDTH;
    const cellHeight = availableHeight / MAP_HEIGHT;
    cellSize = Math.min(cellWidth, cellHeight);
    
    canvas.width = cellSize * MAP_WIDTH;
    canvas.height = cellSize * MAP_HEIGHT;
}

function drawGrid(): void {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;

    for (let row = 0; row <= MAP_HEIGHT; row++) {
        ctx.beginPath();
        ctx.moveTo(0, row * cellSize);
        ctx.lineTo(MAP_WIDTH * cellSize, row * cellSize);
        ctx.stroke();
    }

    for (let col = 0; col <= MAP_WIDTH; col++) {
        ctx.beginPath();
        ctx.moveTo(col * cellSize, 0);
        ctx.lineTo(col * cellSize, MAP_HEIGHT * cellSize);
        ctx.stroke();
    }
}

function drawPath(): void {
    ctx.fillStyle = '#8B4513';
    
    for (const pos of ENEMY_PATH) {
        ctx.fillRect(
            pos.col * cellSize,
            pos.row * cellSize,
            cellSize,
            cellSize
        );
    }
}

function drawEnemy(uuid: string): void {
    if (deadEnemies.has(uuid)) return;
    
    const pos = enemyPositions.get(uuid);
    if (!pos) return;
    
    const health = enemyHealths.get(uuid) ?? 0;
    const speed = enemySpeeds.get(uuid) ?? 1;
    
    const x = (pos.col / GRID_SCALE) * cellSize + cellSize / 2;
    const y = (pos.row / GRID_SCALE) * cellSize + cellSize / 2;
    
    const isFast = speed >= 2;
    const isTanky = speed < 1;
    
    const width = isTanky ? cellSize * 0.6 : cellSize * 0.4;
    const height = isTanky ? cellSize * 0.5 : cellSize * 0.3;
    
    ctx.fillStyle = isTanky ? '#CD853F' : '#3CB371';
    ctx.fillRect(x - width / 2, y - height / 2, width, height);
    
    const healthPercent = Math.max(0, health / (isTanky ? 200 : 50));
    const barWidth = width;
    const barHeight = 4;
    const barX = x - barWidth / 2;
    const barY = y - height / 2 - 8;
    
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(barX, barY, barWidth, barHeight);
    
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
}

function drawEnemies(): void {
    for (const uuid of enemyPositions.keys()) {
        drawEnemy(uuid);
    }
}

function render(): void {
    calculateCellSize();
    ctx.fillStyle = '#90a955';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawPath();
    drawGrid();
    drawEnemies();
}

function handleResize(): void {
    render();
}

function handleEnemyAdded(event: CustomEvent): void {
    const e = event.detail as EnemyAddedToTheMapEvent;
    const startCell = e.description.path[0];
    enemyPositions.set(e.uuid, {
        col: startCell.col * GRID_SCALE,
        row: startCell.row * GRID_SCALE + GRID_SCALE / 2,
    });
    enemyHealths.set(e.uuid, e.description.health);
    enemySpeeds.set(e.uuid, e.description.speed);
    deadEnemies.delete(e.uuid);
    render();
}

function handleEnemyMoved(event: CustomEvent): void {
    const e = event.detail as EnemyMovedEvent;
    enemyPositions.set(e.uuid, e.position);
    render();
}

function handleEnemyDied(event: CustomEvent): void {
    const e = event.detail as EnemyDiedEvent;
    deadEnemies.add(e.uuid);
    render();
}

export function initRenderer(): void {
    window.addEventListener('resize', handleResize);
    window.addEventListener('EnemyAddedToTheMap', handleEnemyAdded);
    window.addEventListener('EnemyMoved', handleEnemyMoved);
    window.addEventListener('EnemyDied', handleEnemyDied);
    render();
}
