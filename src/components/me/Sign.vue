
<template>
  <div class="sign">
    <div class="sign-header">
      <van-icon name="cross" size="25" @click="close"/>
      <span @click="isRegister = true">注册</span>
    </div>
    <div class="sign-content">
      <div class="des">
        <h2>登录后即可展示自己</h2>
        <p>登录即表明同意 <a href="">用户协议</a> 和 <a href="">隐私政策</a></p>
      </div>
      <div class="sign-box">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            label-width="50"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />

          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            label-width="50"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit"
              >登录</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
    <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__fadeOutRight">
      <div class="register" v-if="isRegister">
        <div class="top">
          <van-icon name="arrow-left" size="25" @click="isRegister = false" />
        </div>
        <div class="register-content">
          <p>注册</p>
          <van-form @submit="onSubmit">
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              label-width="50"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              label-width="50"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
              <van-button round block type="info" native-type="submit"
                >注册</van-button
              >
            </div>
          </van-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name:"Sign",
  data() {
    return {
      username: "",
      password: "",
      isRegister: false,
      me:false
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    close(){
      this.$emit('sign',this.me)
    }
  },
};
</script>
<style scoped>
.sign {
  padding: 30px;
  width: 100vw;
}
.sign-header {
  display: flex;
  justify-content: space-between;
}
.sign-content {
  padding: 40px 30px;
}
.des h2 {
  font-size: 24px;
  font-weight: bold;
}
.des p {
  line-height: 50px;
  font-size: 12px;
  color: #666;
}
.des p a {
  color: #628db8;
}
.register {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  background: white;
  padding: 30px;
}
.register-content p {
  text-align: center;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
}
</style>
