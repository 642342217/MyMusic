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
    playlists,
    detailOfPlayList,
    songsOfPlayList,
    userDetail,
    follow,
    playlistOfUser,
    artists,
    userAccount,
    weeklyPlay,
    allPlay,
    suggest,
} from './config.js'

//设置请求超时时间
axios.defaults.timeout = 30000;

// 请求通用url
//本地地址
// axios.defaults.baseURL = "http://localhost:3000";

//vercel部署线上地址
axios.defaults.baseURL = 'https://netease-cloud-music-api-bice-mu.vercel.app/'

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
    //获取歌单
    getPlayLists() {
        return axios.get(playlists);
    },
    //获取歌单详情
    getDetailOfPlayList(id) {
        return axios.get(detailOfPlayList, {
            params: {
                id
            }
        })
    },
    //获取歌单所有歌曲
    getSongsOfPlayList(id) {
        return axios.get(songsOfPlayList, {
            params: {
                id
            }
        })
    },
    // 获取用户详情信息
    getUserDetail(id) {
        let date = new Date();
        return axios.get(userDetail, {
            params: {
                uid: id,
                timestamp: date
            }
        })
    },
    //关注/取消关注用户，t：1为关注，其它为取消
    followUser(id, t) {
        return axios.get(follow, {
            params: {
                id,
                t
            }
        })
    },
    // 获取用户歌单
    getPlayListsOfUser(uid) {
        return axios.get(playlistOfUser, {
            params: {
                uid
            }
        })
    },
    /*获取歌手分类
    limit：返回数量，默认为30
    type取值：
        -1:全部
        1:男歌手
        2:女歌手
        3:乐队
    area取值：
        -1:全部
        7华语
        96欧美
        8:日本
        16韩国
        0:其他
    initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 
    返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
    */
    getArtists(type, area, initial = 0, limit = 30) {
        return axios.get(artists, {
            params: {
                limit,
                type,
                area,
                initial
            }
        })
    },
    // 获取个人详情
    getUserAccount() {
        return axios.get(userAccount);
    },
    //获取最近一周播放歌曲
    getWeeklyPlay(id) {
        return axios.get(weeklyPlay, {
            params: {
                uid: id
            }
        })
    },
    //获取所有播放歌曲
    getAllPlay(id) {
        return axios.get(allPlay, {
            params: {
                uid: id
            }
        })
    },
    //获得搜索建议
    getSuggest(keywords) {
        return axios.get(suggest, {
            params: {
                keywords
            }
        })
    },
    //获取相关搜索结果
    getSearchResult(keywords, type) {
        return axios.get(search, {
            params: {
                keywords,
                type
            }
        })
    }

}