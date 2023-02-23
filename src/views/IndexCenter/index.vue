<template>
  <div>
    <app-title />
    <div class="col">
      <div class="col_left">
        <div class="col_left__top">
          <el-input v-model="key" placeholder="指标查询">
            <template #suffix>
              <i @click="search" class="el-input__icon el-icon-search icon" />
            </template>
          </el-input>
          <div class="btn" @click="showIndex">
            <i class="el-input__icon el-icon-plus" />
            <span>导入指标</span>
          </div>
          <div class="download">
            <div class="download_text">下载导入模板</div>
          </div>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :router="true"
            :unique-opened="false"
            :default-active="activeMenu"
            class="el-menu-vertical"
            background-color="#1f2d3d"
            text-color="#fff"
          >
            <!--递归路由对象-->
            <sidebar-item
              v-for="route in routes"
              :key="route.path"
              :item="route"
              :base-path="route.path"
            />
          </el-menu>
        </el-scrollbar>
      </div>
      <div class="col_right">
        <router-view v-slot="{ Component }">
          <component :is="Component" :key="$route.path" />
        </router-view>
      </div>
      <!-- 弹窗 -->
      <el-dialog v-model="dialogVisible" class="h-dialog" width="60%">
        <!-- 指标导入 -->
        <div class="upload">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <div class="upload_text">拖拉指标模板文件到这里</div>
          </el-upload>
        </div>
        <template #title>指标导入 </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >导入</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  toRefs,
  onActivated,
  onDeactivated,
} from "vue";
import AppTitle from "@/layout/components/AppTitle/index";
import { useRouter } from "vue-router";
import { hwRoutes } from "@/router/hwRouter";
// import { demandManage } from "@/router/demandManage";
import { useStore } from "@/store/index";
import sidebarItem from "@/layout/components/Sidebar/sidebarItem.vue";
import Api from "./api/index";

export default defineComponent({
  components: { sidebarItem, AppTitle },
  setup() {
    const router = useRouter();
    const state = reactive({
      dialogVisible: false, // 弹窗
      key: "",
    });

    const routes = computed(() =>
      JSON.parse(JSON.stringify(hwRoutes[0].children))
    );

    const store = useStore();
    const lang = computed(() => store.getters["settingsModule/getLangState"]);
    const activeMenu = computed(() => router.currentRoute.value.path);
    const showIndex = () => {
      state.dialogVisible = true;
    };
    const search = () => {
      if (state.key) {
        router.push({
          path: "/IndexCenter/Manage/marketingIndicators",
          query: {
            key: state.key,
          },
        });
      } else {
        Api.ElMessage.error("请输入指标查询关键字");
      }
    };

    return {
      search,
      ...toRefs(state),
      showIndex,
      routes,
      lang,
      activeMenu,
    };
  },
  data() {
    return {
      searchWord: "",
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

    .col_left__top {
      padding: 10px 10px 30px 10px;

      .icon {
        cursor: pointer;
      }
    }

    .el-menu-vertical-demo {
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

  :deep(.el-dialog__header) {
    .el-dialog__close {
      font-size: 24px;
    }
  }
  :deep(.el-dialog) {
    border-radius: 30px;
  }

  .upload {
    :deep(.el-upload) {
      width: 100%;
    }
    :deep(.el-upload-dragger) {
      border-radius: 8px;
      border: 1px solid #e5e5e5;
      padding: 14px;
      height: 379px;
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
