import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  search: '',//搜索信息
  isShowLoginBox: false,//是否弹出登录框
  hasLogined: false,//是否已经登录

};

const actions = {
  
};

const mutations = {
  changeShowLoginBox(state, TF){
    state.isShowLoginBox = TF;
  },
  changeLoginStatus(state, TF){
    state.hasLogined = TF;
  }
};

const getters = {
  getSearchInfo(state){
    return state.search;
  },
  getIsShowLoginBox(state){
    return state.isShowLoginBox;
  }
}


const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store