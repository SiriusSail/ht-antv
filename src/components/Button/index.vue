<!-- 基于element按钮封装一层 -->
<template>
  <el-button v-bind="$attrs" @click="onClick">
    <slot></slot>
  </el-button>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { debounce } from "@/utils/func";

export default defineComponent({
  props: {
    delay: {
      type: Number,
      default: 300,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const { delay } = toRefs(props);
    const state = reactive({});
    // 防抖按钮
    const onClick = debounce(() => {
      emit("click");
    }, delay.value);
    return {
      onClick,
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss"></style>
