(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Managers/Server.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '96d20j0rcdOZJlZNchDz0EH', 'Server', __filename);
// Scripts/Managers/Server.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var Config_1 = require("./Config");
var Signal_1 = require("../Misc/Signal");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ws = null;
        _this.pid = 0;
        return _this;
    }
    Server_1 = Server;
    Server.prototype.onLoad = function () {
        Server_1.$ = this;
        whevent.on(Events_1.default.MULTIPLAYER, this.connect, this);
        whevent.on(Signal_1.default.UUID, this.onUUID, this);
        whevent.on(Signal_1.default.JOIN, this.onJoin, this);
        whevent.on(Signal_1.default.MATCH, this.onMatch, this);
        whevent.on(Signal_1.default.LEAVE, this.onLeave, this);
        whevent.on(Signal_1.default.CORRECT, this.onCorrect, this);
        whevent.on(Signal_1.default.WRONG, this.onWrong, this);
        whevent.on(Signal_1.default.RESULT, this.onResult, this);
    };
    Server.prototype.onDestroy = function () {
        whevent.off(Events_1.default.MULTIPLAYER, this.connect, this);
        whevent.off(Signal_1.default.JOIN, this.onJoin, this);
        whevent.off(Signal_1.default.MATCH, this.onMatch, this);
        whevent.off(Signal_1.default.LEAVE, this.onLeave, this);
        whevent.off(Signal_1.default.CORRECT, this.onCorrect, this);
        whevent.off(Signal_1.default.WRONG, this.onWrong, this);
        whevent.off(Signal_1.default.RESULT, this.onResult, this);
    };
    Server.prototype.connect = function () {
        whevent.emit(Events_1.default.TIP, { message: 'Connecting...', time: 0 });
        this.ws = new WebSocket(Config_1.default.server);
        this.ws.addEventListener('open', this.onOpen.bind(this));
        this.ws.addEventListener('message', this.onMessage.bind(this));
        this.ws.addEventListener('close', this.onClose.bind(this));
    };
    Server.prototype.onOpen = function () {
        whevent.emit(Events_1.default.TIP);
        cc.log('Connected to the server!');
        this.send(Signal_1.default.MATCH, { level: 0 });
    };
    Server.prototype.onClose = function () {
        whevent.emit(Events_1.default.TIP, { message: 'Disconnected from server!' });
        cc.log('Disconnected from the server!');
        this.ws.removeEventListener('open', this.onOpen.bind(this));
        this.ws.removeEventListener('message', this.onMessage.bind(this));
        this.ws.removeEventListener('close', this.onClose.bind(this));
        whevent.emit(Events_1.default.LOST_CONNECTION);
    };
    Server.prototype.onMessage = function (_a) {
        var data = _a.data;
        var pack = JSON.parse(atob(data));
        whevent.emit(pack.signal, pack.data);
        cc.log('%cRECEIVE:', 'color:#4A3;', pack.signal, pack.data);
    };
    Server.prototype.send = function (signal, data) {
        cc.log('%cSENDING:', 'color:#36F;', signal, data);
        this.ws.send(btoa(JSON.stringify({ signal: signal, data: data })));
    };
    Server.prototype.onUUID = function (uuid) {
        this.pid = uuid;
        whevent.emit(Events_1.default.TIP, { message: 'Connected to server!' });
    };
    Server.prototype.onJoin = function (uuid) {
        whevent.emit(Events_1.default.TIP, { message: 'Searching for opponents...', time: 0 });
    };
    Server.prototype.onMatch = function (_a) {
        var level = _a.level, text = _a.text, time = _a.time;
        whevent.emit(Events_1.default.GAME_START, { online: true, level: level, text: text, time: time });
        whevent.emit(Events_1.default.TIP);
    };
    Server.prototype.onLeave = function (uuid) {
        whevent.emit(Events_1.default.TIP, { message: 'Your Opponent has left!' });
    };
    Server.prototype.onCorrect = function (_a) {
        var uuid = _a.uuid, ids = _a.ids, word = _a.word, letters = _a.letters, score = _a.score;
        whevent.emit(Events_1.default.CORRECT, { me: this.pid === uuid, ids: ids, word: word, letters: letters, score: score });
    };
    Server.prototype.onWrong = function (_a) {
        var uuid = _a.uuid, ids = _a.ids, word = _a.word;
        if (uuid !== this.pid)
            return;
        whevent.emit(Events_1.default.WRONG, { ids: ids, word: word });
    };
    Server.prototype.onResult = function (_a) {
        var interrupted = _a.interrupted, score = _a.score;
        var myScore = 0;
        var theirScore = 0;
        for (var id in score) {
            if (parseInt(id) === this.pid) {
                myScore = score[id].score;
            }
            else {
                theirScore = score[id].score;
            }
        }
        if (!interrupted) {
            if (myScore > theirScore) {
                whevent.emit(Events_1.default.TIP, { message: 'Winner!' });
            }
            else if (myScore < theirScore) {
                whevent.emit(Events_1.default.TIP, { message: 'Good effort!' });
            }
            else {
                whevent.emit(Events_1.default.TIP, { message: 'Draw!' });
            }
        }
        setTimeout(function () {
            whevent.emit(Events_1.default.MAIN_MENU);
        }, 2000);
    };
    var Server_1;
    Server.$ = null;
    Server = Server_1 = __decorate([
        ccclass
    ], Server);
    return Server;
}(cc.Component));
exports.default = Server;

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
        //# sourceMappingURL=Server.js.map
        