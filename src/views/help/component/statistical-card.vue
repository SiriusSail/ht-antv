<template>
  <div class="statistical-card">
    <div class="head">
      <i class="icon" :class="icon" />
      <span class="title">{{ title }}</span>
    </div>
    <div class="con">
      <div v-for="(vaule, key) in list" :key="vaule" class="item">
        <span class="label">{{ key }}：</span>
        <span class="num">{{ thousands(vaule) }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, PropType } from "vue";

export type CardItem = {
  label: string; //
  num: number; //
};

type List = {
  [key in string]: number;
};

export default defineComponent({
  props: {
    list: {
      // 列表
      type: Object as PropType<List>,
      required: true,
    },
    icon: {
      // 图标
      type: String,
      default: "",
    },
    title: {
      // 标题
      type: String,
      default: "",
    },
  },
  setup() {
    const state = reactive({});
    const thousands = (num: number) => {
      const str = num.toString();
      const reg =
        str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return str.replace(reg, "$1,");
    };
    return {
      ...toRefs(state),
      thousands,
    };
  },
});
</script>
<style scoped lang="scss">
.statistical-card {
  border: 1px solid #c0ccda;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  .head {
    height: 53px;
    display: flex;
    align-items: center;
    background-color: #ecf4ff;
  }
  .title {
    color: #333333;
    font-size: 20px;
    font-weight: 700;
    padding-left: 8px;
  }
  .con {
    .item {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      border-top: 1px solid #c0ccda;
    }
    .label {
      padding-right: 6px;
      color: #333333;
    }
    .num {
      color: #1b3c90;
      font-size: 20px;
      font-weight: 700;
    }
    .icon {
      font-size: 20px;
    }
  }
}
</style>
