<template>
    <div class="content">
       <div class="play-list">
            <div class="header">
                <div class="title">全部歌单</div>
                <div class="more">更多</div>
            </div>
            <div class="songBox">
                <SongCover v-for="song in playlists" :key="song.id" :id="song.id" 
                :name="song.name" :picUrl="song.coverImgUrl" :userId="song.userId">
                <template v-slot:creator>
                    <span class="slot">by_{{song.nickname}}</span>
                </template>
                </SongCover>
            </div>
        </div> 
    </div>
</template>

<script>
import api from '../api/index'
import SongCover from '../components/SongCover.vue'
export default {
    components: { SongCover },
    data() {
        return {
            playlists: []

        }
    },
    methods: {
        async getPlayLists() {
            let { data } = await api.getPlayLists();

            data.playlists.forEach(list => {
                let { name, id, coverImgUrl, description, playCount } = list;
                let { userId, nickname } = list.creator;
                this.playlists.push({
                    name,
                    id,
                    coverImgUrl,
                    description,
                    userId,
                    nickname,
                    playCount
                })
            });
        }
    },
    created() {
        this.getPlayLists();
    }
}
</script>

<style lang="less" scoped>
    .content{
        margin: 0 auto;
        width: 70vw;
        border: solid 0.1px #a8a4a4;
        .play-list{
            margin: 0 auto;
            width: 66vw;
            .header{
                display: flex;
                justify-content: space-between;
                height: 50px;
                border-bottom: 2px solid red;
                .title{
                    line-height: 50px;
                    padding-left: 20px;
                }
                .more{
                    line-height: 50px;
                    padding-right: 20px;
                    cursor: pointer;
                    text-decoration: underline;
                    &:hover{
                        color: red;
                    }
                }
            }
            .songBox{
                width: 66vw;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .slot{
                    font-size: 10px;
                    cursor: pointer;
                    float: left;
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>