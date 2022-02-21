import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/global.css'
import './assets/font.css'
// import vuetify from './plugins/vuetify'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueLazyload)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;//安装全局事件总线
  }
}).$mount('#app')
