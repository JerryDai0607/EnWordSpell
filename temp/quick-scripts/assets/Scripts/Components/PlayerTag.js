(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Components/PlayerTag.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9324eDT8AdAMod88st1seY5', 'PlayerTag', __filename);
// Scripts/Components/PlayerTag.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayerTag = /** @class */ (function (_super) {
    __extends(PlayerTag, _super);
    function PlayerTag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.scoreLabel = null;
        _this.me = false;
        _this.score = 0;
        return _this;
    }
    PlayerTag_1 = PlayerTag;
    PlayerTag.prototype.onLoad = function () {
        whevent.on(Events_1.default.GAME_START, this.onGameStart, this);
        whevent.on(Events_1.default.CORRECT, this.onCorrect, this);
        this.nameLabel = this.node.getChildByName('Username').getComponent(cc.Label);
        this.scoreLabel = this.node.getChildByName('Score').getComponent(cc.Label);
        if (this.me) {
            PlayerTag_1.me = this;
        }
        else {
            PlayerTag_1.opponent = this;
        }
    };
    PlayerTag.prototype.onDestroy = function () {
        whevent.off(Events_1.default.GAME_START, this.onGameStart, this);
        whevent.off(Events_1.default.CORRECT, this.onCorrect, this);
    };
    PlayerTag.prototype.onGameStart = function (_a) {
        var online = _a.online;
        this.score = 0;
        if (!this.me && !online) {
            this.node.active = false;
        }
        else {
            this.node.active = true;
        }
        this.updateScore();
    };
    PlayerTag.prototype.onCorrect = function (_a) {
        var me = _a.me, score = _a.score;
        if (me === this.me) {
            this.score += score;
            this.updateScore();
        }
    };
    PlayerTag.prototype.updateScore = function () {
        this.scoreLabel.string = this.score + '';
    };
    var PlayerTag_1;
    PlayerTag.me = null;
    PlayerTag.opponent = null;
    __decorate([
        property
    ], PlayerTag.prototype, "me", void 0);
    PlayerTag = PlayerTag_1 = __decorate([
        ccclass
    ], PlayerTag);
    return PlayerTag;
}(cc.Component));
exports.default = PlayerTag;

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
        //# sourceMappingURL=PlayerTag.js.map
        