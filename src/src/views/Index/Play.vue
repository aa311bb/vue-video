<template>
  <div class="page">
    <div class="video" >
      <van-icon
        name="arrow-left"
        color="white"
        class="fanhui"
        size="25"
        @click="goback"
      />
      <div class="videos">
        <video-player
          class="video-player vjs-default-skin vjs-big-play-centered"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
    </div>
    <div style="width:100%;height:30vh"></div>
    <div v-if="!loading">
      <div class="content">
        <span>{{ content.title }}</span>
        <div class="time">
          <span>{{ cao }}</span>
          <span>/</span>
          <span>{{ content.duration | date }}</span>
        </div>
        <span class="synopsis">{{ content.intro }}</span>
        <span @click="showPopup" style="color:skyblue;font-size:12px"
          >阅读全文→</span
        >
        <van-popup
          v-model="show"
          round
          :style="{ height: '45%', width: '80%', background: 'black' }"
        >
          <div class="overlay">
            <span>{{ content.title }}</span>
            <span>{{ content.index_intro }}</span>
            <span>{{ content.intro }}</span>
          </div>
        </van-popup>
      </div>
      <div class="line"></div>
      <div class="relate">
        <div class="more" v-for="(p, i) in content.relate_video" :key="i">
          <div class="name">
            <span style="margin-left:10px">{{ p.name }}</span>
            <van-icon name="arrow" style="margin-right:5px" />
          </div>
          <div class="more_video">
            <div v-for="(n, index) in p.list" :key="index">
              <router-link :to="`/play/${n.postid}`" style="color:white">
                <van-image
                  width="160"
                  height="100"
                  :src="n.image"
                  style="filter: brightness(0.8);"
                />
                <div class="font">
                  <span>{{ n.duration | date }}</span>
                  <span>{{ n.title }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="comment">
        <span class="total">{{ content.comment.total }}条评论</span>
        <div
          class="comment_box"
          v-for="c in content.comment.list"
          :key="c.commentid"
        >
          <Comment :comment="c"></Comment>
          <div class="reply" v-if="c.subcomment">
            <div
              class="reply_content"
              v-for="x in c.subcomment"
              :key="x.commentid"
            >
              <Comment :comment="x"></Comment>
            </div>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="loading" v-show="loading">
      <van-loading color="#1989fa" size="50px" />
    </div>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
import Comment from "../../components/index/Comment";
export default {
  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto",
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "", // 路径
            type: "video/mp4", // 类型
          },
        ],
        poster: "", //你的封面地址
        width: document.documentElement.clientWidth,
        // notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      url: "",
      content: null,
      cao: "",
      show: false,
      pastID: "",
      loading: true,
    };
  },
  // props: ["isPlay"],
  created() {
    this.pastID = this.$route.params.id;
    this.$store.commit("changeTop",false);
    this.init();
  },
  components: {
    videoPlayer,
    Comment,
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    goback() {
      this.$router.go(-1);
      this.$store.commit("changeTop",true)
    },
    init() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2200);
      try {
        this.$axios
          .get(
            "http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid=" +
              this.pastID
          )
          .then((data) => {
            this.url = data.data.data.content_video[0].progressive[0].url;
            this.content = data.data.data;
            this.cao = data.data.data.cate[0];
            // console.log(this.content);
            this.playerOptions["sources"][0]["src"] = this.url;
            this.playerOptions["poster"] = this.content.content_video[0].image;
            // this.$store.commit("setContent", [data.data.data, this.pastID]);
          });
      } catch (error) {
        console.log(error);
      }

      // let contentMap = this.$store.state.contentMap;
      // if (contentMap.get(this.pastID)) {
      //   console.log("找到缓存");
      //   let content = contentMap.get(this.pastID);
      //   this.url = content.content_video[0].progressive[0].url;
      //   this.content = content;
      //   // console.log(this.content);
      //   this.cao = content.cate[0];
      //   // console.log(this.content);
      //   this.playerOptions["sources"][0]["src"] = this.url;
      //   this.playerOptions["poster"] = this.content.content_video[0].image;
      // } else {
      //   console.log("未找到缓存");

      // }

      // try {
      //   for (let i = 0; i < this.content.relate_video.length; i++) {
      //     setTimeout(() => {
      //       this.content.relate_video[i].list.forEach((item) => {
      //         this.$axios
      //           .get(
      //             "http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid=" +
      //               item.postid
      //           )
      //           .then((data) => {
      //             this.$store.commit("setContent", [
      //               data.data.data,
      //               item.postid,
      //             ]);
      //           });
      //       });
      //     }, 2000);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
  filters: {
    date(x) {
      let s = x % 60;
      if (s < 10) {
        s = "0" + s;
      }
      return parseInt(x / 60) + "'" + s + "''";
    },
  },
  watch: {
    $route() {
      //当参数改变时就会触发比方法，以此达到数据属性
      this.pastID = this.$route.params.id;
      this.init();
    },
  },
};
</script>
<style scoped>
.page {
  position: relative;
  width: 100%;
  background: #111;
  position: relative;
  z-index: 27;
}
.video {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
}
.fanhui {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 8;
}
.content {
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 45vh;
}
.content > span:nth-child(1) {
  margin-top: 5%;
  font-weight: bold;
  font-size: 18px;
}
.synopsis {
  width: 95%;
  font-size: 14px;
  color: #ccc;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
.time {
  width: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
}
.line {
  width: 100%;
  height: 1px;
  background: #1f1f1f;
  margin: 15px 0;
}
.overlay {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding-top: 10px;
  overflow: auto;
}
.overlay span:nth-child(1) {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.overlay span:nth-child(2) {
  font-size: 12px;
  color: #666;
}
.overlay span:nth-child(3) {
  font-size: 14px;
  color: #ccc;
}
.relate {
  color: white;
}
.name {
  display: flex;
  justify-content: space-between;
}
.name > span {
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
}
.more_video {
  display: flex;
  overflow-x: auto;
}
/* 隐藏滚动条 */
.more_video::-webkit-scrollbar {
  width: 0;
}

.more_video > div {
  margin: 10px 5px 0px 10px;

  position: relative;
}
.font {
  position: absolute;
  bottom: 5px;
  left: 5px;
  display: flex;
  flex-direction: column;
}
.font span:nth-child(1) {
  font-size: 10px;
}
.font span:nth-child(2) {
  width: 150px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.comment {
  color: white;
}
.comment_box {
  margin: 20px 0;
}
.reply_content {
  margin: 20px 0 0px 50px;
}
.loading {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.total {
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
}
.video >>> .vjs-poster{
  background-size: cover !important;
}
</style>
