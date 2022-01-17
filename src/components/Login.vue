<template>
  <div class="loginBox">
    <div class="header">
      <div>手机号登录</div>
      <div class="close" @click="closeLoginBox">x</div>
    </div>
    <div class="content">
      <div><input type="text" placeholder="请输入手机号码" v-model="phone"></div>
      <div><input type="password" placeholder="请输入密码" v-model="psw"></div>
      <div class="loginButton" @click="login">登录</div>
    </div>

    <!-- 密码错误提示框 -->
    <v-alert
      color="#242424"
      dense
      type="info"
      :value="pswIsTrue"
    >密码错误！</v-alert>
  </div>
</template>

<script>
import api from '../api/index'
export default {
    data() {
        return {
            phone: '',
            psw: '',
            pswIsTrue: false,
        }
    },
    methods: {
      //关闭登录框，取消登录
      closeLoginBox(){
        this.$store.commit('changeShowLoginBox', false);
      },
      // 登录,发送请求
      async login(){
        let {data} = await api.phoneLogin(this.phone, this.psw);
        //密码不正确
        if(data.code !== 200) {
          this.pswIsTrue = true;
          setTimeout(() => {
            this.pswIsTrue = false;
          }, 1000);
        }else {
          this.$store.commit('changeLoginStatus', true);
          this.$store.commit('changeShowLoginBox', false);
        }
      }
    },
}
</script>

<style lang="less" scoped>
  .loginBox{
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 528px;
    height: 273px;
    transform: translateX(-50%) translateY(50%);
    border: solid 0.1px #242424;
    background-color: white;
    .v-alert{
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
    }
    .header{
      line-height: 38px;
      height: 38px;
      background-color: #242424;
      display: flex;
      justify-content: space-between;
      color: white;
      div{
        padding: 0 10px;
      }
      .close{
        cursor: pointer;
        color: #aaa;
      }
    }
    .content{
      margin: 30px auto;
      width: 220px;
      height: 200px;
      .loginButton{
        text-align: center;
        border: solid 0.5px;
        line-height: 30px;
        background-color: skyblue;
        cursor: pointer;
        &:hover{
          background-color: blue;
        }
      }
      div{
        border-radius: 15px;
        width: 100%;
        height: 30px;
        margin: 20px 0; 
        input{
          padding-left: 5px;
          border: solid 1px #242424;
          margin-bottom: 10px;
          outline: none;
          border-radius: 15px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

</style>