<template>
  <div :class="{ list: true, row: (index + 1) % 2 }">
    <div class="index">{{ index + 1 }}</div>
    <i
      :class="{ play: true, iconfont: true, active: activeId === id }"
      @click="playIt"
      >&#xe624;</i
    >
    <div class="song-name">{{ songName }}</div>
    <div class="user-name">{{ userName }}</div>
    <div class="tops">
      <div class="play-count" :style="{ width: score + '%' }"></div>
      <div class="count">{{ playCount }}次</div>
    </div>
  </div>
</template>

<script>
import api from "../api/index";
export default {
  props: [
    "index",
    "songName",
    "songId",
    "userName",
    "userId",
    "playCount",
    "score",
  ],
  data() {
    return {
      songUrl: "",
    };
  },
  computed: {
    activeId() {
      return this.$store.getters.getIdOfSong;
    },
  },
  methods: {
    //播放音乐
    playIt() {
      this.$store.commit("playSong", this.songUrl);
      this.$store.commit("setPlayingSongId", this.songId);
    },
    //获取音乐Url
    async getSongUrl() {
      let { data } = await api.getSongUrl(this.songId);
      this.songUrl = data.data[0].url;
    },
  },
  created() {
    this.getSongUrl();
  },
};
</script>

<style lang="less" scoped>
.active {
  color: red;
}
.row {
  background: rgba(33, 33, 33, 0.05);
}
.list {
  display: flex;
  position: relative;
  height: 27px;
  width: 100%;
  padding-left: 16px;
  font-size: 18px;
  line-height: 27px;
  .index {
    width: 30px;
  }
  .play {
    margin-right: 1.5vw;
    &:hover {
      cursor: pointer;
      color: red;
    }
  }
  .song-name {
    margin-right: 8px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .user-name {
    font-size: 12px;
    color: #aeaeae;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .tops {
    position: absolute;
    right: 0;
    height: 100%;
    width: 200px;
    .play-count {
      position: absolute;
      left: 0;
      height: 100%;
      background-color: #4eb4f5;
      opacity: 0.1;
    }
    .count {
      position: absolute;
      font-size: 12px;
      color: rgb(48, 45, 45);
    }
  }
}
</style>