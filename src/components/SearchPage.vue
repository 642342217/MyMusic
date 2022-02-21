<template>
  <div class="search-page">
    <div class="search-box">
      <div class="input"><input type="text" v-model="searchValue" disabled></div>
      <div class="search-button iconfont">&#xe600;</div>
    </div>
    <div class="header">
      <div ref="song" @click="$router.push({ path: '/search', query: { s: searchValue, type: 1 }})">单曲</div>
      <div ref="artist" @click="$router.push({ path: '/search', query: { s: searchValue, type: 100 }})">歌手</div>
      <div ref="playlist" @click="$router.push({ path: '/search', query: { s: searchValue, type: 1000 }})">歌单</div>
      <div ref="user">用户</div>
    </div>
    <div class="show-box">
      <!-- 单曲容器 -->
      <div class="song" v-show="$route.query.type == '1'">
        <SongRow v-for="(song, index) in songs" :key="song.id" :index="index"  :userName="song.userName"
         :id="song.id" :name="song.name" :time="song.duration" :userId="song.userId">
          <template v-slot:artist>
            {{song.userName}}
          </template> 
        </SongRow>
      </div>
      <div v-if="$route.query.type == '1' && songs.length == 0">
        找不到相关歌曲~
      </div>

      <!-- 歌手容器 -->
      <div class="artist" v-show="$route.query.type == '100'">
          <SongerCover v-for="artist in artists" :key="artist.id" :id="artist.id" :imgUrl="artist.imgUrl" :name="artist.name"></SongerCover>
      </div>
      <div v-if="$route.query.type == '100' && artists.length == 0">
        找不到相关歌手~
      </div>

      <!-- 歌单容器 -->
      <div class="playlist">
          <SongCover v-for="list in playlists" :key="list.id" :id="list.id" 
          :name="list.name" :picUrl="list.coverImgUrl" :userId="list.userId">
            <template v-slot:creator>
                <span class="slot">by_{{list.nickname}}</span>
            </template>
          </SongCover>
      </div>
      <div v-if="$route.query.type == '1000' && playlists.length == 0">
        找不到相关歌单~
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index'
import SongRow from './SongRow.vue'
import SongerCover from './SongerCover.vue'
import SongCover from './SongCover.vue'
export default {
    data() {
        return {
            songs: [],
            artists: [],
            playlists: [],
            users: [],
            searchValue: ''
        }
    },
    components: { SongRow, SongerCover, SongCover },
    methods: {
      /*
      type：搜索类型；默认为1：单曲  ；100：歌手；   1000：歌单；   1002：用户；
      */
      async getSearchInfo(type) {
        let { data } = await api.getSearchResult(this.$route.query.s, type);
        //对获取的歌曲进行操作
        if(type == 1) {
          //遍历获取的歌曲，保存id以及名称
          data.result.songs.forEach(song => {
            let { name: songName, id: songId, duration } = song;
            let { name: userName, id: userId } = song.artists[0];
            this.songs.push({
              id: songId,
              name: songName,
              duration,
              userName,
              userId
            });
          });
          // 对获取的歌手进行操作
        } else if(type == 100) {
          data.result.artists.forEach(artist => {
            let { name, id, picUrl } = artist;
            this.artists.push({
              id,
              name,
              imgUrl: picUrl
            })
          })
        } else if(type == 1000) {
          data.result.playlists.forEach(list => {
            let { name, id, coverImgUrl } = list;
            let { nickname, userId } = list.creator;
            this.playlists.push({
              id,
              name,
              coverImgUrl,
              userId,
              nickname
            });
          });
        }
      },

    },
    created() {
      this.searchValue = this.$route.query.s;
      this.getSearchInfo(this.$route.query.type);
      this.$nextTick(() => {
        switch (this.$route.query.type) {
          case '1':
            this.$refs.song.className = 'active';
            break;
          case '100':
            this.$refs.artist.className = 'active';
            break;
          case '1000':
            this.$refs.playlist.className = 'active';
            break;
          default:
            this.$refs.user.className = 'active';
            break;
        }
      });
    }
}
</script>

<style lang="less" scoped>
  .search-page{
    width: 70vw;
    height: auto;
    margin: 0 auto;
    padding: 3vw;
    border-left: solid 1px #848484;
    border-right: solid 1px #848484;
    .search-box{
      position: relative;
      top: 50px;
      width: 30vw;
      height: 38px;
      line-height: 38px;
      margin: 0 auto;
      .input{
        position: absolute;
        left: 0;
        width: 26vw;
        height: 100%;
        border: solid 1px #848484;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        input{
          margin-left: 16px;
          outline: none;
        }
      }
      .search-button{
        position: absolute;
        right: 0;
        height: 100%;
        width: 4vw;
        font-size: 20px;
        text-align: center;
        color: #333;
        border: solid 1px #848484;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
      }
    }
    .header{
      display: flex;
      margin-top: 120px;
      border: solid 1px #ccc;
      div{
        width: 16vw;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border: solid 1px #ccc;
        cursor: pointer;
      }
      .active{
        border-bottom: solid 2px red;
      }
    }
    .show-box{
      .artist{
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
      }
      .playlist{
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
      }
    }
  }
</style>