/*
 * @Date           : 2021-05-13 23:29:59
 * @FilePath       : /src/api/module/login.js
 * @Description    : 
 */

import axios from "src/api/axios_wapper.js"
let prefix= process.env.API_PREFIX



export const  post_tgBusiness_login= (params,url="/tgBusiness/login") => axios.post(`${prefix}${url}`, {...params})
export const  post_tgBusiness_verifyCode= (params,url="/tgBusiness/verifyCode") => axios.post(`${prefix}${url}`, {...params})
export const  post_tgBusiness_createNewGroup= (params,url="/tgBusiness/createNewGroup") => axios.post(`${prefix}${url}`, {...params})
// 查询TG群组
export const  post_tgBusiness_queryGroup= (params,url="/tgBusiness/queryGroup") => axios.post(`${prefix}${url}`, {...params})
//更新群组的TG用户信息
export const  post_tgBusiness_queryGroupMember= (params,url="/tgBusiness/queryGroupMember") => axios.post(`${prefix}${url}`, {...params})
export const  post_tgBusiness_migrate= (params,url="/tgBusiness/migrate") => axios.post(`${prefix}${url}`, {...params})
export const  post_tgBusiness_getChatMember= (params,url="/tgBusiness/getChatMember") => axios.post(`${prefix}${url}`, {...params})
 



export const get_tgBusiness_logout = (params,url="/tgBusiness/logout") => axios.get(`${prefix}${url}`,{ params:{ ...params}})
export const get_tgBusiness_overView = (params,url="/tgBusiness/overView") => axios.get(`${prefix}${url}`,{ params:{ ...params}})


