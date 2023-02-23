<template>
  <div>
    <app-title />
    <div class="col">
      <div class="col_left">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu :router="true" :unique-opened="false" :default-active="activeMenu" class="el-menu-vertical" background-color="#1f2d3d" text-color="#fff">
            <!--递归路由对象-->
            <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="col_right">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath" v-if="hackReset" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
} from "vue";
import AppTitle from "@/layout/components/AppTitle/index";
import { useRouter } from "vue-router";
import { hwRoutes } from "@/router/hwRouter";
import { useStore } from "@/store/index";
import sidebarItem from "@/layout/components/Sidebar/sidebarItem.vue";

export default defineComponent({
  components: { sidebarItem, AppTitle },
  setup () {
    const router = useRouter();
    const state = reactive({
      hackReset: true, // 控制子组件显示
    });

    const routes = computed(
      () => JSON.parse(JSON.stringify(hwRoutes))[1].children
    );

    const store = useStore();
    const lang = computed(() => store.getters["settingsModule/getLangState"]);
    const activeMenu = computed(() => router.currentRoute.value.path);
   
    return {
      ...toRefs(state),
      routes,
      lang,
      activeMenu,
    };
  },
});
</script>
<style lang="scss" scoped>
  .el-scrollbar {
    height: auto;
  }
  .col {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .col_left {
      min-width: 200px;
      background-color: #1f2d3d;


      .el-menu-vertical {
        border: 0;
      }

      .btn {
        height: 42px;
        background: #ffbd00;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #313131;
        font-size: 16px;
        margin-top: 30px;
        cursor: pointer;
      }

      .download {
        margin-top: 10px;
        color: #aaaaaa;
        font-size: 13px;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
      }
    }

    .col_right {
      overflow-y: scroll;
      flex: 1;
      height: calc(100vh - 58px);
    }

    // =========弹窗==========

    :deep(.template-dialog) {
      border-radius: 30px;

      .el-dialog__header {
        .el-dialog__close {
          font-size: 24px;
        }
      }
    }

    .upload {
      :deep(.el-upload) {
        width: 100%;
      }
      :deep(.el-upload-dragger) {
        border-radius: 8px;
        border: 1px solid #e5e5e5;
        padding: 14px;
        height: 200px;
        width: 100%;
      }
      .upload_text {
        text-align: left;
        font-size: 16px;
        color: #aaaaaa;
      }
    }

    .dialog-footer {
      .el-button {
        width: 88px;
        height: 36px;
        min-height: 36px;
      }
    }
  }
</style>
