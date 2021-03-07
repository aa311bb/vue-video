import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// let contentMap = new Map();
export default new Vuex.Store({
  state: {
    // contentMap: contentMap,
    top:true
  },
  mutations: {
    changeTop(state, payload) {
      state.top=payload;
      // console.log(state.contentMap)
    },
    
  },
  getters: {
    // getContent(state, id) {
    //   console.log(id)
    //   return state.contentMap.get(id);
      
    // },
  },
  actions: {},
  modules: {},
});
