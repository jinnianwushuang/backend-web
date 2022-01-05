/*
 * @Date           : 2021-05-13 23:29:59
 * @FilePath       : /src/api/module/login.js
 * @Description    : 
 */

import axios from "src/api/axios_wapper.js"
let prefix= process.env.API_PREFIX


//  登录 
export const  post_login= (params,url="/login/LoginWithAccount") => axios.post(`${prefix}${url}`, {...params})


// 登出 
export const get_logout = (params,url="/login/logOut") => axios.get(`${prefix}${url}`,{ params:{ ...params}})


