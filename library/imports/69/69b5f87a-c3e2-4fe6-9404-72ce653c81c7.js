"use strict";
cc._RF.push(module, '69b5fh6w+JP5pQEcs5lPIHH', 'Hexagon');
// Scripts/Components/Hexagon.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayerTag_1 = require("./PlayerTag");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Hexagon = /** @class */ (function (_super) {
    __extends(Hexagon, _super);
    function Hexagon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        _this.content = null;
        _this.column = null;
        _this.row = null;
        // Color settings
        _this.color = new cc.Color(233, 233, 233, 255);
        _this.normalColor = new cc.Color(233, 233, 233, 255);
        _this.activateColor = new cc.Color(100, 150, 240, 255);
        _this.incorrectColor = new cc.Color(230, 75, 30, 255);
        _this.correctColor = new cc.Color(100, 255, 0, 255);
        _this.opponentColor = new cc.Color(150, 150, 150, 255);
        _this.textColor = new cc.Color(100, 100, 100, 255);
        _this.textNormalColor = new cc.Color(100, 100, 100, 255);
        _this.textActivateColor = new cc.Color(255, 255, 255, 255);
        _this.textIncorrectColor = new cc.Color(255, 255, 255, 255);
        _this.textCorrectColor = new cc.Color(20, 50, 0, 255);
        _this.brightness = 1;
        _this._updatingColor = false;
        _this.background = null;
        _this.label = null;
        _this.activated = false;
        _this.orgPos = null;
        _this.locked = false;
        return _this;
    }
    Hexagon.prototype.onLoad = function () {
        this.background = this.node.getChildByName('Background');
        this.label = this.node.getChildByName('Label').getComponent(cc.Label);
    };
    Hexagon.prototype.start = function () {
        this.node.scale = 0;
        new Wheen(this.node)
            .wait(300 * Math.random())
            .to({ scale: 1.1 }, 200, Wheen.Easing.Cubic.easeOut)
            .to({ scale: 1 }, 150, Wheen.Easing.Cubic.easeOut)
            .start();
    };
    Hexagon.prototype.setPosition = function (pos) {
        this.node.setPosition(pos);
        this.orgPos = new cc.Vec2(this.node.x, this.node.y);
    };
    Hexagon.prototype.setId = function (id) {
        this.id = id;
    };
    Hexagon.prototype.setColumnAndRow = function (column, row) {
        this.column = column;
        this.row = row;
        this.brightness = column % 2 === 0 ? 1 : 0.95;
        this.color = new cc.Color(this.color.getR() * this.brightness, this.color.getG() * this.brightness, this.color.getB() * this.brightness, 255);
        this.normalColor = new cc.Color(this.normalColor.getR() * this.brightness, this.normalColor.getG() * this.brightness, this.normalColor.getB() * this.brightness, 255);
        this.activateColor = new cc.Color(this.activateColor.getR() * this.brightness, this.activateColor.getG() * this.brightness, this.activateColor.getB() * this.brightness, 255);
        this.incorrectColor = new cc.Color(this.incorrectColor.getR() * this.brightness, this.incorrectColor.getG() * this.brightness, this.incorrectColor.getB() * this.brightness, 255);
        this.correctColor = new cc.Color(this.correctColor.getR() * this.brightness, this.correctColor.getG() * this.brightness, this.correctColor.getB() * this.brightness, 255);
        this.textColor = new cc.Color(this.textColor.getR() * this.brightness, this.textColor.getG() * this.brightness, this.textColor.getB() * this.brightness, 255);
        this.textActivateColor = new cc.Color(this.textActivateColor.getR() * this.brightness, this.textActivateColor.getG() * this.brightness, this.textActivateColor.getB() * this.brightness, 255);
        this.textCorrectColor = new cc.Color(this.textCorrectColor.getR() * this.brightness, this.textCorrectColor.getG() * this.brightness, this.textCorrectColor.getB() * this.brightness, 255);
        this.textIncorrectColor = new cc.Color(this.textIncorrectColor.getR() * this.brightness, this.textIncorrectColor.getG() * this.brightness, this.textIncorrectColor.getB() * this.brightness, 255);
        this.textNormalColor = new cc.Color(this.textNormalColor.getR() * this.brightness, this.textNormalColor.getG() * this.brightness, this.textNormalColor.getB() * this.brightness, 255);
        this.background.color = this.color;
        this.label.node.color = this.textColor;
    };
    Hexagon.prototype.setContent = function (content) {
        this.content = content;
        this.label.string = content;
    };
    Hexagon.prototype.update = function () {
        if (this._updatingColor && this.background) {
            this.background.color = this.color;
            this.label.node.color = this.textColor;
        }
    };
    Hexagon.prototype.activate = function () {
        var _this = this;
        if (this.activated || this.locked)
            return;
        this.activated = true;
        this._updatingColor = true;
        this.node.scale = 1;
        Wheen.stop(this.textColor);
        new Wheen(this.textColor).to(this.textActivateColor, 200).start();
        Wheen.stop(this.color);
        new Wheen(this.color)
            .to(this.activateColor, 200)
            .wait(100)
            .callFunc(function () { return (_this._updatingColor = false); })
            .start();
        Wheen.stop(this.node);
        new Wheen(this.node)
            .to({ y: this.orgPos.y + 10 }, 10, Wheen.Easing.Cubic.easeOut)
            .to({ y: this.orgPos.y }, 100, Wheen.Easing.Cubic.easeIn)
            .to({ y: this.orgPos.y + 2 }, 100, Wheen.Easing.Cubic.easeOut)
            .to({ y: this.orgPos.y }, 100, Wheen.Easing.Cubic.easeIn)
            .start();
    };
    Hexagon.prototype.deactivate = function (success, replace, me) {
        var _this = this;
        if (me === void 0) { me = true; }
        this.activated = false;
        this._updatingColor = true;
        if (success === undefined) {
            new Wheen(this.node).to({ x: this.orgPos.x }, 50, Wheen.Easing.Cubic.easeOut).start();
            Wheen.stop(this.textColor);
            new Wheen(this.textColor).to(this.textNormalColor, 200).start();
            Wheen.stop(this.color);
            new Wheen(this.color)
                .to(this.normalColor, 200)
                .wait(50)
                .callFunc(function () { return (_this._updatingColor = false); })
                .start();
        }
        else if (!success) {
            new Wheen(this.node)
                .to({ x: this.orgPos.x - 2 }, 30, Wheen.Easing.Cubic.easeOut)
                .to({ x: this.orgPos.x + 2 }, 30, Wheen.Easing.Cubic.easeOut)
                .loop(2)
                .to({ x: this.orgPos.x }, 50, Wheen.Easing.Cubic.easeOut)
                .start();
            Wheen.stop(this.textColor);
            new Wheen(this.textColor)
                .to(this.textIncorrectColor, 10)
                .to(this.textNormalColor, 500)
                .start();
            Wheen.stop(this.color);
            new Wheen(this.color)
                .to(this.incorrectColor, 10)
                .to(this.normalColor, 500)
                .wait(100)
                .callFunc(function () {
                _this._updatingColor = false;
            })
                .start();
        }
        else {
            this.locked = true;
            this.content = replace;
            this.node.x = this.orgPos.x;
            Wheen.stop(this.node);
            var posMe = this.node.parent.convertToNodeSpaceAR(PlayerTag_1.default.me.node.parent.convertToWorldSpaceAR(PlayerTag_1.default.me.node.getPosition()));
            var posOpponent = this.node.parent.convertToNodeSpaceAR(PlayerTag_1.default.opponent.node.parent.convertToWorldSpaceAR(PlayerTag_1.default.opponent.node.getPosition()));
            var pos = me ? posMe : posOpponent;
            new Wheen(this.node)
                .wait(Math.random() * 100)
                .to({ x: this.node.x, y: this.node.y + 10 }, 200, Wheen.Easing.Cubic.easeIn)
                .wait(100 + Math.random() * 200)
                .to({ x: pos.x, y: pos.y, scale: 0.5 }, 500, Wheen.Easing.Cubic.easeOut)
                .callFunc(function () {
                _this.node.scale = 0;
                _this.label.string = _this.content;
                _this.node.x = _this.orgPos.x;
                _this.node.y = _this.orgPos.y;
            })
                .to({ scale: 1 }, 300, Wheen.Easing.Cubic.easeOut)
                .callFunc(function () {
                _this.locked = false;
                if (_this.activated) {
                    _this.color = _this.activateColor;
                    _this.textColor = _this.textActivateColor;
                    _this.background.color = _this.color;
                    _this.label.node.color = _this.textColor;
                }
            })
                .start();
            if (me) {
                Wheen.stop(this.textColor);
                new Wheen(this.textColor)
                    .to(this.textCorrectColor, 10)
                    .to(this.textNormalColor, 500)
                    .start();
                Wheen.stop(this.color);
                new Wheen(this.color)
                    .to(this.correctColor, 10)
                    .to(this.normalColor, 500)
                    .wait(100)
                    .callFunc(function () { return (_this._updatingColor = false); })
                    .start();
            }
            else {
                Wheen.stop(this.color);
                new Wheen(this.color)
                    .to(this.opponentColor, 10)
                    .to(this.normalColor, 500)
                    .wait(100)
                    .callFunc(function () { return (_this._updatingColor = false); })
                    .start();
            }
        }
    };
    Hexagon = __decorate([
        ccclass
    ], Hexagon);
    return Hexagon;
}(cc.Component));
exports.default = Hexagon;

cc._RF.pop();