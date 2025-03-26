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

/***/ "./src/commons/event_store.ts":
/*!************************************!*\
  !*** ./src/commons/event_store.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventStore: () => (/* binding */ EventStore)\n/* harmony export */ });\nclass EventStore {\n    static save(event) {\n        this.events.push(event);\n        window.dispatchEvent(new CustomEvent(event.type, { detail: event }));\n    }\n    static getHistory() {\n        return this.events;\n    }\n    static getEventsByType(type) {\n        return this.events.filter(event => event.type === type);\n    }\n}\nEventStore.events = [];\n\n\n\n//# sourceURL=webpack:///./src/commons/event_store.ts?");

/***/ }),

/***/ "./src/enemy/commands/move_enemy_command.ts":
/*!**************************************************!*\
  !*** ./src/enemy/commands/move_enemy_command.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   moveEnemyCommand: () => (/* binding */ moveEnemyCommand)\n/* harmony export */ });\n/* harmony import */ var _models_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/position */ \"./src/models/position.ts\");\n/* harmony import */ var _events_enemy_moved_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events/enemy_moved_event */ \"./src/enemy/events/enemy_moved_event.ts\");\n\n\nfunction moveEnemyCommand(enemy) {\n    if (enemy.is_dead) {\n        throw new Error('Dead enemies cant move');\n    }\n    if (isLastPosition(enemy.current_position, lastMove())) {\n        throw new Error('Last position reached');\n    }\n    const next_position = nextPosition(enemy);\n    const event = new _events_enemy_moved_event__WEBPACK_IMPORTED_MODULE_1__.EnemyMovedEvent(next_position);\n    enemy.persist(event);\n}\nfunction isLastPosition(current_position, last_position) {\n    return current_position.col === last_position.col && current_position.row === last_position.row;\n}\nfunction lastMove() {\n    const last_position = _models_position__WEBPACK_IMPORTED_MODULE_0__.ENEMY_PATH[_models_position__WEBPACK_IMPORTED_MODULE_0__.ENEMY_PATH.length - 1];\n    return {\n        col: last_position.col * _models_position__WEBPACK_IMPORTED_MODULE_0__.GRID_SCALE,\n        row: last_position.row * _models_position__WEBPACK_IMPORTED_MODULE_0__.GRID_SCALE,\n    };\n}\nfunction nextPosition(enemy) {\n    const nextPath = enemy.next_path;\n    const currentPos = enemy.current_position;\n    const colDiff = (nextPath.col * _models_position__WEBPACK_IMPORTED_MODULE_0__.GRID_SCALE) - currentPos.col;\n    const rowDiff = (nextPath.row * _models_position__WEBPACK_IMPORTED_MODULE_0__.GRID_SCALE) - currentPos.row;\n    const col = currentPos.col + (colDiff !== 0 ? enemy.speed : 0);\n    const row = currentPos.row + (rowDiff !== 0 ? enemy.speed : 0);\n    return { col, row };\n}\n\n\n//# sourceURL=webpack:///./src/enemy/commands/move_enemy_command.ts?");

/***/ }),

/***/ "./src/enemy/commands/move_enemy_on_path_command.ts":
/*!**********************************************************!*\
  !*** ./src/enemy/commands/move_enemy_on_path_command.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   moveEnemyOnPath: () => (/* binding */ moveEnemyOnPath)\n/* harmony export */ });\n/* harmony import */ var _commands_move_enemy_command__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commands/move_enemy_command */ \"./src/enemy/commands/move_enemy_command.ts\");\n\nfunction moveEnemyOnPath(enemy) {\n    const steps = 100;\n    const interval = 1000 / steps; // 10ms per step\n    const movement = setInterval(() => {\n        try {\n            (0,_commands_move_enemy_command__WEBPACK_IMPORTED_MODULE_0__.moveEnemyCommand)(enemy);\n        }\n        catch (e) {\n            clearInterval(movement);\n        }\n    }, interval);\n}\n\n\n//# sourceURL=webpack:///./src/enemy/commands/move_enemy_on_path_command.ts?");

/***/ }),

/***/ "./src/enemy/events/enemy_died_event.ts":
/*!**********************************************!*\
  !*** ./src/enemy/events/enemy_died_event.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnemyDiedEvent: () => (/* binding */ EnemyDiedEvent)\n/* harmony export */ });\nclass EnemyDiedEvent {\n    constructor() {\n        this.type = \"EnemyDied\";\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/events/enemy_died_event.ts?");

/***/ }),

/***/ "./src/enemy/events/enemy_moved_event.ts":
/*!***********************************************!*\
  !*** ./src/enemy/events/enemy_moved_event.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnemyMovedEvent: () => (/* binding */ EnemyMovedEvent)\n/* harmony export */ });\nclass EnemyMovedEvent {\n    constructor(position) {\n        this.type = \"EnemyMoved\";\n        this.position = position;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/events/enemy_moved_event.ts?");

/***/ }),

/***/ "./src/enemy/models/enemy.ts":
/*!***********************************!*\
  !*** ./src/enemy/models/enemy.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Enemy: () => (/* binding */ Enemy)\n/* harmony export */ });\n/* harmony import */ var _models_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/position */ \"./src/models/position.ts\");\n/* harmony import */ var _commons_event_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../commons/event_store */ \"./src/commons/event_store.ts\");\n/* harmony import */ var _events_enemy_died_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/enemy_died_event */ \"./src/enemy/events/enemy_died_event.ts\");\n\n\n\nclass Enemy {\n    constructor(events = [], speed = 1) {\n        this.events = [];\n        this.events = [];\n        this.speed = speed;\n        this.loadFromHistory(events);\n    }\n    persist(event) {\n        this.applyEvent(event);\n        _commons_event_store__WEBPACK_IMPORTED_MODULE_1__.EventStore.save(event);\n    }\n    applyEvent(event) {\n        this.events.push(event);\n    }\n    loadFromHistory(events) {\n        events.forEach((event) => this.applyEvent(event));\n    }\n    get is_dead() {\n        return this.events.some((event) => event instanceof _events_enemy_died_event__WEBPACK_IMPORTED_MODULE_2__.EnemyDiedEvent);\n    }\n    get initial_position() {\n        return {\n            col: _models_position__WEBPACK_IMPORTED_MODULE_0__.ENEMY_PATH[0].col * _models_position__WEBPACK_IMPORTED_MODULE_0__.GRID_SCALE,\n            row: _models_position__WEBPACK_IMPORTED_MODULE_0__.ENEMY_PATH[0].row * _models_position__WEBPACK_IMPORTED_MODULE_0__.GRID_SCALE,\n        };\n    }\n    get current_position() {\n        const last_position = this.events[this.events.length - 1];\n        return last_position ? last_position.position : this.initial_position;\n    }\n    get next_path() {\n        const path_index = Math.floor(this.events.length / 100);\n        const new_index = path_index + 1;\n        if (new_index >= _models_position__WEBPACK_IMPORTED_MODULE_0__.ENEMY_PATH.length) {\n            return undefined;\n        }\n        return _models_position__WEBPACK_IMPORTED_MODULE_0__.ENEMY_PATH[new_index];\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/models/enemy.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enemy_commands_move_enemy_on_path_command__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy/commands/move_enemy_on_path_command */ \"./src/enemy/commands/move_enemy_on_path_command.ts\");\n/* harmony import */ var _enemy_models_enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy/models/enemy */ \"./src/enemy/models/enemy.ts\");\n\n\nconst enemy = new _enemy_models_enemy__WEBPACK_IMPORTED_MODULE_1__.Enemy();\n(0,_enemy_commands_move_enemy_on_path_command__WEBPACK_IMPORTED_MODULE_0__.moveEnemyOnPath)(enemy);\nwindow.addEventListener(\"EnemyMoved\", (event) => {\n    console.log(event.detail);\n});\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/models/position.ts":
/*!********************************!*\
  !*** ./src/models/position.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ENEMY_PATH: () => (/* binding */ ENEMY_PATH),\n/* harmony export */   GRID_SCALE: () => (/* binding */ GRID_SCALE)\n/* harmony export */ });\n// setting for the map\nconst GRID_SCALE = 100;\nconst ENEMY_PATH = [\n    { col: 1, row: 0 },\n    { col: 1, row: 1 },\n    { col: 1, row: 2 },\n    { col: 1, row: 3 },\n    { col: 1, row: 4 },\n];\n\n\n//# sourceURL=webpack:///./src/models/position.ts?");

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