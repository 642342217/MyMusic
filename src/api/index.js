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
    detailOfSong,
    lyric,
    commentOfSong,
    sendComment,
    replyComment,
    like,
    sendCaptcha,
    search,
} from './config.js'

//设置请求超时时间
axios.defaults.timeout = 30000;

// 请求通用url
axios.defaults.baseURL = "http://localhost:3000";
//请求携带cookie
axios.defaults.withCredentials = true

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
    },
    //获取歌曲详情
    getDetailOfSong(id) {
        return axios.get(detailOfSong, {
            params: {
                ids: id
            }
        })
    },
    //获取歌词
    getLyric(id) {
        return axios.get(lyric, {
            params: {
                id: id
            }
        })
    },
    //获取歌曲评论，这里取默认值，取出20条评论
    getCommentOfSong(id) {
        let date = new Date();
        return axios.get(commentOfSong, {
            params: {
                id: id,
                timestamp: date
            }
        })
    },
    //发送歌曲评论
    sendCommentOfSong(id, content) {
        return axios.get(sendComment, {
            params: {
                id: id,
                content: content
            }
        })
    },
    //回复歌曲评论
    replyCommentOfSong(id, content, commentId) {
        let date = new Date();
        return axios.get(replyComment, {
            params: {
                id: id,
                content: content,
                commentId: commentId,
                timestamp: date
            }
        })
    },
    //给歌曲评论点赞，id为歌曲id，cid为评论id，t：0取消点赞，1：点赞
    likeCommentOfSong(id, cid, t) {
        let date = new Date();
        return axios.get(like, {
            params: {
                id: id,
                cid: cid,
                t: t,
                timestamp: date
            }
        })
    },
    //发送验证码
    sendCaptcha(phone) {
        let date = new Date();
        return axios.get(sendCaptcha, {
            params: {
                phone: phone,
                timestamp: date
            }
        })
    },
    //验证验证码登录
    loginByCaptcha(phone, captcha) {
        let date = new Date();
        return axios.get(login, {
            params: {
                phone,
                captcha,
                timestamp: date
            }
        })
    },
    //搜索
    search(keyWords) {
        let date = new Date();
        return axios.get(search, {
            params: {
                keywords: keyWords,
                timestamp: date
            }
        })
    }
}