<template>
  <div id="app">
    <TopBar v-show="$store.state.top"></TopBar>
    <keep-alive include="classify">
      <transition enter-active-class="animate__animated animate__zoomIn">
        <router-view />
      </transition>
    </keep-alive>
  </div>
</template>
<script>
import TopBar from "./components/index/TopBar";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    TopBar,
  },
};
</script>
<style>
#app {
  width: 100%;
  height: 100vh;
  background: #111;
}
</style>
