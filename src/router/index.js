import Vue from "vue";
import Router from "vue-router";
import Layout from "@/Layout";
import homeRouter from "./home";
import clueRouter from "./clue";
import financialRouter from "./financial";

Vue.use(Router);

export const asyncRoutes = [
  {
    path: "/report",
    name: "课程管理",
    redirect: "/home/index",
    icon: "icon iconfont icon-baobiao",
    component: Layout,
    children: homeRouter
  }
];

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
      hidden: true
    },
    {
      path: "/home",
      name: "主页装修",
      redirect: "/storefront",
      icon: "icon iconfont icon-shezhi",
      component: Layout,
      children: homeRouter
    },
    {
      path: "/clue",
      name: "学员线索管理",
      redirect: "/follow",
      icon: "icon iconfont icon-shezhi",
      component: Layout,
      children: clueRouter
    },
    {
      path: "/financial",
      name: "分销终端",
      redirect: "/order",
      icon: "icon iconfont icon-shezhi",
      component: Layout,
      children: financialRouter
    }
  ]
});
