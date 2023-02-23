import { RouteRecordRaw } from "vue-router";

import Management from "@/views/IndexCenter/index.vue";
import Manage from "@/views/IndexCenter/views/route.vue";
import sys from "@/views/sys/index.vue";

export const hwRoutes: Array<RouteRecordRaw> = [
  {
    path: "/IndexCenter",
    component: Management,
    redirect: "/IndexCenter/overview",
    meta: {
      title: {
        "/zh-CN": "指标体系",
        "/en-US": "dome page",
      },
      icon: "el-icon-guide",
    },
    children: [
      {
        path: "/IndexCenter/overview",
        name: "overview1",
        component: () => import("@/views/IndexCenter/views/overview.vue"),
        meta: {
          title: {
            "/zh-CN": "指标体系总览",
            "/en-US": "dome page",
          },
          icon: "el-icon-guide",
        },
      },
      {
        path: "/IndexCenter/rule",
        name: "overview2",
        component: () => import("@/views/IndexCenter/views/rule.vue"),
        meta: {
          title: {
            "/zh-CN": "指标编码规则",
            "/en-US": "dome page",
          },
          icon: "el-icon-guide",
        },
      },
      {
        path: "/IndexCenter/Manage",
        component: Manage,
        redirect: "/IndexCenter/Manage/marketingIndicators",
        meta: {
          title: {
            "/zh-CN": "指标体系管理", //指标体系管理
            "/en-US": "dome page",
          },
          icon: "el-icon-guide",
        },
        children: [
          {
            path: "/IndexCenter/Manage/marketingIndicators",
            name: "marketingIndicators",
            component: () =>
              import(
                "@/views/IndexCenter/views/manage/marketingIndicators.vue"
              ),
            meta: {
              title: {
                "/zh-CN": "营销指标",
                "/en-US": "dome page",
              },
              icon: "el-icon-guide",
            },
          },

          {
            path: "/IndexCenter/Manage/research",
            name: "research",
            redirect: "/IndexCenter/Manage/marketingIndicators",
            component: () =>
              import("@/views/IndexCenter/views/manage/research.vue"),
            meta: {
              hidden: true,
              show: true,
              title: {
                "/zh-CN": "研发指标",
                "/en-US": "dome page",
              },
              icon: "el-icon-guide",
            },
          },
          {
            path: "/IndexCenter/Manage/finance",
            redirect: "/IndexCenter/Manage/marketingIndicators",
            name: "finance",
            component: () =>
              import("@/views/IndexCenter/views/manage/finance.vue"),
            meta: {
              hidden: true,
              title: {
                "/zh-CN": "财务指标",
                "/en-US": "dome page",
              },
              icon: "el-icon-guide",
            },
          },
          {
            path: "/IndexCenter/Manage/manufacture",
            redirect: "/IndexCenter/Manage/marketingIndicators",
            name: "manufacture",
            component: () =>
              import("@/views/IndexCenter/views/manage/manufacture.vue"),
            meta: {
              hidden: true,
              title: {
                "/zh-CN": "制造指标",
                "/en-US": "dome page",
              },
              icon: "el-icon-guide",
            },
          },
          {
            path: "/IndexCenter/Manage/quality",
            redirect: "/IndexCenter/Manage/marketingIndicators",
            name: "quality",
            component: () =>
              import("@/views/IndexCenter/views/manage/quality.vue"),
            meta: {
              hidden: true,
              title: {
                "/zh-CN": "质量指标",
                "/en-US": "dome page",
              },
              icon: "el-icon-guide",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/sys",
    component: sys,
    redirect: "/Role/roleManage",
    meta: {
      title: {
        "/zh-CN": "系统设置",
        "/en-US": "Home Page",
      },
      icon: "el-icon-s-home",
    },
    children: [
      {
        path: "/Role/roleManage",
        name: "roleManage",
        component: () =>
          import(
            /* @/views/Menu/menuManage.vueichText" */ "@/views/Role/rolesManage.vue"
          ),
        meta: {
          title: {
            "/zh-CN": "角色管理",
            "/en-US": "Role Manage",
          },
          icon: "ic ic-other",
        },
      },
      {
        path: "/Menu/menuEdit",
        name: "menuEdit",
        component: () =>
          import(
            /* @/views/Menu/menuManage.vueichText" */ "@/views/Menu/menuManage.vue"
          ),
        meta: {
          title: {
            "/zh-CN": "菜单管理",
            "/en-US": "Menu Manage",
          },
          icon: "ic ic-other",
        },
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(
            /* @/views/Menu/menuManage.vueichText" */ "@/views/user/index.vue"
          ),
        meta: {
          title: {
            "/zh-CN": "用户管理",
            "/en-US": "Menu Manage",
          },
          icon: "ic ic-other",
        },
      },
      {
        path: "/Menu/dictionariesManage",
        name: "dictionariesManage",
        component: () =>
          import(
            /* webpackChunkName: "myHelp" */ "@/views/dictionaries/index.vue"
          ),
        meta: {
          title: {
            "/zh-CN": "字典管理",
            "/en-US": "Home Page",
          },
          icon: "ic ic-other",
        },
      },
    ],
  },
];

export default {};
