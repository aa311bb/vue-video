import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/videoList",
  },
  {
    path: "/videoList",
    name: "VideoList",
    component: () => import("@/views/Index/VideoList.vue"),
  },
  {
    path: "/classify",
    name: "classify",
    component: () => import("@/views/Index/Classify.vue"),
  },
  {
    path: "/classifys/:id",
    name: "classifys",
    component: () => import("@/views/Index/ClassifyContent.vue"),
  },
  {
    path: "/discover",
    name: "discover",
    component: () => import("@/views/Index/Discover.vue"),
  },
  {
    path: "/play/:id",
    name: "play",
    component: () => import("@/views/Index/Play.vue"),
  },
  {
    path: "/me",
    name: "me",
    component: () => import("@/views/Me.vue"),
  },
  {
    path:"/search",
    name:"search",
    component:()=>import("@/views/Search.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
});

export default router;
