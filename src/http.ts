import axios from 'axios';
import Utils from './lib/util';

function POST(args: any) {
    return new Promise<any>((resolve, reject) => {
        const { cookies, body, url, headers } = args;
        let cookiesStr = "";
        if (cookies && Object.keys(cookies).length) {
            cookiesStr = Object.keys(cookies).map((key) => `${key}=${cookies[key]};`).join("");
        }

        const secretKey: string = process.env.SECRET_KEY || "";
        const secretValue: string = process.env.SECRET_VALUE || "";

        let xHeaders: any = { "X-API-VERSION": "v2" };
        xHeaders = {
            ...xHeaders,
            [secretKey]: secretValue,
            // Cookie: cookies,
            ...headers
        };

        if (cookiesStr && cookiesStr.length > 0) {
            xHeaders["Cookie"] = cookiesStr;
        }

        Utils.log("xHeaders = ", xHeaders)
        axios.post(url, body, { headers: xHeaders }).then(resolve).catch((err: any) => reject(err.response));
    })
}

export {
    POST
}