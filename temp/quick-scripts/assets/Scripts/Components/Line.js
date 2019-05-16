(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Components/Line.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e8a5fzwLXVLuIzhp7muq21Y', 'Line', __filename);
// Scripts/Components/Line.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.graphics = null;
        return _this;
    }
    Line.prototype.onLoad = function () {
        whevent.on(Events_1.default.CHAIN, this.onChain, this);
        whevent.on(Events_1.default.GAME_START, this.onGameStart, this);
        this.graphics = this.node.getComponent(cc.Graphics);
    };
    Line.prototype.onDestroy = function () {
        whevent.off(Events_1.default.CHAIN, this.onChain, this);
        whevent.off(Events_1.default.GAME_START, this.onGameStart, this);
    };
    Line.prototype.onGameStart = function () {
        this.graphics.clear();
    };
    Line.prototype.onChain = function (chain) {
        this.graphics.clear();
        for (var i = 0; i < chain.length; i++) {
            var hex = chain[i];
            if (i === 0) {
                this.graphics.moveTo(hex.x, hex.y);
            }
            else {
                this.graphics.lineTo(hex.x, hex.y);
            }
        }
        this.graphics.stroke();
    };
    Line = __decorate([
        ccclass
    ], Line);
    return Line;
}(cc.Component));
exports.default = Line;

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
        //# sourceMappingURL=Line.js.map
        