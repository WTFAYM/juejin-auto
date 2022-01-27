import { Mining } from './services/mining';
import { randomSleep } from "./helper/timer";
import checkIn from "./services/checkIn";
import dipLuck from "./services/dipLuck";
import freeDraw from "./services/freeDraw";

//掘金签到
function autoJuejin() {
    //签到
    checkIn().then(() => {
        //抽奖
        randomSleep().then(() => { freeDraw() })

        //粘运气
        randomSleep().then(() => { dipLuck() })

    })
}

autoJuejin()


//挖矿
new Mining().start()