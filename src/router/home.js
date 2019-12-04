export default [
  {
    path: "/storefront",
    name: "店面介绍",
    component: () => import("@/views/home/storefront/Index.vue")
  },
  {
    path: "/advertising",
    name: "广告位管理",
    component: () => import("@/views/home/advertising/Index.vue")
  },
  {
    path: "/information",
    name: "资讯管理",
    component: () => import("@/views/home/information/Index.vue"),
    children: [
      {
        path: "/information/detail",
        name: "添加资讯",
        component: () =>
          import("@/views/home/information/components/informationDetail.vue")
      }
    ]
  },
  {
    path: "/course",
    name: "线下课程",
    component: () => import("@/views/home/course/Index.vue"),
    children: [
      {
        path: "/course/detail",
        name: "添加课程",
        component: () =>
          import("@/views/home/course/components/courseDetail.vue")
      }
    ]
  }
];
