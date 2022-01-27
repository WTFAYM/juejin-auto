import { randomSleep } from './../helper/timer';
import { COOKIE, firstData, TOKEN } from "../helper/config";
import request from "../helper/request";
import { getXGameId } from '../helper/shared';

const getUser = () => {
    return request({
        url: 'https://api.juejin.cn/user_api/v1/user/get',
        method: 'get',
        headers: {
            cookie: COOKIE,
        },
    });
}


const start = (params: Record<string, any>, uid: number | string, time: number) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/game/start?uid=${uid}&time=${time}`,
        method: "post",
        data: params,
        headers: {
            authorization: TOKEN,
        },
    });
}

const getGameInfo = (uid: number | string, time: number) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/home/info?uid=${uid}&time=${time}`,
        method: "get",
        headers: {
            'authorization': TOKEN,
        },
    });
}
const over = (params: Record<string, any>, uid: number | string, time: number) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/game/over?uid=${uid}&time=${time}`,
        method: "post",
        data: params,
        headers: {
            authorization: TOKEN,
        },
    });
}

const freshMap = (params: Record<string, any>, uid: number | string, time: number) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/game/fresh_map?uid=${uid}&time=${time}`,
        method: "post",
        data: params,
        headers: {
            authorization: TOKEN,
        },
    });
}


/**
   * 发布指令
   * @param params
   * @param uid
   * @param time
   * @param xGameId
   * @returns {Promise<unknown>}
   */
const command = (params: Record<string, any>, uid: number | string, time: number, xGameId: string) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/game/command?uid=${uid}&time=${time}`,
        method: "post",
        data: params,
        headers: {
            authorization: TOKEN,
            "Content-Type": "application/json;charset=UTF-8",
            "x-tt-gameid": xGameId,
        },
    });
}
/* 彩蛋 */
const pico = (params: Record<string, any>, uid: number | string, time: number) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/game/pico?uid=${uid}&time=${time}`,
        method: "post",
        data: params,
        headers: {
            authorization: TOKEN,
            "Content-Type": "application/json;charset=UTF-8",
        },
    });
}
/**
 * 获取记录
 * @param uid
 * @param time
 * @returns {Promise<unknown>}
 */
const record = (uid: number | string, time: number) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/user/record?uid=${uid}&time=${time}`,
        method: "get",
        headers: {
            authorization: TOKEN,
        },
    });

}


export class Mining {
    uid = ''
    gameId = ''
    deep = 0
    todayDiamond = 0
    todayLimitDiamond = 0

    async getInfo() {
        const time = new Date().getTime();
        // 获取用户信息
        const userInfo = await getUser();
        //@ts-ignore
        this.uid = userInfo.user_id;
        const resInfo: any = await getGameInfo(this.uid, time);
        this.deep = resInfo.gameInfo ? resInfo.gameInfo.deep : 0;
        this.gameId = resInfo.gameInfo ? resInfo.gameInfo.gameId : 0;
        this.todayDiamond = resInfo.userInfo.todayDiamond || 0;
        this.todayLimitDiamond = resInfo.userInfo.todayLimitDiamond;
        return Promise.resolve(resInfo);
    }

    async playGame() {
        try {
            // 开始
            const startTime = new Date().getTime();
            const startParams = {
                roleId: 3,
            };
            const startData: any = await start(startParams, this.uid, startTime);
            await randomSleep();
            console.log('startData', startData);
            this.gameId = startData.gameId;
            // 发起指令
            const commandTime = +new Date().getTime();
            const commandParams = {
                command: firstData.command,
            };
            const xGameId = getXGameId(this.gameId);
            const commandData: any = command(commandParams, this.uid, commandTime, xGameId);
            this.deep = commandData.curPos.y;
            await randomSleep();
            console.log('commandData', commandData);
            // 结束
            const overTime = +new Date().getTime();
            const overParams = {
                isButton: 1,
            };
            const overData: any = await over(overParams, this.uid, overTime);
            await randomSleep();
            console.log('overData', overData);
            this.deep = overData.deep;
            // 更换地图
            const mapTime = +new Date().getTime();
            if (this.deep < 500) {
                await randomSleep();
                await freshMap({}, this.uid, mapTime);
            }
            await randomSleep();
            await this.getInfo().then((res) => {
                if (this.todayDiamond < this.todayLimitDiamond) {
                    this.playGame()
                } else {
                    console.log(`今日限制矿石${res.userInfo.todayLimitDiamond},已获取矿石${res.userInfo.todayDiamond}`)
                }
            });
        } catch (e) {
            console.log(e);
            await randomSleep();;
            // 结束
            const overTime = +new Date().getTime();
            const overParams = {
                isButton: 1,
            };
            //结束游戏
            await over(overParams, this.uid, overTime);
            await randomSleep();
            await this.getInfo().then((res) => {
                if (this.todayDiamond < this.todayLimitDiamond) {
                    this.playGame()
                } else {
                    console.log(`今日限制矿石${res.userInfo.todayLimitDiamond},已获取矿石${res.userInfo.todayDiamond}`)
                }
            });
        }
    }

    start() {
        this.getInfo().then(() => {
            if (this.todayDiamond < this.todayLimitDiamond) {
                this.playGame();
            }
        })
    }

}




