(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2543a498"],{"1c3b":function(t,e,a){},"484b":function(t,e,a){},"5a99":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"personal"},[a("div",{staticClass:"user-detail"},[a("div",{staticClass:"avatar"},[a("img",{attrs:{src:t.avatarUrl,alt:t.nickname}})]),a("div",{staticClass:"content"},[a("div",{staticClass:"first"},[a("div",{staticClass:"name"},[t._v(t._s(t.nickname))])]),a("hr"),a("div",{staticClass:"second"},[a("div",{staticClass:"follows"},[t._v("关注："+t._s(t.follows))]),a("span",[t._v("|")]),a("div",{staticClass:"followed"},[t._v("粉丝："+t._s(t.followeds))])]),a("div",{staticClass:"third"},[t._v(" 个人介绍："+t._s(t.signature||"这个人很懒，什么都没留下~")+" ")])])]),a("div",{staticClass:"latest-play"},[a("div",{staticClass:"header"},[a("div",{staticClass:"title"},[t._v("最近播放")]),a("div",{staticClass:"option"},[a("span",{class:{active:t.showWeekly},on:{click:t.toWeeklyPlay}},[t._v("最近一周")]),a("span",{staticClass:"interval"},[t._v("|")]),a("span",{class:{active:!t.showWeekly},on:{click:t.toAllPlay}},[t._v("所有时间")])])]),t._l(t.lists,(function(t,e){return a("LatestPlay",{key:t.id,attrs:{index:e,playCount:t.playCount,songId:t.songId,songName:t.songName,userId:t.userId,userName:t.userName,score:t.score}})}))],2),a("div",{staticClass:"user-playlist"},[t.create_list.length?a("div",{staticClass:"create"},[t._v(" "+t._s(t.nickname)+"创建的歌单 ")]):t._e(),a("div",{staticClass:"box"},t._l(t.create_list,(function(t){return a("SongCover",{key:t.id,staticClass:"cover",attrs:{id:t.id,picUrl:t.coverImgUrl,name:t.name}})})),1),t.collectlist.length?a("div",{staticClass:"collect"},[t._v(" "+t._s(t.nickname)+"收藏的歌单 ")]):t._e(),a("div",{staticClass:"box"},t._l(t.collectlist,(function(t){return a("SongCover",{key:t.id,staticClass:"cover",attrs:{id:t.id,picUrl:t.coverImgUrl,name:t.name}})})),1)])])},n=[],i=a("1da1"),r=(a("d3b7"),a("159b"),a("b0c0"),a("96cf"),a("9011")),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:{list:!0,row:(t.index+1)%2}},[a("div",{staticClass:"index"},[t._v(t._s(t.index+1))]),a("i",{class:{play:!0,iconfont:!0,active:t.activeId===t.id},on:{click:t.playIt}},[t._v("")]),a("div",{staticClass:"song-name"},[t._v(t._s(t.songName))]),a("div",{staticClass:"user-name"},[t._v(t._s(t.userName))]),a("div",{staticClass:"tops"},[a("div",{staticClass:"play-count",style:{width:t.score+"%"}}),a("div",{staticClass:"count"},[t._v(t._s(t.playCount)+"次")])])])},o=[],c=a("365c"),u={props:["index","songName","songId","userName","userId","playCount","score"],data:function(){return{songUrl:""}},computed:{activeId:function(){return this.$store.getters.getIdOfSong}},methods:{playIt:function(){this.$store.commit("playSong",this.songUrl),this.$store.commit("setPlayingSongId",this.songId)},getSongUrl:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c["a"].getSongUrl(t.songId);case 2:a=e.sent,s=a.data,t.songUrl=s.data[0].url;case 5:case"end":return e.stop()}}),e)})))()}},created:function(){this.getSongUrl()}},d=u,g=(a("7631"),a("2877")),h=Object(g["a"])(d,l,o,!1,null,"6765ceee",null),p=h.exports,m={data:function(){return{avatarUrl:"",nickname:"",signature:"",userId:"",followeds:"",follows:"",playlistCount:"",create_list:[],collectlist:[],weeklyPlay:[],allPlay:[],showWeekly:!0}},components:{SongCover:r["a"],LatestPlay:p},methods:{getDetail:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s,n,i,r,l,o,u,d,g;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c["a"].getUserDetail(t.$route.query.id);case 2:a=e.sent,s=a.data,n=s.profile,i=n.avatarUrl,r=n.nickname,l=n.signature,o=n.userId,u=n.followeds,d=n.follows,g=n.playlistCount,t.avatarUrl=i,t.nickname=r,t.signature=l,t.userId=o,t.followeds=u,t.follows=d,t.playlistCount=g;case 12:case"end":return e.stop()}}),e)})))()},getPlayLists:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c["a"].getPlayListsOfUser(t.$route.query.id);case 2:a=e.sent,s=a.data,s.playlist.forEach((function(e){var a=e.coverImgUrl,s=e.name,n=e.id;e.userId==t.$route.query.id?t.create_list.push({coverImgUrl:a,name:s,id:n}):t.collectlist.push({coverImgUrl:a,name:s,id:n})}));case 5:case"end":return e.stop()}}),e)})))()},getWeeklyPlay:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s,n,i,r,l,o,u,d,g,h,p,m;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.weeklyPlay=[],e.next=3,c["a"].getWeeklyPlay(t.$route.query.id);case 3:for(a=e.sent,s=a.data,n=Math.min(s.weekData.length,10),i=0;i<n;i++)r=s.weekData[i],l=r.playCount,o=r.score,u=s.weekData[i].song,d=u.name,g=u.id,h=s.weekData[i].song.ar[0],p=h.name,m=h.id,t.weeklyPlay.push({playCount:l,score:o,songName:d,songId:g,userName:p,userId:m});t.showWeekly=!0;case 8:case"end":return e.stop()}}),e)})))()},getAllPlay:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s,n,i,r,l,o,u,d,g,h,p,m;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.allPlay=[],e.next=3,c["a"].getAllPlay(t.$route.query.id);case 3:for(a=e.sent,s=a.data,n=Math.min(s.allData.length,10),i=0;i<n;i++)r=s.allData[i],l=r.playCount,o=r.score,u=s.allData[i].song,d=u.name,g=u.id,h=s.allData[i].song.ar[0],p=h.name,m=h.id,t.allPlay.push({playCount:l,score:o,songName:d,songId:g,userName:p,userId:m});t.showWeekly=!1;case 8:case"end":return e.stop()}}),e)})))()},toWeeklyPlay:function(){this.showWeekly||this.getWeeklyPlay()},toAllPlay:function(){this.showWeekly&&this.getAllPlay()}},computed:{lists:function(){return this.showWeekly?this.weeklyPlay:this.allPlay}},created:function(){var t=this;c["a"].getLoginStatus().then((function(e){null==e.data.data.account&&t.$router.go(-1)})),this.getDetail(),this.getPlayLists(),this.getWeeklyPlay()}},v=m,y=(a("e88a"),Object(g["a"])(v,s,n,!1,null,"1478862c",null));e["default"]=y.exports},7631:function(t,e,a){"use strict";a("ceaa")},9011:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("div",{staticClass:"song_cover",style:t.background,on:{click:t.toDetailPage}},["findmusic"===t.page?a("div",{staticClass:"mask"},[a("div",{class:t.playOrPause,on:{click:function(e){return e.stopPropagation(),t.playOrPauseSong.apply(null,arguments)}}})]):t._e()]),a("div",{staticClass:"song_name",on:{mouseenter:function(e){return t.showAll(e)},mouseleave:function(e){t.showAllName=!t.showAllName},click:t.toDetailPage}},[t._v(t._s(t.name))]),"playlist"===t.page||"search"===t.page?a("div",{on:{click:t.toCreator}},[t._t("creator")],2):t._e(),t.showAllName?a("span",{staticClass:"allName",style:{top:t.y+"px",left:t.x+"px",position:"absolute",fontSize:"8px"}},[t._v(t._s(t.name))]):t._e()])},n=[],i=a("1da1"),r=(a("96cf"),a("365c")),l={props:["id","name","picUrl","userId"],data:function(){return{background:{background:"url(".concat(this.picUrl,")")},songUrl:"",showAllName:!1,x:"",y:"",page:""}},methods:{playSong:function(){this.$store.commit("playSong",this.songUrl),this.$store.commit("setPlaySongUrl",this.songUrl)},pauseSong:function(){this.$store.commit("pausePlay")},playOrPauseSong:function(){!0===this.$store.getters.getIsPlaySong&&this.$store.getters.getPlaySongUrl==this.songUrl?this.pauseSong():this.playSong()},showAll:function(t){var e=t||window.event,a=document.documentElement.scrollLeft||document.body.scrollLeft,s=document.documentElement.scrollTop||document.body.scrollTop,n=e.pageX||e.clientX+a,i=e.pageY||e.clientY+s;this.x=n+10,this.y=i+15,this.showAllName=!this.showAllName},toDetailPage:function(){"#/findmusic"!==window.location.hash?this.$router.push({path:"/playlist-detail",query:{id:this.id}}):"#/findmusic"===window.location.hash&&this.$router.push({path:"/songdetail",query:{id:this.id}})},toCreator:function(){this.$router.push({path:"/user",query:{id:this.userId}})}},computed:{playOrPause:function(){var t=this.$store.getters.getIsPlaySong,e=this.$store.getters.getPlaySongUrl;return!0===t&&e===this.songUrl?{pause:!0}:{play:!0}}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("#/findmusic"!==window.location.hash){e.next=6;break}return e.next=3,r["a"].getSongUrl(t.id);case 3:a=e.sent,s=a.data,t.songUrl=s.data[0].url;case 6:case"end":return e.stop()}}),e)})))()},beforeMount:function(){"#/findmusic"===window.location.hash?this.page="findmusic":"#/playlist"===window.location.hash?this.page="playlist":"#/search?s=1&type=1000"===window.location.hash?this.page="search":this.page="user"}},o=l,c=(a("ea0a"),a("2877")),u=Object(c["a"])(o,s,n,!1,null,"fd1c7bb0",null);e["a"]=u.exports},ceaa:function(t,e,a){},e88a:function(t,e,a){"use strict";a("1c3b")},ea0a:function(t,e,a){"use strict";a("484b")}}]);
//# sourceMappingURL=chunk-2543a498.a0e280b7.js.map