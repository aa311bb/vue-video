<template>
  <div class="video-list">
    <swiper :options="swiperOption">
      <!-- 幻灯内容 -->
      <swiper-slide v-for="(i, index) in dataList" :key="index">
        <div>
          <Videos :videoList="i" ref="videos" :index="index"></Videos>
        </div>
        <div class="infobar_warp">
          <InfoBar></InfoBar>
        </div>
        <div class="rightbar_warp">
          <RightBar @changeCom="showComs"></RightBar>
        </div>
      </swiper-slide>
    </swiper>

    <!-- 评论 -->
    <div class="comment-warp-box" v-if="showComment">
      <div class="comment-warp">
        <div class="comment-list">
          <div class="comment-top">
            <div class="number">15.0w条评论</div>
            <van-icon name="cross" size="20" color="#666666" @click="close" />
          </div>
          <div class="comment-body">
            <div class="comment-box">
              <div class="comment-item">
                <div class="user-pic">
                  <img src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                </div>
                <div class="item-info">
                  <div class="reply">
                    <p class="name">zjt</p>
                    <p class="reply-des">
                      求今晚不加班<span class="time">03-19</span>
                    </p>
                  </div>
                  <div class="zan">
                    <van-icon name="like" size="25" color="#ccc" />
                    <p>200</p>
                  </div>
                </div>
              </div>
              <div class="comment-box">
                <div class="sub-comment-item">
                  <div class="user-pic">
                    <img src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                  </div>
                  <div class="item-info">
                    <div class="reply">
                      <p class="name">啦啦啦</p>
                      <p class="reply-des">
                        <span>回复</span>
                        <span class="re-name">zjt:</span>
                        <span>求今晚不加班</span>
                        <span class="time">03-19</span>
                      </p>
                    </div>
                    <div class="zan" style="margin-right:5px;">
                      <van-icon
                        name="like"
                        size="25"
                        color="#ccc"
                        class="zan_1"
                      />
                      <p>200</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="more">--------展开60条回复</div>
            </div>
          </div>
          <!-- 评论框 -->
          <div class="reply-input">
            <input type="text" placeholder="留下你的精彩评论" />
            <span class="emoji">@</span>
            <van-icon name="chat" color="#ccc" size="25" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Videos from "../../components/index/Videos";
import InfoBar from "../../components/index/InfoBar";
import RightBar from "../../components/index/RightBar";
export default {
  name: "VideoList",
  data() {
    return {
      showComment: false,
      page: 1,
      swiperOption: {
        direction: "vertical",
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
        slidesPerView: 1,
        mousewheel: true,
        mousewheelControl: true,
        height: window.innerHeight, // 高度设置，占满设备高度
        resistanceRatio: 0,
        observeParents: true,
        //事件
        on: {
          //点击播放
          tap: () => {
            this.playAction(this.page - 1);
          },
          //滑动
          slideNextTransitionStart: () => {
            this.page += 1;
            this.nextVideo(this.page - 1);
          },
          slidePrevTransitionEnd: () => {
            if (this.page > 1) {
              this.page -= 1;
              this.prevVideo(this.page - 1);
            }
          },
        },
      },
      dataList: [
        {
          url:
            "http://video.jishiyoo.com/3720932b9b474f51a4cf79f245325118/913d4790b8f046bfa1c9a966cd75099f-8ef4af9b34003bd0bc0261cda372521f-ld.mp4",
          id: 1,
        },
        {
          url:
            "http://video.jishiyoo.com/1eedc49bba7b4eaebe000e3721149807/d5ab221b92c74af8976bd3c1473bfbe2-4518fe288016ee98c8783733da0e2da4-ld.mp4",
          id: 2,
        },
        {
          url:
            "http://video.jishiyoo.com/161b9562c780479c95bbdec1a9fbebcc/8d63913b46634b069e13188b03073c09-d25c062412ee3c4a0758b1c48fc8c642-ld.mp4",
          id: 3,
        },
        {
          url:
            "http://video.jishiyoo.com/549ed372c9d14b029bfb0512ba879055/8e2dc540573d496cb0942273c4a4c78c-15844fe70971f715c01d57c0c6595f45-ld.mp4",
          id: 4,
        },
      ],
    };
  },
  methods: {
    //点击播放
    playAction(index) {
      this.$refs.videos[index].playOrStop();
    },
    //下一个视频
    nextVideo(index) {
      this.$refs.videos[index - 1].stop();
      this.$refs.videos[index].play();
    },
    //回看
    prevVideo(index) {
      this.$refs.videos[index + 1].stop();
      this.$refs.videos[index].play();
    },
    //弹出评论
    showComs() {
      this.showComment = true;
    },
    close() {
      this.showComment = false;
    },
  },
  components: {
    swiper,
    swiperSlide,
    Videos,
    InfoBar,
    RightBar,
  },
};
</script>
<style scoped>
.video-list {
  background: #111;
}
.video-list .swiper-container {
  position: relative;
}
.infobar_warp {
  position: absolute;
  bottom: 55px;
}
.rightbar_warp {
  position: absolute;
  right: 10px;
  bottom: 50px;
}

/* 评论 */
.comment-warp-box {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 500px;
  width: 100%;
  background: #fff;
  z-index: 10;
}
.comment-warp {
  position: fixed;
  bottom: 60px;
  left: 0;
  height: 500px;
  width: 100%;
  background: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  z-index: 10;
  padding: 10px;
  box-sizing: border-box;
}
.comment-top {
  display: flex;
  align-items: center;
}
.number {
  flex: 1;
  text-align: center;
}
.comment-body {
  max-width: 450px;
  overflow-y: auto;
  margin-top: 20px;
}
.comment-item {
  display: flex;
}
.user-pic {
  width: 33px;
  height: 33px;
}
.user-pic img {
  width: 33px;
  height: 33px;
  border-radius: 50%;
}
.item-info {
  margin-left: 10px;
  display: flex;
  flex: 1;
}
.reply {
  width: 90%;
}
.reply-des {
  line-height: 24px;
}
.reply .name {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}
.reply .time {
  color: #666;
  font-size: 14px;
}
.zan p {
  color: #ccc;
  margin-top: 5px;
}
.sub-comment-item {
  display: flex;
  margin-left: 33px;
}
.re-name {
  padding: 0 10px;
  color: #666;
}
.more {
  margin-left: 33px;
  margin-top: 10px;
}
.reply-input {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  align-items: center;
  display: flex;
  justify-content: space-around;
}
.reply-input input {
  line-height: 40px;
  width: 70%;
  border: none;
  padding: 0 10px;
}
.emoji {
  font-size: 25px;
  color: #ccc;
}
</style>
