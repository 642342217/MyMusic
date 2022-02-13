import Vue from 'vue'
import VueRouter from 'vue-router'

import FindMusic from '../components/FindMusic'
import Songer from '../components/Songer'
import SongDetail from '../components/SongDetail'
import PlayList from '../components/PlayList'
import PlayListDetail from '../components/PlayListDetail'
import Login from '../components/Login'
import UserDetail from '../components/UserDetail'

Vue.use(VueRouter)
import store from '../store'

const routes = [
  // 发现音乐页面
  {
    path: '/findmusic',
    component: FindMusic
  },
  //具体歌手页面
  {
    path: '/artist',
    name: 'artist',
    component: Songer
  },
  // 歌曲详情页面
  {
    path: '/songdetail',
    component: SongDetail,
  },
  // 歌单页面
  {
    path: '/playlist',
    component: PlayList
  },
  // 歌单详情页面
  {
    path: '/playlist-detail',
    name:'playlist-detail',
    component: PlayListDetail,
    meta: {
      requireAuth: true     //添加该字段，表示进入该组件，需要登录状态
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/user',
    component: UserDetail
  }
]

// 跳转新页面，自动置顶
const scrollBehavior = (to, from, savedPosition) => {
  if(from);
  return new Promise((resolve) => {
    if (savedPosition && to.meta.keepAlive) {
      setTimeout(() => {
        resolve(savedPosition);
      },88);
    } else {
      setTimeout(() => {
        resolve({ x: 0, y: 0, behavior: 'smooth' });
      }, 88);
    }
    
  })
}

const router = new VueRouter({
  routes,
  scrollBehavior,
})


router.beforeEach((to, from, next) => {
  if(from);
  console.log(to.meta.requireAuth);
  console.log(store.getters.getLoginStatus);
  if(to.meta.requireAuth) {
    if(store.getters.getLoginStatus) {
      next();
    } else {
      next({
        name: 'login',
        params: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})

export default router
