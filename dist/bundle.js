/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/commons/constants.ts":
/*!**********************************!*\
  !*** ./src/commons/constants.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ENEMY_MARKER: () => (/* binding */ ENEMY_MARKER),\n/* harmony export */   PATH_MARKER: () => (/* binding */ PATH_MARKER),\n/* harmony export */   TOWER_MARKER: () => (/* binding */ TOWER_MARKER)\n/* harmony export */ });\nconst PATH_MARKER = \"Path\";\nconst ENEMY_MARKER = \"E\";\nconst TOWER_MARKER = \"T\";\n\n\n//# sourceURL=webpack:///./src/commons/constants.ts?");

/***/ }),

/***/ "./src/commons/eventListeners.ts":
/*!***************************************!*\
  !*** ./src/commons/eventListeners.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../grid/grid */ \"./src/grid/grid.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/commons/utils.ts\");\n/* harmony import */ var _grid_commands_renderTower__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../grid/commands/renderTower */ \"./src/grid/commands/renderTower.ts\");\n/* harmony import */ var _maxHeap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./maxHeap */ \"./src/commons/maxHeap.ts\");\n\n\n\n\nlet enemySpatialGrid = [];\nlet towerSpatialGrid = [];\nlet towerCoverage = [];\nconst enemies_on_the_map = new _maxHeap__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nwindow.addEventListener(\"towerWasPlaced\", event => {\n    console.log(\"Tower was placed\", event.detail.tower);\n    const tower = event.detail.tower;\n    (0,_grid_commands_renderTower__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(tower);\n});\nfunction getCoordsHash(coord) {\n    return `${coord.row}${coord.col}`;\n}\nwindow.addEventListener(\"path-set\", event => {\n    createSpatialGrids(event.detail.paths);\n});\nwindow.addEventListener(\"towerWasPlaced\", event => {\n    const tower = event.detail.tower;\n    addTowerToTheStore(tower);\n    tower.reload();\n});\nwindow.addEventListener(\"towerReloaded\", event => {\n    findEnemiesToAttack(event.detail.tower);\n});\nwindow.addEventListener(\"enemyMoved\", event => {\n    const enemy = event.detail.enemy;\n    updateAvailableEnemyStore(enemy);\n    notifiyTowers(enemy);\n});\nwindow.addEventListener(\"enemyRemoved\", event => {\n    const enemy = event.detail.enemy;\n    enemies_on_the_map.deleteEnemy(enemy.id);\n});\nfunction createSpatialGrids(paths) {\n    enemySpatialGrid = [];\n    towerSpatialGrid = [];\n    paths.forEach(path => {\n        const gridKey = getCoordsHash(path);\n        enemySpatialGrid[gridKey] = [];\n        towerSpatialGrid[gridKey] = [];\n    });\n}\nfunction addTowerToTheStore(tower) {\n    towerCoverage[tower.getId()] = [];\n    const grid = _grid_grid__WEBPACK_IMPORTED_MODULE_0__.Grid.getInstance();\n    grid.path.all().forEach(path => {\n        const result = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.enemyInRange)(tower, 50, path);\n        if (!result)\n            return;\n        const positionHash = getCoordsHash(path);\n        towerSpatialGrid[positionHash].push(tower);\n        towerCoverage[tower.getId()].push(positionHash);\n    });\n}\nfunction findEnemiesToAttack(tower) {\n    const currentCoverage = towerCoverage[tower.getId()];\n    currentCoverage.some(positionHash => {\n        const enemiesInTheSquare = enemySpatialGrid[positionHash];\n        return enemiesInTheSquare.some(enemy => {\n            return tower.attack(enemy);\n        });\n    });\n}\nfunction notifiyTowers(enemy) {\n    if (!enemy.getPosition())\n        return;\n    const positionHash = getCoordsHash(enemy.getPosition());\n    const towersWithinRange = towerSpatialGrid[positionHash];\n    if (!!towersWithinRange === false)\n        return;\n    towersWithinRange.forEach(tower => {\n        tower.attack(enemy);\n    });\n}\nfunction updateAvailableEnemyStore(enemy) {\n    enemies_on_the_map.insertOrUpdate(enemy.id, enemy.distanceTraveled);\n    console.log(\"Enemies on the map\", enemies_on_the_map);\n    if (enemy.getPrevPosition()) {\n        const prev_position_key = `${enemy.getPrevPosition().row}${enemy.getPrevPosition().col}`;\n        enemySpatialGrid[prev_position_key][enemy.id] = false;\n        delete enemySpatialGrid[prev_position_key][enemy.id];\n    }\n    if (enemy.getPosition()) {\n        const current_position_key = `${enemy.getPosition().row}${enemy.getPosition().col}`;\n        enemySpatialGrid[current_position_key][enemy.id] = enemy;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/commons/eventListeners.ts?");

/***/ }),

/***/ "./src/commons/maxHeap.ts":
/*!********************************!*\
  !*** ./src/commons/maxHeap.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass MaxHeap {\n    constructor() {\n        this.heap = [];\n        this.positions = {};\n        this.heap = [];\n        this.positions = {};\n    }\n    peak() {\n        return this.heap[0];\n    }\n    length() {\n        return this.heap.length;\n    }\n    pop() {\n        const enemy_id = this.peak()[0];\n        return this.deleteEnemy(enemy_id);\n    }\n    deleteAtIndex(index) {\n        this.swap(index, this.length() - 1);\n        const result = this.heap.pop();\n        delete this.positions[result[0]];\n        this.bubbleDown(index);\n        return result[0];\n    }\n    deleteEnemy(enemy_id) {\n        const index = this.positions[enemy_id];\n        return this.deleteAtIndex(index);\n    }\n    bubbleDown(index) {\n        while (index < this.length()) {\n            const leftChildIndex = 2 * index + 1;\n            const rightChildIndex = 2 * index + 2;\n            const leftVal = this.heap[leftChildIndex] ? this.heap[leftChildIndex][1] : -Infinity;\n            const rightVal = this.heap[rightChildIndex] ? this.heap[rightChildIndex][1] : -Infinity;\n            const targetIndex = leftVal > rightVal ? leftChildIndex : rightChildIndex;\n            const target = this.heap[targetIndex];\n            if (target && target[1] > this.heap[index][1]) {\n                this.swap(targetIndex, index);\n                index = targetIndex;\n            }\n            else {\n                break;\n            }\n        }\n    }\n    insertOrUpdate(enemy_id, distanceTraveled) {\n        const id = enemy_id;\n        if (id in this.positions) {\n            const index = this.positions[id];\n            this.heap[index] = [enemy_id, distanceTraveled];\n            this.bubbleUp(index);\n        }\n        else {\n            const array_length = this.heap.push([enemy_id, distanceTraveled]);\n            const index = array_length - 1;\n            this.positions[id] = index;\n            this.bubbleUp(index);\n        }\n    }\n    bubbleUp(index) {\n        while (index > 0) {\n            const parentIndex = Math.floor((index - 1) / 2);\n            if (this.heap[parentIndex][1] < this.heap[index][1]) {\n                this.swap(parentIndex, index);\n                index = parentIndex;\n            }\n            else {\n                break;\n            }\n        }\n    }\n    swap(index1, index2) {\n        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];\n        this.positions[this.heap[index2][0]] = index2;\n        this.positions[this.heap[index1][0]] = index1;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MaxHeap);\n\n\n//# sourceURL=webpack:///./src/commons/maxHeap.ts?");

/***/ }),

/***/ "./src/commons/utils.ts":
/*!******************************!*\
  !*** ./src/commons/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildBoxFromCoordinates: () => (/* binding */ buildBoxFromCoordinates),\n/* harmony export */   checkOverlap: () => (/* binding */ checkOverlap),\n/* harmony export */   enemyInRange: () => (/* binding */ enemyInRange),\n/* harmony export */   getGridSquareToCoordinates: () => (/* binding */ getGridSquareToCoordinates),\n/* harmony export */   getTowerCenter: () => (/* binding */ getTowerCenter),\n/* harmony export */   getTowerRange: () => (/* binding */ getTowerRange)\n/* harmony export */ });\n// Function to calculate the minimum distance between a point and a projected point on a line segment\nfunction calculateMinDistance(lesserCoordinate, greaterCoordinate, pointCoordinate) {\n    // If the point is between the coordinates, distance is zero (point is within the line segment)\n    if (pointCoordinate >= lesserCoordinate && pointCoordinate <= greaterCoordinate) {\n        return 0;\n    }\n    // If point is before the start of the line segment, return the distance from start\n    if (pointCoordinate < lesserCoordinate) {\n        return lesserCoordinate - pointCoordinate;\n    }\n    // If point is after the end of the line segment, return the distance from the end\n    return pointCoordinate - greaterCoordinate;\n}\n// Function to check if a circle overlaps with an axis-aligned rectangle\nfunction checkOverlap(radius, // Circle's radius\ncircleXCenter, // Circle's X-coordinate center\ncircleYCenter, // Circle's Y-coordinate center\nrectX1, // Rectangle's top-left X-coordinate\nrectY1, // Rectangle's top-left Y-coordinate\nrectX2, // Rectangle's bottom-right X-coordinate\nrectY2 // Rectangle's bottom-right Y-coordinate\n) {\n    // Calculate the distance from the circle's center to the closest point on the X-axis of the rectangle\n    const deltaX = calculateMinDistance(rectX1, rectX2, circleXCenter);\n    // Calculate the distance from the circle's center to the closest point on the Y-axis of the rectangle\n    const deltaY = calculateMinDistance(rectY1, rectY2, circleYCenter);\n    // Check if the square of the distances is less than or equal to the square of the radius\n    // If this condition is true, the circle and rectangle overlap\n    return deltaX * deltaX + deltaY * deltaY <= radius * radius;\n}\nfunction getTowerCenter(tower, square_size = 50) {\n    return {\n        col: (tower.getCoords().col * square_size) + square_size / 2,\n        row: (tower.getCoords().row * square_size) + square_size / 2,\n    };\n}\nfunction getTowerRange(tower) {\n    return tower.getRange() + tower.getSize();\n}\nfunction getGridSquareToCoordinates(coordinate, square_size = 50) {\n    return buildBoxFromCoordinates({ col: coordinate.col * square_size, row: coordinate.row * square_size }, square_size);\n}\nfunction buildBoxFromCoordinates(enemy, square_size = 50) {\n    const square_top_left = {\n        col: (enemy.col) * square_size,\n        row: (enemy.row) * square_size,\n    };\n    const square_bottom_right = {\n        col: (enemy.col) + square_size,\n        row: (enemy.row) + square_size,\n    };\n    return [\n        square_top_left,\n        square_bottom_right\n    ];\n}\nfunction enemyInRange(tower, square_size = 50, enemy, enemy_size = null) {\n    const tower_centre = getTowerCenter(tower, square_size);\n    const tower_range = getTowerRange(tower);\n    enemy_size = enemy_size || square_size;\n    const enemy_coords = buildBoxFromCoordinates(enemy, square_size);\n    return checkOverlap(tower_range, tower_centre.col, tower_centre.row, enemy_coords[0].col, enemy_coords[0].row, enemy_coords[1].col, enemy_coords[1].row);\n}\n\n\n//# sourceURL=webpack:///./src/commons/utils.ts?");

/***/ }),

/***/ "./src/enemy/enemies/beastEnemy.ts":
/*!*****************************************!*\
  !*** ./src/enemy/enemies/beastEnemy.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BeastEnemy: () => (/* binding */ BeastEnemy)\n/* harmony export */ });\n/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enemy */ \"./src/enemy/enemy.ts\");\n\nclass BeastEnemy extends _enemy__WEBPACK_IMPORTED_MODULE_0__.Enemy {\n    constructor() {\n        super(...arguments);\n        this.speed = 1000;\n        this.life = 200;\n        this.size = 30;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/enemies/beastEnemy.ts?");

/***/ }),

/***/ "./src/enemy/enemies/tinyEnemy.ts":
/*!****************************************!*\
  !*** ./src/enemy/enemies/tinyEnemy.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TinyEnemy: () => (/* binding */ TinyEnemy)\n/* harmony export */ });\n/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enemy */ \"./src/enemy/enemy.ts\");\n\nclass TinyEnemy extends _enemy__WEBPACK_IMPORTED_MODULE_0__.Enemy {\n    constructor() {\n        super(...arguments);\n        this.speed = 3000;\n        this.life = 200;\n        this.size = 10;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/enemies/tinyEnemy.ts?");

/***/ }),

/***/ "./src/enemy/enemy.ts":
/*!****************************!*\
  !*** ./src/enemy/enemy.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Enemy: () => (/* binding */ Enemy)\n/* harmony export */ });\nclass Enemy {\n    constructor(path, id) {\n        this.speed = 1000;\n        this.distanceTraveled = 0;\n        this.size = 20;\n        this.life = 2;\n        this.path = path;\n        this.prevPosition = null;\n        this.currentPosition = null;\n        this.id = id;\n    }\n    reduceLife(damage) {\n        this.life -= damage;\n        console.log(this);\n        if (this.life <= 0) {\n            this.remove();\n        }\n    }\n    remove() {\n        this.element.remove();\n        const event = new CustomEvent(\"enemyRemoved\", {\n            detail: {\n                enemy: this,\n            },\n        });\n        window.dispatchEvent(event);\n    }\n    isDead() {\n        return !this.life;\n    }\n    move() {\n        const max = (this.speed / 500);\n        let step = 1;\n        const notification = setInterval(() => {\n            if (step > max) {\n                clearInterval(notification);\n                return;\n            }\n            this.distanceTraveled += 500 / max;\n            const enemyMoved = new CustomEvent(\"enemyMoved\", {\n                detail: {\n                    enemy: this,\n                },\n            });\n            window.dispatchEvent(enemyMoved);\n            step += 1;\n        }, 500);\n        this.prevPosition = this.currentPosition;\n        this.currentPosition = this.path.shift();\n    }\n    getPrevPosition() {\n        return this.prevPosition;\n    }\n    getNextPosition() {\n        return this.path[0];\n    }\n    getPosition() {\n        return this.currentPosition;\n    }\n    setDomElement(element) {\n        this.element = element;\n        window.dispatchEvent(new CustomEvent(\"enemySpawned\", { detail: this }));\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/enemy.ts?");

/***/ }),

/***/ "./src/enemy/services/EnemySpawner.ts":
/*!********************************************!*\
  !*** ./src/enemy/services/EnemySpawner.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnemySpawner: () => (/* binding */ EnemySpawner)\n/* harmony export */ });\n/* harmony import */ var _moveEnemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moveEnemy */ \"./src/enemy/services/moveEnemy.ts\");\n\nclass EnemySpawner {\n    constructor(enemySpec, spawnSpeed, path) {\n        this.enemySpec = enemySpec;\n        this.spawnSpeed = spawnSpeed;\n        this.path = path;\n    }\n    startSpawning() {\n        let enemyId = 1;\n        let index = 0;\n        let spawnedEnemyCount = 0;\n        console.log(\"Start spawning enemies\");\n        const movement = setInterval(() => {\n            if (index >= this.enemySpec.length) {\n                clearInterval(movement);\n                console.log(\"Finished spawning enemies\");\n                return;\n            }\n            if (spawnedEnemyCount >= this.enemySpec[index][1]) {\n                spawnedEnemyCount = 0;\n                index += 1;\n                return;\n            }\n            const EnemyType = this.enemySpec[index][0];\n            const enemy = new EnemyType([...this.path], enemyId);\n            const moveEnemy = (new _moveEnemy__WEBPACK_IMPORTED_MODULE_0__.MoveEnemy(enemy));\n            moveEnemy.handle();\n            enemyId += 1;\n            spawnedEnemyCount += 1;\n        }, this.spawnSpeed);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/services/EnemySpawner.ts?");

/***/ }),

/***/ "./src/enemy/services/moveEnemy.ts":
/*!*****************************************!*\
  !*** ./src/enemy/services/moveEnemy.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MoveEnemy: () => (/* binding */ MoveEnemy)\n/* harmony export */ });\nclass MoveEnemy {\n    constructor(enemy) {\n        this.enemy = enemy;\n        this.speed = enemy.speed;\n        this.enemySize = enemy.size;\n    }\n    spawnEnemy() {\n        const targetCell = document.querySelector(`#gameTable .cell[row=\"0\"][col=\"0\"]`);\n        const { y } = this.getCenterPoint(targetCell);\n        const enemy = document.createElement(\"div\");\n        enemy.className = \"enemy\";\n        enemy.style.width = `${this.enemySize}px`;\n        enemy.style.height = `${this.enemySize}px`;\n        enemy.style.background = \"red\";\n        enemy.style.top = `-${this.enemySize}px`; // `${0-2.5}` /* Calculate the top position based on the grid cell */;\n        enemy.style.left = `${y}px`; // `${y-2.5}` /* Calculate the left position based on the grid cell */;\n        document.getElementById(\"grid\").appendChild(enemy);\n        this.enemyElement = enemy;\n        this.enemy.setDomElement(enemy);\n    }\n    handle() {\n        this.spawnEnemy();\n        this.movement = setInterval(() => {\n            this.enemy.move();\n            if (this.noMovesLeft()) {\n                this.lastMove();\n                return;\n            }\n            this.completeMove();\n        }, this.speed);\n    }\n    completeMove() {\n        const enemyPosition = this.enemy.getPosition();\n        this.animateEnemy(this.enemyElement, enemyPosition.col, enemyPosition.row);\n    }\n    getCenterPoint(element) {\n        const { top, left, width, height } = element.getBoundingClientRect();\n        const centerX = left + ((width - 20) / 2);\n        const centerY = top + ((height - 20) / 2);\n        return { x: centerX, y: centerY };\n    }\n    animateEnemy(enemy, col, row) {\n        const targetCell = document.querySelector(`#gameTable .cell[row=\"${row}\"][col=\"${col}\"]`);\n        if (targetCell) {\n            const { x, y } = this.getCenterPoint(targetCell);\n            this.transformElement(enemy, x, y);\n        }\n    }\n    transformElement(enemy, x, y) {\n        const correctionLeft = (parseInt(enemy.style.left));\n        const speed = this.speed / 1000;\n        enemy.style.transition = `transform ${speed}s linear`;\n        enemy.style.transform = `translate(${x - correctionLeft}px, ${y + this.enemySize}px)`;\n    }\n    noMovesLeft() {\n        return !this.enemy.getPosition();\n    }\n    lastMove() {\n        const targetCell = document.querySelector(`#gameTable .cell[row=\"3\"][col=\"4\"]`);\n        const { right } = targetCell.getBoundingClientRect();\n        const { y } = this.getCenterPoint(targetCell);\n        this.transformElement(this.enemyElement, right + this.enemySize, y);\n        clearInterval(this.movement);\n        const deleteElement = setInterval(() => {\n            this.enemy.remove();\n            clearInterval(deleteElement);\n        }, this.speed);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/services/moveEnemy.ts?");

/***/ }),

/***/ "./src/exceptions/InvalidLocationError.ts":
/*!************************************************!*\
  !*** ./src/exceptions/InvalidLocationError.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InvalidLocationError: () => (/* binding */ InvalidLocationError)\n/* harmony export */ });\nclass InvalidLocationError extends Error {\n    constructor(message) {\n        super(message);\n        this.name = \"InvalidLocationError\";\n    }\n}\n\n\n//# sourceURL=webpack:///./src/exceptions/InvalidLocationError.ts?");

/***/ }),

/***/ "./src/grid/commands/renderTower.ts":
/*!******************************************!*\
  !*** ./src/grid/commands/renderTower.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ renderTower)\n/* harmony export */ });\n/* harmony import */ var _store_towers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/towers */ \"./src/grid/store/towers.ts\");\n/* harmony import */ var _helpers_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helpers/grid */ \"./src/helpers/grid.ts\");\n\n\nfunction renderTower(tower) {\n    const coords = tower.getCoords();\n    const targetCell = document.querySelector(`#gameTable .cell[row=\"${coords.row}\"][col=\"${coords.col}\"]`);\n    const { x, y } = (0,_helpers_grid__WEBPACK_IMPORTED_MODULE_1__.getCenterPoint)(targetCell);\n    const towerElement = document.createElement(\"div\");\n    const correction = tower.getSize() / 2;\n    towerElement.className = \"tower\";\n    towerElement.id = `tower${tower.getId()}`;\n    towerElement.style.top = `${y - correction}px`;\n    towerElement.style.left = `${x - correction}px`;\n    towerElement.style.outlineOffset = `${tower.getRange() - correction}px`;\n    document.getElementById(\"grid\").appendChild(towerElement);\n    const store = _store_towers__WEBPACK_IMPORTED_MODULE_0__.Towers.getInstance();\n    store.add(tower.getId(), towerElement);\n}\n\n\n//# sourceURL=webpack:///./src/grid/commands/renderTower.ts?");

/***/ }),

/***/ "./src/grid/grid.ts":
/*!**************************!*\
  !*** ./src/grid/grid.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Grid: () => (/* binding */ Grid)\n/* harmony export */ });\n/* harmony import */ var _helpers_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/grid */ \"./src/helpers/grid.ts\");\n\nclass Grid {\n    constructor() {\n        this.baseGrid = [];\n    }\n    static getInstance() {\n        if (!Grid.instance) {\n            Grid.instance = new Grid();\n        }\n        return Grid.instance;\n    }\n    static deleteInstance() {\n        Grid.instance = null;\n    }\n    generateGrid(numCols, numRows) {\n        this.baseGrid = (0,_helpers_grid__WEBPACK_IMPORTED_MODULE_0__.generateGrid)(numCols, numRows);\n    }\n    placeMarkers(grid, coords, marker) {\n        coords.forEach(function (coord) {\n            grid[coord.row][coord.col] = marker;\n        });\n    }\n    grid() {\n        var _a;\n        if (!this.baseGrid) {\n            throw new Error(\"Base Grid is not set\");\n        }\n        const temp = [...this.baseGrid];\n        if ((_a = this.path) === null || _a === void 0 ? void 0 : _a.all()) {\n            this.placeMarkers(temp, this.path.all(), this.path.MARKER);\n        }\n        // this.placeMarkers(temp, this.towers.all(), this.towers.MARKER)\n        // this.placeMarkers(temp, this.enemies.all(), this.enemies.MARKER)\n        return temp;\n    }\n    setPath(paths) {\n        this.path = paths;\n        window.dispatchEvent(new CustomEvent(\"path-set\", {\n            detail: {\n                paths: paths.all()\n            }\n        }));\n    }\n    setTowers(towers) {\n        this.towers = towers;\n    }\n    setEnemies(enemies) {\n        this.enemies = enemies;\n    }\n    getEnemies() {\n        return this.enemies;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/grid/grid.ts?");

/***/ }),

/***/ "./src/grid/levels/level1.ts":
/*!***********************************!*\
  !*** ./src/grid/levels/level1.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Level1: () => (/* binding */ Level1)\n/* harmony export */ });\n/* harmony import */ var _enemy_enemies_beastEnemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../enemy/enemies/beastEnemy */ \"./src/enemy/enemies/beastEnemy.ts\");\n/* harmony import */ var _enemy_enemies_tinyEnemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../enemy/enemies/tinyEnemy */ \"./src/enemy/enemies/tinyEnemy.ts\");\n/* harmony import */ var _placement_pathPlacement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../placement/pathPlacement */ \"./src/grid/placement/pathPlacement.ts\");\n\n\n\nclass Level1 extends _placement_pathPlacement__WEBPACK_IMPORTED_MODULE_2__.PathPlacement {\n    constructor() {\n        super(...arguments);\n        this.enemySpec = [\n            [_enemy_enemies_tinyEnemy__WEBPACK_IMPORTED_MODULE_1__.TinyEnemy, 1],\n            [_enemy_enemies_beastEnemy__WEBPACK_IMPORTED_MODULE_0__.BeastEnemy, 2],\n        ];\n    }\n    setupEnemyPath() {\n        this.add(0, 0);\n        this.add(1, 0);\n        this.add(1, 1);\n        this.add(1, 2);\n        this.add(1, 3);\n        this.add(2, 3);\n        this.add(3, 3);\n        this.add(3, 4);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/grid/levels/level1.ts?");

/***/ }),

/***/ "./src/grid/placement/pathPlacement.ts":
/*!*********************************************!*\
  !*** ./src/grid/placement/pathPlacement.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PathPlacement: () => (/* binding */ PathPlacement)\n/* harmony export */ });\n/* harmony import */ var _commons_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../commons/constants */ \"./src/commons/constants.ts\");\n/* harmony import */ var _placementManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./placementManager */ \"./src/grid/placement/placementManager.ts\");\n/* harmony import */ var _enemy_services_EnemySpawner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../enemy/services/EnemySpawner */ \"./src/enemy/services/EnemySpawner.ts\");\n\n\n\nclass PathPlacement extends _placementManager__WEBPACK_IMPORTED_MODULE_1__.PlacementManager {\n    constructor() {\n        super();\n        this.MARKER = _commons_constants__WEBPACK_IMPORTED_MODULE_0__.PATH_MARKER;\n        this.spawnSpeed = 1000;\n        this.enemySpec = [];\n        this.setupEnemyPath();\n    }\n    start() {\n        this.spawnEnemies();\n    }\n    spawnEnemies() {\n        const spawner = new _enemy_services_EnemySpawner__WEBPACK_IMPORTED_MODULE_2__.EnemySpawner(this.enemySpec, this.spawnSpeed, this.all());\n        spawner.startSpawning();\n    }\n}\n\n\n//# sourceURL=webpack:///./src/grid/placement/pathPlacement.ts?");

/***/ }),

/***/ "./src/grid/placement/placementManager.ts":
/*!************************************************!*\
  !*** ./src/grid/placement/placementManager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PlacementManager: () => (/* binding */ PlacementManager)\n/* harmony export */ });\nclass PlacementManager {\n    constructor() {\n        this.data = [];\n    }\n    add(row, col) {\n        this.data.push({ row: row, col: col });\n    }\n    has(col, row) {\n        return this.data.some((item) => {\n            return item.col === col && item.row === row;\n        });\n    }\n    remove(col, row) {\n        this.data = this.data.filter((item) => {\n            return item.col != col || item.row != row;\n        });\n    }\n    all() {\n        return this.data;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/grid/placement/placementManager.ts?");

/***/ }),

/***/ "./src/grid/services/renderGrid.ts":
/*!*****************************************!*\
  !*** ./src/grid/services/renderGrid.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   firstOrCreateGameTable: () => (/* binding */ firstOrCreateGameTable),\n/* harmony export */   firstOrCreateGrid: () => (/* binding */ firstOrCreateGrid),\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid)\n/* harmony export */ });\n/* harmony import */ var _tower_tower__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../tower/tower */ \"./src/tower/tower.ts\");\n/* harmony import */ var _tower_commands_placeTower__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tower/commands/placeTower */ \"./src/tower/commands/placeTower.ts\");\n\n\nfunction firstOrCreateGameTable() {\n    let gameTable = document.getElementById(\"#gameTable\");\n    if (!gameTable) {\n        gameTable = document.createElement(\"div\");\n        gameTable.id = \"gameTable\";\n        const bodyEle = document.getElementsByTagName(\"body\")[0];\n        bodyEle.appendChild(gameTable);\n    }\n    return gameTable;\n}\nfunction firstOrCreateGrid() {\n    const gameTable = firstOrCreateGameTable();\n    let gridEle = document.getElementById(\"#grid\");\n    if (!gridEle) {\n        gridEle = document.createElement(\"div\");\n        gridEle.id = \"grid\";\n        gameTable.appendChild(gridEle);\n    }\n    return gridEle;\n}\nfunction renderGrid(grid) {\n    const numRows = 5;\n    const numCols = 5;\n    const gridEle = firstOrCreateGrid();\n    gridEle.innerHTML = '';\n    for (let row = 0; row < numRows; row++) {\n        const newRow = document.createElement('tr');\n        for (let col = 0; col < numCols; col++) {\n            const newCell = document.createElement('td');\n            newCell.setAttribute(\"row\", `${row}`);\n            newCell.setAttribute(\"col\", `${col}`);\n            newCell.onclick = () => {\n                (new _tower_commands_placeTower__WEBPACK_IMPORTED_MODULE_1__.PlaceTower(new _tower_tower__WEBPACK_IMPORTED_MODULE_0__.Tower(parseInt(`${col}${row}`), { col: col, row: row }))).handle();\n            };\n            newCell.textContent = grid[row][col];\n            newCell.className = \"cell\";\n            newRow.appendChild(newCell);\n        }\n        gridEle.appendChild(newRow);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/grid/services/renderGrid.ts?");

/***/ }),

/***/ "./src/grid/store/towers.ts":
/*!**********************************!*\
  !*** ./src/grid/store/towers.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Towers: () => (/* binding */ Towers)\n/* harmony export */ });\nclass Towers {\n    constructor() {\n        this.data = [];\n    }\n    static getInstance() {\n        if (!Towers.instance) {\n            Towers.instance = new Towers();\n        }\n        return Towers.instance;\n    }\n    static deleteInstance() {\n        Towers.instance = null;\n    }\n    add(key, element) {\n        this.data[key] = element;\n    }\n    remove(key) {\n        delete this.data[key];\n    }\n    all() {\n        return this.data;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/grid/store/towers.ts?");

/***/ }),

/***/ "./src/helpers/grid.ts":
/*!*****************************!*\
  !*** ./src/helpers/grid.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateGrid: () => (/* binding */ generateGrid),\n/* harmony export */   getCenterPoint: () => (/* binding */ getCenterPoint)\n/* harmony export */ });\nfunction generateGrid(numCols, numRows) {\n    const grid = [];\n    for (let row = 0; row < numRows; row++) {\n        grid.push([]);\n        for (let col = 0; col < numCols; col++) {\n            grid[row].push('');\n        }\n    }\n    return grid;\n}\nfunction getCenterPoint(element) {\n    const { top, left, width, height } = element.getBoundingClientRect();\n    const centerX = left + ((width) / 2);\n    const centerY = top + ((height) / 2);\n    return { x: centerX, y: centerY };\n}\n\n\n//# sourceURL=webpack:///./src/helpers/grid.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid/grid */ \"./src/grid/grid.ts\");\n/* harmony import */ var _grid_services_renderGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid/services/renderGrid */ \"./src/grid/services/renderGrid.ts\");\n/* harmony import */ var _grid_levels_level1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid/levels/level1 */ \"./src/grid/levels/level1.ts\");\n/* harmony import */ var _commons_eventListeners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commons/eventListeners */ \"./src/commons/eventListeners.ts\");\n\n\n\n\n\nconst grid = _grid_grid__WEBPACK_IMPORTED_MODULE_0__.Grid.getInstance();\ngrid.generateGrid(5, 5);\nconst paths = new _grid_levels_level1__WEBPACK_IMPORTED_MODULE_2__.Level1();\ngrid.setPath(paths);\n(0,_grid_services_renderGrid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid.grid());\npaths.start();\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/tower/commands/placeTower.ts":
/*!******************************************!*\
  !*** ./src/tower/commands/placeTower.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PlaceTower: () => (/* binding */ PlaceTower)\n/* harmony export */ });\n/* harmony import */ var _exceptions_InvalidLocationError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../exceptions/InvalidLocationError */ \"./src/exceptions/InvalidLocationError.ts\");\n/* harmony import */ var _grid_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../grid/grid */ \"./src/grid/grid.ts\");\n/* harmony import */ var _store_towers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/towers */ \"./src/tower/store/towers.ts\");\n\n\n\nclass PlaceTower {\n    constructor(tower) {\n        this.tower = tower;\n    }\n    handle() {\n        console.log(\"Placing tower\");\n        this.isFreeCoordinate();\n        this.persistTower();\n        this.triggerEvent();\n    }\n    triggerEvent() {\n        const towerWasPlaced = new CustomEvent(\"towerWasPlaced\", {\n            detail: {\n                tower: this.tower,\n            }\n        });\n        window.dispatchEvent(towerWasPlaced);\n    }\n    persistTower() {\n        const store = _store_towers__WEBPACK_IMPORTED_MODULE_2__.Towers.getInstance();\n        store.add(this.tower);\n    }\n    isFreeCoordinate() {\n        this.coordTakenByPath();\n        this.coordTakenByTower();\n    }\n    coordTakenByPath() {\n        var _a;\n        const grid = _grid_grid__WEBPACK_IMPORTED_MODULE_1__.Grid.getInstance();\n        const coords = this.tower.getCoords();\n        if ((_a = grid.path) === null || _a === void 0 ? void 0 : _a.has(coords.col, coords.row)) {\n            throw new _exceptions_InvalidLocationError__WEBPACK_IMPORTED_MODULE_0__.InvalidLocationError(\"Location is taken by a path\");\n        }\n    }\n    coordTakenByTower() {\n        const towers = _store_towers__WEBPACK_IMPORTED_MODULE_2__.Towers.getInstance();\n        const coords = this.tower.getCoords();\n        if (towers.has(coords.col, coords.row)) {\n            throw new _exceptions_InvalidLocationError__WEBPACK_IMPORTED_MODULE_0__.InvalidLocationError(\"Location is taken by a tower\");\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/tower/commands/placeTower.ts?");

/***/ }),

/***/ "./src/tower/store/towers.ts":
/*!***********************************!*\
  !*** ./src/tower/store/towers.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Towers: () => (/* binding */ Towers)\n/* harmony export */ });\nclass Towers {\n    constructor() {\n        this.data = [];\n    }\n    static getInstance() {\n        if (!Towers.instance) {\n            Towers.instance = new Towers();\n        }\n        return Towers.instance;\n    }\n    static deleteInstance() {\n        Towers.instance = null;\n    }\n    add(tower) {\n        this.data.push(tower);\n    }\n    remove(tower) {\n        this.data = this.data.filter((item) => {\n            return item.getId() !== tower.getId();\n        });\n    }\n    all() {\n        return this.data;\n    }\n    has(col, row) {\n        return this.data.some((item) => {\n            const coords = item.getCoords();\n            return coords.col === col && coords.row === row;\n        });\n    }\n}\n\n\n//# sourceURL=webpack:///./src/tower/store/towers.ts?");

/***/ }),

/***/ "./src/tower/tower.ts":
/*!****************************!*\
  !*** ./src/tower/tower.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tower: () => (/* binding */ Tower)\n/* harmony export */ });\n/* harmony import */ var _commons_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commons/utils */ \"./src/commons/utils.ts\");\n\nclass Tower {\n    constructor(id, coords) {\n        this.range = 60;\n        this.damage = 1;\n        this.firingSpeed = 1000;\n        // view related settings\n        this.towerSize = 20;\n        this.canShoot = false;\n        this.id = id;\n        this.coords = coords;\n    }\n    getId() {\n        return this.id;\n    }\n    getCoords() {\n        return this.coords;\n    }\n    getRange() {\n        return this.range;\n    }\n    getSize() {\n        return this.towerSize;\n    }\n    attack(enemy) {\n        if (!this.canShoot)\n            return false;\n        if (enemy.isDead())\n            return false;\n        if (!enemyWithinRange(this, enemy))\n            return false;\n        enemy.reduceLife(this.damage);\n        this.reload();\n        return true;\n    }\n    reload() {\n        this.canShoot = false;\n        const towerReloading = new CustomEvent(\"towerReloading\", {\n            detail: {\n                tower: this,\n            }\n        });\n        window.dispatchEvent(towerReloading);\n        setTimeout(() => {\n            this.reloaded();\n        }, this.firingSpeed);\n    }\n    reloaded() {\n        this.canShoot = true;\n        const towerReloaded = new CustomEvent(\"towerReloaded\", {\n            detail: {\n                tower: this,\n            }\n        });\n        window.dispatchEvent(towerReloaded);\n    }\n}\nfunction enemyWithinRange(tower, enemy) {\n    return (0,_commons_utils__WEBPACK_IMPORTED_MODULE_0__.enemyInRange)(tower, 50, enemy.getPosition(), enemy.size);\n}\n\n\n//# sourceURL=webpack:///./src/tower/tower.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;