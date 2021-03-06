<template>
  <div class="contents">
    <div class="top">
      <van-icon name="arrow-left" size="20" @click="goback"/>
      <span>分类详情</span>
    </div>
    <div class="top_1"></div>
      <div class="bgs">
          <Lists :List="content" :Font="Font"></Lists>
      </div>
  </div>
</template>
<script>
import Lists from '../../components/index/List'
export default {
  name: "classifys",
  data(){
      return{
          content:[],
          Font:false,
      }
  },
  created() {
    this.$store.commit("changeTop",false)
    let reg = /^([1-9]\d*)$/;
    if (reg.test(this.$route.params.id)) {
      this.$axios
        .get(
          "http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostInCate?p=1&size=10&cateid="+this.$route.params.id
        )
        .then((data) => {
          this.content = data.data.data;
          //  console.log(data)
        });
    }else{
         this.$axios
        .get(
          "http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/post/getPostByTab?tab="+this.$route.params.id
        )
        .then((data) => {
          this.content = data.data.data;
        });
    }
  },
  components:{
      Lists
  },
  methods:{
    goback() {
      this.$router.go(-1);
      this.$store.commit("changeTop",true)
    },
  }
};
</script>
<style scoped>
.contents{
  width: 100%;
  height: 107vh;
  background: #111;
}
.top{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100%;
  height: 7vh;
  position: fixed;
  top: 0;
  background: #111;
  z-index: 23;
}
.top span{
  width: 92%;
  text-align: center;
  padding-right: 10px;
}
.top_1{
  width: 100%;
  height: 7vh;
  background: #111;
}
.bgs{
  /* margin-top: 10px; */
  width: 100%;
  height: 100vh;
  overflow: auto;
}
</style>
