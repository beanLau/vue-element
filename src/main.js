// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import { router } from "./router";
import "./permission";
import ElementUI from "element-ui";
import store from "./store/index";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/icon/iconfont.css";
Vue.use(ElementUI);
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);
import "./assets/styles/mini-elements.less";
Vue.config.productionTip = false;
// import moment from "moment"
// moment.locale('zh-cn')
import mixin from "./mixin";
Vue.mixin(mixin);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  render: h => h(App)
});
