import Vue from 'vue'
import VueRouter from 'vue-router'

import FindMusic from '../components/FindMusic'
import Songer from '../components/Songer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/findmusic',
    component: FindMusic
  },
  {
    path: '/artist',
    name: 'artist',
    component: Songer
  }
]

const router = new VueRouter({
  routes
})

export default router
