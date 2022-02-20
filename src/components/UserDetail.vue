<template>
  <div class="user">
      <div class="user-detail">
          <div class="avatar"><img :src="avatarUrl" :alt="nickname"></div>
          <div class="content">
              <div class="first">
                  <div class="name">{{nickname}}</div>
                  <div class="follow" @click="follow"><span class="jia" v-if="!followed">+</span>{{followed ? '取消关注' : '关注'}}</div>
              </div>
              <hr>
              <div class="second">
                  <div class="follows">关注：{{follows}}</div>
                  <span>|</span>
                  <div class="followed">粉丝：{{followeds}}</div>
              </div>
              <div class="third">个人介绍：{{signature || '这个人很懒，什么都没留下~'}}</div>
          </div>
      </div>
      <div class="user-playlist">
          <div class="create" v-if="create_list.length">{{nickname}}创建的歌单</div>
          <div class="box">
              <SongCover v-for="list1 in create_list" :key="list1.id" :id="list1.id" 
              :picUrl="list1.coverImgUrl" :name="list1.name" class="cover"></SongCover>  
          </div>
          <div class="collect" v-if="collectlist.length">{{nickname}}收藏的歌单</div>
          <div class="box">
              <SongCover v-for="list in collectlist" :key="list.id" :id="list.id" 
              :picUrl="list.coverImgUrl" :name="list.name" class="cover"></SongCover>   
          </div>
      </div>
  </div>
</template>

<script>
import api from '../api/index';
import SongCover from './SongCover.vue'
export default {
    data() {
        return {
            avatarUrl: '',
            nickname: '',
            followed: '',       //是否已关注此用户
            signature: '',      //个人介绍
            userId: '',
            followeds: '',      //粉丝
            follows: '',        //关注
            playlistCount: '',  //创建的歌单数量
            create_list: [],    //创建的歌单
            collectlist: [],    //收藏的歌单
        }
    },
    components: { SongCover },
    methods: {
        //获取用户详情
        async getDetail() {
            let { data } = await api.getUserDetail(this.$route.query.id);
            let { avatarUrl, nickname, followed, signature, userId, followeds, follows, playlistCount } = data.profile;
            this.avatarUrl = avatarUrl;
            this.nickname = nickname;
            this.followed = followed;
            this.signature = signature;
            this.userId = userId;
            this.followeds = followeds;
            this.follows = follows;
            this.playlistCount = playlistCount;  
        },
        //关注用户
        async follow() {
            if(this.followed) {
                try {
                    api.followUser(this.$route.query.id, 0);
                } catch(e) {
                    console.log(e);
                }
                
            } else {
                try {
                    api.followUser(this.$route.query.id, 1);
                } catch(e) {
                    console.log(e);
                }
            }
            this.getDetail();
        },
        async getPlayLists() {
            // 0c255704b57c063bb6aca0f33edb5628
            let { data } = await api.getPlayListsOfUser(this.$route.query.id);
            data.playlist.forEach(list => {
                let { coverImgUrl, name, id } = list;
                if(list.userId == this.$route.query.id) {
                    this.create_list.push({
                        coverImgUrl,
                        name,
                        id
                    });
                } else {
                    this.collectlist.push({
                        coverImgUrl,
                        name,
                        id
                    })
                }
            });
        }
    },
    created() {
        this.getDetail();
        this.getPlayLists();
    }
}
</script>

<style lang="less" scoped>
    .user{
        margin: 0 auto;
        width: 70vw;
        border: solid 0.1px #a8a4a4;
        border-bottom: none;
        .user-detail{
            display: flex;
            padding: 30px 24px;
            .avatar{
                width: 200px;
                height: 200px;
                border: solid 1px #d5d5d5;
                padding: 4px;
                img{
                    height: 100%;
                    width: 100%;
                }
            }
            .content{
                display: flex;
                flex: 1;
                flex-direction: column;
                padding: 0 24px;
                .first{
                    display: flex;
                    font-size: 22px;
                    height: 33px;
                    .follow{
                        font-size: 12px;
                        padding: 0 3px;
                        margin-left: 12px;
                        line-height: 33px;
                        background: #3b95da;
                        color: white;
                        border-radius: 4px;
                        .jia{
                            font-size: 16px;
                            padding: 0 6px 0 0;
                        }
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
                hr{
                    margin: 14px 0 8px;
                    width: 100%;
                }
                .second{
                    display: flex;
                    height: 36px;
                    span{
                        margin: 0 8px;
                    }
                }
            }
        }
        .user-playlist{
            padding: 0 24px;
            .create{
                height: 40px;
                line-height: 40px;
                font-size: 20px;
                border-bottom: 2px solid red;
            }
            .collect{
                height: 40px;
                line-height: 40px;
                font-size: 20px;
                margin-top: 60px;
                border-bottom: 2px solid red;
            }
            .box{
                width: 66vw;
                display: flex;
                flex-wrap: wrap;
                .cover{
                    margin-right: 15.3px;
                }
            }
        }
    }
</style>