/**
 * @jest-environment jsdom
 */

import { describe, expect, jest, beforeEach, afterEach, it } from '@jest/globals';
import { checkOverlap, enemyInRange, getGridSquareToCoordinates, getTowerCenter, getTowerRange } from './utils';
import { Tower } from '../tower/tower';

describe("get tower  center", () => {
  it("tower at position 3,5", () => {
    const tower = new Tower(1, { col: 3, row: 5 })
    const actual = getTowerCenter(tower, 50)

    // col: 0, 1, 2, 3 => 0 to 50 (0), 50 to 100 (1), 100 to 150 (2), 150 to 200 (3)
    // row 4, 5 => 200 to 250 (4), 250 to 300 (5)

    const expected = { col: 175, row: 275 }

    expect(actual).toEqual(expected)
  })
  

});

describe("get tower range", () => {
  it("tower with range of 50 and size of 20", () => {
    const tower = new Tower(1, { col: 3, row: 5 })
    const actual = getTowerRange(tower)
    const expected = 80

    expect(actual).toEqual(expected)
  })
});

describe("get grid square coords", () => {
  it("square at 3, 5", () => { 
    const actual = getGridSquareToCoordinates({ col: 3, row: 5}, 50)
    // col: 0, 1, 2, 3 => 0 to 50 (0), 50 to 100 (1), 100 to 150 (2), 150 to 200 (3)
    // row 4, 5 => 200 to 250 (4), 250 to 300 (5)

    const expected = [
      { col: 150, row: 250},
      { col: 200, row: 300}
    ]

    expect(actual).toEqual(expected)
  })
  it("square at 4, 5", () => { 
    const actual = getGridSquareToCoordinates({ col: 4, row: 5}, 50)
    // col: 0, 1, 2, 3 => 0 to 50 (0), 50 to 100 (1), 100 to 150 (2), 150 to 200 (3)
    // row 4, 5 => 200 to 250 (4), 250 to 300 (5)

    const expected = [
      { col: 200, row: 250},
      { col: 250, row: 300}
    ]

    expect(actual).toEqual(expected)
  })
});

describe("check overlap", () => {
  it("circle at 3, 5 with radius 25 should overlap with 4, 5", () => { 
    
    const actual = checkOverlap(25, 175, 275, 200, 250, 250, 300)
    const expected = true

    expect(actual).toEqual(expected)
  })
  it("circle at 3, 5 with radius 24 should not overlap with 4, 5", () => { 
    
    const actual = checkOverlap(24, 175, 275, 200, 250, 250, 300)
    const expected = false

    expect(actual).toEqual(expected)
  })

});

describe("check overlap between tower and an enemy", () => {
  it("tower at 3, 5 (with radius 70) should overlap with coords 80 points away", () => { 
    const tower = new Tower(1, {col: 3, row: 5}) // 175, 275
    const enemy_position = { col: 255, row: 275 }
    const enemy_size = 10
    const actual = enemyInRange(tower,  50, enemy_position, enemy_size)
    const expected = true

    expect(actual).toEqual(expected)
  })
  it("tower at 3, 5 (with radius 70) should overlap with coords 81 points away", () => { 
    const tower = new Tower(1, {col: 3, row: 5}) // 175, 275
    const enemy_position = { col: 256, row: 275 }
    const enemy_size = 10
    const actual = enemyInRange(tower, 50, enemy_position, enemy_size)
    const expected = false

    expect(actual).toEqual(expected)
  })

});