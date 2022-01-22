<template>
  <div class="songer">

  </div>
</template>

<script>
// import api from '../api/index'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        //获取歌手热门歌曲
        getTopSongs() {

        }
    },
    created() {
        console.log(this.$route.query.id);
    },
}
</script>

<style lang="less" scoped>
    .songer{
        margin: 0 auto;
        width: 70vw;
        height: 100px;
        background-color: aqua;
    }
</style>