import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  search: '',//搜索信息
  isShowLoginBox: false,//是否弹出登录框

};

const actions = {
  
};

const mutations = {
  changeShowLoginBox(state,TF){
    console.log(state.isShowLoginBox);
    state.isShowLoginBox = TF;
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