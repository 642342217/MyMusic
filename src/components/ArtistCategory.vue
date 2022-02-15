<template>
  <div class="box">
      <div class="title">{{title}}</div>
      <div class="options">
          <ul>
              <li ref="hot" :class="{'active': !initial}"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: '-1' }}">热门</router-link></li>
              <li ref="a"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'a' }}">A</router-link></li>
              <li ref="b"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'b' }}">B</router-link></li>
              <li ref="c"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'c' }}">C</router-link></li>
              <li ref="d"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'd' }}">D</router-link></li>
              <li ref="e"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'e' }}">E</router-link></li>
              <li ref="f"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'f' }}">F</router-link></li>
              <li ref="g"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'g' }}">G</router-link></li>
              <li ref="h"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'h' }}">H</router-link></li>
              <li ref="i"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'i' }}">I</router-link></li>
              <li ref="j"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'j' }}">J</router-link></li>
              <li ref="k"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'k' }}">K</router-link></li>
              <li ref="l"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'l' }}">L</router-link></li>
              <li ref="m"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'm' }}">M</router-link></li>
              <li ref="n"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'n' }}">N</router-link></li>
              <li ref="o"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'o' }}">O</router-link></li>
              <li ref="p"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'p' }}">P</router-link></li>
              <li ref="q"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'q' }}">Q</router-link></li>
              <li ref="r"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'r' }}">R</router-link></li>
              <li ref="s"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 's' }}">S</router-link></li>
              <li ref="t"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 't' }}">T</router-link></li>
              <li ref="u"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'u' }}">U</router-link></li>
              <li ref="v"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'v' }}">V</router-link></li>
              <li ref="w"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'w' }}">W</router-link></li>
              <li ref="x"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'x' }}">X</router-link></li>
              <li ref="y"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'y' }}">Y</router-link></li>
              <li ref="z"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: 'z' }}">Z</router-link></li>
              <li ref="other"><router-link :to="{ path: '/artists/artist-category', query: { id, initial: '0' }}">其他</router-link></li>
          </ul>
      </div>
      <div class="cover">
          <SongerCover v-for="artist in artists" :key="artist.id" :id="artist.id"
            :name="artist.name" :imgUrl="artist.imgUrl" class="songer"></SongerCover>
      </div>
      <div class="name"></div>
  </div>
</template>

<script>
import SongerCover from './SongerCover.vue'
import api from '../api/index'
export default {
    data() {
        return {
            artists: [],
            title: '',
            id: '',
            initial: ''
        }
    },
    components: { SongerCover },
    methods: {
        //     limit：返回数量，默认为30
        // type取值：
        //     -1:全部
        //     1:男歌手
        //     2:女歌手
        //     3:乐队
        // area取值：
        //     -1:全部
        //     7华语
        //     96欧美
        //     8:日本
        //     16韩国
        //     0:其他
        // initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 
        // 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
        async getArtists(type, area, initial) {
            let { data } = await api.getArtists(type, area, initial);
            data.artists.forEach(person => {
                let { name, id, img1v1Url } = person;
                this.artists.push({ name: name, id: id, imgUrl: img1v1Url }); 
            });
        },
        toDetailPage(id) {
            if(this.initial !== '') {
                switch(id) {
                    case '101': this.getArtists(1, 7, this.initial); this.title="华语男歌手"; break;
                    case '102': this.getArtists(2, 7, this.initial); this.title="华语女歌手"; break;
                    case '201': this.getArtists(1, 96, this.initial); this.title="欧美男歌手"; break;
                    case '202': this.getArtists(2, 96, this.initial); this.title="欧美女歌手"; break;
                    case '301': this.getArtists(1, 0, this.initial); this.title="其它女歌手"; break;
                    case '302': this.getArtists(2, 0, this.initial); this.title="其它女歌手"; break;
                }
            } else {
                switch(id) {
                    case '101': this.getArtists(1, 7, -1); this.title="华语男歌手"; break;
                    case '102': this.getArtists(2, 7, -1); this.title="华语女歌手"; break;
                    case '201': this.getArtists(1, 96, -1); this.title="欧美男歌手"; break;
                    case '202': this.getArtists(2, 96, -1); this.title="欧美女歌手"; break;
                    case '301': this.getArtists(1, 0, -1); this.title="其它女歌手"; break;
                    case '302': this.getArtists(2, 0, -1); this.title="其它女歌手"; break;
                }
            }
        },
        clearActive() {
            this.$refs['hot'].className = '';
            this.$refs['a'].className = '';
            this.$refs['b'].className = '';
            this.$refs['c'].className = '';
            this.$refs['d'].className = '';
            this.$refs['e'].className = '';
            this.$refs['f'].className = '';
            this.$refs['g'].className = '';
            this.$refs['h'].className = '';
            this.$refs['i'].className = '';
            this.$refs['j'].className = '';
            this.$refs['k'].className = '';
            this.$refs['l'].className = '';
            this.$refs['m'].className = '';
            this.$refs['n'].className = '';
            this.$refs['o'].className = '';
            this.$refs['p'].className = '';
            this.$refs['q'].className = '';
            this.$refs['r'].className = '';
            this.$refs['s'].className = '';
            this.$refs['t'].className = '';
            this.$refs['u'].className = '';
            this.$refs['v'].className = '';
            this.$refs['w'].className = '';
            this.$refs['x'].className = '';
            this.$refs['y'].className = '';
            this.$refs['z'].className = '';
            this.$refs['other'].className = '';
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.initial = this.$route.query.initial;
        this.toDetailPage(this.$route.query.id);
    },
    beforeUpdate() {
        let init = this.$route.query.initial;
        if(!init) {
            return this.$refs['hot'].className = 'active';
        }
        this.clearActive();
        switch (init) {
            case '-1':
                this.$refs['hot'].className = 'active';
                break;
            case '0':
                this.$refs['other'].className = 'active';
                break;
            default:
                this.$refs[init].className = 'active';
                break;
        }
    }
}
</script>

<style lang="less" scoped>
    .box{
        padding: 30px 20px;
        .title{
            height: 50px;
            border-bottom: 2px solid red;
        }
        .cover{
            display: flex;
            justify-content: space-between;
            flex-flow: wrap;
            .songer{
                width: 11vw;
                height: 11vw;
            }
        }
        .options{
            ul{
                display: flex;
                justify-content: space-between;
                list-style-type: none;
                padding-left: 0;
                margin-top: 16px;
                li{
                    padding: 2px 5px;
                    cursor: pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }
                .active{
                    a{
                        color: white;
                    }
                    background-color: red;
                }
            }
        }
    }
</style>