/**
 * @jest-environment jsdom
 */

import { describe, expect, beforeEach, it } from '@jest/globals';
import maxHeap, { EnemyNotFound } from './maxHeap';

describe('add enemy', () => {
  let heap: maxHeap;

  beforeEach(() => {
    heap = new maxHeap();
  });


  it('add first new enemy', () => {
    heap.insertOrUpdate(1, 4)

    expect(heap.heap).toEqual([[1, 4]])
    expect(heap.positions).toEqual({ 1: 0 })
  });


  it('add multiple enemies', () => {
    heap.insertOrUpdate(1, 4)
    heap.insertOrUpdate(2, 3)
    heap.insertOrUpdate(3, 2)
    heap.insertOrUpdate(4, 1)
    heap.insertOrUpdate(5, 0)

    expect(heap.heap).toEqual([[1, 4], [2, 3], [3, 2], [4, 1], [5, 0]])
    expect(heap.positions).toEqual({ 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 })
  });

  it('add enemy that is greater than the largest element - simple scenario', () => {
    heap.insertOrUpdate(1, 4)
    heap.insertOrUpdate(6, 5)

    expect(heap.heap).toEqual([[6, 5], [1, 4]])
    expect(heap.positions).toEqual({ 1: 1, 6: 0 })
  });

  it('add enemy that is mid way through the heap', () => {
    heap.insertOrUpdate(1, 4)
    heap.insertOrUpdate(2, 3)
    heap.insertOrUpdate(3, 2)
    heap.insertOrUpdate(4, 1)
    heap.insertOrUpdate(5, 3.5)

    expect(heap.heap).toEqual([[1, 4], [5, 3.5], [3,2], [4, 1], [2,3]])
    expect(heap.positions).toEqual({ 1: 0, 2: 4, 3: 2, 4: 3, 5: 1 })
  });
})

describe('get furthest enemy', () => {
  let heap: maxHeap;

  beforeEach(() => {
    heap = new maxHeap();
    heap.insertOrUpdate(1, 4)
    heap.insertOrUpdate(2, 3)
    heap.insertOrUpdate(3, 2)
    heap.insertOrUpdate(4, 1)
    heap.insertOrUpdate(5, 0)
  });

  it('get furthest enemy', () => {
    expect(heap.peek()).toEqual([1, 4])
  })
})

describe('update enemy', () => {
  let heap: maxHeap;

  beforeEach(() => {
    heap = new maxHeap();
    heap.insertOrUpdate(1, 4)
    heap.insertOrUpdate(2, 3)
    heap.insertOrUpdate(3, 2)
    heap.insertOrUpdate(4, 1)
    heap.insertOrUpdate(5, 0)
  });

  it('update enemy distance', () => {
    heap.insertOrUpdate(5, 5)

    expect(heap.heap).toEqual([[5,5], [1,4], [3,2], [4,1], [2,3]])
    expect(heap.positions).toEqual({ 1: 1, 2: 4, 3: 2, 4: 3, 5: 0 })
  })
})

describe('delete enemy', () => {
  let heap: maxHeap;

  beforeEach(() => {
    heap = new maxHeap();
    heap.insertOrUpdate(1, 4)
    heap.insertOrUpdate(2, 3)
    heap.insertOrUpdate(3, 2)
    heap.insertOrUpdate(4, 1)
    heap.insertOrUpdate(5, 0)
  });

  it('deleted furthest enemy', () => {
    expect(heap.pop()).toEqual(1)
    expect(heap.heap).toEqual([[2, 3], [4, 1], [3, 2], [5, 0]])
    expect(heap.positions).toEqual({ 2: 0, 3: 2, 4: 1, 5: 3 })
  })

  it('delete enemy that is mid way through the heap', () => {
    expect(heap.deleteEnemy(2)).toEqual(2)
    expect(heap.heap).toEqual([[1,4], [4, 1], [3, 2], [5, 0]])
    expect(heap.positions).toEqual({ 1: 0, 3: 2, 4: 1, 5: 3 })
  })

  it('delete enemy that is not in the heap', () => {
    expect(() => heap.deleteEnemy(6)).toThrow(EnemyNotFound)
  })
})

