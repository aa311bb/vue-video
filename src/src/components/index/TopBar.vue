<template>
  <div>
    <div class="top-bar">
      <div class="left">
        <van-icon name="calendar-o" size="25" @click="show = true" />
      </div>
      <div class="middle">
        <div class="item">
          <router-link to="/discover" 
            ><span>发现</span></router-link
          >
        </div>
        <div class="item">
          <router-link to="/classify"
            ><span>分类</span></router-link
          >
        </div>
        <div class="item">
          <router-link to="/videoList" 
            ><span>推荐</span></router-link
          >
        </div>
        <div class="item">
          <router-link to="/me"
            ><span>我的</span></router-link
          >
        </div>
      </div>
      <div class="right">
        <router-link to="/search"><van-icon name="search" size="25" color="white"/></router-link>
      </div>
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div
          class="daily"
          v-if="show"
          :style="{
            background: `url(${daily.image_blurred})`,
          }"
        >
          <div class="button">
            <van-icon name="cross" @click="show = !show" size="25" />
          </div>
          <div class="daily_content">
            <div class="picture">
              <img :src="daily.image" />
              <div class="time">
                <span>{{ daily.time.day }}</span>
                <div class="line"></div>
                <div class="date">
                  <span>{{ daily.time.month }}</span>
                  <span>{{ daily.time.week }}</span>
                </div>
              </div>
            </div>
            <div class="introduce">
              <span>{{ daily.title }}</span>
              <span>{{ daily.content }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- <div class="mask"></div> -->
  </div>
</template>
<script>
export default {
  name: "TopBar",
  data() {
    return {
      topIndex: 2,
      show: false,
      daily: null,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
  },
  created() {
    this.$axios
      .get(
        "http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/DayCover/getDayCover"
      )
      .then((data) => {
        this.daily = data.data.data;
        // console.log(this.daily);
      });
  },
};
</script>
<style scoped>
.top-bar {
  position: fixed;
  background: transparent;
  z-index: 20;
  width: 100%;
  font-size: 16px;
  color: #ccc;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
.mask {
  width: 100%;
  height: 7vh;
}
.left,
.right {
  width: 10%;
  display: flex;
  justify-content: center;
  margin: 0 5px;
}
.middle {
  width: 60%;
  display: flex;
  justify-content: center;
}
.middle .item {
  flex: 1;
  text-align: center;
}
.middle .item a {
  
  color: #ccc;
}
.middle .item a {
  padding-bottom: 10px;
}
.router-link-exact-active {
  color: #fff;
  border-bottom: 2px solid #fff;
}
.daily {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  /* background: white; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button {
  position: fixed;
  top: 30px;
  left: 40px;
}
.daily_content {
  width: 80%;
  height: 80%;
  background: skyblue;
  border-radius: 5px;
}
.picture {
  position: relative;
  width: 100%;
  height: 60%;
  /* background: red; */
  /* background-repeat: no-repeat; */
  /* background-size: 100% 100%; */
}
.picture img {
  width: 100%;
  height: 100%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  filter: brightness(0.7);
}
.line {
  width: 1px;
  height: 30px;
  background: white;
}
.time {
  width: 28%;
  position: absolute;
  bottom: 30px;
  left: 30px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.time > span {
  font-size: 30px;
}
.date {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.introduce {
  width: 100%;
  height: 40%;
  background: #1b1b19;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.introduce span {
  margin-top: 10px;
}
.introduce span:nth-child(1) {
  font-weight: bold;
}
.introduce span:nth-child(2) {
  width: 85%;
  font-size: 12px;
}
</style>
