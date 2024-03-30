/**
 * @jest-environment jsdom
 */

import { Enemies } from "./enemies";
import { MoveEnemy } from "./moveEnemy";
import { EnemySpawner } from "./EnemySpawner";
import { EventEmitter } from "events";
import { Coordinate } from "../interfaces";
import { Enemy } from "./enemy";
import { describe, expect, jest, beforeEach, afterEach, it } from '@jest/globals';
import { TinyEnemy } from "./enemies/tinyEnemy";
import { BeastEnemy } from "./enemies/beastEnemy";

describe("EnemySpawner", () => {
  let enemiesInstance: Enemies;
  let moveEnemyMock: jest.Mock<MoveEnemy>;
  let eventEmitterMock: jest.Mocked<EventEmitter>;
  let path: Coordinate[];
  let enemySpawner: EnemySpawner;

  beforeEach(() => {
    jest.useFakeTimers();
    enemiesInstance = Enemies.getInstance();
    moveEnemyMock = jest.fn();
    eventEmitterMock = new EventEmitter() as jest.Mocked<EventEmitter>;
    path = [
      { col: 0, row: 0 },
      { col: 1, row: 1 },
      { col: 2, row: 2 },
    ];
    enemySpawner = new EnemySpawner([], 1000, path);
    enemySpawner["enemies"] = enemiesInstance;
    enemySpawner["eventEmitter"] = eventEmitterMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("startSpawning", () => {
    it.only("should spawn enemies according to the enemySpec and emit the firstEnemySpawned event", () => {
      const enemySpec: [typeof Enemy, number][] = [
        [TinyEnemy, 2],
        [BeastEnemy, 3],
      ];
      const enemyPath = [...path];

      enemySpawner["enemySpec"] = enemySpec;
      enemySpawner.startSpawning();
 
      jest.advanceTimersByTime(5000);

      expect(enemiesInstance.all().length).toEqual(5)

    });

    it("should stop spawning enemies and log 'Finished spawning enemies' when enemySpec is empty", () => {
      enemySpawner.startSpawning();

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);

      jest.runOnlyPendingTimers();

      expect(console.log).toHaveBeenCalledWith("Finished spawning enemies");
      expect(eventEmitterMock.emit).not.toHaveBeenCalled();
    });
  });

});