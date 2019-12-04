export default [
  {
    path: "/follow",
    name: "线索跟进",
    component: () => import("@/views/clue/follow/Index.vue")
  },
  {
    path: "/entry",
    name: "线索录入",
    component: () => import("@/views/clue/entry/Index.vue")
  }
];
