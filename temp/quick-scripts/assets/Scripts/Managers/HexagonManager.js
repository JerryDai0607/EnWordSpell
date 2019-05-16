(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Managers/HexagonManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7660f6tyvRLXJJYAGpn3TEi', 'HexagonManager', __filename);
// Scripts/Managers/HexagonManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Hexagon_1 = require("../Components/Hexagon");
var Events_1 = require("../Misc/Events");
var WordManager_1 = require("./WordManager");
var Config_1 = require("./Config");
var Server_1 = require("./Server");
var Signal_1 = require("../Misc/Signal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HexagonManager = /** @class */ (function (_super) {
    __extends(HexagonManager, _super);
    function HexagonManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hexagonPrefab = null;
        _this.hexagonContainer = null;
        _this.hexagons = [];
        _this.hexagonMap = [];
        _this.letters = '';
        _this.gap = 0;
        _this.layers = 5;
        _this._totalColumns = 0;
        _this._hexagonWidth = 0;
        _this._hexagonHeight = 0;
        _this._distX = 0;
        _this._distY = 0;
        _this.hexagonChain = [];
        _this.online = false;
        _this.controllable = false;
        return _this;
    }
    HexagonManager_1 = HexagonManager;
    HexagonManager.prototype.onLoad = function () {
        HexagonManager_1.$ = this;
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        whevent.on(Events_1.default.GAME_START, this.onGameStart, this);
        whevent.on(Events_1.default.WRONG, this.onWrong, this);
        whevent.on(Events_1.default.CORRECT, this.onCorrect, this);
        if (!this.hexagonContainer) {
            this.hexagonContainer = this.node;
        }
    };
    HexagonManager.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        whevent.off(Events_1.default.GAME_START, this.onGameStart, this);
        whevent.off(Events_1.default.WRONG, this.onWrong, this);
        whevent.off(Events_1.default.CORRECT, this.onCorrect, this);
    };
    HexagonManager.prototype.onLayerChange = function (layer) {
        if (layer === this.layers)
            return;
        this.layers = layer;
        this.buildHexagons();
    };
    HexagonManager.prototype.onGapChange = function (gap) {
        if (gap === this.gap)
            return;
        this.gap = gap;
        this.buildHexagons();
    };
    HexagonManager.prototype.onWrong = function (_a) {
        var _this = this;
        var ids = _a.ids, word = _a.word;
        this.controllable = true;
        ids.forEach(function (id) {
            var hexagon = _this.getHexagonById(id);
            if (hexagon) {
                hexagon.getComponent(Hexagon_1.default).deactivate(false);
            }
        });
        this.hexagonChain.length = 0;
        this.chainUpdated();
    };
    HexagonManager.prototype.onCorrect = function (_a) {
        var _this = this;
        var me = _a.me, ids = _a.ids, word = _a.word, letters = _a.letters;
        this.controllable = true;
        var arr = this.letters.split('');
        ids.forEach(function (id, index) {
            arr[id] = letters[index];
            var hex = _this.getHexagonById(id);
            if (hex) {
                hex.getComponent(Hexagon_1.default).deactivate(true, letters[index], me);
            }
        });
        this.letters = arr.join('');
        if (me) {
            this.hexagonChain.length = 0;
            this.chainUpdated();
        }
        else {
            var collided = false;
            var myIds_1 = [];
            this.hexagonChain.forEach(function (hexagon) {
                myIds_1.push(hexagon.getComponent(Hexagon_1.default).id);
            });
            for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                var id = ids_1[_i];
                if (myIds_1.indexOf(id) >= 0) {
                    collided = true;
                    break;
                }
            }
            if (collided) {
                this.clearChain(true);
            }
        }
    };
    HexagonManager.prototype.onTouchStart = function (e) {
        if (!this.controllable)
            return;
        var pos = this.node.convertToNodeSpaceAR(e.touch.getLocation());
        var hexagon = this.getHexagonByPosition(pos);
        this.addToChain(hexagon);
    };
    HexagonManager.prototype.onTouchMove = function (e) {
        if (!this.controllable)
            return;
        var pos = this.node.convertToNodeSpaceAR(e.touch.getLocation());
        var hexagon = this.getHexagonByPosition(pos);
        this.addToChain(hexagon);
    };
    HexagonManager.prototype.onTouchEnd = function (e) {
        if (!this.controllable)
            return;
        this.clearChain();
    };
    HexagonManager.prototype.clearChain = function (force) {
        var _this = this;
        if (force || this.hexagonChain.length <= 2) {
            this.hexagonChain.forEach(function (hexagon) {
                hexagon.getComponent(Hexagon_1.default).deactivate();
            });
            this.hexagonChain.length = 0;
            this.chainUpdated();
        }
        else {
            this.controllable = false;
            if (!this.online) {
                var text_1 = '';
                this.hexagonChain.forEach(function (hexagon) {
                    text_1 += hexagon.getComponent(Hexagon_1.default).content;
                });
                var isWord = WordManager_1.default.$.isWord(text_1.toLowerCase());
                var ids_2 = [];
                this.hexagonChain.forEach(function (hexagon) {
                    ids_2.push(hexagon.getComponent(Hexagon_1.default).id);
                });
                if (isWord) {
                    var letters = WordManager_1.default.$.generateRandomLetters2(ids_2);
                    var score = Config_1.default.scoreMap[text_1.length < Config_1.default.scoreMap.length ? text_1.length : Config_1.default.scoreMap.length - 1];
                    whevent.emit(Events_1.default.CORRECT, { me: true, ids: ids_2, word: text_1, letters: letters, score: score });
                }
                else {
                    var word_1 = '';
                    ids_2.forEach(function (id) {
                        word_1 += _this.letters[id];
                    });
                    whevent.emit(Events_1.default.WRONG, { ids: ids_2, word: word_1 });
                }
                this.hexagonChain.length = 0;
                this.chainUpdated();
            }
            else {
                var ids_3 = [];
                this.hexagonChain.forEach(function (hexagon) {
                    ids_3.push(hexagon.getComponent(Hexagon_1.default).id);
                });
                Server_1.default.$.send(Signal_1.default.VALIDATE, ids_3);
            }
        }
    };
    HexagonManager.prototype.onGameStart = function (_a) {
        var online = _a.online, text = _a.text, level = _a.level;
        this.online = online;
        this.letters = text;
        this.layers = level + 4;
        this.buildHexagons();
        whevent.emit(Events_1.default.TIP, { message: 'Game Start!', time: 1000 });
        this.controllable = true;
        this.clearChain();
    };
    HexagonManager.prototype.buildHexagons = function () {
        this.hexagonContainer.destroyAllChildren();
        this.hexagons = [];
        this.hexagonMap = [];
        this._hexagonWidth = 0;
        this._hexagonHeight = 0;
        this._distX = 0;
        this._distY = 0;
        this._totalColumns = (this.layers - 1) * 2 + 1;
        var id = 0;
        for (var column = 0; column < this._totalColumns; column++) {
            this.hexagonMap[column] = [];
            var columnTotal = this.layers + (column < this.layers - 1 ? column : (this.layers - 1) * 2 - column);
            for (var row = 0; row < columnTotal; row++) {
                var hexagon = cc.instantiate(this.hexagonPrefab);
                hexagon.parent = this.hexagonContainer;
                hexagon.width = 70 + 24 * (5 - this.layers);
                hexagon.height = 70 + 24 * (5 - this.layers);
                hexagon.getChildByName('Label').getComponent(cc.Label).fontSize = 45 + 15 * (5 - this.layers);
                this.hexagons.push(hexagon);
                this.hexagonMap[column].push(hexagon);
                if (!this._hexagonWidth) {
                    this._hexagonWidth = hexagon.width;
                    this._hexagonHeight = Math.sqrt(Math.pow(0.5 * this._hexagonWidth, 2) - Math.pow(0.5 * 0.5 * this._hexagonWidth, 2)) * 2;
                    this._distX = 0.75 * this._hexagonWidth + this.gap;
                    this._distY = this._hexagonHeight + this.gap;
                }
                var x = -(this._distX * (this._totalColumns - 1)) * 0.5 + this._distX * column;
                var y = -(this._distY * (columnTotal - 1)) * 0.5 + this._distY * row;
                hexagon.zIndex = -y;
                hexagon.getComponent(Hexagon_1.default).setPosition(new cc.Vec2(x, y));
                this.initHexagon(hexagon, id, this.letters[id], column, row);
                id++;
            }
        }
    };
    HexagonManager.prototype.chainUpdated = function () {
        whevent.emit(Events_1.default.CHAIN, this.hexagonChain);
    };
    HexagonManager.prototype.initHexagon = function (hexagon, id, letter, column, row) {
        hexagon.getComponent(Hexagon_1.default).setId(id);
        hexagon.getComponent(Hexagon_1.default).setColumnAndRow(column, row);
        hexagon.getComponent(Hexagon_1.default).setContent(letter);
    };
    HexagonManager.prototype.addToChain = function (hexagon) {
        if (!hexagon)
            return;
        var index = this.hexagonChain.indexOf(hexagon);
        if (index < 0) {
            if (this.hexagonChain.length === 0 || this.isAdjacent(hexagon, this.hexagonChain[this.hexagonChain.length - 1])) {
                this.hexagonChain.push(hexagon);
                hexagon.getComponent(Hexagon_1.default).activate();
            }
        }
        else if (index < this.hexagonChain.length - 1) {
            for (var i = index + 1; i < this.hexagonChain.length; i++) {
                this.hexagonChain[i].getComponent(Hexagon_1.default).deactivate();
            }
            this.hexagonChain.splice(index + 1);
        }
        else {
            return;
        }
        this.chainUpdated();
    };
    HexagonManager.prototype.getHexagonById = function (id) {
        return this.hexagons[id];
    };
    HexagonManager.prototype.getHexagonByCell = function (column, row) {
        if (this.hexagonMap[column]) {
            return this.hexagonMap[column][row];
        }
        else {
            return null;
        }
    };
    HexagonManager.prototype.getHexagonByPosition = function (pos) {
        var _this = this;
        return this.hexagons.find(function (hexagon) { return Math.sqrt(Math.pow(hexagon.x - pos.x, 2) + Math.pow(hexagon.y - pos.y, 2)) <= _this._distY * 0.5; });
    };
    HexagonManager.prototype.isAdjacent = function (hex1, hex2) {
        var dist = Utils.distance(hex1.getPosition(), hex2.getPosition());
        return dist <= this._distY * 1.5;
    };
    var HexagonManager_1;
    HexagonManager.$ = null;
    HexagonManager.layerTotals = [0, 1, 7, 19, 37, 61, 91];
    __decorate([
        property(cc.Prefab)
    ], HexagonManager.prototype, "hexagonPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], HexagonManager.prototype, "hexagonContainer", void 0);
    HexagonManager = HexagonManager_1 = __decorate([
        ccclass
    ], HexagonManager);
    return HexagonManager;
}(cc.Component));
exports.default = HexagonManager;

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
        //# sourceMappingURL=HexagonManager.js.map
        