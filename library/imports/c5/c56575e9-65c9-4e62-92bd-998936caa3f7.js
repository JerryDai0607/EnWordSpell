"use strict";
cc._RF.push(module, 'c5657XpZclOYpK9mYk2yqP3', 'TipView');
// Scripts/Views/TipView.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TipView = /** @class */ (function (_super) {
    __extends(TipView, _super);
    function TipView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.background = null;
        _this.label = null;
        _this.showing = false;
        _this.timer = null;
        return _this;
    }
    TipView.prototype.onLoad = function () {
        this.background = this.node.getChildByName('BG');
        this.label = this.node.getChildByName('Label').getComponent(cc.Label);
        whevent.on(Events_1.default.TIP, this.onTip, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this);
        this.node.active = false;
    };
    TipView.prototype.onDestroy = function () {
        whevent.off(Events_1.default.TIP, this.onTip, this);
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this);
    };
    TipView.prototype.onTouch = function () {
    };
    TipView.prototype.onTip = function (data) {
        if (!data || !data.message) {
            this.hide();
        }
        else {
            var time = 2000;
            if (data.time !== undefined) {
                time = data.time;
            }
            this.show(data.message, time);
        }
    };
    TipView.prototype.show = function (message, time) {
        this.showing = true;
        this.node.active = true;
        this.label.string = message;
        Wheen.stop(this.background);
        new Wheen(this.background).to({ opacity: 180 }, 200).start();
        Wheen.stop(this.label.node);
        new Wheen(this.label.node).to({ opacity: 255 }, 200).start();
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (time > 0) {
            this.timer = setTimeout(this.hide.bind(this), time);
        }
    };
    TipView.prototype.hide = function () {
        var _this = this;
        this.showing = false;
        Wheen.stop(this.background);
        new Wheen(this.background).to({ opacity: 0 }, 200).start();
        Wheen.stop(this.label.node);
        new Wheen(this.label.node)
            .to({ opacity: 0 }, 200)
            .callFunc(function () {
            _this.node.active = false;
        })
            .start();
    };
    TipView = __decorate([
        ccclass
    ], TipView);
    return TipView;
}(cc.Component));
exports.default = TipView;

cc._RF.pop();