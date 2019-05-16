"use strict";
cc._RF.push(module, 'd4fe4BRfU1MzJ1glXMAOizR', 'GameManager');
// Scripts/Managers/GameManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var WordManager_1 = require("./WordManager");
var HexagonManager_1 = require("./HexagonManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checks = {
            config: false,
            resource: false
        };
        return _this;
    }
    GameManager_1 = GameManager;
    GameManager.prototype.onLoad = function () {
        GameManager_1.$ = this;
        whevent.on(Events_1.default.LOADED_CONFIG, this.onLoadedConfig, this);
        whevent.on(Events_1.default.LOADED_RESOURCE, this.onLoadedResource, this);
    };
    GameManager.prototype.onLoadedConfig = function () {
        this.checks.config = true;
        this.checkReady();
    };
    GameManager.prototype.onLoadedResource = function () {
        this.checks.resource = true;
        this.checkReady();
    };
    GameManager.prototype.checkReady = function () {
        var ready = true;
        for (var check in this.checks) {
            if (!this.checks[check]) {
                ready = false;
                break;
            }
        }
        if (ready) {
            whevent.emit(Events_1.default.GAME_READY);
        }
    };
    GameManager.prototype.playOffline = function () {
        var text = '';
        var ids = [];
        for (var i = 0; i < HexagonManager_1.default.layerTotals[1 + 4]; i++) {
            ids.push(i);
        }
        text = WordManager_1.default.$.generateRandomLetters2(ids);
        whevent.emit(Events_1.default.GAME_START, { online: false, level: 1, time: 120, text: text });
    };
    GameManager.prototype.playOnline = function () {
        whevent.emit(Events_1.default.MULTIPLAYER);
    };
    var GameManager_1;
    GameManager.$ = null;
    GameManager = GameManager_1 = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

cc._RF.pop();