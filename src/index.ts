import { TOKEN, COOKIE } from './helper/config';
import { Mining } from './services/mining';
import { randomSleep } from "./helper/timer";
import checkIn from "./services/checkIn";
import dipLuck from "./services/dipLuck";
import freeDraw from "./services/freeDraw";

// 掘金签到
async function autoJuejin() {
    //签到
    await checkIn()
    //抽奖
    await randomSleep().then(() => { freeDraw() })
    //粘运气
    await randomSleep().then(() => { dipLuck() })
}

autoJuejin().then(() => {
    randomSleep().then(() => {
        //挖矿
        if (TOKEN && COOKIE) new Mining().start()
    })

})




