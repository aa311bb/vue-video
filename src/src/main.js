import Vue from 'vue'
import './plugins/axios'
import './assets/minireset.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
//swiper 滑动
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
//vant
import { Button,Icon,Form,Field,Image as VanImage,Cell, CellGroup, Swipe, SwipeItem,Popup, Loading } from 'vant'
import 'vant/lib/index.css'


import 'vant/lib/button/style';
//视频播放器
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
//icon图标
import './assets/icon/iconfont.css'

//animate.css
import animated from 'animate.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(animated)
Vue.use(Button);
Vue.use(Icon);
Vue.use(Form);
Vue.use(Field);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Popup);
Vue.use(Loading);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
