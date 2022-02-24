<template>
  <div class="artist">
      <div class="left">
          <div class="box">
              <div class="title">推荐</div>
              <ul type="square">
                  <li ref="1th" class="active"><router-link to="/artists/recommend">推荐歌手</router-link></li>
              </ul>
          </div>
          <div class="box">
              <div class="title">华语</div>
              <ul type="square">
                  <li ref="2th"><router-link :to="{ path: '/artists/artist-category', query: { id: '101' }}">华语男歌手</router-link></li>
                  <li ref="3th"><router-link :to="{ path: '/artists/artist-category', query: { id: '102' }}">华语女歌手</router-link></li>
              </ul>
          </div>
          <div class="box">
              <div class="title">欧美</div>
              <ul type="square">
                  <li ref="4th"><router-link :to="{ path: '/artists/artist-category', query: { id: '201' }}">欧美男歌手</router-link></li>
                  <li ref="5th"><router-link :to="{ path: '/artists/artist-category', query: { id: '202' }}">欧美女歌手</router-link></li>
              </ul>
          </div>
          <div class="box">
              <div class="title">其它</div>
              <ul type="square">
                  <li ref="6th"><router-link :to="{ path: '/artists/artist-category', query: { id: '301' }}">其它男歌手</router-link></li>
                  <li ref="7th"><router-link :to="{ path: '/artists/artist-category', query: { id: '302' }}">其它女歌手</router-link></li>
              </ul>
          </div>
      </div>
      <div class="content">
            <keep-alive>
                <router-view :key="$route.query" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view :key="$route.query" v-if="!$route.meta.keepAlive"></router-view>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        getQueryId() {
            return this.$route.query.id;
        },
        clearActive() {
            this.$refs['1th'].className = '';
            this.$refs['2th'].className = '';
            this.$refs['3th'].className = '';
            this.$refs['4th'].className = '';
            this.$refs['5th'].className = '';
            this.$refs['6th'].className = '';
            this.$refs['7th'].className = '';
        }
    },
    created() {
        let id = this.getQueryId();
        this.$nextTick(() => {
            this.clearActive();
            switch (id) {
                case '101':
                    this.$refs['2th'].className = 'active';
                    break;
                case '102':
                    this.$refs['3th'].className = 'active';
                    break;
                case '201':
                    this.$refs['4th'].className = 'active';
                    break;
                case '202':
                    this.$refs['5th'].className = 'active';
                    break;
                case '301':
                    this.$refs['6th'].className = 'active';
                    break;
                case '302':
                    this.$refs['7th'].className = 'active';
                    break;
                default:
                    this.$refs['1th'].className = 'active';
                    break;
            }
        });
    }
}
</script>

<style lang="less" scoped>
    .artist{
        display: flex;
        width: 80vw;
        margin: 0 auto;
        border: solid 0.1px #a8a4a4;
        .left{
            box-sizing: border-box;
            width: 16vw;
            border-right: solid 1px #a8a4a4;
            padding: 30px 20px;
            .box{
                margin-bottom: 16px;
                border-bottom: solid 1px #a8a4a4;
            }
            .box:last-child{
                border-bottom: none;
            }
            .title{
                margin-left: 5px;
                font-size: 20px;
            }
            ul{
                color: #333;
                li{
                    padding-left: 0;
                    margin: 3px 0;
                    &:hover{
                        text-decoration: underline;
                    }
                    a{
                        font-size: 16px;
                        color: #333;
                    }
                }
                .active{
                    color: red;
                    a{
                        color: red;
                    }
                }
            }
        }
        .content{
            flex: 1;
        }
    }
</style>