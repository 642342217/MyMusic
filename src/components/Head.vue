<template>
  <div class="container">
      <i class="logo iconfont">&#xe675;</i>
      <span>网易云音乐</span>
      <div class="nav_content">
          <div><router-link to="/findmusic">发现音乐</router-link></div>
          <div><router-link to="">排行榜</router-link></div>
          <div><router-link to="">歌单</router-link></div>
          <div><router-link to="">歌手</router-link></div>
          <div><router-link to="">关注</router-link></div>
          <div><router-link to="">个人中心</router-link></div>
      </div>
      <div class="input"><input type="text" v-model="search" placeholder="周杰伦"></div>
      <div class="login" @click="login" v-if="! $store.state.hasLogined"><a>登录/注册</a></div>
      <div class="login" @click="logout" v-else><a>退出登录</a></div>
      <i class="searchInfo iconfont"><router-link to="">&#xe600;</router-link></i>
    <Login v-show="isShow"></Login>
  </div>
</template>

<script>
import api from '../api/index'
import Login from '../components/Login.vue'
export default {
    name:"Head",
    components:{ Login, },
    data() {
        return {
            search: this.$store.state.search,
        }
    },
    methods: {
        login(){
            this.$store.commit('changeShowLoginBox', true);
        },
        async logout(){
            let {data} = await api.logout();
            if(data.code === 200) {
                this.$store.commit("changeLoginStatus", false);
            }else {
                return alert("data.msg");
            }
        }
    },
    computed:{
        isShow(){

            return this.$store.state.isShowLoginBox;
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        margin: 0 auto;
        height: 70px;
        background-color: #242424;
        position: relative;
        .logo{
            margin: 16px 10px;
            display: inline-block;
            color: red;
            font-size: 40px;
            background-color: white;
            border-radius: 50%;
        }
        span{
            display: inline-block;
            font-size: 30px;
            margin: 0 5px;
            font-family: 'Times New Roman', Times, serif;
            color: white;
            &::after{
                content: '';
                display: block;
                overflow: hidden;
            }
        }
        .nav_content{
            display: flex;
            align-items: center;
            position: absolute;
            width: 500px;
            height: 70px;
            top: 0px;
            left: 250px;
            font-size: 20px;
            div{
                padding: 10px;
                a{
                    color: white;
                    &.router-link-exact-link{
                        color: red;
                    }
                }
            }
        }
        .input{
            right: 150px;
            top: 0;
            position: absolute;
            width: 380px;
            height: 70px;
            input{
                outline: none;
                margin-top: 18px;
                border-radius: 15px;
                height: 30px;
                width: 380px;
            }
        }
        .login{
            position: absolute;
            top: 25px;
            right: 20px;
            a{
                color: white;
                cursor: pointer;
            }
        }
        .searchInfo{
            position: absolute;
            top: 25px;
            right: 160px;
            font-size: 20px;
            cursor: pointer;
        }
    }
</style>