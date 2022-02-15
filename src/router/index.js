import Vue from 'vue'
import VueRouter from 'vue-router'

import FindMusic from '../components/FindMusic'
import Songer from '../components/Songer'
import SongDetail from '../components/SongDetail'
import PlayList from '../components/PlayList'
import PlayListDetail from '../components/PlayListDetail'
import Login from '../components/Login'
import UserDetail from '../components/UserDetail'
import Artists from '../components/Artists'
import Recommend from '../components/Recommend'
import ArtistCategory from '../components/ArtistCategory'

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
  //登录页面
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 用户页面
  {
    path: '/user',
    component: UserDetail
  },
  // 歌手页面
  {
    path: '/artists',
    component: Artists,
    redirect: { name: 'recommend' },
    children: [
      //推荐歌手
      {
        path: 'recommend',
        name: 'recommend',
        component: Recommend
      },
      // 华语男歌手
      {
        path: 'artist-category',
        component: ArtistCategory,
        name: 'category'
      }
    ]
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
