export const login = '/login/cellphone';//手机号码+密码登录
export const sendCaptcha = '/captcha/sent';//发送验证码
export const logout = '/logout';//退出登录
export const carousels = '/banner?type=0';//获取轮播图
export const songUrl = '/song/url';//获取已知id音乐的url
export const recommendSong = '/personalized/newsong?limit=6';//获取推荐音乐
export const loginStatus = '/login/status';//获取登录状态
export const hotSonger = '/top/artists';//获取热门歌手
export const topSongOfSonger =  '/artist/top/song';//获取歌手热门歌曲
export const detailOfArtist = '/artist/detail';//获取歌手详情
export const detailOfSong = '/song/detail';//获取歌曲详情
export const lyric = '/lyric';//获取歌词
export const commentOfSong = '/comment/music';//获取歌曲评论
export const sendComment = '/comment?t=1&type=0';//歌曲-发送评论
export const replyComment = '/comment?t=2&type=0';//歌曲-回复评论
export const like = '/comment/like?type=0';//给歌曲评论点赞
export const playlists = '/top/playlist?limit=30';//获取歌单
export const detailOfPlayList = '/playlist/detail';//获取歌单详情
export const songsOfPlayList = '/playlist/track/all';//获取歌单所有歌曲
export const userDetail = '/user/detail';//获取用户详情信息
export const follow = '/follow';//关注/取消关注用户
export const playlistOfUser = '/user/playlist';//获取用户歌单
export const artists = '/artist/list';//获取歌手分类
export const userAccount = '/user/account';//获取个人账号信息
export const weeklyPlay = '/user/record?type=1';//获取最近一周播放歌曲
export const allPlay = '/user/record?type=0';//获取所有播放歌曲
export const suggest = '/search/suggest';//搜索建议
export const search = '/search?limit=20';//获取相关搜索结果