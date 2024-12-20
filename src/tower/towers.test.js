/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, test } from '@jest/globals';
import { Tower } from "./tower"
import { TinyEnemy } from "../enemy/enemies/tinyEnemy";
import { Enemies } from "../enemy/store/enemies";



function triggerEnemyMovedEvent(enemy) {
    const enemyMoved = new CustomEvent("enemyMoved", {
        detail: {
          enemy: enemy,
        },
    });
    window.dispatchEvent(enemyMoved);
}

function triggerEnemyRemovedEvent(enemy) {
    const event = new CustomEvent("enemyRemoved", {
        detail: {
          enemy: enemy,
        },
    });
    window.dispatchEvent(event);
}

describe('Handling enemyMoved event', () => {

    it('should add an enemy to the tower when enemy is within range', () => {
        const tower = new Tower(1, { col: 0, row: 1 })
        const enemy = new TinyEnemy()
        enemy.currentPosition = { col: 0, row: 1 }

        triggerEnemyMovedEvent(enemy)

        expect(tower.enemies.length()).toStrictEqual(1)
    }
    )

    it('dont add enemy which is out of range', () => {
        const tower = new Tower(1, { col: 0, row: 1 })
        const enemy = new TinyEnemy()
        enemy.currentPosition = { col: 0, row: 99 }

        triggerEnemyMovedEvent(enemy)

        expect(tower.enemies.length()).toStrictEqual(0)
    }
    )

    it('remove existing enemy once no longer in the range', () => {
        const tower = new Tower(1, { col: 0, row: 1 })
        const enemy = new TinyEnemy()
        enemy.currentPosition = { col: 0, row: 1 }
        triggerEnemyMovedEvent(enemy)

        expect(tower.enemies.length()).toStrictEqual(1)
        enemy.currentPosition = { col: 0, row: 99 }
        triggerEnemyMovedEvent(enemy)

        expect(tower.enemies.length()).toStrictEqual(0)
    }
    )

})

describe('Handling enemyRemoved event', () => {
    it('should remove an enemy from the tower when enemy is removed', () => {
        const tower = new Tower(1, { col: 0, row: 1 })
        const enemy = new TinyEnemy()
        enemy.currentPosition = { col: 0, row: 1 }
        triggerEnemyMovedEvent(enemy)
        expect(tower.enemies.length()).toStrictEqual(1)

        triggerEnemyRemovedEvent(enemy)
    })

    it('handle event by enemy that is not within towers visibility', async () => {
        const tower = new Tower(1, { col: 0, row: 1 })
        const enemy = new TinyEnemy()

        jest.spyOn(console, 'error').mockImplementation((error) => {
            expect(error).toBeFalsy();
        });
       
        triggerEnemyRemovedEvent(enemy)
    })
})

describe('Enemies updated', () => {
    jest.useFakeTimers()

    it("when enemies are updated, the tower should shoot", () => {
        const tower = new Tower(1, { col: 0, row: 1 })
        tower.reloaded()
        const enemy = new TinyEnemy()
        Enemies.getInstance().add(enemy)
        enemy.currentPosition = { col: 0, row: 1 }

        let eventtriggered = false 

        window.addEventListener("towerReloading", event => {
            eventtriggered = true
        })

        triggerEnemyMovedEvent(enemy)

        expect(eventtriggered).toStrictEqual(true)
        
    })
})