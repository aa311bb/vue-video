<template>
  <div class="bg">
    <div class="top"></div>
    <div class="top_1"></div>
    <div class="banner">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        :width="400"
        indicator-color="white"
      >
        <van-swipe-item v-for="n in banner" :key="n.bannerid">
          <router-link :to="`/play/${n.extra_data.app_banner_param}`"><van-image :src="n.image"/></router-link
        ></van-swipe-item>
      </van-swipe>
    </div>
    <discoverList :List="today" :Font="toFont"></discoverList>
    <discoverList :List="yesday" :Font="yesFont"></discoverList>
  </div>
</template>
<script>
import discoverList from "../../components/index/List";
export default {
  name: "discover",
  data() {
    return {
      banner: [],
      today: [],
      yesday: [],
      yesFont: [],
      toFont: [],
    };
  },
  created() {
    this.$axios
      .get("http://api.kele8.cn/agent/https://app.vmovier.com/apiv3")
      .then((data) => {
        this.banner = data.data.data.banner.list;
        this.today = data.data.data.today.list;
        this.yesday = data.data.data.posts.list;
        this.yesFont = data.data.data.posts;
        this.toFont = data.data.data.today;
        console.log(this.banner);
      });
  },
  components: {
    discoverList,
  },
};
</script>
<style scoped>
.bg {
  width: 100%;
  height: 100vh;
  background: #111;
}
.top {
  width: 100%;
  height: 7vh;
  position: fixed;
  top: 0;
  background: #111;
  z-index: 3;
}
.top_1 {
  width: 100%;
  height: 7vh;
  background: #111;
}
</style>
