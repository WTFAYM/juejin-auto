import { COOKIE } from '../helper/config';
import request from "../helper/request";


export default async () => {
    try {
        console.log("开始粘运气");

        const data: any = await request({
            url: 'https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky?aid=2608',
            method: 'post',
            headers: {
                cookie: COOKIE,
            },
        });
        if (data.has_dip) {
            console.log('今天已经粘过了');

        } else {
            console.log("完成粘运气,获得：", data.dip_value);
        }


    } catch (error) {
        console.error(error);

    }


}