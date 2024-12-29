import { Enemy } from "../enemy/enemy";
import { Tower } from "../tower/tower";
import { CELL_SIZE } from "./constants";
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


export function getTowerCenter(tower: Tower, square_size: number = CELL_SIZE): Coordinate {
  return {
    col: (tower.getCoords().col * square_size) + square_size / 2,
    row: (tower.getCoords().row * square_size) + square_size / 2,
  }
}

export function getTowerRange(tower: Tower): number {
  return tower.getRange() + tower.getSize()
}

export function getGridSquareToCoordinates(coordinate: Coordinate, square_size: number = CELL_SIZE): Coordinate[] {
  return buildBoxFromCoordinates({ col: coordinate.col * square_size, row: coordinate.row * square_size }, square_size)
}

export function buildBoxFromCoordinates(enemy: Coordinate, square_size: number = CELL_SIZE): Coordinate[] {
  const square_top_left = {
    col: (enemy.col) * square_size,
    row: (enemy.row) * square_size,
  }
  const square_bottom_right = {
    col: (enemy.col) + square_size,
    row: (enemy.row) + square_size,
  }

  return [
    square_top_left,
    square_bottom_right
  ]


}

export function enemyInRange(tower: Tower, square_size: number = CELL_SIZE, enemy: Coordinate, enemy_size = null, boundary_box: DOMRectReadOnly) {
  const tower_centre = getTowerCenter(tower, square_size)
  const tower_range = getTowerRange(tower)

  enemy_size = enemy_size || square_size
  const enemy_coords = buildBoxFromCoordinates(enemy, square_size)

  const tower_center = computeCellCenter(tower.getCoords().row, tower.getCoords().col, CELL_SIZE)
  const circle = { row: tower_center.row, col: tower_center.col, radius: tower.getRange() + tower.getSize() };


  // const rectangle = computeEnemyDimensions(enemy.col, enemy.row, square_size)
  const rectangle = [{
    row: boundary_box.top,
    col: boundary_box.left
  }, {
    row: boundary_box.bottom,
    col: boundary_box.right
  }]
  console.log(isRectangleWithinRange(circle, rectangle), circle, "ENEMY",  enemy.row, enemy.col, rectangle[0], rectangle[1])
  return isRectangleWithinRange(circle, rectangle)

  return checkOverlap(tower_range, tower_centre.col, tower_centre.row, enemy_coords[0].col, enemy_coords[0].row, enemy_coords[1].col, enemy_coords[1].row)
}

function isRectangleWithinRange(circle, rectangle) {
  const cx = circle["row"];
  const cy = circle["col"];
  const r = circle["radius"];

  // Check each side of the rectangle
  const sides = computeAllSidesInASquare(rectangle);

  for (const side of sides) {
    const closestPoint = getClosestPointOnLine(
      side["start"]["row"],
      side["start"]["col"],
      side["end"]["row"],
      side["end"]["col"],
      cx,
      cy
    );

    const distance = Math.sqrt((closestPoint.x - cx) ** 2 + (closestPoint.y - cy) ** 2);
    console.log(distance, r, side["start"]["row"],
      side["start"]["col"],
      side["end"]["row"],
      side["end"]["col"])
    if (distance <= r) {
      return true; // A side is partially within the circle
    }
  }

  return false; // No side is partially within the circle
}

// Helper function: Find the closest point on a line segment to a given point
function getClosestPointOnLine(x1, y1, x2, y2, px, py) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = dx ** 2 + dy ** 2;

  // Project point onto line segment, clamping t to [0, 1]
  let t = ((px - x1) * dx + (py - y1) * dy) / lengthSquared;
  t = Math.max(0, Math.min(1, t));

  return { x: x1 + t * dx, y: y1 + t * dy };
}

// we have a grid 5x5

// tower is at 0,3 row 0 col 3 - 0-indexed
// we need to expand the grid cell by x size. x would be 5.
// 0, 0 = this cell would have box with the following points: (0, 0) - (4, 4)
// 0, 3 = this cell would have box with the following points: (0, 15) - (4, 19)
// 1, 3 = this cell would have box with the following points: (5, 15) - (9, 19)
// formula is (x * size, y * size) - (x * size + size - 1, y * size + size - 1)
// center point within that cell would be (x * size + size / 2, y * size + size / 2)
// so, when tower is at 0, 3 and size is 5 then the cell size should be (0, 15) - (4, 19)
// and the center point would be (2.5, 17.5)

function computeCellDimensions(row, col, size) {
  return [
    {
      row: row * size,
      col: col * size
    },
    {
      row: row * size + size - 1,
      col: col * size + size - 1
    }
  ];
}

function computeCellCenter(row, col, size) {
  return {
    row: row * size + size / 2,
    col: col * size + size / 2,
  }
}

// enemy

// if enemy has it's center at 7.5, 17.5 whilst being of size 2
// then coords should be 6.5, 16.5 and 8.5, 18.5
// top_left[row], top_left[col] and bottom_right[row], top_left[col] top line
// top_left[row], bottom_right[col] and bottom_right[row], bottom_right[col] bottom line
// top_left[row] top_left[col] and top_left[row], bottom_right[col] left line
// bottom_right[row] top_left[col] and bottom_right[row], bottom_right[col] right line
function computeEnemyDimensions(row, col, size) {
  return [
    {
      row: row - size / 2,
      col: col - size / 2,
    },
    {
      row: row + size / 2,
      col: col + size / 2,
    }
  ]
}


function computeAllSidesInASquare(points) {
  const top_left = points[0]
  const bottom_right = points[1]

  return [
    { // top
      "start": {
        row: top_left["row"],
        col: top_left["col"]
      },
      "end": { row: top_left["row"], col: bottom_right["col"] }
    },
    { // bottom
      "start": { row: bottom_right["row"], col: top_left["col"] },
      "end": { row: bottom_right["row"], col: bottom_right["col"] }
    },
    { // left
      "start": { row: top_left["row"], col: top_left["col"] },
      "end": { row: bottom_right["row"], col: top_left["col"] }
    },
    { // right
      "start": { row: top_left["row"], col: bottom_right["col"] },
      "end": { row: bottom_right["row"], col: bottom_right["col"] }
    },
  ]
}