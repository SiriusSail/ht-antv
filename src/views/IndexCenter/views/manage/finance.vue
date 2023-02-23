<template>
  <div class="">财务指标</div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({});
    console.log(111);
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss"></style>
