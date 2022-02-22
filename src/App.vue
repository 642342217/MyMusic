<template>
  <v-app>
    <div id="app">
    <Head></Head>
    <div class="content">
      <Content></Content>
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