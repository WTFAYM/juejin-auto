import { COOKIE } from '../helper/config';
import request from "../helper/request";


export default async () => {
    try {
        console.log("开始签到");

        await request({
            url: 'https://api.juejin.cn/growth_api/v1/check_in',
            method: 'post',
            headers: {
                cookie: COOKIE,
            },
        });
        console.log("完成签到");

    } catch (error) {
        console.error(error);

    }


}