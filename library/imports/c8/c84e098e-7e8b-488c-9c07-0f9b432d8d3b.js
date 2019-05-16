"use strict";
cc._RF.push(module, 'c84e0mOfotIjJwHD5tDLY07', 'Timer');
// Scripts/Components/Timer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var HexagonManager_1 = require("../Managers/HexagonManager");
var Signal_1 = require("../Misc/Signal");
var PlayerTag_1 = require("./PlayerTag");
var Server_1 = require("../Managers/Server");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.time = 0;
        _this.timer = null;
        return _this;
    }
    Timer.prototype.onLoad = function () {
        this.label = this.node.getComponent(cc.Label);
        whevent.on(Events_1.default.GAME_START, this.onGameStart, this);
    };
    Timer.prototype.onDestroy = function () {
        whevent.off(Events_1.default.GAME_START, this.onGameStart, this);
    };
    Timer.prototype.onGameStart = function (_a) {
        var _this = this;
        var time = _a.time;
        this.time = time;
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(function () {
            _this.time--;
            if (_this.time < 0) {
                _this.time = 0;
                clearInterval(_this.timer);
                _this.timer = null;
                if (!HexagonManager_1.default.$.online) {
                    var result = { interrupted: false, score: {} };
                    result.score[Server_1.default.$.pid] = {};
                    result.score[Server_1.default.$.pid + 1] = {};
                    result.score[Server_1.default.$.pid].score = PlayerTag_1.default.me.score;
                    result.score[Server_1.default.$.pid + 1].score = 0;
                    whevent.emit(Signal_1.default.RESULT, result);
                }
            }
            _this.label.string = _this.time + '';
        }, 1000);
    };
    Timer = __decorate([
        ccclass
    ], Timer);
    return Timer;
}(cc.Component));
exports.default = Timer;

cc._RF.pop();