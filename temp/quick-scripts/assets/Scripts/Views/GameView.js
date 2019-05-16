(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Views/GameView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1cf5586K6hJdLe8OjFEsoWm', 'GameView', __filename);
// Scripts/Views/GameView.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameView.prototype.onLoad = function () {
        whevent.on(Events_1.default.GAME_START, this.onGameStart, this);
        whevent.on(Events_1.default.LOST_CONNECTION, this.hide, this);
        whevent.on(Events_1.default.MAIN_MENU, this.hide, this);
    };
    GameView.prototype.onDestroy = function () {
        whevent.off(Events_1.default.GAME_START, this.onGameStart, this);
        whevent.off(Events_1.default.LOST_CONNECTION, this.hide, this);
        whevent.on(Events_1.default.MAIN_MENU, this.hide, this);
    };
    GameView.prototype.start = function () {
        this.hide();
    };
    GameView.prototype.onGameStart = function () {
        this.node.active = true;
    };
    GameView.prototype.show = function () {
        this.node.active = true;
    };
    GameView.prototype.hide = function () {
        this.node.active = false;
    };
    GameView = __decorate([
        ccclass
    ], GameView);
    return GameView;
}(cc.Component));
exports.default = GameView;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameView.js.map
        