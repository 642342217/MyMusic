<template>
    <div class="hot-songer">
        <div class="header">
            <div class="title">热门歌手</div>
            <div class="more">更多</div>
        </div>
        <div class="songerBox">
            <SongerCover v-for="artist in artists" :key="artist.id" :name="artist.name" :imgUrl="artist.imgUrl"></SongerCover>
        </div>
    </div>
</template>

<script>
import api from '../api/index'
import SongerCover from './SongerCover.vue'
export default {
    data() {
        return {
            artists: [],
        }
    },
    components: { SongerCover },
    async created() {
        let {data} = await api.getHotSonger();
        data.artists.forEach(person => {
            let {name, id, img1v1Url, fansCount} = person;
            this.artists.push({name: name, id: id, imgUrl: img1v1Url, fansCount: fansCount}); 
        })
        this.$store.commit('receiveHotSongerInfo', this.artists);
    },
}
</script>

<style lang="less" scoped>
    .hot-songer{
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
        .songerBox{
            width: 66vw;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
    }
</style>