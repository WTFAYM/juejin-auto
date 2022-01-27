import axios, { Axios, AxiosRequestConfig } from 'axios'


export default function request(options: AxiosRequestConfig) {

    return new Promise((resolve, reject) => {
        axios(merge(options)).then((res) => {
            let data = res.data || {};

            if (data.err_no === 0 || data.code === 0) {
                resolve(data.data)
            } else {
                data.err_msg && reject(data.err_msg)
            }
        })
    })


};


const defaultOptions: Record<string, any> = {
    method: 'GET',
    data: {},
    params: {},
    headers: {
        origin: 'https://juejin.cn',
        pragma: 'no-cache',
        referer: 'https://juejin.cn/',
        'sec-ch-ua':
            '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
    },
};

function merge(options: any) {

    let target = { ...defaultOptions }

    for (const key of Object.keys(options)) {

        const findKey = Object.keys(defaultOptions).find(targetKey => targetKey === key)
        //默认没有 直接添加
        if (!findKey) {
            target[key] = options[key]
        }
        // key存在
        else {
            const value = target[findKey]
            if (typeof value === 'object') {
                target[findKey] = { ...target[findKey], ...options[findKey] }
            } else {
                target[findKey] = options[findKey]
            }
        }

    }


    // console.log('request', { target });

    return target

}
