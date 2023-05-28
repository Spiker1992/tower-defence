import { Enemies } from "../state/enemies";
import { getCenterPoint } from "./grid";

export function getEnemyInRange(tower) {
    let closestEnemy = null;
    let closestDistance = Infinity;

    const enemies = Enemies.getInstance()
    console.log(enemies.all())

    for (const enemy of enemies.all()) {
        if (!enemy.element) {
            continue 
        }
        const { x, y } = getCenterPoint(enemy.element)
        const distance = calculateDistance(tower.x, tower.y, x, y);
        console.log("distance", distance)
        if (distance <= tower.range && distance < closestDistance) {
            closestEnemy = enemy;
            closestDistance = distance;
        }
    }

    return closestEnemy;
}

// Helper function to calculate distance between two points
export function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
