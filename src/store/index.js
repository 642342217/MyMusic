import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  search: '',//搜索信息
  isShowLoginBox: false,//是否弹出登录框
  hasLogined: false,//是否已经登录
  recommendSong: [],//推荐歌曲信息
  audioObj: {},//音乐播放器
  isPlay: false,//音乐播放器播放状态
  playSongUrl: '',//当前播放音乐的url
};

const actions = {

};

const mutations = {
  //改变当前已登录/未登录的样式状态
  changeShowLoginBox(state, TF) {
    state.isShowLoginBox = TF;
  },
  //获取当前登录状态
  changeLoginStatus(state, TF) {
    state.hasLogined = TF;
  },
  //接收推荐歌单
  receiveRecommendSong(state, info) {
    state.recommendSong = info;
  },
  //播放音乐
  playSong(state, url) {
    if(state.isPlay === true) {
      state.audioObj.pause();
      state.audioObj = new Audio(url);
    } else if(state.playSongUrl != url){
      state.audioObj = new Audio(url);
    }
    state.isPlay = true;
    state.audioObj.play(); 
  },
  //暂停音乐
  pausePlay(state) {
    state.isPlay = false;
    state.audioObj.pause();
  },
  //设置当前播放音乐的url
  setPlaySongUrl(state, url) {
    state.playSongUrl = url;
  }
};

const getters = {
  getSearchInfo(state) {
    return state.search;
  },
  getIsShowLoginBox(state) {
    return state.isShowLoginBox;
  },
  getRecommendSong(state) {
    return state.recommendSong;
  },
  //获取当前是否在播放音乐
  getIsPlaySong(state) {
    return state.isPlay;
  },
  getPlaySongUrl(state) {
    return state.playSongUrl;
  }
}


const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store