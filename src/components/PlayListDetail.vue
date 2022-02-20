<template>
  <div class="playlist-detail">
      <div class="content">
          <div class="header">
              <div class="avatar">
                  <img :src="info.coverImgUrl" :alt="info.name">
              </div>
              <div class="main">
                  <div class="title">{{info.name}}</div>
                  <div class="creator">
                      <div class="creator-avatar">
                          <img :src="info.avatarUrl" :alt="info.nickname">
                      </div>
                      <div class="creator-name" @click="toUserPage">{{info.nickname}}</div>
                  </div>
                  <div class="play">
                      <i class="iconfont">&#xe624;</i>
                      <span>播放</span>
                  </div>
                  <div :class="{ description: !showAll, showAll: showAll}">介绍：{{info.description}}</div>
                  <div v-if="!showAll" class="show" @click="showAll = !showAll">展开</div>
                  <div v-else class="show" @click="showAll = !showAll">收起</div>
              </div>
          </div>
          <div class="main">
              <div class="song-list">歌曲列表</div>
            <Song-Row v-for="(song, index) in songs" :key="song.id" :index="index" :name="song.name"
            :category="song.category" :id="song.id" :time="song.dt" :userId="song.userId" :userName="song.userName">
            <template v-slot:creator>
                <span>{{song.userName}}</span>
            </template>
            </Song-Row>
          </div>
      </div>
  </div>
</template>

<script>
import api from '../api/index'
import SongRow from '../components/SongRow.vue';
export default {
    data() {
        return {
            info: {},
            showAll: false,
            showWay: 'description',
            songs: []
        }
    },
    components: { SongRow },
    methods: {
        //获取歌单详情
        async getDetail() {
            let { data } = await api.getDetailOfPlayList(this.$route.query.id);
            let { coverImgUrl, id, name, description } = data.playlist;
            let { userId, nickname, avatarUrl } = data.playlist.creator;
            this.info = {
                coverImgUrl,
                id,
                name,
                description,
                userId,
                nickname,
                avatarUrl
            }
        },
        //获取歌单所有歌曲
        async getSongsOfPlayList() {
            let { data } = await api.getSongsOfPlayList(this.$route.query.id);
            data.songs.forEach(song => {
                let { name, id, dt } = song;
                let { id: userId, name: userName } = song.ar[0];
                let category = song.al.name;
                this.songs.push({
                    name,
                    id,
                    dt,
                    userId,
                    userName,
                    category
                });
            });
        },
        //导航至用户界面
        toUserPage() {
            this.$router.push({ path: '/user', query: { id: this.info.userId }});
        }
    },
    created() {
        this.getDetail();
        this.getSongsOfPlayList();
    }
}
</script>

<style lang="less" scoped>
    .playlist-detail{
        margin: 0 auto;
        width: 70vw;
        border: solid 0.1px #a8a4a4;
        .content{
            width: 64vw;
            margin: 0 auto;
            .header{
                display: flex;
                padding: 40px 0 0;
                .avatar{
                    height: 230px;
                    width: 230px;
                    padding: 3px;
                    border: solid 0.1px #a8a4a4;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .main{
                    flex: 1; 
                    padding: 0 15px;
                    .creator{
                        display: flex;
                        margin: 6px 0;
                        .creator-avatar{
                            height: 30px;
                            width: 30px;
                            img{
                                height: 100%;
                                width: 100%;
                            }
                        }
                        .creator-name{
                            height: 30px;
                            font-size: 12px;
                            color: skyblue;
                            line-height: 30px;
                            margin-left: 6px;
                            cursor: pointer;
                            &:hover{
                                text-decoration: underline;
                            }
                        }
                    }
                    .play{
                        width: 100px;
                        height: 30px;
                        margin: 16px 0;
                        background-color: #0c73c2;
                        color: white;
                        cursor: pointer;
                        i{
                            line-height: 30px;
                            padding: 0 10px;
                        }
                        span{
                            padding-left: 8px;
                        }
                    }
                    .description{
                        height: 100px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: pre-wrap;
                    }
                    .showAll{
                        height: auto;
                        white-space: pre-wrap;
                    }
                    .show{
                        color: #0c73c2;
                        cursor: pointer;
                    }
                }
            }
            .main{
                margin-top: 30px;
                .song-list{
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    border-bottom: 2px solid red;
                }
            }
        }
    }
</style>