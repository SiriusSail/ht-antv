<template>
  <div>
    <app-title />
    <div class="col">
      <div class="col_left">
        <div class="col_left__top">
          <el-input v-model="searchWord" placeholder="需求搜索">
            <template #suffix>
              <i class="el-input__icon el-icon-search icon" @click="handleSearchWord" />
            </template>
          </el-input>
          <div class="btn" @click="showIndex">
            <i class="el-input__icon el-icon-plus" />
            <span>导入需求</span>
          </div>
          <div class="download">
            <div class="download_text" @click="handleDwonload">
              下载导入模板
            </div>
          </div>
        </div>
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

      <!-- 弹窗 -->
      <el-dialog v-model="dialogVisible" custom-class="template-dialog" width="40%" top="30vh" @close="handleClose">
        <template #title>指标导入 </template>
        <!-- 指标导入 -->
        <div class="upload">
          <el-upload ref="refUpload" class="upload-demo" drag :action="url" multiple :on-success="onSuccess" :modal="false">
            <div class="upload_text">拖拉指标模板文件到这里</div>
          </el-upload>
        </div>
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
  nextTick,
  ref,
  getCurrentInstance,
} from "vue";
import AppTitle from "@/layout/components/AppTitle/index";
import { useRouter } from "vue-router";
import { demandManage } from "@/router/demandManage";
import { useStore } from "@/store/index";
import sidebarItem from "@/layout/components/Sidebar/sidebarItem.vue";
import { dwonloadFile } from "@/utils/func";
import { ElMessage } from "element-plus/lib/components/message";

export default defineComponent({
  components: { sidebarItem, AppTitle },
  setup () {
    const router = useRouter();
    const refUpload = ref<any>(null);
    const state = reactive({
      dialogVisible: false, // 弹窗
      hackReset: true, // 控制子组件显示
      searchWord: "",
      url: `${import.meta.env.VITE_APP_BASE_URL
        }/ddm-iic/dem/demand/importExcel`,
    });

    const routes = computed(
      () => JSON.parse(JSON.stringify(demandManage))[0].children
    );

    const store = useStore();
    const lang = computed(() => store.getters["settingsModule/getLangState"]);
    const activeMenu = computed(() => router.currentRoute.value.path);
    const showIndex = () => {
      state.dialogVisible = true;
    };
    //上传成功
    const onSuccess = (data: any, file: any, filelsit: any) => {
      ElMessage({
        message: "上传成功",
        type: "success",
      });
      state.hackReset = false;
      nextTick(() => {
        state.hackReset = true;
      });
    };
    // 关闭弹出层
    const handleClose = () => {
      refUpload.value.clearFiles();
      if (router.currentRoute.value.path !== "/demandManage/kanban") {
        router.push("/demandManage/kanban");
      }
    };
    // 搜索
    const handleSearchWord = () => {
      router.push({
        path: "/demandManage/kanban",
        query: { searchWord: state.searchWord },
      });
      state.searchWord = "";
      // if (router.currentRoute.value.path === "/demandManage/kanban") {
      //   store.commit("demandModule/setSearchWord", state.searchWord);
      //   state.searchWord = "";
      // } else {
      //   router.push({
      //     name: "/demandManage/kanban",
      //     params: { searchWord: state.searchWord },
      //   });
      //   state.searchWord = "";
      // }
    };
    // 下载模板
    const handleDwonload = () => {
      dwonloadFile(
        1,
        `${import.meta.env.VITE_APP_BASE_URL
        }/ddm-iic/dem/demand/templateDownload?fileName=指标开发需求模板.xlsx`
      );
    };

    return {
      ...toRefs(state),
      showIndex,
      refUpload,
      routes,
      lang,
      handleDwonload,
      onSuccess,
      handleSearchWord,
      activeMenu,
      handleClose,
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
