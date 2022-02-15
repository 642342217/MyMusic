<template>
  <div class="songer">
      <img :src="imgUrl" :alt="name" @click="toSonger">
      <p @click="toSonger">{{name}}</p>
  </div>
</template>

<script>
export default {
    props:['name', 'imgUrl', 'id'],
    methods: {
        toSonger() {
            this.$router.push({ path: '/artist', query: { id: this.id }});
        }
    },
}
</script>

<style lang="less" scoped>
    @width: 12vw;
    .songer{
        width: @width;
        height: calc(@width + 14px);
        margin: 20px 0;
        img{
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
        p{
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
    }
</style>