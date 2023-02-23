import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { store } from "@/store";
import layout from "../layout/index.vue";
import { hwRoutes } from "./hwRouter";
import { demandManage } from "./demandManage";

// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  ...hwRoutes,
  ...demandManage,
  {
    path: "/",
    component: layout,
    redirect: "/home",
    meta: {
      title: {
        "/zh-CN": "首页",
        "/en-US": "Home Page",
      },
      icon: "el-icon-s-home",
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home/index.vue"),
        meta: {
          title: {
            "/zh-CN": "首页",
            "/en-US": "Home Page",
          },
          icon: "home",
        },
      },
      {
        path: "/Empowerment",
        name: "Empowerment",
        component: () =>
          import(
            /* webpackChunkName: "home2" */ "@/views/Empowerment/index.vue"
          ),
        meta: {
          title: {
            "/zh-CN": "我的赋能",
            "/en-US": "Home Page",
          },
          icon: "home",
        },
      },

   
    ],
  },

  {
    path: "/login",
    name: "登录",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login/index.vue"),
    meta: {
      title: {
        "/zh-CN": "登录",
        "/en-US": "Login",
      },
      hidden: true,
      hiddenTab: true,
    },
  },
  {
    path: "/noFound",
    name: "NoFound",
    component: () =>
      import(/* webpackChunkName: "noFound" */ "@/views/noFound.vue"),
    meta: {
      title: {
        "/zh-CN": "404",
        "/en-US": "404",
      },
      hidden: true,
      hiddenTab: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () =>
      import(/* webpackChunkName: "noFound" */ "@/views/noFound.vue"),
    meta: {
      title: {
        "/zh-CN": "未找到",
        "/en-US": "NOT FOUND",
      },
      hidden: true,
      hiddenTab: true,
    },
  },
  {
    path: "/personal",
    component: layout,
    redirect: "/personal/personalCenter",
    meta: {
      title: {
        "/zh-CN": "个人页",
        "/en-US": "Personal Page",
      },
      icon: "el-icon-user-solid",
    },
    children: [
      {
        path: "/personal/personalCenter",
        name: "personalCenter",
        component: () =>
          import(
            /* webpackChunkName: "personalCenter" */ "@/views/Personal/personalCenter.vue"
          ),
        meta: {
          title: {
            "/zh-CN": "个人中心",
            "/en-US": "PersonalCenter",
          },
          icon: "el-icon-user-solid",
        },
      },
      // {
      //   path: "/personal/personalSetting",
      //   name: "personalSetting",
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "personalSetting" */ "@/views/Personal/personalSetting.vue"
      //     ),
      //   meta: {
      //     title: {
      //       "/zh-CN": "个人设置",
      //       "/en-US": "PersonalSetting",
      //     },
      //     icon: "el-icon-user-solid",
      //   },
      // },
    ],
  },
  {
    path: "/help",
    component: layout,
    redirect: "/myhelp",
    meta: {
      title: {
        "/zh-CN": "我的求助",
        "/en-US": "Guide Page",
      },
      icon: "el-icon-guide",
    },
    children: [
      {
        path: "/myhelp",
        name: "myHelp",
        component: () =>
          import(/* webpackChunkName: "myHelp" */ "@/views/help/myHelp.vue"),
        meta: {
          title: {
            "/zh-CN": "我的求助",
            "/en-US": "Home Page",
          },
          icon: "home",
        },
      },
      {
        path: "/mySeekHelp",
        name: "mySeekHelp",
        component: () => import("@/views/help/mySeekHelp.vue"),
        meta: {
          hidden: true,
          title: {
            "/zh-CN": "发起求助",
            "/en-US": "dome page",
          },
          icon: "home",
        },
      },
      {
        path: "/messageInfo",
        name: "messageInfo",
        component: () => import("@/views/help/messageInfo.vue"),
        meta: {
          hidden: true,
          keepAlive: true,
          title: {
            "/zh-CN": "求助详情",
            "/en-US": "dome page",
          },
          icon: "home",
        },
      },
    ],
  },
  {
    path: "/flowchart",
    component: layout,
    redirect: "/flowchart",
    meta: {
      title: {
        "/zh-CN": "流程图",
        "/en-US": "Guide Page",
      },
      icon: "el-icon-guide",
    },
    children: [
      {
        path: "/flowchart/data-source",
        name: "dataSource",
        component: () => import("@/views/FlowChart/dataSource"),
        meta: {
          title: {
            "/zh-CN": "数据源",
            "/en-US": "Data Source",
          },
          icon: "el-icon-guide",
        },
      },
      {
        path: "/flowchart/data-assets",
        name: "dataAssets",
        component: () => import("@/views/FlowChart/dataAssets"),
        meta: {
          title: {
            "/zh-CN": "数据资产",
            "/en-US": "Data Assets",
          },
          icon: "el-icon-guide",
        },
      },
      {
        path: "/flowchart/data-card",
        name: "dataCard",
        component: () => import("@/views/FlowChart/dataCard"),
        meta: {
          title: {
            "/zh-CN": "数据卡片",
            "/en-US": "Data Card",
          },
          icon: "el-icon-guide",
        },
      },
      {
        path: "/flowchart/index-card",
        name: "indexCard",
        component: () => import("@/views/FlowChart/zhiBiaoCard.vue"),
        meta: {
          title: {
            "/zh-CN": "指标卡片",
            "/en-US": "Index Card",
          },
          icon: "el-icon-guide",
        },
      },
      {
        path: "/flowchart/index",
        name: "flowChart",
        component: () => import("@/views/FlowChart/index"),
        meta: {
          title: {
            "/zh-CN": "流程图",
            "/en-US": "Flow Chart",
          },
          icon: "el-icon-guide",
        },
      },
    ],
  },
];

// 异步路由
export const asyncRoutes: Array<RouteRecordRaw> = [


  // {
  //   path: "/guide",
  //   component: layout,
  //   redirect: "/guide/guide",
  //   meta: {
  //     title: {
  //       "/zh-CN": "引导页",
  //       "/en-US": "Guide Page",
  //     },
  //     icon: "el-icon-guide",
  //   },
  //   children: [
  //     {
  //       path: "/guide/guide",
  //       name: "guide",
  //       component: () => import("@/views/Guide/index.vue"),
  //       meta: {
  //         title: {
  //           "/zh-CN": "引导",
  //           "/en-US": "Guide",
  //         },
  //         icon: "el-icon-guide",
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: "/dashboard",
  //   component: layout,
  //   redirect: "/dashboard/workplace",
  //   meta: {
  //     title: {
  //       "/zh-CN": "仪表盘",
  //       "/en-US": "Dashboard",
  //     },
  //     icon: "el-icon-data-analysis",
  //   },
  //   children: [
  //     {
  //       path: "/dashboard/workplace",
  //       name: "workplace",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "richText" */ "@/views/Dashboard/workplace.vue"
  //         ),
  //       meta: {
  //         title: {
  //           "/zh-CN": "工作台",
  //           "/en-US": "Workplace",
  //         },
  //         icon: "home",
  //       },
  //     },
  //     {
  //       path: "/dashboard/analysis",
  //       name: "analysis",
  //       component: () =>
  //         import( "@/views/Dashboard/analysis.vue"),
  //       meta: {
  //         title: {
  //           "/zh-CN": "分析页",
  //           "/en-US": "Analysis Page",
  //         },
  //         icon: "home",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/copy",
  //   component: layout,
  //   redirect: "/copy/copyText",
  //   meta: {
  //     title: {
  //       "/zh-CN": "复制文本",
  //       "/en-US": "Copy Text",
  //     },
  //     icon: "el-icon-edit-outline",
  //   },
  //   children: [
  //     {
  //       path: "/copy/copyText",
  //       name: "copyText",
  //       component: () => import("@/views/CopyText/index.vue"),
  //       meta: {
  //         title: {
  //           "/zh-CN": "复制文本",
  //           "/en-US": "Copy Text",
  //         },
  //         icon: "home",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/excel",
  //   component: layout,
  //   redirect: "/excel/uploadExcel",
  //   meta: {
  //     title: {
  //       "/zh-CN": "Excel",
  //       "/en-US": "Excel",
  //     },
  //     icon: "el-icon-edit-outline",
  //   },
  //   children: [
  //     {
  //       path: "/excel/uploadExcel",
  //       name: "uploadExcel",
  //       component: () => import("@/views/Excel/uploadExcel.vue"),
  //       meta: {
  //         title: {
  //           "/zh-CN": "上传excel",
  //           "/en-US": "Upload Excel",
  //         },
  //         icon: "home",
  //       },
  //     },
  //     {
  //       path: "/excel/exportExcel",
  //       name: "exportExcel",
  //       component: () => import("@/views/Excel/exportExcel.vue"),
  //       meta: {
  //         title: {
  //           "/zh-CN": "导出excel",
  //           "/en-US": "Export Excel",
  //         },
  //         icon: "home",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/zip",
  //   component: layout,
  //   redirect: "/zip/exportZip",
  //   meta: {
  //     title: {
  //       "/zh-CN": "Zip",
  //       "/en-US": "Zip",
  //     },
  //     icon: "el-icon-folder",
  //   },
  //   children: [
  //     {
  //       path: "/zip/exportZip",
  //       name: "exportZip",
  //       component: () => import("@/views/Zip/exportZip.vue"),
  //       meta: {
  //         title: {
  //           "/zh-CN": "导出zip",
  //           "/en-US": "Export Zip",
  //         },
  //         icon: "el-icon-folder",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/table",
  //   component: layout,
  //   redirect: "/table/tableList",
  //   meta: {
  //     title: {
  //       "/zh-CN": "列表页",
  //       "/en-US": "Table Page",
  //     },
  //     icon: "el-icon-folder-opened",
  //   },
  //   children: [
  //     {
  //       path: "/table/tableList",
  //       name: "tableList",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "personalCenter" */ "@/views/Table/tableList.vue"
  //         ),
  //       meta: {
  //         title: {
  //           "/zh-CN": "表格",
  //           "/en-US": "Table",
  //         },
  //         icon: "el-icon-folder-opened",
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: "/form",
  //   component: layout,
  //   redirect: "/form/formInfo",
  //   meta: {
  //     title: {
  //       "/zh-CN": "表单页",
  //       "/en-US": "Form Page",
  //     },
  //     icon: "el-icon-s-grid",
  //   },
  //   children: [
  //     {
  //       path: "/form/formInfo",
  //       name: "formInfo",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "personalCenter" */ "@/views/Form/formInfo.vue"
  //         ),
  //       meta: {
  //         title: {
  //           "/zh-CN": "基础表单",
  //           "/en-US": "Basic Form",
  //         },
  //         icon: "el-icon-s-grid",
  //       },
  //     },
  //     {
  //       path: "/form/stepForm",
  //       name: "stepForm",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "personalCenter" */ "@/views/Form/stepForm.vue"
  //         ),
  //       meta: {
  //         title: {
  //           "/zh-CN": "分步表单",
  //           "/en-US": "Step Form",
  //         },
  //         icon: "el-icon-s-grid",
  //       },
  //     },
  //     {
  //       path: "/form/advanceForm",
  //       name: "advanceForm",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "personalCenter" */ "@/views/Form/advanceForm.vue"
  //         ),
  //       meta: {
  //         title: {
  //           "/zh-CN": "高级表单",
  //           "/en-US": "Advance Form",
  //         },
  //         icon: "el-icon-s-grid",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/qrcode",
  //   component: layout,
  //   redirect: "/qrcode/qrcodeGen",
  //   meta: {
  //     title: {
  //       "/zh-CN": "二维码",
  //       "/en-US": "QRCode",
  //     },
  //     icon: "el-icon-c-scale-to-original",
  //   },
  //   children: [
  //     {
  //       path: "/qrcode/qrcodeGen",
  //       name: "qrcodeGen",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "personalCenter" */ "@/views/qrcode/qrcodeGen.vue"
  //         ),
  //       meta: {
  //         title: {
  //           "/zh-CN": "二维码",
  //           "/en-US": "QRCode",
  //         },
  //         icon: "el-icon-c-scale-to-original",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/dragable",
  //   component: layout,
  //   redirect: "/dragable/dragableComponent",
  //   meta: {
  //     title: {
  //       "/zh-CN": "拖拽组件",
  //       "/en-US": "Dragable Component",
  //     },
  //     icon: "el-icon-s-promotion",
  //   },
  //   children: [
  //     {
  //       path: "/dragable/dragableComponent",
  //       name: "dragableComponent",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "personalCenter" */ "@/views/dragable/dragableComponent.vue"
  //         ),
  //       meta: {
  //         title: {
  //           "/zh-CN": "拖拽组件",
  //           "/en-US": "Dragable Component",
  //         },
  //         icon: "el-icon-s-promotion",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/editor",
  //   component: layout,
  //   redirect: "/Editor/editorComponent",
  //   meta: {
  //     title: {
  //       "/zh-CN": "编辑器组件",
  //       "/en-US": "Editor Component",
  //     },
  //     icon: "el-icon-edit",
  //   },
  //   children: [
  //     {
  //       path: "/Editor/markdownEditor",
  //       name: "markdownEditor",
  //       component: () => import("@/views/Editor/markdownEditor.vue"),
  //       meta: {
  //         title: {
  //           "/zh-CN": "Markdown编辑器",
  //           "/en-US": "Markdown Editor",
  //         },
  //         icon: "el-icon-edit",
  //       },
  //     },
  //     {
  //       path: "/Editor/richEditor",
  //       name: "richEditor",
  //       component: () => import("@/views/Editor/richEditor.vue"),
  //       meta: {
  //         title: {
  //           "/zh-CN": "富文本编辑器",
  //           "/en-US": "Rich Editor",
  //         },
  //         icon: "el-icon-edit",
  //       },
  //     },
  //     {
  //       path: "/Editor/jsonEditor",
  //       name: "jsonEditor",
  //       component: () => import("@/views/Editor/jsonEditor.vue"),
  //       meta: {
  //         title: {
  //           "/zh-CN": "Json 编辑器",
  //           "/en-US": "Json Editor",
  //         },
  //         icon: "el-icon-edit",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/permission',
  //   component: layout,
  //   redirect: '/permission/permission',
  //   meta: {
  //     title: '权限',
  //     icon: 'el-icon-c-scale-to-original',
  //   },
  //   children: [
  //     {
  //       path: '/permission/permission',
  //       name: 'permission',
  //       component: () => import(/* webpackChunkName: "personalCenter" */ '@/views/permission/permission.vue'),
  //       meta: {
  //         title: '权限',
  //         icon: 'el-icon-c-scale-to-original',
  //       },
  //     }
  //   ],
  // },
  // {
  //   path: "/upload",
  //   component: layout,
  //   redirect: "/upload/uploadFile",
  //   meta: {
  //     title: {
  //       "/zh-CN": "文件上传",
  //       "/en-US": "File Upload",
  //     },
  //     icon: "el-icon-upload",
  //   },
  //   children: [
  //     {
  //       path: "/upload/uploadFile",
  //       name: "uploadFile",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "richText" */ "@/views/Upload/uplodFile.vue"
  //         ),
  //       meta: {
  //         title: {
  //           "/zh-CN": "文件上传",
  //           "/en-US": "File Upload",
  //         },
  //         icon: "home",
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/cropper",
  //   component: layout,
  //   redirect: "/cropper/cropFile",
  //   meta: {
  //     title: {
  //       "/zh-CN": "图片裁剪",
  //       "/en-US": "Crop Image",
  //     },
  //     icon: "ic ic-tailor",
  //   },
  //   children: [
  //     {
  //       path: "/cropper/cropFile",
  //       name: "cropFile",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "richText" */ "@/views/Cropper/cropFile.vue"
  //         ),
  //       meta: {
  //         title: {
  //           "/zh-CN": "图片裁剪",
  //           "/en-US": "Crop Image",
  //         },
  //         icon: "ic ic-tailor",
  //       },
  //     },
  //   ],
  // },


];

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0,
  }),
  routes: constantRoutes,
});
// router.beforeEach((to, from, next) => {

// const tabsOption = store.getters["tabModule/getTabsOption"];
// 判断当前路由中是否已经入栈
// const flag =
//   tabsOption.findIndex((tab: { route: string }) => tab.route === to.path) >
//   -1;
// if (!flag && !to.meta.hiddenTab) {
//   store.commit("tabModule/ADD_TAB", {
//     route: to.path,
//     title: to.meta.title,
//     name: to.name,
//   });
// }
// store.commit("tabModule/SET_TAB", to.path);
// if (sessionStorage.getItem("auth")) {
//   next();
// } else if (to.path === "/login") {
//   console.log("/login");
//   next();
// } else {
//   // console.log("unauthed into login");
//   // next({
//   //   path: "/login",
//   //   query: { redirect: to.fullPath },
//   // });
// }
// });

export default router;
