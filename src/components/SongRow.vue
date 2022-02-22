<template>
  <div :class="{ song_row:true, myrow: (index + 1) % 2 }">
      <div class="index">{{index + 1}}</div>
      <i :class="{ play: true, iconfont: true, active: activeId === id }" @click="playIt">&#xe624;</i>
      <div class="name"><span @click="toSongDetail" @mouseenter="showSong(event)" @mouseleave="showSongName = !showSongName">{{name}}</span></div>
      <div class="creator" v-if="userId"><span @click="toSonger" class="slot" @mouseenter="showCreator($event)" @mouseleave="showCreatorName = !showCreatorName"><slot name="creator"></slot></span></div>
      <div class="time">{{time | minute_second}}</div>
      <div class="category" v-if="category" @mouseenter="showCategory(event)" @mouseleave="showCategoryName = !showCategoryName">{{category}}</div>
      <span class="category-name" :style="{ top: y + 'px', left: x + 'px', position: 'absolute', fontSize: 8 + 'px'}" v-if="showCategoryName">{{category}}</span>
      <span class="song-name" :style="{ top: y + 'px', left: x + 'px', position: 'absolute', fontSize: 8 + 'px'}" v-if="showSongName">{{name}}</span>
      <span class="allName" :style="{ top: y + 'px', left: x + 'px', position: 'absolute', fontSize: 8 + 'px'}" v-if="showCreatorName">{{userName}}</span>
      <div class="creator"><span @click="toSonger" class="slot" @mouseenter="showCreator($event)" @mouseleave="showCreatorName = !showCreatorName"><slot name="artist"></slot></span></div>
  </div>
</template>

<script>
import api from '../api/index'
export default {
    props: ['index', 'time', 'id', 'name', 'userId', 'userName', 'category'],
    data() {
      return {
        songUrl: '',
        showSongName: false,
        showCategoryName: false,
        showCreatorName: false,
      }
    },
    filters: {
      //将时间戳转化为分-秒
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
          value = value + '';
          let newValue = '';
          for(let i = 0; i < 2; i ++) {
            newValue += value[i];
          }
          return `0:${newValue}`;
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
      },
      //获取当前鼠标位置
      getMousePosition(event) {
        let e = event || window.event;
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let x = e.pageX || e.clientX + scrollX;
        let y = e.pageY || e.clientY + scrollY;
        this.x = x + 10;
        this.y = y + 15;
      },
      //展示歌曲全称
      showSong(event) {
        this.getMousePosition(event);
        this.showSongName = !this.showSongName;
      },
      //展示作者全称
      showCreator(event) {
        this.getMousePosition(event);
        this.showCreatorName = !this.showCreatorName;
      },
      //展示专辑全称
      showCategory(event) {
        this.getMousePosition(event);
        this.showCategoryName = !this.showCategoryName;
      },
      //跳转至歌手页面
      toSonger() {
        this.$router.push({ path: 'artist', query: { id: this.userId }});
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
  .myrow{
    background: rgba(33, 33, 33, 0.05);
  }
  .song_row{
    display: flex;
    width: 64vw;
    padding: 5px 3vw 5px 0;
    margin: 0 auto;
    .index{
      width: 3vw;
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
      width: 15vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span{
        &:hover{
        cursor: pointer;
        text-decoration: underline;
      }
      }
    }
    .song-name{
      background-color: #fff;
      border: solid 1px #242424;
    }
    .time{
      padding: 0 20px 0 4vw;
    }
    .category{
      justify-self: flex-end;
      width: 15vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .category-name{
      background-color: #fff;
      border: solid 1px #242424;
    }
    .creator{
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 10px;
      .slot{
        &:hover{
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
    .allName{
      background-color: #fff;
      border: solid 1px #242424;
    }
  }
</style>