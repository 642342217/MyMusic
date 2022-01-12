<template>
  <div class="box">
      <div class="header">
          <div></div>
          <div></div>
          <div></div>
      </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style lang="less" scoped>
    .box{
        width: 80vw;
        margin: 0 auto;
        .header{
            display: flex;
            justify-content: space-between;
            div{
                width: 25vw;
                background-color: aqua;
                height: 300px;
            }
        }
    }
</style>