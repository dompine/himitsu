import Vue from "vue";
import App from "@/App";
import store from "@/store";
import MpvueRouterPatch from "mpvue-router-patch";



// const Fly = require("flyio/dist/npm/wx");//引入
// const fly = new Fly;
// Vue.prototype.$fly = fly;//挂在到vue原型上
// fly.config.baseURL = 'https://www.zhenshigushi.net/himitsu';

Vue.config.productionTip = false;
Vue.use(MpvueRouterPatch);
const app = new Vue({
  mpType: "app",
  store,
  ...App
});

app.$mount();
