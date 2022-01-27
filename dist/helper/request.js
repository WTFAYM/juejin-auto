"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function request(options) {
    return new Promise((resolve, reject) => {
        (0, axios_1.default)(merge(options)).then((res) => {
            let data = res.data || {};
            // console.log(data);
            if (data.err_no === 0 || data.code === 0) {
                resolve(data.data);
            }
            else {
                data.err_msg && reject(data.err_msg);
            }
        });
    });
}
exports.default = request;
;
const defaultOptions = {
    method: 'GET',
    data: {},
    params: {},
    headers: {
        origin: 'https://juejin.cn',
        pragma: 'no-cache',
        referer: 'https://juejin.cn/',
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
    },
};
function merge(options) {
    let target = Object.assign({}, defaultOptions);
    for (const key of Object.keys(options)) {
        const findKey = Object.keys(defaultOptions).find(targetKey => targetKey === key);
        //默认没有 直接添加
        if (!findKey) {
            target[key] = options[key];
        }
        // key存在
        else {
            const value = target[findKey];
            if (typeof value === 'object') {
                target[findKey] = Object.assign(Object.assign({}, target[findKey]), options[findKey]);
            }
            else {
                target[findKey] = options[findKey];
            }
        }
    }
    // console.log('request', { target });
    return target;
}
