<template>
  <div class="loginBox">
    <div class="header">
      <div>手机号登录</div>
      <div class="close" @click="closeLoginBox">x</div>
    </div>
    <div class="content">
      <div><input type="text" placeholder="请输入手机号码" v-model="phone"></div>
      <div v-if="loginByPsw"><input type="password" placeholder="请输入密码" v-model="psw"></div>
      <div v-else><input type="text" placeholder="请输入验证码" v-model="captcha" class="captcha"><button @click="sendCaptcha">{{sendStatus}}</button></div>
      <div class="loginButton" @click="login">登录</div>
      <div class="otherLoginWay" @click="loginByPsw = !loginByPsw">选择其它登录方式</div>
    </div>

    <!-- 密码错误提示框 -->
    <v-alert
      color="#242424"
      dense
      type="info"
      :value="pswIsTrue"
    >信息有误！</v-alert>
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
            captcha: '',//验证码
            loginByPsw: true,
            sendStatus: '发送验证码'
        }
    },
    methods: {
      //关闭登录框，取消登录
      closeLoginBox(){
        // 若是经由路由拦截的，取消登录后，跳转至原来界面
        if(this.$route.params.redirect) {
          this.$router.back(-1);
        }
        this.$store.commit('changeShowLoginBox', false);
      },
      // 登录,发送请求
      async login(){
        //通过手机号+密码的方式登录
        if(this.loginByPsw) {
          let {data} = await api.phoneLogin(this.phone, this.psw);
          //密码不正确
          if(data.code !== 200) {
            this.pswIsTrue = true;
            setTimeout(() => {
              this.pswIsTrue = false;
            }, 1000);
          } else {
            this.$store.commit('changeLoginStatus', true);
            this.$store.commit('changeShowLoginBox', false);
            // 若是经由路由拦截的，鉴权成功后，跳转至目的界面
            if(this.$route.params.redirect) {
              this.$router.push({
                path: this.$route.params.redirect
              })
            } else {
              this.$router.go(0);
            }
          }
        } else {
          // 通过手机号码+验证码的方式登录
          let { data } = await api.loginByCaptcha(this.phone, this.captcha);
          if(data.code === 200) {
            this.$store.commit('changeLoginStatus', true);
            this.$store.commit('changeShowLoginBox', false);
            // 若是经由路由拦截的，鉴权成功后，跳转至目的界面
            if(this.$route.params.redirect) {
              this.$router.push({
                path: this.$route.params.redirect
              });
            } else {
              this.$router.go(0);
            }
          } else {
            this.pswIsTrue = true;
            setTimeout(() => {
              this.pswIsTrue = false;
            }, 1000);
          }
        }
      },
      //发送验证码
      sendCaptcha() {
        this.sendStatus = '已发送';
        api.sendCaptcha(this.phone);
        setTimeout(() => {
          this.sendStatus = '重新发送';
        }, 30000);
      }
    },
    mounted() {
      this.$bus.$on('vetifyByCaptcha', () => {
        this.loginByPsw = false;
        this.login();
        this.$store.commit('changeShowLoginBox', true);
      })
    }
}
</script>

<style lang="less" scoped>
  .loginBox{
    z-index: 1;
    position: fixed;
    left: 50%;
    top: 50%;
    width: 528px;
    height: 273px;
    transform: translateX(-50%) translateY(-50%);
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
      position: relative;
      margin: 30px auto;
      width: 220px;
      height: 200px;
      .loginButton{
        position: absolute;
        text-align: center;
        bottom: 30px;
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
        line-height: 30px;
        margin: 20px 0; 
        input{
          padding-left: 5px;
          border: solid 1px #242424;
          margin-bottom: 10px;
          outline: none;
          width: 100%;
          height: 100%;
        }
        .captcha{
          width: 60%;
        }
        button{
          width: 40%;
          height: 100%;
          border: solid 1px #242424;
        }
      }
      .otherLoginWay{
            position: absolute;
            z-index: 10000;
            font-size: small;
            right: -259px;
            top: -46px;
            text-decoration: underline;
            cursor: pointer;
      }
    }
  }

</style>