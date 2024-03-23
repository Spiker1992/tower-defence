import { Enemy } from "./entities/enemy";
import { Tower } from "./entities/tower";
import { TowerShooting } from "./services/towerShooting";


// window.addEventListener("enemyMoved", event => console.log("enemy moved", event.detail));

let paths = []
let enemySpatialGrid = []
window.addEventListener("path-set", event => {
    paths = event.detail.paths
    enemySpatialGrid = []
  paths.forEach(path => {
    console.log(path)
    const key = `${path.row}${path.col}`
    enemySpatialGrid[key] = []
  });
})

window.addEventListener("towerReloading", event => {
    console.log("reloading", event.detail) 
});

function isSquareOverlappingCircle(squareX, squareY, squareSideLength, circleX, circleY, circleRadius) {
    // Calculate the square's corners
    const topLeftX = squareX;
    const topLeftY = squareY;
    const bottomRightX = squareX + squareSideLength;
    const bottomRightY = squareY + squareSideLength;
    console.log(topLeftX, topLeftY, bottomRightX, bottomRightY)
    console.log(circleX, circleY, circleRadius)
    // Check if any corner of the square is inside the circle
    const isTopLeftInside = isPointInsideCircle(topLeftX, topLeftY, circleX, circleY, circleRadius);
    const isTopRightInside = isPointInsideCircle(bottomRightX, topLeftY, circleX, circleY, circleRadius);
    const isBottomLeftInside = isPointInsideCircle(topLeftX, bottomRightY, circleX, circleY, circleRadius);
    const isBottomRightInside = isPointInsideCircle(bottomRightX, bottomRightY, circleX, circleY, circleRadius);
  
    // Alternatively, check if the circle center is inside the square
    const isCenterInside = circleX >= topLeftX && circleX <= bottomRightX && circleY >= topLeftY && circleY <= bottomRightY;
  
    // If any corner or the center is inside, there's overlap
    return isTopLeftInside || isTopRightInside || isBottomLeftInside || isBottomRightInside || isCenterInside;
  }
  
  // Helper function to check if a point is inside a circle
  function isPointInsideCircle(pointX, pointY, circleX, circleY, circleRadius) {
    const distanceX = pointX - circleX;
    const distanceY = pointY - circleY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    return distanceSquared <= circleRadius * circleRadius;
  }
  
  function enemyInRange(tower: Tower, enemy, enemy_size = null) {
    const  square_size = 50
    const tower_centre = {
      x: (tower.getCoords().row * square_size) + square_size/2, 
      y: (tower.getCoords().col * square_size) + square_size/2, 
    }
    const tower_range = tower.getRange() + tower.getSize()
    
    enemy_size = enemy_size || square_size
    const square = {
      x: (enemy.row * square_size),
      y: (enemy.col * square_size) + square_size,
    }
    console.log(square, tower_centre)
    return isSquareOverlappingCircle(square.x, square.y, enemy_size, tower_centre.x, tower_centre.y, tower_range)
  }
  
  const spatialGrid = []
  const towerCoverage = []
  
  window.addEventListener("towerAdded", event => {
      const tower: Tower = event.detail.tower
  
     
      towerCoverage[tower.getId()] = []
      
      paths.forEach(element => {
          
          
          const result = enemyInRange(tower, element)
  
          if (result) {
            const key = `${element.row}${element.col}`
            if (!Boolean(spatialGrid[key])) spatialGrid[key] = []
  
            spatialGrid[key].push(tower)
            towerCoverage[tower.getId()].push(key)
          }
          console.log(result)
      });
  
      console.log(spatialGrid)
      tower.towerReady()
  });
  
  
  window.addEventListener("enemyMoved", event => {
    const enemy: Enemy = event.detail.enemy
  
    console.log(enemy)
    let key;
    if (enemy.getPosition()) {
       key = `${enemy.getPosition().row}${enemy.getPosition().col}`
      enemySpatialGrid[key][enemy.id] = enemy
    }
  
    if (enemy.getPrevPosition()) {
       key = `${enemy.getPrevPosition().row}${enemy.getPrevPosition().col}`
      enemySpatialGrid[key][enemy.id] = false
      delete enemySpatialGrid[key][enemy.id]
    }
  
    console.log("matching towers", spatialGrid[key])
    if (!Boolean(spatialGrid[key])) return 
  
    spatialGrid[key].forEach(tower => {
      if (tower.canShoot && enemyInRange(tower, enemy.getPosition(), enemy.size)) {
        TowerShooting.attackEnemy(tower, enemy)
        console.log("attack enemy moved")
      }
    }) 
  });
  
  window.addEventListener("towerReloaded", event => {
    console.log("reloaded", event.detail)
    const tower: Tower = event.detail.tower
    
    towerCoverage[tower.getId()].forEach(key => {
      const enemies = enemySpatialGrid[key]
      console.log(enemySpatialGrid)
      enemies.forEach(enemy => {
        if (enemy.element) console.log(enemy.element, enemyInRange(tower, enemy.getPosition(), enemy.size))
        if (enemy.element && enemyInRange(tower, enemy.getPosition(), enemy.size)) {
          console.log("attack")
          TowerShooting.attackEnemy(tower, enemy) 
          return
        }
      })
    })
    
  });