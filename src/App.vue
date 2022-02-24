<template>
  <v-app>
    <div id="app">
    <Head></Head>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view :key="$route.query" v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
  </v-app>
</template>

<script>
import Content from './components/Content'
import Head from './components/Head'
export default {
  name:"App",
  components:{Head, Content}
}
</script>

<style scoped lang="less">
  
</style>