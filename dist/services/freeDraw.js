"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./../helper/config");
const request_1 = __importDefault(require("../helper/request"));
const checkFree = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, request_1.default)({
            url: 'https://api.juejin.cn/growth_api/v1/lottery_config/get',
            method: 'get',
            headers: {
                cookie: config_1.COOKIE,
            },
        });
        if (data.free_count === 0) {
            console.log('免费次数用完,明天再来');
            return false;
        }
        else
            return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
});
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("开始免费抽奖");
        if (yield checkFree()) {
            const data = yield (0, request_1.default)({
                url: 'https://api.juejin.cn/growth_api/v1/lottery/draw',
                method: 'post',
                headers: {
                    cookie: config_1.COOKIE,
                },
            });
            console.log("完成免费抽奖,获得", data.lottery_name);
        }
    }
    catch (error) {
        console.error(error);
    }
});
