<template>
  <div class="top-list">
      <div class="title">
          看看其他的吧，后端接口用不了了
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>  
    @keyframes slidein {
    from { transform: translateX(-100%); }
    to   { margin-left: 100%; }
    }
    .top-list{
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        .title{
            display: inline-block;
            line-height: 100vh;
            color: red;
            font-size: 30px;
            white-space: nowrap;
            animation: 13s linear 0s infinite alternate slidein;
        }
    }
</style>