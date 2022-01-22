import axios from 'axios';

import {
    carousels,
    login,
    logout,
    recommendSong,
    songUrl,
    loginStatus,
    hotSonger,
    topSongOfSonger,
    detailOfArtist,
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
    //退出登录
    logout() {
        return axios.get(logout);
    },
    //获取轮播图
    getCarousel() {
        return axios.get(carousels);
    },
    //获取音乐url
    getSongUrl(id) {
        return axios.get(songUrl, {
            params: {
                id: id
            }
        })
    },
    //获取推荐音乐
    getRecommendSong() {
        return axios.get(recommendSong);
    },
    //获取登录状态
    getLoginStatus() {
        return axios.get(loginStatus);
    },
    //获取当前热门歌手
    getHotSonger() {
        return axios.get(hotSonger, {
            params: {
                limit: 10
            }
        })
    },
    //获取歌手热门歌曲
    getTopSongOfSonger(id) {
        return axios.get(topSongOfSonger, {
            params: {
                id: id
            }
        })
    },
    //获取歌手详情
    getDetailOfSonger(id) {
        return axios.get(detailOfArtist, {
            params: {
                id: id
            }
        })
    }
}