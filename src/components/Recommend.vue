<template>
  <div class="recommend">
    <div class="header">
        <div class="title">热门歌手</div>
        <div class="more">更多</div>
    </div>
    <div class="songerBox">
        <SongerCover v-for="artist in artists" :key="artist.id" :id="artist.id"
        :name="artist.name" :imgUrl="artist.imgUrl" :style="{ width: 10 + 'vw', height: 10 + 'vw'}"></SongerCover>
    </div>
  </div>
</template>

<script>
import SongerCover from './SongerCover.vue'
import api from '../api/index'
export default {
    data() {
        return {
            artists: []
        }
    },
    components: { SongerCover },
    methods: {
        async getArtists() {
            let { data } = await api.getArtists(-1, -1, -1);
            data.artists.forEach(person => {
            let {name, id, img1v1Url, fansCount} = person;
            this.artists.push({name: name, id: id, imgUrl: img1v1Url, fansCount: fansCount}); 
        });
        }
    },
    created() {
        this.getArtists();
    }
}
</script>

<style lang="less" scoped>
    .recommend{
        box-sizing: border-box;
        width: 64vw;
        padding: 30px 30px;
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
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
    }
</style>