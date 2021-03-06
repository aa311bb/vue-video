<template>
  <div>
    <div class="comment_box">
      <div class="comment_user">
        <van-image width="35" height="35" round :src="comment.userinfo.avatar" />
        <div class="userName">
          <span>{{ comment.userinfo.username }}</span>
          <span>{{ comment.addtime | comment_date }}</span>
        </div>
        <div class="zan">
          <van-icon name="good-job-o" />
          <span>{{ comment.count_approve }}</span>
        </div>
      </div>
      <div class="comment_content">
        <span v-if="comment.reply_userinfo">回复 {{comment.reply_userinfo.username}}：</span>
        <span>{{ comment.content }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["comment"],
  filters: {
    comment_date(v) {
      var s = parseInt(v) * 1000;
      var d = new Date(s);
      var year = d.getFullYear(); //取得4位数的年份
      var month = d.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = d.getDate(); //返回日期月份中的天数（1到31）
      var hour = d.getHours(); //返回日期中的小时数（0到23）
      var minute = d.getMinutes(); //返回日期中的分钟数（0到59）
      var second = d.getSeconds(); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
  },
};
</script>
<style scpoed>
.comment_box {
  display: flex;
  flex-direction: column;
}
.comment_user {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.userName {
  width: 75%;
  display: flex;
  flex-direction: column;
}
.userName span:nth-child(1) {
  font-size: 12px;
  color: #ccc;
}
.userName span:nth-child(2) {
  font-size: 12px;
  color: #666;
}
.comment_content {
  width: 70%;
  margin: 0 auto;
  /* text-align: center; */
  font-size: 14px;
}
.comment_content span {
  word-break: break-all;
}
</style>
