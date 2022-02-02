<template>
  <div class="songer">
    <p>{{songer.name}}</p>
    <div class="songer-info">
        <img :src="songer.cover" :alt="songer.name">
        <span>{{songer.briefDesc}}</span>
    </div>
    <div class="hot-song"></div>
    <SongRow v-for="(song, index) in songs" :key="song.id" :index="index" :id="song.id" :name="song.name"
    :time="song.time" :category="song.category"></SongRow>
  </div>
</template>

<script>
import SongRow from './SongRow.vue'
import api from '../api/index'
export default {
    components: { SongRow },
    data() {
        return {
            songer: {},
            songs: []
        }
    },
    methods: {
        //获取歌手热门歌曲
        async getTopSongs() {
            let { data } = await api.getTopSongOfSonger(this.$route.query.id);
            data.songs.forEach(song => {
                let { id, name, dt: time } = song;
                let category = song.al.name;
                this.songs.push({
                    id,
                    name,
                    category,
                    time,
                });
            });
        },
        //获取歌手详情
        async getDetailOfSonger() {
            let { data } = await api.getDetailOfSonger(this.$route.query.id);
            let { cover, name, briefDesc } = data.data.artist;
            this.songer = {cover, name, briefDesc};
        }
    },
    created() {
        this.getDetailOfSonger();
        this.getTopSongs();
    },
}
</script>

<style lang="less" scoped>
    .songer{
        margin: 0 auto;
        width: 70vw;
        border-left: 1px solid #d3d3d3;
        border-right: solid 1px #d3d3d3;
        p{
            font-size: 30px;
            padding: 10px 3vw 3px 3vw;
            margin-bottom: 0;
        }
        .songer-info{
            height: 25vw;
            padding: 0 3vw;
            overflow: scroll;
            &::-webkit-scrollbar{
                visibility: hidden;
            }
            img{
                float: left;
                width: 44vw;
                height: 25vw;
                padding: 0 10px 0 0;
            }
        }
    }
</style>