<template>
  <div>
    <div v-show="!loading">
      <div class="today" v-if="Font.selection_title">
        {{ Font.selection_title }}
      </div>
      <div class="content">
        <div class="contents" v-for="(i, index) in List" :key="index">
          <router-link :to="`/play/${i.postid}`">
            <van-image :src="i.image" style="vertical-align: middle;" />
            <div class="font">
              <span>{{ i.cates[0].catename }}</span>
              <span>/</span>
              <span>{{ i.duration | date }}</span>
              <div>
                <span>{{ i.title }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="loading" v-show="loading">
      <van-loading color="#1989fa" size="50px" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
  created() {
    setTimeout(()=>{
      this.loading = false
    },1500)
  },
  props: ["List", "Font"],
  updated() {
    // this.List.forEach((item) => {
    //   // console.log(item)
    //   setTimeout(()=>{
    //     this.$axios
    //     .get(
    //       "http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/view?postid=" +
    //         item.postid
    //     )
    //     .then((data) => {
    //       this.$store.commit("setContent", [data.data.data, item.postid]);
    //       console.log(111)
    //     });
    //   },1000)
      
    // });
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
};
</script>
<style scoped>
.today {
  width: 100%;
  height: 50px;
  /* height: 110vh; */
  font-size: 14px;
  text-align: center;
  line-height: 50px;
  background: #111;
  color: #fff;
}
.content {
  width: 100%;
  /* height: 110vh; */
  background: #111;
  display: flex;
  flex-direction: column;
}
.contents {
  position: relative;
  /* height: 100vh; */
}
.font {
  position: absolute;
  font-size: 12px;
  bottom: 0;
  color: #fff;
  margin: 0 0 10px 10px;
}
.font span:nth-child(2) {
  margin: 0 5px;
}
.font div {
  margin: 5px 0 0 0;
  font-size: 14px;
  font-weight: bold;
}
.loading {
  /* height: 100vh; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
