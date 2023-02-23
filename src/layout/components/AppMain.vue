<template>
  <section class="app-main">
    <el-tabs
      v-if="!isDev"
      id="Tabs"
      v-model="currentIndex"
      type="card"
      closable
      @tab-click="clickTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in tabsOption"
        :key="item.route"
        :closable="item.route !== '/home'"
        :label="item.title[lang]"
        :name="item.route"
      >
      </el-tab-pane>
    </el-tabs>
    <app-title v-else></app-title>

    <div class="app-content">
      <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>

      <router-view v-if="!$route.meta.keepAlive" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="$route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </section>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/index";
import AppTitle from "./AppTitle/index";

export default defineComponent({
  name: "AppMain",
  components: {
    AppTitle,
  },
  setup() {
    // store 中获取当前路由以及所有的路由对象；
    const store = useStore();
    const tabsOption = computed(() => store.getters["tabModule/getTabsOption"]);
    const currentIndex = computed(
      () => store.getters["tabModule/getCurrentIndex"]
    );
    const lang = computed(() => store.getters["settingsModule/getLangState"]);
    const isDev = computed(() => store.getters["settingsModule/getIsDevState"]);

    const router = useRouter();
    // mothods
    /**
     * @description 移除tab
     * */
    const removeTab = (tabName: string) => {
      if (tabName === "/home") {
        return;
      }
      store.commit("tabModule/DELETE_TAB", tabName);
      if (currentIndex.value === tabName) {
        if (tabsOption.value && tabsOption.value.length) {
          store.commit(
            "tabModule/SET_TAB",
            tabsOption.value[tabsOption.value.length - 1].route
          );
          router.replace({ path: currentIndex.value });
        } else {
          router.replace({ path: "/" });
        }
      }
    };
    /**
     * @description 点击tab
     */
    const clickTab = (tabName: { paneName: string }) => {
      // eslint-disable-next-line no-console
      store.commit("tabModule/SET_TAB", tabName.paneName);
      router.replace({ path: currentIndex.value });
    };
    return {
      tabsOption,
      lang,
      isDev,
      currentIndex,
      removeTab,
      clickTab,
    };
  },
});
</script>
<style scoped>
.app-main {
  height: 100vh;
  width: 100%;
  position: relative;
  /* overflow: hidden; */
  background-color: white;
  display: flex;
  flex-direction: column;
}

.app-content {
  height: calc(100vh - 78px);
  flex: 1;
  position: relative;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
