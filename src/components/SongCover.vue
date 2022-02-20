<template>
    <div class="main">
        <div class="song_cover" :style="background" @click="toDetailPage">
            <div class="mask" v-if="page === 'findmusic'">
                <div :class="playOrPause" @click="playOrPauseSong"></div>
            </div>
        </div>
        <div class="song_name" @mouseenter="showAll($event)" @mouseleave="showAllName = !showAllName"
        @click="toDetailPage">{{name}}</div>
        <div @click="toCreator" v-if="page === 'playlist'"><slot name="creator"></slot></div>
        <span class="allName" :style="{ top: y + 'px', left: x + 'px', position: 'absolute', fontSize: 8 + 'px'}" v-if="showAllName">{{name}}</span>
    </div>
</template>

<script>
import api from '../api/index'
export default {
    props: ['id', 'name', 'picUrl', 'userId'],    
    data() {
        return {
            background: {background: `url(${this.picUrl})`},
            songUrl: '',
            showAllName: false,
            x: '',
            y: '',
            page: ''
        }
    },
    methods: {
        // 播放音乐
        playSong() {
            this.$store.commit('playSong', this.songUrl);
            this.$store.commit('setPlaySongUrl', this.songUrl);
        },
        //暂停音乐
        pauseSong() {
            this.$store.commit('pausePlay');
        },
        playOrPauseSong() {
            if(this.$store.getters.getIsPlaySong === true) {
                if(this.$store.getters.getPlaySongUrl == this.songUrl) {
                    this.pauseSong();
                } else {
                    this.playSong();
                }
            } else {
                this.playSong();
            }
        },
        //展示全称
        showAll(event) {
            let e = event || window.event;
            let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            let x = e.pageX || e.clientX + scrollX;
            let y = e.pageY || e.clientY + scrollY;
            this.x = x + 10;
            this.y = y + 15;
            this.showAllName = !this.showAllName;
        },
        //跳转至具体页面
        toDetailPage() {
            if(window.location.hash !== '#/findmusic') {
                this.$router.push({ path: '/playlist-detail', query: { id: this.id }} );
            } else if (window.location.hash === '#/findmusic') {
                this.$router.push({ path: '/songdetail', query: { id: this.id }});
            }
        },
        //跳转至歌单创建者
        toCreator() {
            this.$router.push({ path: '/user', query: { id: this.userId }} );
        }
    },
    computed:{
        playOrPause() {
            let isPlay = this.$store.getters.getIsPlaySong;
            let playSongUrl = this.$store.getters.getPlaySongUrl;
            if(isPlay === true) {
                if(playSongUrl === this.songUrl) {
                    return {pause: true};
                } else {
                    return {play: true};
                }
            } else {
                return {play: true};
            }
        }
    },
    async created() {
        //获取音乐url
        if(window.location.hash === '#/findmusic') {
            let {data} = await api.getSongUrl(this.id);
            this.songUrl = data.data[0].url;
        }
    },
    beforeMount() {
        if(window.location.hash === '#/findmusic') {
            this.page = 'findmusic';
        } else if(window.location.hash === '#/playlist') {
            this.page = 'playlist';
        } else {
            this.page = 'user';
        }
    }
}

</script>

<style lang="less" scoped>
    @width: 12vw;
    .main{
        width: @width;
        height: calc(@width + 50px);
        .song_cover{
            display: flex;
            align-items: flex-end;
            cursor: pointer;
            margin: 10px 0 0 0;
            width: @width;
            height: @width;
            background-size: cover !important;
            background: no-repeat;
            .mask{
                display: flex;
                justify-content: end;
                align-items: center;
                height: 15%;
                width: 100%;
                background-color: #242424;
                opacity: 0.5;
                .play{
                    border: 10px solid lightgray;
                    width: 0;
                    height: 0;
                    border-top-color: transparent;
                    border-bottom-color: transparent;
                    border-right-color: transparent;
                }
                .pause{
                    line-height: 20px;
                    width: 15px;
                    height: 20px;
                    font-size: 20px;
                    color: lightgray;
                    &::before{
                        content: '|';
                        display: inline-block;
                    }
                    &::after{
                        content: "|";
                        display: inline-block;
                    }
                }
            }
        }
        .song_name{
            width: @width;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 20px;
            &:hover{
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .allName{
            background-color: #fff;
            border: solid 1px #242424;
        }
    }
    
</style>