"use strict";
cc._RF.push(module, 'a4ff799z/ZASY1q08vj3xlB', 'WordManager');
// Scripts/Managers/WordManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Events_1 = require("../Misc/Events");
var Config_1 = require("./Config");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WordManager = /** @class */ (function (_super) {
    __extends(WordManager, _super);
    function WordManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.words = [];
        _this.loaded = false;
        _this.lettersChart = null;
        _this.lettersChartVowel = null;
        _this.lettersChartConsonant = null;
        _this.solvedWords = [];
        return _this;
    }
    WordManager_1 = WordManager;
    WordManager.prototype.onLoad = function () {
        var _this = this;
        WordManager_1.$ = this;
        cc.log('Loading word list');
        whevent.emit(Events_1.default.LOAD_RESOURCE, { name: 'words' });
        cc.loader.loadRes('words.json', function (err, json) {
            _this.words = json.json;
            whevent.emit(Events_1.default.LOADED_RESOURCE, { name: 'words', data: json.json });
            _this.loaded = true;
            cc.log("Loaded " + _this.words.length + " words.");
        });
    };
    WordManager.prototype.onDestroy = function () { };
    WordManager.prototype.isWord = function (word) {
        return this.words.indexOf(word) >= 0;
    };
    WordManager.prototype.generateRandomLetters = function (length) {
        if (length === void 0) { length = 1; }
        var letters = '';
        if (!this.lettersChart) {
            this.lettersChart = '';
            for (var letter in Config_1.default.frequency) {
                for (var i = 0; i < Config_1.default.frequency[letter]; i++) {
                    this.lettersChart += letter;
                }
            }
        }
        for (var i = 0; i < length; i++) {
            letters += this.lettersChart[Math.floor(this.lettersChart.length * Math.random())];
        }
        return letters;
    };
    WordManager.prototype.generateRandomLetters2 = function (ids) {
        var letters = '';
        if (!this.lettersChartVowel) {
            this.lettersChartVowel = '';
            for (var letter in Config_1.default.frequency) {
                for (var i = 0; i < Config_1.default.frequency[letter]; i++) {
                    if ('AEIOU'.indexOf(letter) >= 0)
                        this.lettersChartVowel += letter;
                }
            }
        }
        if (!this.lettersChartConsonant) {
            this.lettersChartConsonant = '';
            for (var letter in Config_1.default.frequency) {
                for (var i = 0; i < Config_1.default.frequency[letter]; i++) {
                    if ('AEIOU'.indexOf(letter) < 0)
                        this.lettersChartConsonant += letter;
                }
            }
        }
        var consonants = [0, 1, 2, 3, 4, 11, 12, 13, 14, 15, 16, 17, 26, 27, 28, 29, 30, 31, 32, 33, 34, 43, 44, 45, 46, 47, 48, 49, 56, 57, 58, 59, 60];
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            var dict = Math.random() < 0.9
                ? consonants.indexOf(id) >= 0
                    ? this.lettersChartConsonant
                    : this.lettersChartVowel
                : consonants.indexOf(id) >= 0
                    ? this.lettersChartVowel
                    : this.lettersChartConsonant;
            letters += dict[Math.floor(dict.length * Math.random())];
        }
        return letters;
    };
    var WordManager_1;
    WordManager.$ = null;
    WordManager = WordManager_1 = __decorate([
        ccclass
    ], WordManager);
    return WordManager;
}(cc.Component));
exports.default = WordManager;

cc._RF.pop();