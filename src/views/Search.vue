<template>
  <div class="search">
    <div class="search_input">
      <van-field
        v-model="value1"
        left-icon="search"
        :border="false"
        placeholder="请输入要搜索的内容"
      />
      <span @click="goback">取消</span>
    </div>
    <div class="hot-search" v-if="hot">
      <span style="color:#ccc;font-size:14px;">热门搜索</span>
      <div class="recommend">
        <div
          class="hot-item"
          v-for="p in result.recommend_keywords"
          :key="p.id"
          @click="hotLabel(p.kw)"
        >
          {{ p.kw }}
        </div>
      </div>
    </div>
    <div class="search-result" v-if="!hot">
      <List :List="lableList" :Font=false></List>
    </div>
  </div>
</template>
<script>
import List from '../components/index/List'
export default {
  data() {
    return {
      value1: "",
      result: [],
      lableList: [],
      hot:true
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
      this.$store.commit("changeTop", true);
    },
    hotLabel(index) {
      this.hot=false
      this.$axios
        .get(
          "http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=" +
            index
        )
        .then((data) => {
          this.lableList = data.data.data.result.list;
          console.log(this.lableList);
        });
    },
  },
  created() {
    this.$store.commit("changeTop", false);
    this.$axios
      .get("http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search")
      .then((data) => {
        this.result = data.data.data;
        // console.log( this.result)
      });
  },
  components:{
    List
  }
};
</script>
<style>
.search {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #181818;
  z-index: 20;
}
.search_input {
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.van-field {
  margin: 10px 0 0 3px;
  color: white;
  background: #252525;
  width: 85%;
  border-radius: 5px;
}
.van-field__control {
  color: white !important;
}
.hot-search {
  width: 90%;
  margin: 30px 10px 0 10px;
  color: white;
}
.recommend {
  margin-top: 20px;
  display: flex;
  height: 20vh;
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: flex-start;
}
.hot-item {
  margin-left: 10px;
  padding: 5px;
  border-radius: 3px;
  background: #252525;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
</style>
