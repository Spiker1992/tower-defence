/**
 * @jest-environment jsdom
 */

import { TowerShooting } from "./towerShooting";
import { Enemies } from "../state/enemies";
import { Towers } from "../state/towers";
import { Enemy } from "../entities/enemy";
import { describe, expect, jest, beforeEach, afterEach, it } from '@jest/globals';
import { TinyEnemy } from "../entities/enemies/tinyEnemy";
import { Tower } from "../entities/tower";
import { Grid } from "../state/grid";
import { renderGrid } from "../views/renderGrid"

// Mocking dependencies

describe("TowerShooting", () => {
  let towerShooting;

  beforeEach(() => {
    towerShooting = new TowerShooting();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('should stop shooting when there are no enemies', async () => {
    const stopShootingSpy = jest.spyOn(towerShooting, 'stopShooting');

    towerShooting.startShooting();

    jest.runOnlyPendingTimers();
    
    expect(stopShootingSpy).toHaveBeenCalled();
  });

  it.only("should attack enemies within range", () => {
    // Create mock instances of Enemies and Towers
    const enemiesInstance = Enemies.getInstance();
    const towersInstance = Towers.getInstance();

    const enemyElement = document.createElement('div')

    const grid = Grid.getInstance()
    grid.generateGrid(5,5)
    renderGrid(grid.grid());

    // Mock enemy data
    const enemy1: Enemy = new TinyEnemy([{ col: 0, row: 0 }], 1);
    enemy1.element = enemyElement
    const reduceLife = jest.spyOn(enemy1, 'reduceLife');
    const removeEnemy = jest.spyOn(enemiesInstance, 'remove');

    // Add enemies to the enemiesInstance
    enemiesInstance.add(enemy1);

    // Mock tower data
    const tower1 = new Tower(1, { col: 0, row: 0 })
    tower1.render()

    // Add towers to the towersInstance
    towersInstance.add(tower1);

    const towerShooting = new TowerShooting();
    towerShooting.startShooting();

    jest.advanceTimersByTime(2000);
    // Check if the tower attacked the enemies within range
    expect(reduceLife).toHaveBeenCalledTimes(2);
    expect(reduceLife).toHaveBeenCalledWith(1);

    // Check if the dead enemy was removed from the enemiesInstance
    expect(removeEnemy).toHaveBeenCalledWith(enemy1);

    towerShooting.stopShooting();
  }); 
});