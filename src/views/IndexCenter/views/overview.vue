<template>
  <div class="Overview">
    <div class="m-head">
      <el-radio-group
        v-model="tabsName"
        @change="tabsChange"
        style="margin-bottom: 30px"
      >
        <el-radio-button label="0">领域视图</el-radio-button>
        <el-radio-button label="1">流程视图</el-radio-button>
      </el-radio-group>
    </div>

    <div class="domain-view" v-if="tabsName === '0'">
      <PromptBoard />
      <div id="container1" class="FlowChart" />
    </div>
    <div class="domain-view" v-else-if="tabsName === '1'">
      <PromptBoard />
      <div id="container2" class="FlowChart" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  nextTick,
} from "vue";

import PromptBoard from "@/components/FlowChart/PromptBoard.vue";
import Overview from "@/components/FlowChart/overview/index";
import Api, { DomainNode, DomainRelation } from "../api/index";
// 指标的坐标
const coordinate = [
  { x: 300, y: 40 },
  { x: 540, y: 240 },
  { x: 300, y: 450 },
  { x: 60, y: 240 },
  { x: 540, y: 450 },
];
export default defineComponent({
  components: { PromptBoard },
  setup() {
    const card = new Overview();
    const card2 = new Overview();
    const state = reactive({
      tabsName: "0",
    });
    //领域视图数据
    let domainNodes = <DomainNode[]>[];
    let domainEdges = <DomainRelation[]>[];
    //流程视图数据
    let dimensionNodes = <DomainNode[]>[];
    let dimensionEdges = <DomainRelation[]>[];

    //初始话领域图
    const DomainView = (
      example: Overview,
      domainNodes: DomainNode[],
      domainEdges: DomainRelation[]
    ) => {
      example.newIndexMode(document.getElementById("container1"));
      // 数据
      const domainData = {
        // 节点
        nodes: <any[]>[],
        edges: <any[]>[],
      };
      domainNodes.forEach((item, index) => {
        const node = example.renderCard({
          id: item.rowId,
          x: coordinate[index].x,
          y: coordinate[index].y,
          data: {
            data: item,
          },
        });
        domainData.nodes.push(node);
      });

      domainEdges.forEach((item) => {
        const edge = example.renderEdge({
          source: item.fromId,
          target: item.toId,
          label: `贡献度\n${item.weightVal}`,
        });
        domainData.edges.push(edge);
      });

      example.fromJSON(domainData);
    };
    //初始化流程图
    const DimensionView = (
      example: Overview,
      dimensionNodes: DomainNode[],
      dimensionEdges: DomainRelation[]
    ) => {
      example.newIndexMode(document.getElementById("container2"));
      // 数据
      const domainData = {
        // 节点
        nodes: <any[]>[],
        edges: <any[]>[],
      };
      dimensionNodes.forEach((item, index) => {
        const node = example.renderCard({
          id: item.rowId,
          x: coordinate[index].x,
          y: coordinate[index].y,
          data: {
            data: item,
          },
        });
        domainData.nodes.push(node);
      });

      dimensionEdges.forEach((item) => {
        const edge = example.renderEdge({
          source: item.fromId,
          target: item.toId,
          label: `贡献度\n${item.weightVal}`,
        });
        domainData.edges.push(edge);
      });

      example.fromJSON(domainData);
    };

    //领域api接口
    const getDomainList = async () => {
      const res = await Api.getDomainList(1);
      if (res.code == 200) {
        // 先销毁画布
        nextTick(() => {
          card.dispose();
          domainNodes = res.result.nodes;
          domainEdges = res.result.relations;
          DomainView(card, domainNodes, domainEdges);
        });
      } else {
        Api.ElMessage.error(res.message);
      }
    };
    // //流程图api接口
    const getDomainList2 = async () => {
      const res = await Api.getDomainList(2);
      if (res.code == 200) {
        // 先销毁画布
        nextTick(() => {
          card2.dispose();
          dimensionNodes = res.result.nodes;
          dimensionEdges = res.result.relations;
          DimensionView(card2, dimensionNodes, dimensionEdges);
        });
      } else {
        Api.ElMessage.error(res.message);
      }
    };
    //切换
    const tabsChange = () => {
      if (state.tabsName === "0") {
        nextTick(() => {
          getDomainList();
        });
      } else if (state.tabsName === "1") {
        nextTick(() => {
          getDomainList2();
        });
      }
    };

    onMounted(() => {
      nextTick(() => {
        tabsChange();
      });
    });

    return {
      tabsChange,
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss">
.Overview {
  background-color: #fff;
  padding: 20px;
  .domain-view {
    width: 100%;
    height: calc(100vh - 78px);
    position: relative;
  }
  .FlowChart {
    height: 100%;
    width: 100%;
  }
}
</style>
