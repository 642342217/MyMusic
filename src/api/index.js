import axios from 'axios';

import {
    login,
    logout
} from './config.js'

//设置请求超时时间
axios.defaults.timeout = 30000;

// 请求通用url
axios.defaults.baseURL = "http://localhost:3000";

export default {
    // 手机号码+密码登录
    phoneLogin(phone, password) {
        return axios.get(login, {
            params: {
                phone: phone,
                password: password
            }
        })
    },
    logout(){
        return axios.get(logout);
    }
}