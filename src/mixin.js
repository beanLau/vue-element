import store from "./store";
import Subscribe from "./utils/subscribe";
export default {
  computed: {
    currentPermission() {
      let webRoute = store.getters.userInfo.webRoute;
      let path = this.$route.path;
      return webRoute[path] || {};
    }
  },
  methods: {
    subscribe(type) {
      Subscribe.subscribe(type, this);
    },
    publish(type, data) {
      Subscribe.publish(type, data);
    },
    publishCb(type, data) {
      console.log(`接受到${type}类型的消息:${data}`);
    }
  }
};
