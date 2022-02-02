<template>
  <div :class="{ song_row:true, row: (index + 1) % 2 }">
      <div class="index">{{index + 1}}</div>
      <i :class="{ play: true, iconfont: true, active: activeId === id }" @click="playIt">&#xe624;</i>
      <div class="name"><span @click="toSongDetail">{{name}}</span></div>
      <div class="time">{{time | minute_second}}</div>
      <div class="category">{{category}}</div>
  </div>
</template>

<script>
import api from '../api/index'
export default {
    props: ['index', 'time', 'id', 'name', 'category'],
    data() {
      return {
        songUrl: ''
      }
    },
    filters: {
      minute_second(value) {
        value = value / 1000;
        if(value >= 60) {
          let m = Math.floor(value / 60);
          let s = Math.floor(value % 60);
          if(s < 10) {
            s = '0' + s;
          }
          return `${m}:${s}`;
        } else {
          if(value < 10) {
            value = '0' + value;
          }
          return `0:${value}`;
        }
      }
    },
    computed: {
      activeId() {
        return this.$store.getters.getIdOfSong;
      }
    },
    methods: {
      playIt() {
        this.$store.commit('playSong', this.songUrl);
        this.$store.commit('setPlayingSongId', this.id);
      },
      async getSongUrl() {
        let { data } = await api.getSongUrl(this.id);
        this.songUrl = data.data[0].url;
      },
      toSongDetail() {
        this.$router.push({ path: 'songdetail', query: { id: this.id }});
      }
    },
    created() {
      this.getSongUrl();
    },
}
</script>

<style lang="less" scoped>
  .active{
    color: red;
  }
  .row{
    background: rgba(33, 33, 33, 0.05);
  }
  .song_row{
    display: flex;
    width: 64vw;
    padding: 5px 3vw 5px 0;
    margin: 0 auto;
    .index{
      flex-basis: 3vw;
      color: #d3d3d3;
    }
    .play{
      margin-right: 1.5vw;
      &:hover{
        cursor: pointer;
        color: red;
      }
    }
    .name{
      flex-basis: 20vw;
      span{
        &:hover{
        cursor: pointer;
        text-decoration: underline;
      }
      }
    }
    .time{
      padding: 0 20px 0 4vw;
    }
    .category{
      justify-self: flex-end;
    }
  }
</style>