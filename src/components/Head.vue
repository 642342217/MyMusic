<template>
  <div class="container">
    <i class="logo iconfont">&#xe675;</i>
    <div class="title">网易云音乐</div>
    <div class="nav_content">
        <div><router-link to="/findmusic">发现音乐</router-link></div>
        <div><router-link to="/top-list">排行榜</router-link></div>
        <div><router-link to="/playlist">歌单</router-link></div>
        <div><router-link to="/artists">歌手</router-link></div>
        <div>关注</div>
        <div><router-link :to="{ path: '/personal', query: { id: id }}">个人中心</router-link></div>
    </div>
    <div class="input">
        <input type="search" v-model.trim="searchValue" placeholder="周杰伦" 
        @keyup.enter="toSearchPage" @focus="showSearchBox" @blur="hideSearchBox">
    </div>
    <div class="login" @click="login" v-if="! $store.state.hasLogined"><a>登录/注册</a></div>
    <div class="login" @click="logout" v-else><a>退出登录</a></div>
    <i class="searchInfo iconfont" @click="toSearchPage">&#xe600;</i>
    <Login v-show="isShow"></Login>
    <SearchSuggest :artists="searchInfo.artists" :playlists="searchInfo.playlists" :songs="searchInfo.songs" class="suggest" v-if="searchBox"></SearchSuggest>
  </div>
</template>

<script>
import api from '../api/index'
import Login from '../components/Login.vue'
import SearchSuggest from './SearchSuggest.vue'
export default {
    name:"Head",
    components:{ Login, SearchSuggest },
    data() {
        return {
            searchValue: this.$store.state.search,
            id: '',
            searchInfo: {
                artists: [],
                playlists: [],
                songs: []
            }
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
                this.$router.push('/');
            }else {
                return alert("data.msg");
            }
        },
        // 获取个人用户信息
        async getPersonalInfo() {
            let { data } = await api.getUserAccount();
            if(data.profile) {
                let { userId } = data.profile;
                this.id = userId;
            }
            
        },
        // 跳转至搜索具体页面
        toSearchPage() {
            this.$store.commit('setSearchBox', false);
            this.$router.push({ path: '/search', query: { s: this.searchValue, type: 1 }});
        },
        async sendRequest() {
            if(!this.searchValue) {
                return;
            }
            let { data } = await api.getSuggest(this.searchValue);
            this.searchInfo.artists = [];
            this.searchInfo.playlists = [];
            this.searchInfo.songs = [];
            if(data.result === {}) return;
            if(data.code == 200) {
                //获取相关歌手信息
                if(data.result.artists) {
                    data.result.artists.forEach(artist => {
                        let { id, name } = artist;
                        this.searchInfo.artists.push({
                            id,
                            name
                        });
                    });
                }
                
                // 获取相关歌单信息
                if(data.result.playlists) {
                    data.result.playlists.forEach(list => {
                        let { id, name } = list;
                        this.searchInfo.playlists.push({
                            id,
                            name
                        });
                    });
                }
                
                //获取相关歌手信息
                if(data.result.songs) {
                    data.result.songs.forEach(song => {
                        let { id, name } = song;
                        this.searchInfo.songs.push({
                            id,
                            name
                        });
                    });
                }  
            }
            if(!this.searchInfo.artists.length && !this.searchInfo.playlists.length && !this.searchInfo.songs.length) {
                return;
            }
            this.$store.commit('setSearchBox', true);
        },
        //将发送请求进行防抖处理
        throughDebouce() {
            this.showSearchSuggest = this.debounce(this.sendRequest, 300);
        },
        showSearchSuggest() {
            
        },
        //防抖
        debounce(fn, delay) {
            let timer = null;
            return function(...args) {
                if(timer) clearTimeout(timer);
                let context = this;
                timer = setTimeout(() => {
                    fn.apply(context, args);
                    timer = null;
                }, delay);
            }
        },
        //展示搜索建议框
        showSearchBox() {
            if(this.searchValue !== '') {
                this.$store.commit('setSearchBox', true);
            } else if(!this.searchInfo.artists.length && !this.searchInfo.playlists.length && !this.searchInfo.songs.length) {
                this.$store.commit('setSearchBox', false);
            }
        },
        //隐藏搜索建议框
        hideSearchBox() {
            this.$store.commit('setSearchBox', false);
        }
    },
    watch: {
        searchValue(newValue) {
            if(newValue === '') {
                return this.$store.commit('setSearchBox', false);
            }
            this.showSearchSuggest();
        }
    },
    computed:{
        isShow(){
            return this.$store.state.isShowLoginBox;
        },
        searchBox() {
            return this.$store.getters.getSearchBoxStatus;
        }
    },
    created() {
        this.getPersonalInfo();
        this.throughDebouce();
    },
}
</script>

<style lang="less" scoped>
    .container{
        margin: 0 auto;
        height: 70px;
        background-color: #242424;
        position: relative;
        .logo{
            margin: 16px 10px 16px 50px;
            display: inline-block;
            color: red;
            width: 40px;
            height: 40px;
            font-size: 40px;
            line-height: 40px;
            background-color: white;
            border-radius: 50%;
        }
        .title{
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
                color: white;
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
                background-color: white;
                padding-left: 10px;
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
        .suggest{
            position: absolute;
            top: 55px;
            right: 18vw;
            z-index: 1000;
            background-color: whitesmoke;
        }
    }
</style>