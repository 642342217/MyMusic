<template>
  <div class="song-detail">
      <div class="header">
          <div class="pic"><img :src="picUrl" :alt="name"></div>
          <div class="song-content">
              <div class="song-name">{{name}}</div>
              <div class="song-artist">歌手：<span @click="toSonger">{{artist}}</span></div>
              <div class="play" @click="playMusic">
                  <i class="iconfont">&#xe624;</i>
                  <span>播放</span>
              </div>
              <div :class="{ lyric: true, showAll: showAll }">{{lyric}}</div>
              <div v-if="!showAll" class="show" @click="showAll = !showAll">展开</div>
              <div v-else class="show" @click="showAll = !showAll">收起</div>
          </div>
      </div>
      <div class="comment">
            <div class="comment-header">评论</div>
            <div class="my-comment">
                <div class="txt">
                    <textarea id="comment" placeholder="评论" v-model="inputValue"></textarea>
                </div>
                <div class="btn" @click="sendComment">评论</div>
                <div :class="{ txt_number: true, warn: number >= 0 ? false : true }">{{number}}</div>
            </div>
            <div class="hotComments">精彩评论</div>
            <Comment v-for="comment in hotComments" :key="comment.commentId" :beReplied="comment.beReplied"
            :content="comment.content" :liked="comment.liked" :likedCount="comment.likedCount"
            :user="comment.user" :timeStr="comment.timeStr" :commentId="comment.commentId"></Comment>
            <div class="latestComments">最新评论</div>
            <Comment v-for="comment in latestComments" :key="comment.commentId" :beReplied="comment.beReplied"
            :content="comment.content" :liked="comment.liked" :likedCount="comment.likedCount"
            :user="comment.user" :timeStr="comment.timeStr" :commentId="comment.commentId"></Comment>
      </div>
      <v-alert type="success" :value="success">发表评论成功！</v-alert>
      <v-alert type="info" v-model="info" dismissible><h5 @click="vetifyByCaptcha">{{helpInfo}}</h5></v-alert>
  </div>
</template>

<script>
import api from '../api/index';
import Comment from './Comment.vue'
export default {
    data() {
        return {
            number: 140,//可评论剩余字数
            inputValue: '',//评论
            id: '',//歌手ID
            songId: '',
            name: '',
            picUrl: '',
            artist: '',
            lyric: '',
            showAll: false,
            songUrl: '',
            latestComments: [],//最新评论
            hotComments: [],//热门评论
            success: false,//发布成功消息提示框
            info: false,//发布失败消息提示框
            helpInfo: '',//提示信息
        }
    },
    methods: {
        //获取歌曲详情：歌名，歌曲图片，作者
        async getSongDetail() {
            let { data } = await api.getDetailOfSong(this.$route.query.id);
            this.id = data.songs[0].ar[0].id;
            this.songId = data.songs[0].id;
            this.name = data.songs[0].name;
            this.picUrl = data.songs[0].al.picUrl;       
            this.artist = data.songs[0].ar[0].name;  
        },
        //获取歌词
        async getLyric() {
            let { data } = await api.getLyric(this.$route.query.id);
            this.lyric = data.lrc.lyric;
            let re = /\[[0-9]*:[0-9]*\.[0-9]*\]/g;
            this.lyric = this.lyric.replace(re, '');
        },
        //跳转至歌手界面
        toSonger() {
            this.$router.push({ path: 'artist', query: { id: this.id }});
        },
        //播放音乐
        async playMusic() {
            let { data } = await api.getSongUrl(this.songId);
            this.songUrl = data.data[0].url;
            this.$store.commit('playSong', this.songUrl);
        },
        //发表评论
        sendComment() {
            let data = api.sendCommentOfSong(this.songId, this.inputValue);
            data.then(value => {
                if(value.data.code === 200) {
                    this.inputValue = '';
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                    }, 1000);
                } else {
                    this.helpInfo = value.data.data.dialog.subtitle;
                    console.log(this.helpInfo);
                    this.info = true;
                    console.log(this.info);
                }
                
            }, reason => {
                console.error(reason);
            })
        },
        //获取评论（最新评论+热门评论）
        async getComments() {
            let { data } = await api.getCommentOfSong(this.$route.query.id);
            this.latestComments = data.comments;
            this.hotComments = data.hotComments;
        },
        //短信验证
        vetifyByCaptcha() {
            this.$bus.$emit('vetifyByCaptcha', '');
            this.info = false;
        }
    },
    watch: {
        //监听当前最新输入框的值，修改剩余最大字数
        inputValue(newValue) {
            this.number = 140 - newValue.length;
        }
    },
    created() {
        this.getSongDetail();
        this.getLyric();
        this.getComments();
    },
    mounted() {
        this.$bus.$on('updateComments', () => {
            this.getComments();
        });
    },
    beforeDestroy() {
        this.$bus.$off('updateComments');
    },
    components: { Comment }
}
</script>

<style lang="less" scoped>
    .song-detail{
        .v-alert{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            h5{
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
        margin: 0 auto;
        width: 64vw;
        border-left: solid #d3d3d3 1px;
        border-right: solid #d3d3d3 1px;
        .header{
            display: flex;
            width: 60vw;
            margin: 0 auto;
            .pic{
                width: 18vw;
                height: 18vw;
                padding: 15px 15px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }
            }
            .song-content{
                display: flex;
                flex-direction: column;
                flex: 1;
                padding: 15px 0 0 30px;
                .song-name{
                    font-size: 28px;
                }
                .song-artist{
                    padding: 10px 0;
                    font-size: 15px;
                    span{
                        color: #0c73c2;
                        cursor: pointer;
                    }
                }
                .play{
                    width: 100px;
                    height: 30px;
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
                .lyric{
                    padding: 10px 0;
                    font-size: small;
                    white-space: pre-wrap;
                    height: 301px;
                    overflow: hidden;
                }
                .showAll{
                    height: auto;
                }
                .show{
                    color: #0c73c2;
                    cursor: pointer;
                }
            }
        }
        .comment{
            width: 60vw;
            margin: 20px auto 0;
            .comment-header{
                height: 40px;
                line-height: 40px;
                font-size: 20px;
                border-bottom: solid red 2px;
            }
            .my-comment{
                margin-top: 10px;
                .txt{
                    height: 100px;
                    width: 60vw;
                    border: solid 1px #d3d3d3;
                    #comment{
                        resize: none;
                        outline: none;
                        width: 100%;
                        height: 100px;
                        overflow: auto;
                    }
                }
                .btn{   
                    float: right;
                    margin-top: 5px;
                    border-radius: 5px;
                    cursor: pointer;
                    text-align: center;
                    line-height: 28px;
                    width: 50px;
                    height: 28px;
                    background-color: #0c73c2;
                    color: white;
                }
                .txt_number{
                    float: right;
                    height: 28px;
                    line-height: 28px;
                    margin-top: 6px;
                    margin-right: 10px;
                }
                .warn{
                    color: red;
                }
            }
            .latestComments,
            .hotComments{
                margin-top: 50px;
                border-bottom: solid 2px red;
                padding-bottom: 6px;
            }
        }
    }
</style>