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

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ENEMY_MARKER: () => (/* binding */ ENEMY_MARKER),\n/* harmony export */   PATH_MARKER: () => (/* binding */ PATH_MARKER),\n/* harmony export */   TOWER_MARKER: () => (/* binding */ TOWER_MARKER)\n/* harmony export */ });\nconst PATH_MARKER = \"P\";\nconst ENEMY_MARKER = \"E\";\nconst TOWER_MARKER = \"T\";\n\n\n//# sourceURL=webpack:///./src/constants.ts?");

/***/ }),

/***/ "./src/entities/enemies/beastEnemy.ts":
/*!********************************************!*\
  !*** ./src/entities/enemies/beastEnemy.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BeastEnemy: () => (/* binding */ BeastEnemy)\n/* harmony export */ });\n/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enemy */ \"./src/entities/enemy.ts\");\n\nclass BeastEnemy extends _enemy__WEBPACK_IMPORTED_MODULE_0__.Enemy {\n    constructor() {\n        super(...arguments);\n        this.speed = 3000;\n        this.life = 20;\n        this.size = 10;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/enemies/beastEnemy.ts?");

/***/ }),

/***/ "./src/entities/enemies/tinyEnemy.ts":
/*!*******************************************!*\
  !*** ./src/entities/enemies/tinyEnemy.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TinyEnemy: () => (/* binding */ TinyEnemy)\n/* harmony export */ });\n/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enemy */ \"./src/entities/enemy.ts\");\n\nclass TinyEnemy extends _enemy__WEBPACK_IMPORTED_MODULE_0__.Enemy {\n    constructor() {\n        super(...arguments);\n        this.speed = 1000;\n        this.life = 2;\n        this.size = 30;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/enemies/tinyEnemy.ts?");

/***/ }),

/***/ "./src/entities/enemy.ts":
/*!*******************************!*\
  !*** ./src/entities/enemy.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Enemy: () => (/* binding */ Enemy)\n/* harmony export */ });\nclass Enemy {\n    constructor(path, id) {\n        this.speed = 1000;\n        this.size = 20;\n        this.life = 2;\n        this.path = path;\n        this.prevPosition = null;\n        this.currentPosition = null;\n        this.id = id;\n    }\n    reduceLife(damage) {\n        this.life -= damage;\n        if (this.life <= 0) {\n            this.element.remove();\n        }\n    }\n    isDead() {\n        return !this.life;\n    }\n    move() {\n        this.prevPosition = this.currentPosition;\n        this.currentPosition = this.path.shift();\n    }\n    getPrevPosition() {\n        return this.prevPosition;\n    }\n    getNextPosition() {\n        return this.path[0];\n    }\n    getPosition() {\n        return this.currentPosition;\n    }\n    setDomElement(element) {\n        this.element = element;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/enemy.ts?");

/***/ }),

/***/ "./src/entities/tower.ts":
/*!*******************************!*\
  !*** ./src/entities/tower.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tower: () => (/* binding */ Tower)\n/* harmony export */ });\n/* harmony import */ var _helpers_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/grid */ \"./src/helpers/grid.ts\");\n\nclass Tower {\n    constructor(id, coords) {\n        this.range = 60;\n        this.damage = 1;\n        this.firingSpeed = 1000;\n        // view related settings\n        this.towerSize = 20;\n        this.id = id;\n        this.coords = coords;\n    }\n    getId() {\n        return this.id;\n    }\n    getCoords() {\n        return this.coords;\n    }\n    render() {\n        const targetCell = document.querySelector(`#gameTable .cell[row=\"${this.coords.row}\"][col=\"${this.coords.col}\"]`);\n        const { x, y } = (0,_helpers_grid__WEBPACK_IMPORTED_MODULE_0__.getCenterPoint)(targetCell);\n        const tower = document.createElement(\"div\");\n        const correction = this.towerSize / 2;\n        tower.className = \"tower\";\n        tower.id = `tower${this.id}`;\n        tower.style.top = `${y - correction}px`;\n        tower.style.left = `${x - correction}px`;\n        tower.style.outlineOffset = `${this.range - correction}px`;\n        document.getElementById(\"grid\").appendChild(tower);\n        this.element = tower;\n    }\n    attributes() {\n        return {\n            x: parseInt(this.element.style.left),\n            y: parseInt(this.element.style.top),\n            range: this.range,\n            damage: this.damage,\n            firingSpeed: this.firingSpeed,\n        };\n    }\n}\n\n\n//# sourceURL=webpack:///./src/entities/tower.ts?");

/***/ }),

/***/ "./src/exceptions/InvalidLocationError.ts":
/*!************************************************!*\
  !*** ./src/exceptions/InvalidLocationError.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InvalidLocationError: () => (/* binding */ InvalidLocationError)\n/* harmony export */ });\nclass InvalidLocationError extends Error {\n    constructor(message) {\n        super(message);\n        this.name = \"InvalidLocationError\";\n    }\n}\n\n\n//# sourceURL=webpack:///./src/exceptions/InvalidLocationError.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _state_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state/grid */ \"./src/state/grid.ts\");\n/* harmony import */ var _views_renderGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views/renderGrid */ \"./src/views/renderGrid.ts\");\n/* harmony import */ var _placements_levels_level1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./placements/levels/level1 */ \"./src/placements/levels/level1.ts\");\n\n\n\nconst grid = _state_grid__WEBPACK_IMPORTED_MODULE_0__.Grid.getInstance();\ngrid.generateGrid(5, 5);\nconst paths = new _placements_levels_level1__WEBPACK_IMPORTED_MODULE_2__.Level1();\ngrid.setPath(paths);\n(0,_views_renderGrid__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid.grid());\npaths.start();\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/placements/levels/level1.ts":
/*!*****************************************!*\
  !*** ./src/placements/levels/level1.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Level1: () => (/* binding */ Level1)\n/* harmony export */ });\n/* harmony import */ var _entities_enemies_beastEnemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../entities/enemies/beastEnemy */ \"./src/entities/enemies/beastEnemy.ts\");\n/* harmony import */ var _entities_enemies_tinyEnemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../entities/enemies/tinyEnemy */ \"./src/entities/enemies/tinyEnemy.ts\");\n/* harmony import */ var _pathPlacement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pathPlacement */ \"./src/placements/pathPlacement.ts\");\n\n\n\nclass Level1 extends _pathPlacement__WEBPACK_IMPORTED_MODULE_2__.PathPlacement {\n    constructor() {\n        super(...arguments);\n        this.enemySpec = [\n            [_entities_enemies_beastEnemy__WEBPACK_IMPORTED_MODULE_0__.BeastEnemy, 2],\n            [_entities_enemies_tinyEnemy__WEBPACK_IMPORTED_MODULE_1__.TinyEnemy, 2],\n        ];\n    }\n    setupEnemyPath() {\n        this.add(0, 0);\n        this.add(1, 0);\n        this.add(1, 1);\n        this.add(1, 2);\n        this.add(1, 3);\n        this.add(2, 3);\n        this.add(3, 3);\n        this.add(3, 4);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/placements/levels/level1.ts?");

/***/ }),

/***/ "./src/placements/pathPlacement.ts":
/*!*****************************************!*\
  !*** ./src/placements/pathPlacement.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PathPlacement: () => (/* binding */ PathPlacement)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\n/* harmony import */ var _placementManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./placementManager */ \"./src/placements/placementManager.ts\");\n/* harmony import */ var _state_enemies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/enemies */ \"./src/state/enemies.ts\");\n/* harmony import */ var _views_moveEnemy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/moveEnemy */ \"./src/views/moveEnemy.ts\");\n/* harmony import */ var _services_towerShooting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/towerShooting */ \"./src/services/towerShooting.ts\");\n\n\n\n\n\nclass PathPlacement extends _placementManager__WEBPACK_IMPORTED_MODULE_1__.PlacementManager {\n    constructor() {\n        super();\n        this.MARKER = _constants__WEBPACK_IMPORTED_MODULE_0__.PATH_MARKER;\n        this.spawnSpeed = 1000;\n        this.enemySpec = [];\n        this.setupEnemyPath();\n    }\n    start() {\n        this.spawnEnemies();\n        this.startShooting();\n    }\n    spawnEnemies() {\n        const enemies = _state_enemies__WEBPACK_IMPORTED_MODULE_2__.Enemies.getInstance();\n        let id = 1;\n        let index = 0;\n        let count = 0;\n        const movement = setInterval(() => {\n            console.log(\"Start spawning enemies\");\n            const enemyPath = [...this.all()];\n            if (count < this.enemySpec[index][1]) {\n                const EnemyType = this.enemySpec[index][0];\n                const enemy = new EnemyType(enemyPath, id);\n                enemies.add(enemy);\n                const moveEnemy = new _views_moveEnemy__WEBPACK_IMPORTED_MODULE_3__.MoveEnemy(enemy);\n                moveEnemy.handle();\n                id += 1;\n                count += 1;\n            }\n            else {\n                count = 0;\n                index += 1;\n            }\n            if (id == 2) {\n                this.startShooting();\n            }\n            if (index >= this.enemySpec.length) {\n                clearInterval(movement);\n                console.log(\"Finished spawning enemies\");\n            }\n        }, this.spawnSpeed);\n    }\n    startShooting() {\n        new _services_towerShooting__WEBPACK_IMPORTED_MODULE_4__.TowerShooting().startShooting();\n    }\n}\n\n\n//# sourceURL=webpack:///./src/placements/pathPlacement.ts?");

/***/ }),

/***/ "./src/placements/placementManager.ts":
/*!********************************************!*\
  !*** ./src/placements/placementManager.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PlacementManager: () => (/* binding */ PlacementManager)\n/* harmony export */ });\nclass PlacementManager {\n    constructor() {\n        this.data = [];\n    }\n    add(row, col) {\n        this.data.push({ row: row, col: col });\n    }\n    has(col, row) {\n        return this.data.some((item) => {\n            return item.col === col && item.row === row;\n        });\n    }\n    remove(col, row) {\n        this.data = this.data.filter((item) => {\n            return item.col != col || item.row != row;\n        });\n    }\n    all() {\n        return this.data;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/placements/placementManager.ts?");

/***/ }),

/***/ "./src/services/addTower.ts":
/*!**********************************!*\
  !*** ./src/services/addTower.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AddTower: () => (/* binding */ AddTower)\n/* harmony export */ });\n/* harmony import */ var _exceptions_InvalidLocationError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../exceptions/InvalidLocationError */ \"./src/exceptions/InvalidLocationError.ts\");\n/* harmony import */ var _state_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/grid */ \"./src/state/grid.ts\");\n/* harmony import */ var _state_towers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/towers */ \"./src/state/towers.ts\");\n\n\n\nclass AddTower {\n    constructor(tower) {\n        this.tower = tower;\n    }\n    handle() {\n        this.isFreeCoordinate();\n        const store = _state_towers__WEBPACK_IMPORTED_MODULE_2__.Towers.getInstance();\n        store.add(this.tower);\n        this.tower.render();\n    }\n    isFreeCoordinate() {\n        this.coordTakenByPath();\n        this.coordTakenByTower();\n    }\n    coordTakenByPath() {\n        var _a;\n        const grid = _state_grid__WEBPACK_IMPORTED_MODULE_1__.Grid.getInstance();\n        const coords = this.tower.getCoords();\n        if ((_a = grid.path) === null || _a === void 0 ? void 0 : _a.has(coords.col, coords.row)) {\n            throw new _exceptions_InvalidLocationError__WEBPACK_IMPORTED_MODULE_0__.InvalidLocationError(\"Location is taken by a path\");\n        }\n    }\n    coordTakenByTower() {\n        const towers = _state_towers__WEBPACK_IMPORTED_MODULE_2__.Towers.getInstance();\n        const coords = this.tower.getCoords();\n        if (towers.has(coords.col, coords.row)) {\n            throw new _exceptions_InvalidLocationError__WEBPACK_IMPORTED_MODULE_0__.InvalidLocationError(\"Location is taken by a tower\");\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/services/addTower.ts?");

/***/ }),

/***/ "./src/services/towerShooting.ts":
/*!***************************************!*\
  !*** ./src/services/towerShooting.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TowerShooting: () => (/* binding */ TowerShooting)\n/* harmony export */ });\n/* harmony import */ var _state_enemies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/enemies */ \"./src/state/enemies.ts\");\n/* harmony import */ var _state_towers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/towers */ \"./src/state/towers.ts\");\n/* harmony import */ var _helpers_grid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/grid */ \"./src/helpers/grid.ts\");\n\n\n\nclass TowerShooting {\n    constructor() {\n        this.interval = null;\n        this.enemyStore = _state_enemies__WEBPACK_IMPORTED_MODULE_0__.Enemies.getInstance();\n    }\n    startShooting() {\n        const enemies = this.enemyStore;\n        console.log(\"enemies total:\", enemies.all().length);\n        const towers = _state_towers__WEBPACK_IMPORTED_MODULE_1__.Towers.getInstance().all();\n        this.interval = setInterval(() => {\n            if (enemies.all().length < 1) {\n                this.stopShooting();\n                return;\n            }\n            towers.forEach((tower) => {\n                this.performTowerAttack(tower, enemies.all());\n            });\n        }, 1000);\n    }\n    performTowerAttack(tower, enemies) {\n        const attributes = tower.attributes();\n        const targetEnemy = this.getEnemyInRange(attributes, enemies);\n        if (targetEnemy) {\n            targetEnemy.reduceLife(attributes.damage);\n            if (targetEnemy.isDead()) {\n                this.enemyStore.remove(targetEnemy);\n            }\n        }\n    }\n    getEnemyInRange(attributes, enemies) {\n        let closestEnemy = null;\n        let closestDistance = Number.MAX_SAFE_INTEGER;\n        enemies.forEach((enemy) => {\n            if (!enemy.element) {\n                return;\n            }\n            const distance = this.calculateDistance(attributes, enemy);\n            if (distance <= attributes.range && distance < closestDistance) {\n                closestEnemy = enemy;\n                closestDistance = distance;\n            }\n        });\n        return closestEnemy;\n    }\n    calculateDistance(attributes, enemy) {\n        const { x: towerCenterX, y: towerCenterY } = attributes;\n        const { x, y } = (0,_helpers_grid__WEBPACK_IMPORTED_MODULE_2__.getCenterPoint)(enemy.element);\n        const deltaX = x - towerCenterX;\n        const deltaY = y - towerCenterY;\n        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);\n    }\n    stopShooting() {\n        console.log(\"stop shooting\");\n        if (this.interval) {\n            clearInterval(this.interval);\n            this.interval = null;\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/services/towerShooting.ts?");

/***/ }),

/***/ "./src/state/enemies.ts":
/*!******************************!*\
  !*** ./src/state/enemies.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Enemies: () => (/* binding */ Enemies)\n/* harmony export */ });\nclass Enemies {\n    constructor() {\n        this.data = [];\n    }\n    static getInstance() {\n        if (!Enemies.instance) {\n            Enemies.instance = new Enemies();\n        }\n        return Enemies.instance;\n    }\n    add(enemy) {\n        this.data.push(enemy);\n    }\n    remove(enemy) {\n        console.log(enemy);\n        console.log(this.data);\n        this.data = this.data.filter((item) => {\n            return item.id !== enemy.id;\n        });\n    }\n    all() {\n        return this.data;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/state/enemies.ts?");

/***/ }),

/***/ "./src/state/grid.ts":
/*!***************************!*\
  !*** ./src/state/grid.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Grid: () => (/* binding */ Grid)\n/* harmony export */ });\n/* harmony import */ var _helpers_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/grid */ \"./src/helpers/grid.ts\");\n\nclass Grid {\n    constructor() {\n        this.baseGrid = [];\n    }\n    static getInstance() {\n        if (!Grid.instance) {\n            Grid.instance = new Grid();\n        }\n        return Grid.instance;\n    }\n    static deleteInstance() {\n        Grid.instance = null;\n    }\n    generateGrid(numCols, numRows) {\n        this.baseGrid = (0,_helpers_grid__WEBPACK_IMPORTED_MODULE_0__.generateGrid)(numCols, numRows);\n    }\n    placeMarkers(grid, coords, marker) {\n        coords.forEach(function (coord) {\n            grid[coord.row][coord.col] = marker;\n        });\n    }\n    grid() {\n        if (!this.baseGrid) {\n            throw new Error(\"Base Grid is not set\");\n        }\n        const temp = [...this.baseGrid];\n        this.placeMarkers(temp, this.path.all(), this.path.MARKER);\n        // this.placeMarkers(temp, this.towers.all(), this.towers.MARKER)\n        // this.placeMarkers(temp, this.enemies.all(), this.enemies.MARKER)\n        return temp;\n    }\n    setPath(paths) {\n        this.path = paths;\n    }\n    setTowers(towers) {\n        this.towers = towers;\n    }\n    setEnemies(enemies) {\n        this.enemies = enemies;\n    }\n    getEnemies() {\n        return this.enemies;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/state/grid.ts?");

/***/ }),

/***/ "./src/state/towers.ts":
/*!*****************************!*\
  !*** ./src/state/towers.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Towers: () => (/* binding */ Towers)\n/* harmony export */ });\nclass Towers {\n    constructor() {\n        this.data = [];\n    }\n    static getInstance() {\n        if (!Towers.instance) {\n            Towers.instance = new Towers();\n        }\n        return Towers.instance;\n    }\n    static deleteInstance() {\n        Towers.instance = null;\n    }\n    add(tower) {\n        this.data.push(tower);\n    }\n    remove(tower) {\n        this.data = this.data.filter((item) => {\n            return item.getId() !== tower.getId();\n        });\n    }\n    all() {\n        return this.data;\n    }\n    has(col, row) {\n        return this.data.some((item) => {\n            const coords = item.getCoords();\n            return coords.col === col && coords.row === row;\n        });\n    }\n}\n\n\n//# sourceURL=webpack:///./src/state/towers.ts?");

/***/ }),

/***/ "./src/views/moveEnemy.ts":
/*!********************************!*\
  !*** ./src/views/moveEnemy.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MoveEnemy: () => (/* binding */ MoveEnemy)\n/* harmony export */ });\n/* harmony import */ var _state_enemies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../state/enemies */ \"./src/state/enemies.ts\");\n\nclass MoveEnemy {\n    constructor(enemy) {\n        this.enemy = enemy;\n        this.speed = enemy.speed;\n        this.enemySize = enemy.size;\n    }\n    create() {\n        const targetCell = document.querySelector(`#gameTable .cell[row=\"0\"][col=\"0\"]`);\n        const { y } = this.getCenterPoint(targetCell);\n        const enemy = document.createElement(\"div\");\n        enemy.className = \"enemy\";\n        enemy.style.width = `${this.enemySize}px`;\n        enemy.style.height = `${this.enemySize}px`;\n        enemy.style.background = \"red\";\n        enemy.style.top = `-${this.enemySize}px`; // `${0-2.5}` /* Calculate the top position based on the grid cell */;\n        enemy.style.left = `${y}px`; // `${y-2.5}` /* Calculate the left position based on the grid cell */;\n        document.getElementById(\"grid\").appendChild(enemy);\n        this.enemyElement = enemy;\n        this.enemy.setDomElement(enemy);\n    }\n    handle() {\n        this.movement = setInterval(() => {\n            this.enemy.move();\n            if (this.noMovesLeft()) {\n                this.lastMove();\n                return;\n            }\n            this.completeMove();\n        }, this.speed);\n    }\n    completeMove() {\n        if (!this.enemyElement) {\n            this.create();\n        }\n        const enemyPosition = this.enemy.getPosition();\n        this.animateEnemy(this.enemyElement, enemyPosition.col, enemyPosition.row);\n    }\n    getCenterPoint(element) {\n        const { top, left, width, height } = element.getBoundingClientRect();\n        const centerX = left + ((width - 20) / 2);\n        const centerY = top + ((height - 20) / 2);\n        return { x: centerX, y: centerY };\n    }\n    animateEnemy(enemy, col, row) {\n        const targetCell = document.querySelector(`#gameTable .cell[row=\"${row}\"][col=\"${col}\"]`);\n        if (targetCell) {\n            const { x, y } = this.getCenterPoint(targetCell);\n            this.transformElement(enemy, x, y);\n        }\n    }\n    transformElement(enemy, x, y) {\n        const correctionLeft = (parseInt(enemy.style.left));\n        const speed = this.speed / 1000;\n        enemy.style.transition = `transform ${speed}s linear`;\n        enemy.style.transform = `translate(${x - correctionLeft}px, ${y + this.enemySize}px)`;\n    }\n    noMovesLeft() {\n        return !this.enemy.getPosition();\n    }\n    lastMove() {\n        const targetCell = document.querySelector(`#gameTable .cell[row=\"3\"][col=\"4\"]`);\n        const { right } = targetCell.getBoundingClientRect();\n        const { y } = this.getCenterPoint(targetCell);\n        this.transformElement(this.enemyElement, right + this.enemySize, y);\n        clearInterval(this.movement);\n        const deleteElement = setInterval(() => {\n            this.enemyElement.remove();\n            const enemies = _state_enemies__WEBPACK_IMPORTED_MODULE_0__.Enemies.getInstance();\n            enemies.remove(this.enemy);\n            clearInterval(deleteElement);\n        }, this.speed);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/views/moveEnemy.ts?");

/***/ }),

/***/ "./src/views/renderGrid.ts":
/*!*********************************!*\
  !*** ./src/views/renderGrid.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   firstOrCreateGameTable: () => (/* binding */ firstOrCreateGameTable),\n/* harmony export */   firstOrCreateGrid: () => (/* binding */ firstOrCreateGrid),\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid)\n/* harmony export */ });\n/* harmony import */ var _entities_tower__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/tower */ \"./src/entities/tower.ts\");\n/* harmony import */ var _services_addTower__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/addTower */ \"./src/services/addTower.ts\");\n\n\nfunction firstOrCreateGameTable() {\n    let gameTable = document.getElementById(\"#gameTable\");\n    if (!gameTable) {\n        gameTable = document.createElement(\"div\");\n        gameTable.id = \"gameTable\";\n        const bodyEle = document.getElementsByTagName(\"body\")[0];\n        bodyEle.appendChild(gameTable);\n    }\n    return gameTable;\n}\nfunction firstOrCreateGrid() {\n    const gameTable = firstOrCreateGameTable();\n    let gridEle = document.getElementById(\"#grid\");\n    if (!gridEle) {\n        gridEle = document.createElement(\"div\");\n        gridEle.id = \"grid\";\n        gameTable.appendChild(gridEle);\n    }\n    return gridEle;\n}\nfunction renderGrid(grid) {\n    const numRows = 5;\n    const numCols = 5;\n    const gridEle = firstOrCreateGrid();\n    gridEle.innerHTML = '';\n    for (let row = 0; row < numRows; row++) {\n        const newRow = document.createElement('tr');\n        for (let col = 0; col < numCols; col++) {\n            const newCell = document.createElement('td');\n            newCell.setAttribute(\"row\", `${row}`);\n            newCell.setAttribute(\"col\", `${col}`);\n            newCell.onclick = () => {\n                (new _services_addTower__WEBPACK_IMPORTED_MODULE_1__.AddTower(new _entities_tower__WEBPACK_IMPORTED_MODULE_0__.Tower(1, { col: col, row: row }))).handle();\n            };\n            newCell.textContent = grid[row][col];\n            newCell.className = \"cell\";\n            newRow.appendChild(newCell);\n        }\n        gridEle.appendChild(newRow);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/views/renderGrid.ts?");

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