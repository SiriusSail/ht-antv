<template>
  <div>
    <!-- <div>{{ item.content }}</div> -->
    <div style="text-align: center">{{ item.title }}</div>
    <el-input
      v-model="item.content"
      type="textarea"
      placeholder="请输入节点描述"
    ></el-input>
  </div>
</template>

<script lang="ts">
import { Node } from "@antv/x6";
import { onMounted, reactive, toRefs, defineComponent, inject } from "vue";
import * as Element from "element-plus";

const { ElInput } = Element;

export default defineComponent({
  name: "TextComponen",
  components: {
    ElInput
  },
  setup() {
    const dataObj = reactive({
      item: { title: "", content: "" },
    });
    const getNode = inject<() => Node>("getNode")?.() || ({} as Node);
    if(!getNode.attrs.options) {
      dataObj.item = { title: "", content: "" };
    }else{
      dataObj.item = getNode.attrs.options;
    }
    console.log("创建", getNode.attrs.options);

    return {
      ...toRefs(dataObj),
    };
  },
});
</script>
