import Vue from 'vue'
import VueRouter from 'vue-router'

import FindMusic from '../components/FindMusic'

Vue.use(VueRouter)

const routes = [
  {
    path:'/findmusic',
    component:FindMusic
  },
]

const router = new VueRouter({
  routes
})

export default router
