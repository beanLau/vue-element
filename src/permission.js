import { router } from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress";
//import { getUserInfo } from "@/api/global";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  if (to.path == "/") {
    next("/storefront");
    NProgress.done();
    return;
  }
  //先获取一下权限表
  let rolelist = store.getters.roles && store.getters.roles.length > 0;
  rolelist = [1];
  let hasRole = false;
  if (Array.isArray(rolelist) && rolelist.length > 0) {
    //判断当前页面是否有权限，如果有继续，否则
    hasRole = true;
    if (hasRole) {
      next();
    } else {
      next(from.path);
    }
  } else {
    try {
      //const { roles } = await store.dispatch("index/getPermission");
      next({ ...to, replace: true });
    } catch (error) {
      Message.error(error || "Has Error");
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
