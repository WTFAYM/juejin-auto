import { COOKIE } from '../helper/config';
import request from "../helper/request";


export interface LotteryList {
    lotteries: Lottery[];
    count: number;
}

export interface Lottery {
    user_id: string;
    history_id: string;
    user_name: string;
    user_avatar: string;
    lottery_name: string;
    lottery_image: string;
    date: number;
    dip_lucky_user_count: number;
    dip_lucky_users: DIPLuckyUser[];
}

export interface DIPLuckyUser {
    user_id: string;
    user_name: string;
    avatar_large: string;
}

export interface DIPRsp {
    dip_action: number;
    has_dip: boolean;
    total_value: number;
    dip_value: number;
}


const getLuckList = () => {
    return request({
        url: 'https://api.juejin.cn/growth_api/v1/lottery_history/global_big?aid=2608',
        method: 'post',
        data: {
            page_no: 1,
            page_size: 5
        },
        headers: {
            cookie: COOKIE,
        },
    }) as Promise<LotteryList>;
}

const dip = (lottery_history_id: string) => {
    return request({
        url: 'https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky?aid=2608',
        method: 'post',
        data: { lottery_history_id },
        headers: {
            cookie: COOKIE,
        },
    }) as Promise<DIPRsp>;
}

export default async () => {
    try {
        console.log("开始粘运气");

        const { lotteries } = await getLuckList()

        if (lotteries && lotteries.length > 0) {
            const idx = Math.floor(Math.random() * lotteries.length)
            const { history_id } = lotteries[idx]
            const data = await dip(history_id)

            if (data.has_dip) {
                console.log('今天已经粘过了');

            } else {
                console.log("完成粘运气,获得：", data.dip_value);
            }

        }



    } catch (error) {
        console.error(error);

    }


}
