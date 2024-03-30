import { Tower } from "../tower/tower";

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
  
  export function enemyInRange(tower: Tower, enemy, enemy_size = null) {
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