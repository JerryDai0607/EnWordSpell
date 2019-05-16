(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Components/Footer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a93d3I1o0RBCqkisqruFCu2', 'Footer', __filename);
// Scripts/Components/Footer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Hexagon_1 = require("./Hexagon");
var Events_1 = require("../Misc/Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Footer = /** @class */ (function (_super) {
    __extends(Footer, _super);
    function Footer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.leftLabel = null;
        _this.rightLabel = null;
        return _this;
    }
    Footer.prototype.onLoad = function () {
        this.label = this.node.getChildByName('Label').getComponent(cc.Label);
        this.leftLabel = this.node.getChildByName('LeftLabel').getComponent(cc.Label);
        this.rightLabel = this.node.getChildByName('RightLabel').getComponent(cc.Label);
        whevent.on(Events_1.default.GAME_START, this.onGameStart, this);
        whevent.on(Events_1.default.CHAIN, this.onChain, this);
        whevent.on(Events_1.default.CORRECT, this.onCorrect, this);
    };
    Footer.prototype.onDestroy = function () {
        whevent.off(Events_1.default.GAME_START, this.onGameStart, this);
        whevent.off(Events_1.default.CHAIN, this.onChain, this);
        whevent.off(Events_1.default.CORRECT, this.onCorrect, this);
    };
    Footer.prototype.onCorrect = function (_a) {
        var me = _a.me, word = _a.word;
        var label = me ? this.leftLabel : this.rightLabel;
        label.string = word + '\n' + label.string;
    };
    Footer.prototype.onGameStart = function () {
        var text = '';
        this.label.string = text;
        this.leftLabel.string = '';
        this.rightLabel.string = '';
    };
    Footer.prototype.onChain = function (chain) {
        var text = '';
        chain.forEach(function (hexagon) { return text += hexagon.getComponent(Hexagon_1.default).content; });
        this.label.string = text;
    };
    Footer = __decorate([
        ccclass
    ], Footer);
    return Footer;
}(cc.Component));
exports.default = Footer;

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
        //# sourceMappingURL=Footer.js.map
        