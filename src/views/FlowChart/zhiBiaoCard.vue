/* eslint-disable vue/attribute-hyphenation */
<template>
  <div class="flow_chart_wrap">
    <!-- 左侧 -->
    <div class="left">
      <Sidebar :value="sideBarIndex" :on-change="siderBarChange" />
      <div class="stencil_overflow" :class="{ stencil_hide: !isShowLeft }">
        <div id="stencilContent" class="stencil_content"></div>
        <!-- <DraftsPage
          :show-flag="closeDraft"
          @onClose="closeDraft=true"
          @onChange="showMode"
        /> -->
      </div>
      <div
        class="collapse_item_title collapse_left"
        @click="handleDrawer('left')"
      >
        {{ isShowLeft ? "<" : ">" }}
      </div>
    </div>

    <!-- 中间 -->
    <div class="center">
      <div class="graph_content">
        <div class="graph_title">
          <div>按车型 - 单车维修成本(YQ-C-20)</div>
          <div class="graph_title_icon flex-row">
            <ElTooltip
              effect="dark"
              content="锁定"
              placement="bottom"
            >
              <i class="icon-lock iconfont" />
            </ElTooltip>
            <ElTooltip
              effect="dark"
              content="保存到草稿箱"
              placement="bottom"
            >
              <i class="icon-save iconfont" @click="saveDrafts" />
            </ElTooltip>
            <ElTooltip
              effect="dark"
              content="发布"
              placement="bottom"
            >
              <i class="icon-issue iconfont" />
            </ElTooltip>
            <ElTooltip
              effect="dark"
              content="下载到本地"
              placement="bottom"
            >
              <i class="icon-download iconfont" @click="downLoad" />
            </ElTooltip>
            <ElTooltip
              effect="dark"
              content="上传到画布"
              placement="bottom"
              style="position: relative;margin-top: 4px;"
            >
              <div slot="content">
                <i class="icon-upload iconfont" />
                <input
                  ref="inputRef"
                  type="file"
                  style="position: absolute;width:34px;"
                  class="up_load"
                  @change="uploadChange"
                >
              </div>
            </ElTooltip>
            <ElTooltip
              effect="dark"
              content="预览"
              placement="bottom"
            >
              <i class="icon-preview iconfont" />
            </ElTooltip>
          </div>
        </div>

        <!-- 画布 -->
        <div id="graphContent" class="graph"></div>

        <!-- 放大缩小 -->
        <div class="graph_slider">
          <Slider :value="sliderValue" />
        </div>
      </div>
    </div>

    <!-- 右侧 -->
    <div class="right" :class="{ right_hide: !isShowRight }">
      <div
        class="collapse_item_title collapse_right"
        @click="handleDrawer('right')"
      >
        {{ !isShowRight ? "<" : ">" }}
      </div>
      <div class="right_overflow">
        <div class="right_content">
          <div class="info_table">
            <!-- <Tabel /> -->
            <!-- <ItemContent :select-node="selectNode" /> -->
            <!-- <ItemEcharts :select-node="selectNode" /> -->
            <DispatchComp :select-node="selectNode" />
          </div>
          <div class="info_text"></div>
          <div id="minimapContainer" class="info_thumbnail"></div>
        </div>
      </div>
    </div>

    <drafts
      :is-show='closeDraft'
      :on-select="showMode"
      :get-list='(page) => getDraftsList(page)'
      :delege-ddmflow='(id) => delDrafts([id])'
      :on-close='() => {
        closeDraft = false
      }'
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, provide, watch, reactive} from "vue";
// import Graph from '@/components/Graph'
import * as Element from "element-plus";
import { Node, Cell } from "@antv/x6";
import { dataDevelopmentConfig, chartConfig, initTableForm } from "./config";
import Graph from "@/components/Graph/graph";
import Sidebar from "./components/sidebar.vue";
import DraftsPage from "./components/indexCard/draftsPage.vue";
import DispatchComp from "./components/indexCard/dispatchComp.vue";
import Drafts from "./components/drafts";
import ItemContent from "./components/indexCard/itemContent.vue";
import ItemEcharts from "./components/indexCard/itemEcharts.vue";
import Slider from "./components/slider";
import Tabel from "@/components/TableFormItem";
import http, { DraftsItem, PageItem, DraftsProp, } from "./components/indexCard/api";
import { FormOption } from "@/components/TableFormItem/index.d";
import downfile from './components/downfile';

const { ElMessage, ElMessageBox, ElTooltip } = Element;

export default defineComponent({
  components: {
    Sidebar,
    ElTooltip,
    Slider,
    Tabel,
    DraftsPage,
    DispatchComp,
    Drafts,
    ItemContent,
    ItemEcharts
  },
  setup() {
    let graph: Graph = {} as any;
    const dataSources = ["1", "2", "3"]; // 数据源tab 组
    const templates = ["4", "5"]; // 卡片 tab 组
    const sideBarIndex = ref("6"); // 菜单 index
    const selectNode = ref<Cell | Node | null>();
    const formOptions = ref<FormOption[]>([]);
    const sliderValue = ref(1); // 放大倍率
    const isShowLeft = ref(true); // 展示列表
    const isShowFoot = ref(false); // 展示列表
    const isShowRight = ref(false); // 展示列表
    const closeDraft = ref(false); // 展示草稿箱
    const inputRef: HTMLInputElement = ref(null);

    // 添加指标卡片
    const selectDataDeve = () => {
      graph.upDateStencil({
        title: "数据开发",
        layoutOptions: {
          columns: 3,
          columnWidth: 65,
        },
        nodeOppoOption: chartConfig,
      });
    };

    // watch(sideBarIndex, getList)

    //  切换底部展示
    const toggleFooter = () => {
      graph.autoReSize({
        w: 1,
        h: 1,
      });
      setTimeout(() => {
        graph.autoReSize();
      }, 400);
      isShowFoot.value = !isShowFoot.value;
    };

    const intGraph = () => {
      // 创建x6实例
      graph = new Graph({
        containerId: "graphContent",
        stencilId: "stencilContent",
        minimapId: "minimapContainer",
      });
      
      let d = {
        title: {
          text: '211333'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]

      }

      graph.graph.on('selection:changed', (args) => {
        args.added.forEach((cell) => {
          selectNode.value = cell;
        })
        isShowRight.value = true;
        // setTimeout(()=>{
        //   selectNode.value.attr('option', d)
        // }, 2000)
      })
      // 添加 选择 NODE 节点事件
      graph.graph.on("node:click", ({ e, x, y, node, view }) => {
        console.log('点击', node)
        switch (node.shape) {
          case "echart-shape":
            // echatOption.value = node.attrs?.option;
            break;
          default:
            formOptions.value = initTableForm;
        }
      });
      // 缩放回调
      graph.graph.on("scale", ({ sx, sy }) => {
        console.log(sx, sy);
        sliderValue.value = sx;
      });
      // 取消选择事件
      graph.graph.on("blank:click", () => {
        // formOptions.value = [];
        // selectNode.value = null;
        // isShowRight.value = false;
      });
      // 删除时间
      graph.graph.on("node:removed", () => {
        formOptions.value = [];
        selectNode.value = null;
        // isShowRight.value = false;
      });
      // 添加节点事件
      graph.graph.on("node:added", (data) => {
        // console.log("data", "added", data);
      });
      // graph.addStencilItem(dataDevelopmentConfig[0].options)
    };

    onMounted(() => {
      intGraph();
      selectDataDeve();
      // toggleFooter();
    });

    let graphForm: Node.Metadata = [];
    let graphString = "";

    // 去掉无用的字段
    const filterData = () => {
      const orign = graph.graph.toJSON();
      graphForm = orign.cells.map((item) => {
        delete item.component;
        return item;
      });
      graphString = JSON.stringify(graphForm);
      // ElMessage.info('序列化内容已打印到控制台')
      console.log("序列化流程图：", graphForm);
    };

    // 保存草稿箱
    const saveDrafts = async () => {
      filterData();
      await http.ApiSaveDrafts({ content: graphString, name: "c2" });
      ElMessage.success("草稿保存成功");
    };

    // 回显信息
    const showMode = (cur:DraftsItem) => {
      const replaceData = JSON.parse(cur.cardContent.replace(/\\/g, "").replace(/'/g, ""));
      console.log("草稿箱列表", replaceData);
      graph.graph.fromJSON(replaceData);
    }

    watch([sliderValue], ([foo]) => {
      const zoom = graph.graph.zoom();
      if (zoom !== foo) {
        graph.graph.zoom(foo - zoom);
      }
    });

    // 控制草稿箱抽屉
    const handleDrawer = (flag: string) => {
      if (flag === "left") {
        isShowLeft.value = !isShowLeft.value;
      } else if (flag === "right") {
        isShowRight.value = !isShowRight.value;
      }
      setTimeout(() => {
        graph.autoReSize();
      }, 400);
    };

    // 上传
    const uploadChange = () => {
      const file = inputRef.value.files[0];
      const readFile = new FileReader();
      readFile.readAsText(file, 'UTF-8')
      readFile.onload = (e:ProgressEvent) => {
        const content = e.target.result
        graph.graph.fromJSON(JSON.parse(content))
      }
    }

    // 下载
    const downLoad = () => {
      if (graph.isEmpty()) {
        ElMessage.info('无内容')
        return
      }
      const orign = graph.graph.toJSON();
      graphForm = orign.cells.map((item) => {
        delete item.component;
        return item;
      });
      downfile('data.txt', JSON.stringify(graphForm))
    };

    const siderBarChange = async (newIndex: string, oldIndex: string) => {
      if (
        (dataSources.includes(oldIndex) && dataSources.includes(newIndex)) ||
        (templates.includes(oldIndex) && templates.includes(newIndex))
      ) {
        return Promise.resolve(true);
      }
      await new Promise((resolve) => {
        ElMessageBox.confirm("本次操作尚未保存，是否保存后跳转")
          .then(() => {
            graph.graph.dispose();
            intGraph();
            resolve(true);
            // 显示草稿箱
            if(newIndex === '13') {
              closeDraft.value = true;
            }
          })
          .catch(() => {
            graph.graph.dispose();
            intGraph();
            resolve(true);
          });
      });
    };

    const getDraftsList = (page: number) => http.ApiGetDraftsList({
      page,
      limit: 20,
    })

    provide("pageStore", {
      selectNode,
      formOptions,
    });

    return {
      sideBarIndex,
      siderBarChange,
      downLoad,
      uploadChange,
      saveDrafts,
      isShowLeft,
      isShowRight,
      closeDraft,
      handleDrawer,
      sliderValue,
      showMode,
      inputRef,
      delDrafts: http.ApiDelDrafts,
      getDraftsList,
      selectNode
    };
  },
});
</script>

<style lang="scss" scoped>
.flow_chart_wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  height: 100%;
  padding-right: 10px;
  .left {
    height: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    box-shadow: 4px 0px 8px 0px rgba(0, 0, 0, 0.11);
  }

  .center {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 12px 0;
    margin-left: 12px;
    overflow: hidden;
  }

  @mixin box-shadow() {
    box-shadow: 0px 0px 5px 0px rgba(232, 232, 232, 0.53);
    border-radius: 4px;
    border: 1px solid #e5e5e5;
  }

  .graph_content {
    @include box-shadow();
    flex: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    position: relative;
  }

  .graph_footer {
    @include box-shadow();
    height: 233px;
    width: 100%;
    padding: 20px;
    overflow: hidden;
  }
  .graph_footer_content {
    position: relative;
    transition: all 0.3s;
    height: 233px;
  }

  .graph_footer_hide {
    height: 0;
  }

  .graph_footer_icon {
    top: -8px;
    position: absolute;
    left: 50%;
    height: 8px;
    line-height: 8px;
    margin-left: -10px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 0;
    background: #eaeaea;
    color: #bfc7d2;
    transform: scaleX(1.5);
    width: 20px;
    text-align: center;
  }

  .graph_title {
    height: 66px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    flex-direction: row;
    padding: 0 25px;
    justify-content: space-between;
    align-items: center;
  }

  .graph_title_icon {
    justify-content: flex-end;
    width: 220px;
    .iconfont {
      font-size: 34px;
      margin: 4px;
      cursor: pointer;
      &:hover {
        background-color: #ededed;
        border-radius: 4px;
      }
    }
  }

  .graph {
    flex: 1;
    position: relative;
  }

  .right {
    height: 100%;
    width: 330px;
    padding-left: 10px;
    position: relative;
    transition: all 0.3s;
  }
  .right_hide {
    width: 0;
    padding: 0px;
  }

  .right_overflow {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .right_content {
    height: 100%;
    width: 320px;
    display: flex;
    flex-direction: column;
    padding: 12px 0;
  }

  .collapse_item_title {
    position: absolute;
    top: 40%;
    line-height: 23px;
    text-align: center;
    width: 10px;
    transform: scaleY(1.5);
    font-size: 10px;
    background: #eaeaea;
    color: #bfc7d2;
  }

  .stencil_overflow {
    width: 220px;
    transition: all 0.3s;
    overflow: hidden;
    position: relative;
  }

  .stencil_hide {
    width: 0;
    padding: 0px;
  }

  .stencil_content {
    width: 220px;
    position: relative;
    height: 100%;
  }

  .collapse_left {
    right: -10px;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .collapse_right {
    left: unset;
    left: 0px;
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .info_table {
    @include box-shadow();
    flex: 1;
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
  }

  .info_text {
    @include box-shadow();
    height: 72px;
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
  }

  .info_thumbnail {
    @include box-shadow();
    height: 233px;
    width: 100%;
  }

  .graph_slider {
    position: absolute;
    width: 120px;
    right: 20px;
    bottom: 30px;
  }
  .upload-ele{
    position: absolute !important;
    top: 0px !important;
  }
  .up_load{
    top: 0;
    left: 0;
    height: '100%';
    width: '100%';
    cursor: 'pointer';
    opacity: 0;
    z-index: 2;
  }

}
</style>
