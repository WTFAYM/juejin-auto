import { randomSleep } from './../helper/timer';
import { COOKIE, firstData, TOKEN } from "../helper/config";
import request from "../helper/request";
import { getXGameId } from '../helper/shared';
import { CommandRsp, GameInfo, OverRsp, StartRsp, UserInfo } from '../types';

const getUser = () => {
    return request({
        url: 'https://api.juejin.cn/user_api/v1/user/get',
        method: 'get',
        headers: {
            cookie: COOKIE,
        },
    }) as Promise<UserInfo>;
}


const start = (params: Record<string, any>, uid: number | string, time: number) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/game/start?uid=${uid}&time=${time}`,
        method: "post",
        data: params,
        headers: {
            authorization: TOKEN,
        },
    }) as Promise<StartRsp>;
}

const getGameInfo = (uid: number | string, time: number) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/home/info?uid=${uid}&time=${time}`,
        method: "get",
        headers: {
            'authorization': TOKEN,
        },
    }) as Promise<GameInfo>;
}
const over = (params: Record<string, any>, uid: number | string, time: number) => {
    return request({
        url: `https://juejin-game.bytedance.com/game/sea-gold/game/over?uid=${uid}&time=${time}`,
        method: "post",
        data: params,
        headers: {
            authorization: TOKEN,
        },
    }) as Promise<OverRsp>;
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
    }) as Promise<CommandRsp>;
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
    gameId: string | number = 0
    deep = 0
    todayDiamond = 0
    todayLimitDiamond = 0
    counter = 1
    async getInfo() {
        const time = new Date().getTime();
        // 获取用户信息
        const userInfo = await getUser();
        this.uid = userInfo.user_id;
        // 获取游戏信息
        const resInfo: GameInfo = await getGameInfo(this.uid, time);

        this.deep = resInfo.gameInfo ? resInfo.gameInfo.deep : 0;
        this.gameId = resInfo.gameInfo ? resInfo.gameInfo.gameId : 0;
        this.todayDiamond = resInfo.userInfo.todayDiamond || 0;
        this.todayLimitDiamond = resInfo.userInfo.todayLimitDiamond;
        return Promise.resolve(resInfo);
    }

    async playGame() {
        try {
            
            console.log(`开始第${this.counter}次挖矿`);

            // 开始
            const startTime = new Date().getTime();
            const startParams = {
                roleId: 3,
            };
            const startData: StartRsp = await start(startParams, this.uid, startTime);
            await randomSleep();
            this.gameId = startData.gameId;
            // 发起指令
            const commandTime = +new Date().getTime();
            const commandParams = {
                command: firstData.command,
            };
            const xGameId = getXGameId(this.gameId);
            const commandData = await command(commandParams, this.uid, commandTime, xGameId);

            this.deep = commandData.curPos.y || 0;
            await randomSleep();
            // 结束游戏
            const overTime = +new Date().getTime();
            const overParams = {
                isButton: 1,
            };
            const overData = await over(overParams, this.uid, overTime);
            console.log(`结束第${this.counter}次挖矿`, {
                todayDiamond: overData.todayDiamond,
                todayLimitDiamond: overData.todayLimitDiamond
            });
            this.counter++
            await randomSleep();
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
        console.log('开始挖矿游戏');
        this.getInfo().then(() => {
            if (this.todayDiamond < this.todayLimitDiamond) {
                this.playGame();
            } else {
                record(this.uid, Date.now()).then(res => {
                    console.log('记录', JSON.stringify(res));
                })
            }
            // this.playGame();
        })

    }

}




