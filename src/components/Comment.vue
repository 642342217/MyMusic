<template>
  <div class="comment">
      <div class="head"><img v-lazy="user.avatarUrl" alt="头像"></div>
      <div class="bdy">
        <div class="content-box"><span class="name">{{user.nickname}}</span>:<span class="content">{{contents}}</span></div>
        <div class="replied" v-if="beReplied.length">
          <span class="name">{{beReplied[0].user.nickname}}</span>:<span class="content">{{beReplied[0].content}}</span>
        </div>
        <div class="footer">
          <div class="time">{{timeStr}}</div>
          <div class="liked-reply">
            <i :class="{ liked: liked, iconfont: true }" @click="like">&#xec7f;</i>
            <span class="likedCount" v-if="likedCount">({{likedCount}})</span>
            <span> | </span>
            <span class="reply-content" @click="vetifyStatus">回复</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import api from '../api/index'
export default {
  props: ['user', 'content', 'beReplied', 'likedCount', 'timeStr', 'liked', 'commentId'],
  methods: {
    async like() {
      let { data } = await api.getLoginStatus();
      if(data.data.account === null) {
          return this.$store.commit('changeShowLoginBox', true);
      }
      if(this.liked) {
        await api.likeCommentOfSong(this.$route.query.id, this.commentId, 0);
        this.$bus.$emit('updateComments', '');
      } else {
        await api.likeCommentOfSong(this.$route.query.id, this.commentId, 1);
        this.$bus.$emit('updateComments', '');
      }
    },
    //查询用户是否已经登录
    async vetifyStatus() {
        let { data } = await api.getLoginStatus();
        if(data.data.account === null) {
            this.$store.commit('changeShowLoginBox', true);
        }
    }
    },
    computed: {
      contents() {
        return this.content.replace('/n', '');
      }
    }
}
</script>

<style lang="less" scoped>
  .comment{
    display: flex;
    padding: 16px 0;
    border-bottom: dotted 1px grey;
    .head{
      height: 50px;
      width: 50px;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .bdy{
        width: 50vw;
        padding-left: 10px;
        .content-box{
          
          .name{
            cursor: pointer;
            color: #0c73c2;
          }
          .content{
            white-space: pre-wrap;
          }
        }
        .replied{
            padding: 6px 3px;
            background: #f4f4f4;
            border: 1px solid #dedede;
        }
        .footer{
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
          .time{
            color: #999;
            font-size: small;
          }
          .liked-reply{
            font-size: 15px;
            i{
              cursor: pointer;
              font-size: 18px;
            }
            .liked{
              color: red;
            }
            .reply-content{
              cursor: pointer;
            }
          }
        }
      }
  }
</style>