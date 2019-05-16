(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Misc/Events.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '29dc8zhn1BKoImalAjKqK7F', 'Events', __filename);
// Scripts/Misc/Events.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Events = /** @class */ (function () {
    function Events() {
    }
    /**
     * When the scribble game officially started
     * @param online boolean
     * @param data
     */
    Events.GAME_START = 'GAME_START';
    /**
     * When the single player game is ready to go
     */
    Events.GAME_READY = 'GAME_READY';
    /**
     * When player clicked the play online button
     */
    Events.MULTIPLAYER = 'MULTIPLAYER';
    /**
     * When started to load config
     */
    Events.LOAD_CONFIG = 'LOAD_CONFIG';
    /**
     * When config is successfully loaded
     * @param config
     */
    Events.LOADED_CONFIG = 'LOADED_CONFIG';
    /**
     * @param name resource name
     * When started to load additional resources
     */
    Events.LOAD_RESOURCE = 'LOAD_RESOURCE';
    /**
     * When resources are successfully loaded
     * @param name resource name
     * @param data resource data
     */
    Events.LOADED_RESOURCE = 'LOADED_RESOURCE';
    /**
     * When the player's word chain changes
     * @params hexagon array
     */
    Events.CHAIN = 'CHAIN';
    /**
     * When a tip shows up
     * @param tip message, hide the tip if it's falsy
     * @param time how long will the tip be shown, less or equal than 0 is infinite
     */
    Events.TIP = 'TIP';
    /**
     * When the server is down
     */
    Events.LOST_CONNECTION = 'LOST_CONNECTION';
    /**
     * When player got something wrong
     * @param ids the hexagon ids
     * @param word the word player was trying to make
     */
    Events.WRONG = 'WRONG';
    /**
     * When player got a word
     * @param me is me got it or not
     * @param ids the hexagon ids
     * @param word the word player got
     * @param letters the replacement
     * @param score the score
     */
    Events.CORRECT = 'CORRECT';
    /**
     * Need to go to main menu
     */
    Events.MAIN_MENU = 'MAIN_MENU';
    Events = __decorate([
        ccclass
    ], Events);
    return Events;
}());
exports.default = Events;

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
        //# sourceMappingURL=Events.js.map
        