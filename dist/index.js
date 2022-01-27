"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./helper/timer");
const checkIn_1 = __importDefault(require("./services/checkIn"));
const dipLuck_1 = __importDefault(require("./services/dipLuck"));
const freeDraw_1 = __importDefault(require("./services/freeDraw"));
function autoJuejin() {
    //签到
    (0, checkIn_1.default)().then(() => {
        //抽奖
        (0, timer_1.randomSleep)().then(() => { (0, freeDraw_1.default)(); });
        //粘运气
        (0, timer_1.randomSleep)().then(() => { (0, dipLuck_1.default)(); });
    });
}
autoJuejin();
