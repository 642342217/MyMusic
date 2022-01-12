<template>
  <div id="app">
    <Head></Head>
    <div class="content">
      <Content></Content>
    </div>
  </div>
</template>

<script>
import Content from './components/Content.vue'
import Head from './components/Head'
export default {
  name:"App",
  el:"#app",
  components:{Head, Content},
  data() {
    return {
      
    }
  },
}
</script>

<style scoped lang="less">
  
</style>
