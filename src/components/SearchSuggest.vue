<template>
  <div class="search-suggest">
      <div class="result">搜索结果</div>
      <div class="box" v-if="songs.length">
          <div class="left"><div class="t">单曲</div></div>
          <div class="right">
              <div class="content" v-for="song in songs" :key="song.id" @mousedown="toSongPage(song.id)">{{song.name}}</div>
          </div>
      </div>
      <div class="box" v-if="artists.length">
          <div class="left"><div class="t">歌手</div></div>
          <div class="right">
              <div class="content" v-for="artist in artists" :key="artist.id" @mousedown="toArtistPage(artist.id)">{{artist.name}}</div>
          </div>
      </div>
      <div class="box" v-if="playlists.length">
          <div class="left"><div class="t">歌单</div></div>
          <div class="right last">
              <div class="content" v-for="list in playlists" :key="list.id" @mousedown="toListPage(list.id)">{{list.name}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['songs', 'artists', 'playlists'],
    data() {
        return {
            
        }
    },
    methods: {
        toSongPage(id) {
            console.log('box');
            this.$router.push({ path: '/songdetail', query: { id: id }});
            this.$store.commit('setSearchBox', false);
        },
        toArtistPage(id) {
            this.$router.push({ path: '/artist', query: { id: id }});
            this.$store.commit('setSearchBox', false);
        },
        toListPage(id) {
            this.$router.push({ path: '/playlist-detail', query: { id: id }});
            this.$store.commit('setSearchBox', false);
        }
    }
}
</script>

<style lang="less" scoped>
    .search-suggest{
        box-sizing: border-box;
        width: 23vw;
        padding: 1px;
        border: solid 1px #848484;
        border-radius: 3px;
        padding-bottom: 0;
        .result{
            text-align: center;
            font-size: 16px;
            color: #848484;
            border-bottom: solid 1px #848484;
        }
        .box{
            display: flex;
            .left{
                width: 5vw;
                .t{
                    text-align: center;
                    font-size: 14px;
                    line-height: inherit;
                    color: red;
                }
            }
            .right{
                flex: 1;
                font-size: 14px;
                padding: 3px;
                border-left: solid 1px #848484;
                border-bottom: solid 1px #848484;
                .content{
                    cursor: pointer;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        width: 14vw;
                    &:hover{
                        text-decoration: underline;
                    }
                }
                
            }
            .last{
                border-bottom: none;
            }
        }
    }
</style>