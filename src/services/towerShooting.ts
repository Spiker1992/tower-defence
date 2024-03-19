import { Enemies } from "../state/enemies";
import { Towers } from "../state/towers";
import { Enemy } from "../entities/enemy";
import { getCenterPoint } from "../helpers/grid";
import { ITower, ITowerAttributes, Tower } from "../entities/tower";

export class TowerShooting {
    private interval: NodeJS.Timeout | null;
    private enemyStore: Enemies;

    constructor() {
        this.interval = null;
        this.enemyStore = Enemies.getInstance()
    }

    public startShooting(): void {
        const enemies = this.enemyStore
        const towers = Towers.getInstance().all();

        this.interval = setInterval(() => {
            if (enemies.all().length < 1) {
                this.stopShooting();
                return
            }

            towers.forEach((tower) => {
                this.performTowerAttack(tower, enemies.all())
            });

        }, 1000);
    }

    private performTowerAttack(tower: ITower, enemies: Enemy[]): void {
        const attributes = tower.attributes();
        const targetEnemy = this.getEnemyInRange(attributes, enemies);
        if (targetEnemy) {
            tower.reload()
            targetEnemy.reduceLife(attributes.damage);

            if (targetEnemy.isDead()) {
                this.enemyStore.remove(targetEnemy);
            }
        }
    }

    private getEnemyInRange(attributes: ITowerAttributes, enemies: Enemy[]): Enemy | null {
        let closestEnemy = null;
        let closestDistance = Number.MAX_SAFE_INTEGER;

        enemies.forEach((enemy) => {
            if (!enemy.element) {
                return
            }

            const distance = this.calculateDistance(attributes, enemy);
            if (distance <= attributes.range && distance < closestDistance) {
                closestEnemy = enemy;
                closestDistance = distance;
            }
        })

        return closestEnemy;
    }

    private calculateDistance(attributes: ITowerAttributes, enemy: Enemy): number {
        const { x: towerCenterX, y: towerCenterY } = attributes;
        const { x, y } = getCenterPoint(enemy.element);

        const deltaX = x - towerCenterX;
        const deltaY = y - towerCenterY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    public stopShooting(): void {
        console.log("stop shooting")
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}