<template>
  <div class="content">
    <div class="top"></div>
    <div class="top_1"></div>
    <div class="banner">
      <van-icon name="arrow-left" class="icon-left" color="white" size="25" @click="goback"/>
      <div class="bg">
        <van-image
          width="100"
          height="100"
          round
          @click="isLogin = true"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
    </div>
    <div class="bottom">
      <van-cell-group :border="false">
        <van-cell title="我的喜欢" icon="like-o" is-link />
      </van-cell-group>
      <van-cell-group :border="false">
        <van-cell title="我的视频" icon="envelop-o" is-link />
      </van-cell-group>

      <van-cell-group :border="false">
        <van-cell title="播放历史" icon="clock-o" is-link />
      </van-cell-group>
      <van-cell-group :border="false">
        <van-cell title="问题反馈" icon="edit" is-link />
      </van-cell-group>
    </div>
    <transition
      enter-active-class="animate__animated animate__fadeInRight"
      leave-active-class="animate__animated animate__fadeOutRight"
    >
      <div class="sign" v-if="isLogin">
        <Sign @sign="sign"></Sign>
      </div>
    </transition>
  </div>
</template>
<script>
import Sign from "../components/me/Sign.vue";
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  created() {},
  components: {
    Sign,
  },
  methods: {
    sign(index) {
      this.isLogin = index;
    },
     goback() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.content {
  width: 100vw;
  height: 100vh;
  background: #111;
}
.top{
  width: 100%;
  height: 7vh;
  position: fixed;
  top: 0;
  background: #111;
  z-index: 3;
}
.top_1{
  width: 100%;
  height: 7vh;
  background: #111;
}
.banner {
  background: #ccc;
  width: 100%;
  height: 30vh;
}
.bg {
  width: 100%;
  height: 100%;
  background: url("../assets/img/微信图片_20210228152418.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-left {
  position: fixed;
  top: 20px;
  left: 20px;
}
.bottom .van-icon {
  font-size: 20px;
  margin-right: 10px;
}
.van-cell {
  color: white;
  background: #1e1e1e;
}
.sign {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  z-index: 30;
}
</style>
