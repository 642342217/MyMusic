import Vue from 'vue'
import VueRouter from 'vue-router'

// import FindMusic from '../components/FindMusic'
const FindMusic = () => import('../components/FindMusic')

// import Songer from '../components/Songer'
const Songer = () => import('../components/Songer')

// import SongDetail from '../components/SongDetail'
const SongDetail = () => import('../components/SongDetail')

// import PlayList from '../components/PlayList'
const PlayList = () => import('../components/PlayList')

// import PlayListDetail from '../components/PlayListDetail'
const PlayListDetail = () => import('../components/PlayListDetail')

// import Login from '../components/Login'
const Login = () => import('../components/Login')

// import UserDetail from '../components/UserDetail'
const UserDetail = () => import('../components/UserDetail')

// import Artists from '../components/Artists'
const Artists = () => import('../components/Artists')

// import Recommend from '../components/Recommend'
const Recommend = () => import('../components/Recommend')

// import ArtistCategory from '../components/ArtistCategory'
const ArtistCategory = () => import('../components/ArtistCategory')

// import Personal from '../components/Personal'
const Personal = () => import('../components/Personal')
// 
// import TopList from '../components/TopList'
const TopList = () => import('../components/TopList')

// import SearchPage from '../components/SearchPage'
const SearchPage = () => import('../components/SearchPage')

Vue.use(VueRouter)
// import store from '../store'
import api from '../api/index'

const routes = [
  {
    path: '/',
    redirect: {
      name: 'findmusic'
    },
    meta: {
      keepAlive: true
    }
  },
  // 发现音乐页面
  {
    path: '/findmusic',
    component: FindMusic,
    name: 'findmusic',
    meta: {
      keepAlive: true
    }
  },
  //具体歌手页面
  {
    path: '/artist',
    name: 'artist',
    component: Songer,
    meta: {
      keepAlive: true
    }
  },
  // 歌曲详情页面
  {
    path: '/songdetail',
    component: SongDetail,
  },
  // 歌单页面
  {
    path: '/playlist',
    component: PlayList,
    meta: {
      keepAlive: true
    }
  },
  // 歌单详情页面
  {
    path: '/playlist-detail',
    name:'playlist-detail',
    component: PlayListDetail,
    meta: {
      requireAuth: true,     //添加该字段，表示进入该组件，需要登录状态
      keepAlive: true
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
    component: UserDetail,
    meta: {
      keepAlive: true
    }
  },
  // 歌手页面
  {
    path: '/artists',
    component: Artists,
    redirect: { name: 'recommend' },
    meta: {
      keepAlive: false
    },
    children: [
      //推荐歌手
      {
        path: 'recommend',
        name: 'recommend',
        component: Recommend,
        meta: {
          keepAlive: false
        }
      },
      // 歌手分类
      {
        path: 'artist-category',
        component: ArtistCategory,
        name: 'category',
        meta: {
          keepAlive: false
        }
      }
    ]
  },
  //个人用户界面
  {
    path: '/personal',
    component: Personal,
    meta: {
      requireAuth: true,     //添加该字段，表示进入该组件，需要登录状态
      keepAlive: true
    }
  },
  //排行榜界面
  {
    path: '/top-list',
    component: TopList,
    meta: {
      keepAlive: true
    }
  },
  //进入搜索界面
  {
    path: '/search',
    component: SearchPage
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
    api.getLoginStatus().then(data => {
        if(data.data.data.account !== null) {
          next();
        } else {
            next({
              name: 'login',
              params: {
                redirect: to.fullPath
              }
            })
          }
    });
  } else {
    next();
  }
})

export default router
