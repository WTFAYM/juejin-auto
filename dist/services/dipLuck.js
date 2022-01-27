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
const config_1 = require("../helper/config");
const request_1 = __importDefault(require("../helper/request"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("开始粘运气");
        const data = yield (0, request_1.default)({
            url: 'https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky?aid=2608',
            method: 'post',
            headers: {
                cookie: config_1.COOKIE,
            },
        });
        if (data.has_dip) {
            console.log('今天已经粘过了');
        }
        else {
            console.log("完成粘运气,获得：", data.dip_value);
        }
    }
    catch (error) {
        console.error(error);
    }
});
