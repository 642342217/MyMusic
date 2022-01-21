<template>
  <div class="content">
      <router-view></router-view>
  </div>
</template>

<script>
import api from '../api/index'
export default {
  async created() {
    let {data} = await api.getLoginStatus();
    console.log(data);
    if(data.data.account !== null) {
      console.log(data.data.account);
      this.$store.commit('changeLoginStatus', true);
      this.$store.commit('changeShowLoginBox', false);
    }
  },
}
</script>

<style lang="less" scoped>

</style>