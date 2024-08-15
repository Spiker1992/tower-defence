import { describe, expect, test } from '@jest/globals';
import { Tower } from "../../entities/tower"
import { Towers } from "./towers"


describe('tower management', () => {
    test('list towers', () => {
        const instance = new Towers()
        const tower1 = new Tower(1)
        const tower2 = new Tower(2)
        const tower3 = new Tower(3)
        instance.add(tower1)
        instance.add(tower2)
        instance.add(tower3)

        const expected = [tower1, tower2, tower3]
        const actual = instance.all()
        
        expect(actual).toStrictEqual(expected)
    })
    test('add a tower', () => {
        const instance = new Towers()
        const tower = new Tower(1)
        instance.add(tower)

        const expected = [tower]
        const actual = instance.all()
        
        expect(actual).toStrictEqual(expected)
    })

    test('remove a tower', () => {
        const instance = new Towers()
        const tower1 = new Tower(1)
        const tower2 = new Tower(2)
        const tower3 = new Tower(3)
        instance.add(tower1)
        instance.add(tower2)
        instance.add(tower3)

        instance.remove(tower2)

        const expected = [tower1, tower3]
        const actual = instance.all()
        
        expect(actual).toStrictEqual(expected)
    })

    test('has a tower', () => {
        const instance = new Towers()
        const tower1 = new Tower(1, { col: 0, row: 1 })
        const tower2 = new Tower(2, { col: 0, row: 2 })
        const tower3 = new Tower(3, { col: 0, row: 3 })
        instance.add(tower1)
        instance.add(tower2)
        instance.add(tower3)

        expect(instance.has(0, 1)).toStrictEqual(true)
        expect(instance.has(0, 4)).toStrictEqual(false)
    })
})