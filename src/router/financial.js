export default [
  {
    path: "/order",
    name: "分销订单",
    component: () => import("@/views/financial/order/Index.vue")
  },
  {
    path: "/enterfinancial",
    name: "分销财务",
    component: () => import("@/views/financial/financial/Index.vue")
  }
];
