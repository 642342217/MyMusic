<template>
    <div class="main">
        <div class="song_cover" :style="background">
            <div class="mask">
                <div :class="playOrPause" @click="playOrPauseSong"></div>
            </div>
        </div>
        <div class="song_name">{{name}}</div>
    </div>
</template>

<script>
import api from '../api/index'
export default {
    props: ['id', 'name', 'picUrl'],    
    data() {
        return {
            background: {background: `url(${this.picUrl})`},
            songUrl: '',
        }
    },
    methods: {
        //获取音乐url
        async getSongUrl() {
            let {data} = await api.getSongUrl(this.id);
            this.songUrl = data.data[0].url;
        },
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
    created() {
        this.getSongUrl();
    },
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
            display: inline-block;
            width: @width;
            text-overflow: ellipsis;
            overflow: hidden;
            height: 20px;
            white-space: nowrap;
            &:hover{
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
    
</style>