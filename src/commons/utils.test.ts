/**
 * @jest-environment jsdom
 */

import { describe, expect, jest, beforeEach, afterEach, it } from '@jest/globals';
import { checkOverlap, enemyInRange, getGridSquareCoordinates, getTowerCenter, getTowerRange } from './utils';
import { Tower } from '../tower/tower';
import { TinyEnemy } from '../enemy/enemies/tinyEnemy';

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
    const actual = getGridSquareCoordinates({ col: 3, row: 5}, 50)
    // col: 0, 1, 2, 3 => 0 to 50 (0), 50 to 100 (1), 100 to 150 (2), 150 to 200 (3)
    // row 4, 5 => 200 to 250 (4), 250 to 300 (5)

    const expected = [
      { col: 150, row: 250},
      { col: 200, row: 300}
    ]

    expect(actual).toEqual(expected)
  })
  it("square at 4, 5", () => { 
    const actual = getGridSquareCoordinates({ col: 4, row: 5}, 50)
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

// describe("check overlap between tower and an enemy", () => {
//   it("circle at 3, 5 with radius 25 should overlap with 4, 5", () => { 
//     const tower = new Tower(1, {col: 3, row: 5})
//     const enemy_position = {col: 4, row: 5}
//     const enemy_size = 10
//     const actual = enemyInRange(25, 175, 275, 200, 250, 250, 300)
//     const expected = true

//     expect(actual).toEqual(expected)
//   })
//   it("circle at 3, 5 with radius 24 should not overlap with 4, 5", () => { 
    
//     const actual = checkOverlap(24, 175, 275, 200, 250, 250, 300)
//     const expected = false

//     expect(actual).toEqual(expected)
//   })

// });