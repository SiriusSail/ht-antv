import { RouteRecordRaw } from "vue-router";
import layout from "../layout/index.vue";
import DemandManage from "@/views/DemandManage/index.vue";

export const demandManage: Array<RouteRecordRaw> = [
  {
    path: "/demandManage", // 需求管理
    component: DemandManage,
    redirect: "/demandManage/dashboard",
    meta: {
      title: {
        "/zh-CN": "需求管理",
        "/en-US": "Guide Page",
      },
      icon: "el-icon-guide",
    },
    children: [
      {
        path: "/demandManage/dashboard",
        name: "/demandManage/dashboard",
        component: () => import("@/views/DemandManage/views/dashboard.vue"),
        meta: {
          title: {
            "/zh-CN": "效率态势",
            "/en-US": "Guide",
          },
          icon: "",
        },
      },
      {
        path: "/demandManage/kanban",
        name: "/demandManage/kanban",
        component: () => import("@/views/DemandManage/views/kanban.vue"),
        meta: {
          title: {
            "/zh-CN": "需求看板",
            "/en-US": "Guide",
          },
          icon: "",
        },
      },
      {
        path: "/demandManage/standingBook",
        name: "/demandManage/standingBook",
        component: () => import("@/views/DemandManage/views/standingBook.vue"),
        meta: {
          title: {
            "/zh-CN": "需求台账",
            "/en-US": "Guide",
          },
          icon: "",
        },
      },
      {
        path: "/demandManage/scheduling",
        name: "/demandManage/scheduling",
        component: () => import("@/views/DemandManage/views/scheduling.vue"),
        meta: {
          title: {
            "/zh-CN": "开发排期",
            "/en-US": "Guide",
          },
          icon: "",
        },
      },
    ],
  },
];
export default {};
// {
//   path: "/demandManage/dashboard", // 需求管理
//   component: DemandManage,
//   redirect: "/demandManage/dashboard/index",
//   meta: {
//     title: {
//       "/zh-CN": "效率态势",
//       "/en-US": "Guide Page",
//     },
//     icon: "el-icon-guide",
//   },
//   children: [
//     {
//       path: "/demandManage/dashboard/index",
//       name: "",
//       component: () => import("@/views/DemandManage/views/dashboard.vue"),
//       meta: {
//         title: {
//           "/zh-CN": "效率态势",
//           "/en-US": "Guide",
//         },
//         icon: "",
//       },
//     },
//   ],
// },
// {
//   path: "/demandManage/kanban", // 需求管理
//   component: DemandManage,
//   redirect: "/demandManage/kanban/index",
//   meta: {
//     title: {
//       "/zh-CN": "需求看板",
//       "/en-US": "Guide Page",
//     },
//     icon: "el-icon-guide",
//   },
//   children: [
//     {
//       path: "/demandManage/kanban/index",
//       name: "demandManage/index",
//       component: () => import("@/views/DemandManage/views/kanban.vue"),
//       meta: {
//         title: {
//           "/zh-CN": "需求看板",
//           "/en-US": "Guide",
//         },
//         icon: "",
//       },
//     },
//   ],
// },
