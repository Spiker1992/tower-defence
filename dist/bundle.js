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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventStore: () => (/* binding */ EventStore)\n/* harmony export */ });\nclass EventStore {\n    static save(event) {\n        this.events.push(event);\n        window.dispatchEvent(new CustomEvent(\"Event\", { detail: event }));\n        window.dispatchEvent(new CustomEvent(event.type, { detail: event }));\n    }\n    static getHistory() {\n        return this.events;\n    }\n    static getByUuid(uuid) {\n        return this.events.filter(event => event.uuid === uuid);\n    }\n    static getEventsByType(type) {\n        return this.events.filter(event => event.type === type);\n    }\n    static clearHistory() {\n        this.events = [];\n    }\n}\nEventStore.events = [];\n\n\n\n//# sourceURL=webpack:///./src/commons/event_store.ts?");

/***/ }),

/***/ "./src/enemy/commands/damage_enemy_command.ts":
/*!****************************************************!*\
  !*** ./src/enemy/commands/damage_enemy_command.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DamageEnemyCommand: () => (/* binding */ DamageEnemyCommand)\n/* harmony export */ });\n/* harmony import */ var _commons_event_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../commons/event_store */ \"./src/commons/event_store.ts\");\n/* harmony import */ var _models_enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/enemy */ \"./src/enemy/models/enemy.ts\");\n/* harmony import */ var _events_enemy_damaged_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/enemy_damaged_event */ \"./src/enemy/events/enemy_damaged_event.ts\");\n/* harmony import */ var _events_enemy_died_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events/enemy_died_event */ \"./src/enemy/events/enemy_died_event.ts\");\n\n\n\n\nfunction DamageEnemyCommand(uuid, amount) {\n    // 1. Load history to check state\n    const history = _commons_event_store__WEBPACK_IMPORTED_MODULE_0__.EventStore.getByUuid(uuid);\n    const enemy = new _models_enemy__WEBPACK_IMPORTED_MODULE_1__.Enemy(history, 1, uuid);\n    // 2. Validate action\n    if (enemy.is_dead) {\n        throw new Error('Cannot damage a dead enemy');\n    }\n    if (enemy.has_reached_end) {\n        throw new Error('Cannot damage an enemy that has reached the end');\n    }\n    // 3. Persist Event\n    const event = new _events_enemy_damaged_event__WEBPACK_IMPORTED_MODULE_2__.EnemyDamagedEvent(uuid, amount);\n    _commons_event_store__WEBPACK_IMPORTED_MODULE_0__.EventStore.save(event);\n    // 4. If enemy dies\n    if (enemy.health - amount <= 0) {\n        _commons_event_store__WEBPACK_IMPORTED_MODULE_0__.EventStore.save(new _events_enemy_died_event__WEBPACK_IMPORTED_MODULE_3__.EnemyDiedEvent(uuid));\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/commands/damage_enemy_command.ts?");

/***/ }),

/***/ "./src/enemy/commands/move_enemy_command.ts":
/*!**************************************************!*\
  !*** ./src/enemy/commands/move_enemy_command.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   moveEnemyCommand: () => (/* binding */ moveEnemyCommand)\n/* harmony export */ });\n/* harmony import */ var _models_enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/enemy */ \"./src/enemy/models/enemy.ts\");\n/* harmony import */ var _models_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/position */ \"./src/models/position.ts\");\n/* harmony import */ var _events_enemy_moved_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/enemy_moved_event */ \"./src/enemy/events/enemy_moved_event.ts\");\n/* harmony import */ var _events_enemy_reached_end_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events/enemy_reached_end_event */ \"./src/enemy/events/enemy_reached_end_event.ts\");\n/* harmony import */ var _commons_event_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../commons/event_store */ \"./src/commons/event_store.ts\");\n/* harmony import */ var _game_event_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../game/event_store */ \"./src/game/event_store.ts\");\n\n\n\n\n\n\nfunction moveEnemyCommand(enemyUuid) {\n    const enemyEvents = _game_event_store__WEBPACK_IMPORTED_MODULE_5__.Enemies.getByUuid(enemyUuid);\n    const enemy = new _models_enemy__WEBPACK_IMPORTED_MODULE_0__.Enemy(enemyEvents, 1, enemyUuid);\n    if (enemy.is_dead) {\n        throw new Error('Dead enemies cant move');\n    }\n    const next_path = enemy.next_path;\n    if (next_path === undefined) {\n        const endEvent = new _events_enemy_reached_end_event__WEBPACK_IMPORTED_MODULE_3__.EnemyReachedEndEvent(enemy.uuid);\n        _commons_event_store__WEBPACK_IMPORTED_MODULE_4__.EventStore.save(endEvent);\n        throw new Error('Reached the end');\n        return;\n    }\n    const next_position = nextPosition(enemy);\n    const event = new _events_enemy_moved_event__WEBPACK_IMPORTED_MODULE_2__.EnemyMovedEvent(next_position, enemy.uuid);\n    enemy.persist(event);\n}\nfunction nextPosition(enemy) {\n    const nextPath = enemy.next_path;\n    const currentPos = enemy.current_position;\n    const colDiff = (nextPath.col * _models_position__WEBPACK_IMPORTED_MODULE_1__.GRID_SCALE) - currentPos.col;\n    const rowDiff = (nextPath.row * _models_position__WEBPACK_IMPORTED_MODULE_1__.GRID_SCALE) - currentPos.row;\n    const col = currentPos.col + (colDiff !== 0 ? enemy.speed : 0);\n    const row = currentPos.row + (rowDiff !== 0 ? enemy.speed : 0);\n    return { col, row };\n}\n\n\n//# sourceURL=webpack:///./src/enemy/commands/move_enemy_command.ts?");

/***/ }),

/***/ "./src/enemy/commands/move_enemy_on_path_command.ts":
/*!**********************************************************!*\
  !*** ./src/enemy/commands/move_enemy_on_path_command.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   moveEnemyOnPath: () => (/* binding */ moveEnemyOnPath)\n/* harmony export */ });\n/* harmony import */ var _commands_move_enemy_command__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commands/move_enemy_command */ \"./src/enemy/commands/move_enemy_command.ts\");\n\nfunction moveEnemyOnPath(enemyUuid) {\n    const steps = 100;\n    const interval = 1000 / steps; // 10ms per step\n    const movement = setInterval(() => {\n        try {\n            (0,_commands_move_enemy_command__WEBPACK_IMPORTED_MODULE_0__.moveEnemyCommand)(enemyUuid);\n        }\n        catch (e) {\n            clearInterval(movement);\n        }\n    }, interval);\n}\n\n\n//# sourceURL=webpack:///./src/enemy/commands/move_enemy_on_path_command.ts?");

/***/ }),

/***/ "./src/enemy/events/enemy_damaged_event.ts":
/*!*************************************************!*\
  !*** ./src/enemy/events/enemy_damaged_event.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnemyDamagedEvent: () => (/* binding */ EnemyDamagedEvent)\n/* harmony export */ });\nclass EnemyDamagedEvent {\n    constructor(uuid, amount) {\n        this.type = \"EnemyDamaged\";\n        this.uuid = uuid;\n        this.amount = amount;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/events/enemy_damaged_event.ts?");

/***/ }),

/***/ "./src/enemy/events/enemy_died_event.ts":
/*!**********************************************!*\
  !*** ./src/enemy/events/enemy_died_event.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnemyDiedEvent: () => (/* binding */ EnemyDiedEvent)\n/* harmony export */ });\nclass EnemyDiedEvent {\n    constructor(uuid) {\n        this.type = \"EnemyDied\";\n        this.uuid = uuid;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/events/enemy_died_event.ts?");

/***/ }),

/***/ "./src/enemy/events/enemy_moved_event.ts":
/*!***********************************************!*\
  !*** ./src/enemy/events/enemy_moved_event.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnemyMovedEvent: () => (/* binding */ EnemyMovedEvent)\n/* harmony export */ });\nclass EnemyMovedEvent {\n    constructor(position, uuid) {\n        this.type = \"EnemyMoved\";\n        this.position = position;\n        this.uuid = uuid;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/events/enemy_moved_event.ts?");

/***/ }),

/***/ "./src/enemy/events/enemy_reached_end_event.ts":
/*!*****************************************************!*\
  !*** ./src/enemy/events/enemy_reached_end_event.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnemyReachedEndEvent: () => (/* binding */ EnemyReachedEndEvent)\n/* harmony export */ });\nclass EnemyReachedEndEvent {\n    constructor(uuid) {\n        this.type = \"EnemyReachedEnd\";\n        this.uuid = uuid;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/events/enemy_reached_end_event.ts?");

/***/ }),

/***/ "./src/enemy/models/enemy.ts":
/*!***********************************!*\
  !*** ./src/enemy/models/enemy.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Enemy: () => (/* binding */ Enemy)\n/* harmony export */ });\n/* harmony import */ var _models_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/position */ \"./src/models/position.ts\");\n/* harmony import */ var _commons_event_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../commons/event_store */ \"./src/commons/event_store.ts\");\n/* harmony import */ var _events_enemy_moved_event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/enemy_moved_event */ \"./src/enemy/events/enemy_moved_event.ts\");\n/* harmony import */ var _events_enemy_died_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events/enemy_died_event */ \"./src/enemy/events/enemy_died_event.ts\");\n/* harmony import */ var _events_enemy_damaged_event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../events/enemy_damaged_event */ \"./src/enemy/events/enemy_damaged_event.ts\");\n/* harmony import */ var _events_enemy_reached_end_event__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../events/enemy_reached_end_event */ \"./src/enemy/events/enemy_reached_end_event.ts\");\n/* harmony import */ var _game_events_enemy_added_to_the_map_event__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../game/events/enemy_added_to_the_map_event */ \"./src/game/events/enemy_added_to_the_map_event.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n\n\n\n\n\n\nclass Enemy {\n    constructor(events = [], speed = 1, uuid = (0,uuid__WEBPACK_IMPORTED_MODULE_7__[\"default\"])()) {\n        this.events = [];\n        this.health = 0;\n        this.path = [];\n        this.events = [];\n        this.speed = speed;\n        this.loadFromHistory(events);\n        this.uuid = uuid;\n    }\n    persist(event) {\n        this.applyEvent(event);\n        _commons_event_store__WEBPACK_IMPORTED_MODULE_1__.EventStore.save(event);\n    }\n    applyEvent(event) {\n        this.events.push(event);\n        if (event instanceof _game_events_enemy_added_to_the_map_event__WEBPACK_IMPORTED_MODULE_6__.EnemyAddedToTheMapEvent) {\n            this.health = event.description.health;\n            this.speed = event.description.speed;\n            this.path = event.description.path;\n        }\n        if (event instanceof _events_enemy_damaged_event__WEBPACK_IMPORTED_MODULE_4__.EnemyDamagedEvent) {\n            this.health -= event.amount;\n        }\n    }\n    loadFromHistory(events) {\n        events.forEach((event) => this.applyEvent(event));\n    }\n    get is_dead() {\n        return this.events.some((event) => event instanceof _events_enemy_died_event__WEBPACK_IMPORTED_MODULE_3__.EnemyDiedEvent) || this.health <= 0;\n    }\n    get has_reached_end() {\n        return this.events.some((event) => event instanceof _events_enemy_reached_end_event__WEBPACK_IMPORTED_MODULE_5__.EnemyReachedEndEvent);\n    }\n    get initial_position() {\n        return {\n            col: this.path[0].col * _models_position__WEBPACK_IMPORTED_MODULE_0__.GRID_SCALE,\n            row: this.path[0].row * _models_position__WEBPACK_IMPORTED_MODULE_0__.GRID_SCALE,\n        };\n    }\n    get current_position() {\n        const movedEvents = this.events.filter((event) => event instanceof _events_enemy_moved_event__WEBPACK_IMPORTED_MODULE_2__.EnemyMovedEvent);\n        const last_position = movedEvents[movedEvents.length - 1];\n        return last_position ? last_position.position : this.initial_position;\n    }\n    get next_path() {\n        const path_index = Math.floor(this.events.length / 100);\n        const new_index = path_index + 1;\n        if (new_index >= this.path.length) {\n            return undefined;\n        }\n        return this.path[new_index];\n    }\n}\n\n\n//# sourceURL=webpack:///./src/enemy/models/enemy.ts?");

/***/ }),

/***/ "./src/enemy/models/enemy_presets.ts":
/*!*******************************************!*\
  !*** ./src/enemy/models/enemy_presets.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FastEnemy: () => (/* binding */ FastEnemy),\n/* harmony export */   TankyEnemy: () => (/* binding */ TankyEnemy)\n/* harmony export */ });\n/* harmony import */ var _models_position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/position */ \"./src/models/position.ts\");\n\nconst FastEnemy = {\n    health: 50,\n    speed: 2,\n    path: _models_position__WEBPACK_IMPORTED_MODULE_0__.ENEMY_PATH\n};\nconst TankyEnemy = {\n    health: 200,\n    speed: 0.5,\n    path: _models_position__WEBPACK_IMPORTED_MODULE_0__.ENEMY_PATH\n};\n\n\n//# sourceURL=webpack:///./src/enemy/models/enemy_presets.ts?");

/***/ }),

/***/ "./src/game/commands/add_enemy_to_the_map_command.ts":
/*!***********************************************************!*\
  !*** ./src/game/commands/add_enemy_to_the_map_command.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AddEnemyToTheMapCommand: () => (/* binding */ AddEnemyToTheMapCommand)\n/* harmony export */ });\n/* harmony import */ var _event_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../event_store */ \"./src/game/event_store.ts\");\n/* harmony import */ var _events_enemy_added_to_the_map_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events/enemy_added_to_the_map_event */ \"./src/game/events/enemy_added_to_the_map_event.ts\");\n\n\nfunction AddEnemyToTheMapCommand(enemyUuid, description) {\n    _event_store__WEBPACK_IMPORTED_MODULE_0__.Enemies.save(new _events_enemy_added_to_the_map_event__WEBPACK_IMPORTED_MODULE_1__.EnemyAddedToTheMapEvent(enemyUuid, description));\n}\n\n\n//# sourceURL=webpack:///./src/game/commands/add_enemy_to_the_map_command.ts?");

/***/ }),

/***/ "./src/game/debug_panel.ts":
/*!*********************************!*\
  !*** ./src/game/debug_panel.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   damageEnemyDebug: () => (/* binding */ damageEnemyDebug),\n/* harmony export */   getEventSummary: () => (/* binding */ getEventSummary),\n/* harmony export */   groupEventsByEnemy: () => (/* binding */ groupEventsByEnemy),\n/* harmony export */   initDebugPanel: () => (/* binding */ initDebugPanel),\n/* harmony export */   renderDebugPanel: () => (/* binding */ renderDebugPanel),\n/* harmony export */   spawnEnemyDebug: () => (/* binding */ spawnEnemyDebug),\n/* harmony export */   toggleEnemy: () => (/* binding */ toggleEnemy),\n/* harmony export */   truncateUuid: () => (/* binding */ truncateUuid)\n/* harmony export */ });\n/* harmony import */ var _commons_event_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commons/event_store */ \"./src/commons/event_store.ts\");\n/* harmony import */ var _enemy_models_enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enemy/models/enemy */ \"./src/enemy/models/enemy.ts\");\n/* harmony import */ var _enemy_commands_damage_enemy_command__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enemy/commands/damage_enemy_command */ \"./src/enemy/commands/damage_enemy_command.ts\");\n/* harmony import */ var _commands_add_enemy_to_the_map_command__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./commands/add_enemy_to_the_map_command */ \"./src/game/commands/add_enemy_to_the_map_command.ts\");\n/* harmony import */ var _enemy_models_enemy_presets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../enemy/models/enemy_presets */ \"./src/enemy/models/enemy_presets.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n\n\n\n\nconst REFRESH_INTERVAL_MS = 1000;\nconst MAX_ENEMIES_DISPLAYED = 100;\nconst expandedEnemies = new Set();\nfunction groupEventsByEnemy(events) {\n    const grouped = new Map();\n    for (const event of events) {\n        const uuid = event.uuid;\n        if (!uuid)\n            continue;\n        if (!grouped.has(uuid)) {\n            grouped.set(uuid, {\n                uuid: uuid,\n                events: [],\n                latestEvent: null\n            });\n        }\n        const enemyGroup = grouped.get(uuid);\n        enemyGroup.events.push(event);\n        enemyGroup.latestEvent = event;\n    }\n    return Array.from(grouped.values())\n        .sort((a, b) => b.events.length - a.events.length)\n        .slice(0, MAX_ENEMIES_DISPLAYED);\n}\nfunction getEventSummary(event) {\n    switch (event.type) {\n        case 'EnemyAddedToTheMap':\n            return 'EnemyAddedToMap';\n        case 'EnemyMoved':\n            return `Moved to (${event.position.col}, ${event.position.row})`;\n        case 'EnemyReachedEnd':\n            return 'Reached End';\n        case 'EnemyDied':\n            return 'Died';\n        default:\n            return event.type;\n    }\n}\nfunction truncateUuid(uuid) {\n    if (typeof uuid !== 'string') {\n        // Safely cast to string to avoid runtime crash, fulfilling the substring requirement.\n        return String(uuid).substring(0, 8) + '...';\n    }\n    return uuid.substring(0, 8) + '...';\n}\nfunction spawnEnemyDebug(type) {\n    const uuid = (0,uuid__WEBPACK_IMPORTED_MODULE_5__[\"default\"])();\n    const description = type === 'fast' ? _enemy_models_enemy_presets__WEBPACK_IMPORTED_MODULE_4__.FastEnemy : _enemy_models_enemy_presets__WEBPACK_IMPORTED_MODULE_4__.TankyEnemy;\n    (0,_commands_add_enemy_to_the_map_command__WEBPACK_IMPORTED_MODULE_3__.AddEnemyToTheMapCommand)(uuid, description);\n    renderDebugPanel();\n}\nfunction damageEnemyDebug(enemyUuid) {\n    try {\n        (0,_enemy_commands_damage_enemy_command__WEBPACK_IMPORTED_MODULE_2__.DamageEnemyCommand)(enemyUuid, 10);\n        renderDebugPanel();\n    }\n    catch (e) {\n        console.error(e);\n        alert(e instanceof Error ? e.message : 'Failed to damage enemy');\n    }\n}\nfunction toggleEnemy(enemyUuid) {\n    if (expandedEnemies.has(enemyUuid)) {\n        expandedEnemies.delete(enemyUuid);\n    }\n    else {\n        expandedEnemies.add(enemyUuid);\n    }\n    renderDebugPanel();\n}\nfunction renderDebugPanel() {\n    const panel = document.getElementById('debug-panel');\n    if (!panel)\n        return;\n    const events = _commons_event_store__WEBPACK_IMPORTED_MODULE_0__.EventStore.getHistory();\n    const enemyGroups = groupEventsByEnemy(events);\n    if (enemyGroups.length === 0) {\n        panel.innerHTML = '<h3>Event Store Debug</h3><p>No events yet</p>';\n        return;\n    }\n    let html = '<h3>Event Store Debug</h3>';\n    html += `<p>Total events: ${events.length} | Enemies: ${enemyGroups.length}</p>`;\n    html += `<div class=\"debug-controls\">\n                <button onclick=\"window.spawnEnemyDebug('fast')\">Spawn Fast</button>\n                <button onclick=\"window.spawnEnemyDebug('tanky')\">Spawn Tanky</button>\n             </div>`;\n    for (const enemy of enemyGroups) {\n        const isExpanded = expandedEnemies.has(enemy.uuid);\n        const latestEvent = enemy.latestEvent;\n        const enemyInstance = new _enemy_models_enemy__WEBPACK_IMPORTED_MODULE_1__.Enemy(enemy.events, 1, enemy.uuid);\n        html += `<div class=\"debug-enemy\">`;\n        html += `  <div class=\"debug-enemy-header\" onclick=\"window.toggleEnemyDebug('${enemy.uuid}')\">`;\n        html += `    <span class=\"debug-toggle\">${isExpanded ? '[-]' : '[+]'}</span>`;\n        html += `    <span class=\"debug-enemy-uuid\">${truncateUuid(enemy.uuid)}</span>`;\n        html += `    <span class=\"debug-event-count\">(${enemy.events.length})</span>`;\n        html += `    <span class=\"debug-health\">HP: ${enemyInstance.health}</span>`;\n        html += `    <button onclick=\"window.damageEnemyDebug('${enemy.uuid}'); event.stopPropagation();\">Damage</button>`;\n        html += `  </div>`;\n        html += `  <div class=\"debug-enemy-latest\">`;\n        html += `    Latest: ${getEventSummary(latestEvent)}`;\n        html += `  </div>`;\n        if (isExpanded) {\n            html += `  <div class=\"debug-enemy-history\">`;\n            for (let i = enemy.events.length - 1; i >= 0; i--) {\n                const evt = enemy.events[i];\n                const isLatest = i === enemy.events.length - 1;\n                html += `    <div class=\"debug-event ${isLatest ? 'latest' : ''}\">`;\n                html += `      ${i + 1}. ${getEventSummary(evt)}`;\n                html += `    </div>`;\n            }\n            html += `  </div>`;\n        }\n        html += `</div>`;\n    }\n    panel.innerHTML = html;\n}\nfunction initDebugPanel() {\n    window.toggleEnemyDebug = toggleEnemy;\n    window.damageEnemyDebug = damageEnemyDebug;\n    window.spawnEnemyDebug = spawnEnemyDebug;\n    renderDebugPanel();\n    setInterval(renderDebugPanel, REFRESH_INTERVAL_MS);\n}\n\n\n//# sourceURL=webpack:///./src/game/debug_panel.ts?");

/***/ }),

/***/ "./src/game/event_store.ts":
/*!*********************************!*\
  !*** ./src/game/event_store.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Enemies: () => (/* binding */ Enemies),\n/* harmony export */   Towers: () => (/* binding */ Towers)\n/* harmony export */ });\n/* harmony import */ var _commons_event_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commons/event_store */ \"./src/commons/event_store.ts\");\n\nclass Enemies extends _commons_event_store__WEBPACK_IMPORTED_MODULE_0__.EventStore {\n}\nclass Towers extends _commons_event_store__WEBPACK_IMPORTED_MODULE_0__.EventStore {\n}\n\n\n//# sourceURL=webpack:///./src/game/event_store.ts?");

/***/ }),

/***/ "./src/game/events/enemy_added_to_the_map_event.ts":
/*!*********************************************************!*\
  !*** ./src/game/events/enemy_added_to_the_map_event.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EnemyAddedToTheMapEvent: () => (/* binding */ EnemyAddedToTheMapEvent)\n/* harmony export */ });\nclass EnemyAddedToTheMapEvent {\n    constructor(uuid, description) {\n        this.type = \"EnemyAddedToTheMap\";\n        this.uuid = uuid;\n        this.description = description;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/game/events/enemy_added_to_the_map_event.ts?");

/***/ }),

/***/ "./src/game/listeners.ts":
/*!*******************************!*\
  !*** ./src/game/listeners.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _enemy_commands_move_enemy_on_path_command__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enemy/commands/move_enemy_on_path_command */ \"./src/enemy/commands/move_enemy_on_path_command.ts\");\n\nwindow.addEventListener(\"EnemyAddedToTheMap\", (event) => {\n    const enemy = event.detail.uuid;\n    (0,_enemy_commands_move_enemy_on_path_command__WEBPACK_IMPORTED_MODULE_0__.moveEnemyOnPath)(enemy);\n});\nwindow.addEventListener(\"Event\", (event) => {\n    const e = event.detail;\n    console.log(`Event: ${e.type}`, e);\n});\n\n\n//# sourceURL=webpack:///./src/game/listeners.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_commands_add_enemy_to_the_map_command__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/commands/add_enemy_to_the_map_command */ \"./src/game/commands/add_enemy_to_the_map_command.ts\");\n/* harmony import */ var _game_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game/listeners */ \"./src/game/listeners.ts\");\n/* harmony import */ var _models_position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/position */ \"./src/models/position.ts\");\n/* harmony import */ var _game_debug_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game/debug_panel */ \"./src/game/debug_panel.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! uuid */ \"./node_modules/uuid/dist/esm-browser/v4.js\");\n\n\n\n\n\nconst validation = (0,_models_position__WEBPACK_IMPORTED_MODULE_2__.validatePath)(_models_position__WEBPACK_IMPORTED_MODULE_2__.ENEMY_PATH);\nvalidation.warnings.forEach(w => console.warn(`Path warning: ${w}`));\n(0,_game_debug_panel__WEBPACK_IMPORTED_MODULE_3__.initDebugPanel)();\n(0,_game_commands_add_enemy_to_the_map_command__WEBPACK_IMPORTED_MODULE_0__.AddEnemyToTheMapCommand)((0,uuid__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(), { health: 100, speed: 1, path: _models_position__WEBPACK_IMPORTED_MODULE_2__.ENEMY_PATH });\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/models/position.ts":
/*!********************************!*\
  !*** ./src/models/position.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ENEMY_PATH: () => (/* binding */ ENEMY_PATH),\n/* harmony export */   GRID_SCALE: () => (/* binding */ GRID_SCALE),\n/* harmony export */   MAP_HEIGHT: () => (/* binding */ MAP_HEIGHT),\n/* harmony export */   MAP_WIDTH: () => (/* binding */ MAP_WIDTH),\n/* harmony export */   validatePath: () => (/* binding */ validatePath)\n/* harmony export */ });\nfunction validatePath(path) {\n    const warnings = [];\n    if (path.length < 2) {\n        warnings.push('Path must have at least 2 positions');\n        return { valid: false, warnings };\n    }\n    const seenPositions = new Map();\n    for (let i = 0; i < path.length; i++) {\n        const pos = path[i];\n        const posKey = `${pos.col},${pos.row}`;\n        if (seenPositions.has(posKey)) {\n            warnings.push(`Duplicate position at index ${i}: {col:${pos.col},row:${pos.row}} already appears at index ${seenPositions.get(posKey)}`);\n        }\n        else {\n            seenPositions.set(posKey, i);\n        }\n        if (i > 0) {\n            const prev = path[i - 1];\n            const distance = Math.abs(pos.col - prev.col) + Math.abs(pos.row - prev.row);\n            if (distance !== 1) {\n                warnings.push(`Discontinuity at index ${i - 1}: invalid move from {col:${prev.col},row:${prev.row}} to {col:${pos.col},row:${pos.row}} (distance: ${distance})`);\n            }\n        }\n    }\n    return { valid: warnings.length === 0, warnings };\n}\n// setting for the map\nconst GRID_SCALE = 100;\nconst MAP_WIDTH = 10;\nconst MAP_HEIGHT = 10;\nconst ENEMY_PATH = [\n    { col: 1, row: 0 },\n    { col: 2, row: 0 },\n    { col: 2, row: 1 },\n];\n\n\n//# sourceURL=webpack:///./src/models/position.ts?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ randomUUID });\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/native.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i);\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/regex.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rng)\n/* harmony export */ });\nlet getRandomValues;\nconst rnds8 = new Uint8Array(16);\nfunction rng() {\n    if (!getRandomValues) {\n        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {\n            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');\n        }\n        getRandomValues = crypto.getRandomValues.bind(crypto);\n    }\n    return getRandomValues(rnds8);\n}\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/rng.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)\n/* harmony export */ });\n/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ \"./node_modules/uuid/dist/esm-browser/validate.js\");\n\nconst byteToHex = [];\nfor (let i = 0; i < 256; ++i) {\n    byteToHex.push((i + 0x100).toString(16).slice(1));\n}\nfunction unsafeStringify(arr, offset = 0) {\n    return (byteToHex[arr[offset + 0]] +\n        byteToHex[arr[offset + 1]] +\n        byteToHex[arr[offset + 2]] +\n        byteToHex[arr[offset + 3]] +\n        '-' +\n        byteToHex[arr[offset + 4]] +\n        byteToHex[arr[offset + 5]] +\n        '-' +\n        byteToHex[arr[offset + 6]] +\n        byteToHex[arr[offset + 7]] +\n        '-' +\n        byteToHex[arr[offset + 8]] +\n        byteToHex[arr[offset + 9]] +\n        '-' +\n        byteToHex[arr[offset + 10]] +\n        byteToHex[arr[offset + 11]] +\n        byteToHex[arr[offset + 12]] +\n        byteToHex[arr[offset + 13]] +\n        byteToHex[arr[offset + 14]] +\n        byteToHex[arr[offset + 15]]).toLowerCase();\n}\nfunction stringify(arr, offset = 0) {\n    const uuid = unsafeStringify(arr, offset);\n    if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(uuid)) {\n        throw TypeError('Stringified UUID is invalid');\n    }\n    return uuid;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/stringify.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ \"./node_modules/uuid/dist/esm-browser/native.js\");\n/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ \"./node_modules/uuid/dist/esm-browser/rng.js\");\n/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ \"./node_modules/uuid/dist/esm-browser/stringify.js\");\n\n\n\nfunction v4(options, buf, offset) {\n    if (_native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID && !buf && !options) {\n        return _native_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].randomUUID();\n    }\n    options = options || {};\n    const rnds = options.random ?? options.rng?.() ?? (0,_rng_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n    if (rnds.length < 16) {\n        throw new Error('Random bytes length must be >= 16');\n    }\n    rnds[6] = (rnds[6] & 0x0f) | 0x40;\n    rnds[8] = (rnds[8] & 0x3f) | 0x80;\n    if (buf) {\n        offset = offset || 0;\n        if (offset < 0 || offset + 16 > buf.length) {\n            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);\n        }\n        for (let i = 0; i < 16; ++i) {\n            buf[offset + i] = rnds[i];\n        }\n        return buf;\n    }\n    return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/v4.js?");

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ \"./node_modules/uuid/dist/esm-browser/regex.js\");\n\nfunction validate(uuid) {\n    return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].test(uuid);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);\n\n\n//# sourceURL=webpack:///./node_modules/uuid/dist/esm-browser/validate.js?");

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