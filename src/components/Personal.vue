<template>
  <div class="personal">
    <!-- 用户的资料 -->
    <div class="user-detail">
      <div class="avatar"><img :src="avatarUrl" :alt="nickname" /></div>
      <div class="content">
        <div class="first">
          <div class="name">{{ nickname }}</div>
          <!-- <div class="setInfo" @click="setInfo">设置资料</div> -->
        </div>
        <hr />
        <div class="second">
          <div class="follows">关注：{{ follows }}</div>
          <span>|</span>
          <div class="followed">粉丝：{{ followeds }}</div>
        </div>
        <div class="third">
          个人介绍：{{ signature || "这个人很懒，什么都没留下~" }}
        </div>
      </div>
    </div>

    <!-- 最近播放 -->
    <div class="latest-play">
      <div class="header">
        <div class="title">最近播放</div>
        <div class="option">
          <span :class="{ active: showWeekly }" @click="toWeeklyPlay">最近一周</span>
          <span class="interval">|</span>
          <span :class="{ active: !showWeekly }" @click="toAllPlay">所有时间</span>
        </div>
      </div>
      <LatestPlay
        v-for="(list, index) in lists"
        :key="list.id"
        :index="index"
        :playCount="list.playCount"
        :songId="list.songId"
        :songName="list.songName"
        :userId="list.userId"
        :userName="list.userName"
        :score="list.score"
      ></LatestPlay>
    </div>

    <!-- 用户歌单 -->
    <div class="user-playlist">
      <div class="create" v-if="create_list.length">
        {{ nickname }}创建的歌单
      </div>
      <div class="box">
        <SongCover
          v-for="list1 in create_list"
          :key="list1.id"
          :id="list1.id"
          :picUrl="list1.coverImgUrl"
          :name="list1.name"
          class="cover"
        ></SongCover>
      </div>
      <div class="collect" v-if="collectlist.length">
        {{ nickname }}收藏的歌单
      </div>
      <div class="box">
        <SongCover
          v-for="list in collectlist"
          :key="list.id"
          :id="list.id"
          :picUrl="list.coverImgUrl"
          :name="list.name"
          class="cover"
        ></SongCover>
      </div>
    </div>
  </div>
</template>

<script>
import SongCover from "./SongCover.vue";
import LatestPlay from "./LatestPlay.vue";
import api from "../api/index";
export default {
  data() {
    return {
      avatarUrl: "",
      nickname: "",
      signature: "", //个人介绍
      userId: "",
      followeds: "", //粉丝
      follows: "", //关注
      playlistCount: "", //创建的歌单数量
      create_list: [], //创建的歌单
      collectlist: [], //收藏的歌单
      weeklyPlay: [], //最近一周播放歌曲
      allPlay: [], //所有播放歌曲
      showWeekly: true, //控制当前显示页面的切换
    };
  },
  components: { SongCover, LatestPlay },
  methods: {
    // 获取用户信息
    async getDetail() {
      let { data } = await api.getUserDetail(this.$route.query.id);
      let {
        avatarUrl,
        nickname,
        signature,
        userId,
        followeds,
        follows,
        playlistCount,
      } = data.profile;
      this.avatarUrl = avatarUrl;
      this.nickname = nickname;
      this.signature = signature;
      this.userId = userId;
      this.followeds = followeds;
      this.follows = follows;
      this.playlistCount = playlistCount;
    },
    // 获取歌单列表
    async getPlayLists() {
      // 0c255704b57c063bb6aca0f33edb5628
      let { data } = await api.getPlayListsOfUser(this.$route.query.id);
      console.log(data);
      data.playlist.forEach((list) => {
        let { coverImgUrl, name, id } = list;
        if (list.userId == this.$route.query.id) {
          this.create_list.push({
            coverImgUrl,
            name,
            id,
          });
        } else {
          this.collectlist.push({
            coverImgUrl,
            name,
            id,
          });
        }
      });
    },
    // 获取最近播放歌曲
    async getWeeklyPlay() {
      this.weeklyPlay = [];
      let { data } = await api.getWeeklyPlay(this.$route.query.id);
      let len = Math.min(data.weekData.length, 10);
      for (let i = 0; i < len; i++) {
        let { playCount, score } = data.weekData[i];
        let { name: songName, id: songId } = data.weekData[i].song;
        let { name: userName, id: userId } = data.weekData[i].song.ar[0];
        this.weeklyPlay.push({
          playCount,
          score,
          songName,
          songId,
          userName,
          userId,
        });
      }
      this.showWeekly = true;
    },
    //获取所有时间播放的歌曲
    async getAllPlay() {
      this.allPlay = [];
      let { data } = await api.getAllPlay(this.$route.query.id);
      let len = Math.min(data.allData.length, 10);
      for (let i = 0; i < len; i++) {
        let { playCount, score } = data.allData[i];
        let { name: songName, id: songId } = data.allData[i].song;
        let { name: userName, id: userId } = data.allData[i].song.ar[0];
        this.allPlay.push({
          playCount,
          score,
          songName,
          songId,
          userName,
          userId,
        });
      }
      this.showWeekly = false;
    },
    //展示最近一周播放
    toWeeklyPlay() {
        if(this.showWeekly) {
            return;
        } else {
            this.getWeeklyPlay();
        }
    },
    //展示所有时间播放
    toAllPlay() {
        if(!this.showWeekly) {
            return;
        } else {
            this.getAllPlay();
        }
    }
  },
  computed: {
    //当前展示的列表
    lists() {
      return this.showWeekly ? this.weeklyPlay : this.allPlay;
    },
  },
  created() {
    this.getDetail();
    this.getPlayLists();
    this.getWeeklyPlay();
  },
};
</script>

<style lang="less" scoped>
.personal {
  margin: 0 auto;
  width: 70vw;
  border: solid 0.1px #a8a4a4;
  border-bottom: none;
  .user-detail {
    display: flex;
    padding: 30px 24px;
    .avatar {
      width: 200px;
      height: 200px;
      border: solid 1px #d5d5d5;
      padding: 4px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .content {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 0 24px;
      .first {
        // display: flex;
        font-size: 22px;
        height: 33px;
        // justify-content: space-between;
        // .setInfo{
        //     font-size: 15px;
        //     line-height: 33px;
        //     border: solid 1px #a8a4a4;
        //     cursor: pointer;
        //     color: white;
        //     background-color: #0c73c2;
        // }
      }
      hr {
        margin: 14px 0 8px;
        width: 100%;
      }
      .second {
        display: flex;
        height: 36px;
        span {
          margin: 0 8px;
        }
      }
    }
  }
  .user-playlist {
    padding: 0 24px;
    .create {
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      border-bottom: 2px solid red;
    }
    .collect {
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      margin-top: 60px;
      border-bottom: 2px solid red;
    }
    .box {
      width: 66vw;
      display: flex;
      flex-wrap: wrap;
      .cover {
        margin-right: 15.3px;
      }
    }
  }
  .latest-play {
    padding: 30px 24px;
    .header {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      border-bottom: 2px solid red;
      .option {
        font-size: 10px;
        color: #a8a4a4;
        span {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .interval {
          cursor: none;
          &:hover {
            text-decoration: none;
          }
          padding: 0 6px;
        }
        .active {
          color: black;
        }
      }
    }
  }
}
</style>