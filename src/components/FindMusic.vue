<template>
  <div class="box">
      <div class="header">
        <!-- 轮播图 -->
        <div class="banner">
            <v-carousel             
                height="100%"
                width="100%"
                :cycle="true"
                interval="3000"
                hide-delimiter-background
            >
                <v-carousel-item
                v-for="(src, i) in pics"
                :key="i"
                :src="src"
                ></v-carousel-item>
            </v-carousel>
        </div>
        <div class="content">
            <HotRecommend/>
            <HotSonger/>
        </div>
      </div>

  </div>
</template>

<script>
import HotRecommend from './HotRecommend'
import HotSonger from './HotSonger'
import api from '../api/index'
export default {
    components:{ HotRecommend, HotSonger},
    data() {
        return {
            pics: [],
        }
    },
    methods: {
        //获取轮播图素材
        async getCarousels() {
            let {data} = await api.getCarousel();
            let banners = data.banners;
            for(let i = 0; i < banners.length; i ++) {
                this.pics.push(banners[i].imageUrl);
            }
        },
        //获取推荐音乐
        async getRecommendSong() {
            let {data} = await api.getRecommendSong();
            console.log(data);
            if(data.code != 200) {
                alert("无法获取推荐音乐！");
            } else {
                let recommendSong = [];
                data.result.forEach(item => {
                    let {id: songId, name: songName, picUrl: songPic} = item;
                    recommendSong.push({
                        id: songId, name: songName, picUrl: songPic
                    });
                })
                this.$store.commit('receiveRecommendSong', recommendSong);
            }
        }
    },
    created() {
        this.getCarousels();
        this.getRecommendSong();
    },
}
</script>

<style lang="less" scoped>
    .box{
        width: 100vw;
        .header{
            .banner{
                margin: 0 auto;
                width: 70vw;
                height: 28vw;
            }
        }
        .content{
            margin: 0 auto;
            width: 70vw;
            border: solid 0.1px #a8a4a4;
        }
    }
</style>