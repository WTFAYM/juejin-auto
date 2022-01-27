import { COOKIE } from './../helper/config';
import request from "../helper/request";


const checkFree = async () => {
    try {
        const data: any = await request({
            url: 'https://api.juejin.cn/growth_api/v1/lottery_config/get',
            method: 'get',
            headers: {
                cookie: COOKIE,
            },
        })
        if (data.free_count === 0) {
            console.log('免费次数用完,明天再来');

            return false
        } else return true

    } catch (error) {
        console.error(error);
        return false
    }

}

export default async () => {
    try {
        console.log("开始免费抽奖");
        if (await checkFree()) {
            const data: any = await request({
                url: 'https://api.juejin.cn/growth_api/v1/lottery/draw',
                method: 'post',
                headers: {
                    cookie: COOKIE,
                },
            });
            console.log("完成免费抽奖,获得", data.lottery_name);
        }


    } catch (error) {
        console.error(error);

    }


}