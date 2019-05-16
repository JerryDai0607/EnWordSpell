"use strict";
cc._RF.push(module, 'efa96thCflPY6by3CyketBR', 'MenuView');
// Scripts/Views/MenuView.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var GameManager_1 = require("../Managers/GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MenuView = /** @class */ (function (_super) {
    __extends(MenuView, _super);
    function MenuView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnOffline = null;
        _this.btnOnline = null;
        return _this;
    }
    MenuView.prototype.onLoad = function () {
        this.btnOffline.on(cc.Node.EventType.TOUCH_END, this.onClickPlayOffline, this);
        this.btnOnline.on(cc.Node.EventType.TOUCH_END, this.onClickPlayOnline, this);
        whevent.on(Events_1.default.GAME_READY, this.onGameReady, this);
        whevent.on(Events_1.default.GAME_START, this.hide, this);
        whevent.on(Events_1.default.LOST_CONNECTION, this.show, this);
        whevent.on(Events_1.default.MAIN_MENU, this.show, this);
    };
    MenuView.prototype.onDestroy = function () {
        this.btnOffline.off(cc.Node.EventType.TOUCH_END, this.onClickPlayOffline, this);
        this.btnOnline.off(cc.Node.EventType.TOUCH_END, this.onClickPlayOnline, this);
        whevent.off(Events_1.default.GAME_READY, this.onGameReady, this);
        whevent.off(Events_1.default.GAME_START, this.hide, this);
        whevent.off(Events_1.default.LOST_CONNECTION, this.show, this);
        whevent.off(Events_1.default.MAIN_MENU, this.show, this);
    };
    MenuView.prototype.start = function () {
        this.node.active = true;
        this.btnOffline.getComponent(cc.Button).interactable = false;
        this.btnOnline.getComponent(cc.Button).interactable = false;
    };
    MenuView.prototype.onClickPlayOffline = function () {
        if (!this.btnOffline.getComponent(cc.Button).interactable)
            return;
        GameManager_1.default.$.playOffline();
    };
    MenuView.prototype.onClickPlayOnline = function () {
        if (!this.btnOnline.getComponent(cc.Button).interactable)
            return;
        GameManager_1.default.$.playOnline();
    };
    MenuView.prototype.onGameStart = function () {
        this.hide();
    };
    MenuView.prototype.onGameReady = function () {
        this.btnOffline.getComponent(cc.Button).interactable = true;
        this.btnOnline.getComponent(cc.Button).interactable = true;
    };
    MenuView.prototype.show = function () {
        this.node.active = true;
    };
    MenuView.prototype.hide = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], MenuView.prototype, "btnOffline", void 0);
    __decorate([
        property(cc.Node)
    ], MenuView.prototype, "btnOnline", void 0);
    MenuView = __decorate([
        ccclass
    ], MenuView);
    return MenuView;
}(cc.Component));
exports.default = MenuView;

cc._RF.pop();