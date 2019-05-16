"use strict";
cc._RF.push(module, '3c1454+pHBIWJMIKJZOkpZI', 'Config');
// Scripts/Managers/Config.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Config = /** @class */ (function (_super) {
    __extends(Config, _super);
    function Config() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Config_1 = Config;
    Config.prototype.loadConfig = function () {
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes('config.json', function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data.json);
                }
            });
        });
    };
    Config.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        whevent.emit(Events_1.default.LOAD_CONFIG);
                        return [4 /*yield*/, this.loadConfig()];
                    case 1:
                        config = _a.sent();
                        Config_1.frequency = config.frequency;
                        Config_1.scoreMap = config.scoreMap;
                        Config_1.server = config.server;
                        whevent.emit(Events_1.default.LOADED_CONFIG, config);
                        return [2 /*return*/];
                }
            });
        });
    };
    var Config_1;
    Config.frequency = null;
    Config.scoreMap = null;
    Config.server = null;
    Config = Config_1 = __decorate([
        ccclass
    ], Config);
    return Config;
}(cc.Component));
exports.default = Config;

cc._RF.pop();