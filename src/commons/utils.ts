import { Enemy } from "../enemy/enemy";
import { Tower } from "../tower/tower";
import { Coordinate } from "./interfaces";

// Function to calculate the minimum distance between a point and a projected point on a line segment
function calculateMinDistance(lesserCoordinate: number, greaterCoordinate: number, pointCoordinate: number): number {
  // If the point is between the coordinates, distance is zero (point is within the line segment)
  if (pointCoordinate >= lesserCoordinate && pointCoordinate <= greaterCoordinate) {
      return 0;
  }
  // If point is before the start of the line segment, return the distance from start
  if (pointCoordinate < lesserCoordinate) {
      return lesserCoordinate - pointCoordinate;
  }
  // If point is after the end of the line segment, return the distance from the end
  return pointCoordinate - greaterCoordinate;
}

// Function to check if a circle overlaps with an axis-aligned rectangle
export function checkOverlap(
  radius: number,          // Circle's radius
  circleXCenter: number,   // Circle's X-coordinate center
  circleYCenter: number,   // Circle's Y-coordinate center
  rectX1: number,          // Rectangle's top-left X-coordinate
  rectY1: number,          // Rectangle's top-left Y-coordinate
  rectX2: number,          // Rectangle's bottom-right X-coordinate
  rectY2: number           // Rectangle's bottom-right Y-coordinate
): boolean {
  // Calculate the distance from the circle's center to the closest point on the X-axis of the rectangle
  const deltaX = calculateMinDistance(rectX1, rectX2, circleXCenter);
  // Calculate the distance from the circle's center to the closest point on the Y-axis of the rectangle
  const deltaY = calculateMinDistance(rectY1, rectY2, circleYCenter);
  // Check if the square of the distances is less than or equal to the square of the radius
  // If this condition is true, the circle and rectangle overlap
  return deltaX * deltaX + deltaY * deltaY <= radius * radius;
}
  
 
export function getTowerCenter(tower: Tower, square_size: number = 50): Coordinate {
  return {
    col: (tower.getCoords().col * square_size) + square_size/2, 
    row: (tower.getCoords().row * square_size) + square_size/2, 
  }
}

export function getTowerRange(tower: Tower): number {
  return tower.getRange() + tower.getSize()
}

export function getGridSquareCoordinates(coordinate: Coordinate, square_size: number = 50): Coordinate[] {
  const square_top_left = {
    col: (coordinate.col * square_size), 
    row: (coordinate.row * square_size),
  }
  const square_bottom_right = {
    col: (coordinate.col * square_size) +  square_size, 
    row: (coordinate.row * square_size) +  square_size,
  }

  return [
    square_top_left,
    square_bottom_right
  ]
}
  
export function enemyInRange(tower: Tower, enemy: Coordinate, enemy_size = null) {
  const square_size = 50
  const tower_centre = getTowerCenter(tower, square_size)
  const tower_range = getTowerRange(tower)
  
  enemy_size = enemy_size || square_size
  const enemy_coords = getGridSquareCoordinates(enemy, enemy_size)

  return checkOverlap(tower_range, tower_centre.col, tower_centre.row, enemy_coords[0].col, enemy_coords[0].row, enemy_coords[1].col, enemy_coords[1].row)
}