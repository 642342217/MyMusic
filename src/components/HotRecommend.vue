<template>
    <div class="hot_recommend">
        <div class="header">
            <div class="title">新品推荐</div>
            <div class="more">更多</div>
        </div>
        <div class="songBox">
            <SongCover v-for="song in songInfo" :key="song.id" :id="song.id" 
            :name="song.name" :picUrl="song.picUrl"></SongCover>
        </div>
    </div>
</template>

<script>
import SongCover from './SongCover.vue'
export default {
    components: {SongCover},
    computed: {
        songInfo() {
            return this.$store.getters.getRecommendSong;
        }
    }
        
}
</script>

<style lang="less" scoped>
    .hot_recommend{
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
        }
    }
</style>