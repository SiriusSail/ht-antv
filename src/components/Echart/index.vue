<template>
  <div ref="chart1" class="chart_dom"></div>
</template>

<script lang="ts">
import * as echarts from "echarts";
import {
  defineComponent,
  onMounted,
  ref,
  onDeactivated,
  onUnmounted,
} from "vue";

import "echarts-wordcloud/dist/echarts-wordcloud.min";

export default defineComponent({
  props: {
    option: {
      type: Object,
      required: true,
      default: () => {},
    },
    init: {
      type: Boolean,
      default: true,
    },
  },
  setup(porps) {
    let myChart: echarts.ECharts;
    const chart1 = ref<HTMLElement | null>(null);

    const echartInit = () => {
      if (!chart1.value) return;
      myChart = echarts.init(chart1.value as HTMLElement);

      myChart.setOption(porps.option);
    };
    const resize = () => {
      myChart?.resize();
    };
    const dispose = () => {
      myChart?.dispose();
    };

    onMounted(() => {
      if (porps.init) echartInit();
      window.addEventListener("resize", resize);
    });
    onDeactivated(() => {
      window.removeEventListener("resize", resize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", resize);
    });
    return { resize, echartInit, chart1, dispose };
  },
});
</script>

<style scoped>
.chart_dom {
  width: 100%;
  height: 100%;
}
</style>
