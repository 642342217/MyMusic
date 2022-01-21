<template>
  <div class="songer">
      <img :src="imgUrl" :alt="name">
      <p>{{name}}</p>
  </div>
</template>

<script>
export default {
    props:['name', 'imgUrl'],
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
    @width: 12vw;
    .songer{
        width: @width;
        height: calc(@width + 14px);
        margin: 20px 0;
        img{
            width: @width;
            height: @width;
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