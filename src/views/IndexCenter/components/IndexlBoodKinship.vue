<template>
  <div>
    <el-empty v-show="show" description="暂无数据"></el-empty>
    <MyChart
      v-show="!show"
      ref="echartRef"
      :init="false"
      class="merticsChart"
      :option="option"
    ></MyChart>
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
import MyChart from "@/components/Echart/index.vue";
import Api, { Blood } from "../api/index";
import RenderTypeCard from "./RenderTypeCard";

export default defineComponent({
  components: {
    MyChart,
  },
  setup() {
    const renderCard = new RenderTypeCard();
    const echartRef = ref<InstanceType<typeof MyChart>>(null);
    const show = ref(false);
    const echartInit = (nodeData: Blood) => {
      echartRef.value?.dispose();
      option.value.series[0].data = [];
      option.value.series[0].links = [];
      const data = option.value.series[0].data;
      const links = option.value.series[0].links;
      nodeData.nodes.forEach((node, index) => {
        data.push(renderCard.selectRander(node));
      });
      nodeData.relations.forEach((link) => {
        links.push(renderCard.getLinks(link));
      });
      console.log(echartRef.value);
      echartRef.value.echartInit();
    };

    // 关系图
    const size = 5;
    const option = ref({
      tooltip: {},
      series: [
        {
          type: "graph",
          layout: "force",
          zoom: 1,
          animation: false,
          symbolSize: 10 * size,
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          roam: true,
          label: {
            show: true,
            color: "#fff",
          },
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 10,
          },
          // symbolSize: (value: any, params: any) => value * 10,
          data: [],
          links: [],
          force: {
            edgeLength: 20 * size,
            repulsion: 100 * size,
            gravity: 0.1,
          },
          lineStyle: {
            opacity: 1,
            width: 2,
            curveness: 0.2,
            color: "#6996F1",
          },
        },
      ],
    });

    // 请求
    const requset = async (rowId: string) => {
      const res = await Api.getBlood(rowId);
      if (res.code == 200) {
        if (res.result.nodes.length <= 0) {
          show.value = true;
        } else {
          show.value = false;
        }
        nextTick(() => {
          echartInit(res.result);
        });
      } else {
        show.value = true;
        Api.ElMessage.error(res.message);
      }
    };

    return { requset, echartRef, option, show };
  },
});
</script>
<style scoped lang="scss">
.merticsChart {
  height: 500px;
}
</style>
