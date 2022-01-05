/*
 * @Date           : 2021-05-13 23:29:59
 * @FilePath       : /src/api/module/login.js
 * @Description    : 
 */

import axios from "src/api/axios_wapper.js"
let prefix= process.env.API_PREFIX
 
 
export const  post_task_query= (params,url="/task/query") => axios.post(`${prefix}${url}`, {...params})
export const  post_task_deleteById= (params,url="/task/deleteById") => axios.post(`${prefix}${url}`, {...params})


 