<template>
  <div class="bg">
    <div class="top"></div>
    <div class="top_1"></div>
    <div class="content">
      <div class="classify" v-for="(n, index) in content" :key="index">
        <router-link :to="`/classifys/${n.tab ? n.tab : n.cateid}`">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="n.icon"
            style="filter: brightness(0.8);"
          />
          <span>#{{ n.catename }}#</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "classify",
  data() {
    return {
      content: [],
    };
  },
  created() {
    this.$axios
      .get(
        "http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/cate/getList"
      )
      .then((data) => {
        this.content = data.data.data;
      });
  },
};
</script>
<style scoped>
.bg {
  width: 100%;
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
.content {
  display: flex;
  flex-wrap: wrap;
}
.classify {
  position: relative;
  width: 50%;
}
.classify span {
  color: white;
  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
