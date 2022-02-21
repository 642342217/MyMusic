<template>
  <div class="content">
      <router-view :key="$route.query"></router-view>
  </div>
</template>

<script>
import api from '../api/index'
export default {
  created() {
    api.getLoginStatus().then(data => {
      if(data.data.data.account !== null) {
      this.$store.commit('changeLoginStatus', true);
      this.$store.commit('changeShowLoginBox', false);
    }
    });
  },
  
}
</script>

<style lang="less" scoped>

</style>