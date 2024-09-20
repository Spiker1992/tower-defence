/**
 * @jest-environment jsdom
 */

import { describe, expect, test, beforeEach } from '@jest/globals';
import { Tower } from '../entities/tower';
import { PlaceTower } from './placeTower';
import { Grid } from '../../grid/grid';
import { Towers } from '../sotre/towers';
import { renderGrid } from '../../grid/services/renderGrid';
import { generateGrid } from '../../helpers/grid';
import { InvalidLocationError } from '../../exceptions/InvalidLocationError';
import { PathPlacement } from '../../grid/placement/pathPlacement';


describe('place a tower command', () => {
    test('successfully place a tower', () => {
        const tower = new Tower(1, { col: 0, row: 1 })
        const action = new PlaceTower(tower)
        action.handle()

        const towers = Towers.getInstance()
        let actual = towers.all()
        let expected = [tower]

        expect(actual).toStrictEqual(expected)
    })

    // test('tower is rendered on the grid', () => {
    //     const tower = new Tower(1, { col: 0, row: 1 })
    //     const action = new PlaceTower(tower)
    //     action.handle()

    //     // tower should be present on the grid
    //     let actual = document.getElementById("tower1")
    //     expect(actual).toBeInstanceOf(HTMLDivElement)
    // })

    test('add tower onto a square occupied by a path', () => {
        const path = new PathPlacement()
        path.add(0, 0)

        const grid = Grid.getInstance()
        grid.setPath(path)

        const tower = new Tower(1, { col: 0, row: 0 })
        const action = new PlaceTower(tower)

        expect(() => action.handle()).toThrow(InvalidLocationError)
        expect(() => action.handle()).toThrow("Location is taken by a path")
    })

    test('add tower onto a square occupied by another tower', () => {
        const tower = new Tower(1, { col: 0, row: 1 });
        const action = new PlaceTower(tower)
        action.handle()

        expect(() => action.handle()).toThrow(InvalidLocationError)
        expect(() => action.handle()).toThrow("Location is taken by a tower")
    })

    beforeEach(() => {
        renderGrid(generateGrid(5, 5))

        const grid = Grid.getInstance()
        grid.setPath(new PathPlacement())

        Towers.deleteInstance()
    });
})