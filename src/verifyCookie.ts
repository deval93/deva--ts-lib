import axios from 'axios';
import Util from './lib/util';

function getWithCookies(url: string, cookies: string) {
    return new Promise<any>((resolve, reject) => {

        const secretKey: string = process.env.SECRET_KEY || "";
        Util.log("DEBUG LIB secretKey = ", secretKey);
        const secretValue: string = process.env.SECRET_VALUE || "";
        Util.log("DEBUG LIB secretValue = ", secretValue);

        let headers: object = { "X-API-VERSION": "v2" };
        headers = {
            ...headers,
            // [secretKey]: secretValue,
            Cookie: cookies,
        };
        Util.log("DEBUG LIB headers = ", headers);
        axios.get(url, { headers: headers }).then(resolve).catch(reject);
    })
}

export const verifyCookie = async (cookies: Record<string, string>) => {
    return new Promise<any>((resolve, reject) => {
        Util.log("DEBUG LIB cookies = ", cookies);
        let cookiesStr = "";
        if (cookies && Object.keys(cookies).length) {
            cookiesStr = Object.keys(cookies).map((key) => `${key}=${cookies[key]};`).join("");
        }
        Util.log("DEBUG LIB cookiesStr = ", cookiesStr);

        const getUserUrl = process.env.BOWLED_API + "/bowled-user-ms/api/bowled/user/get";
        Util.log("DEBUG LIB getUserUrl = ", getUserUrl);

        getWithCookies(getUserUrl, cookiesStr).then(resolve).catch(reject);
    })
}