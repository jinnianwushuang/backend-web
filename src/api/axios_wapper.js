/*
 * @Date           : 2020-09-12 23:33:49
 * @FilePath       : /backend-web/src/api/axios_wapper.js
 * @Description    : 
 */
import axios from "axios"

import { LocalStorage, SessionStorage } from 'quasar'
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import { uid } from 'quasar'

 //定义请求的基础 路径  域名端口
axios.baseURL = process.env.API_BASEURL 
// process.env.NODE_ENV	String	Has two possible values: production or development




let uuid = uid()

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log( ' // 在发送请求之前做些什么' )
    
    config.headers['token']=  SessionStorage.getItem("token") || ''
    console.log(config);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


  export default axios