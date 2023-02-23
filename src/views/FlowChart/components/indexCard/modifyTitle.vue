<template>
  <el-dialog v-model="visibleSign">
    <el-form label-width="80px">
      <el-form-item label="名称">
        <el-input
          v-model="info.options.title"
          placeholder="请输入名称"
          @blur="handleDraft"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="info.options.content"
          type="textarea"
          placeholder="请输入描述"
          @blur="handleDraft"
        ></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  onMounted,
  PropType,
  watch,
} from "vue";
import * as Element from "element-plus";
import { Node, Cell } from "@antv/x6";
import { PageItem, DraftsProp, DraftsItem } from "./api";

const { ElMessage, ElMessageBox, ElForm, ElFormItem, ElInput, ElButton, ElDialog } = Element;

type DraftDataProp = {
  info:{shape:string, options:any}
}

export default defineComponent({
  components: {
    ElMessage,
    ElMessageBox,
    ElForm,
    ElFormItem,
    ElInput
  },
  props: {
    visibleSign: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["on-close", "on-change"],
  setup(props, context) {
    const draftsParam: PageItem = { limit: 20, page: 1 };
    const draftData = reactive<DraftDataProp>({
      info: {
        shape: '',
        options: {
          title: '',
          content: '',
        }
      }
    });

    const handleDraft = () => {
      // console.log(444)
     //  context.emit("on-close");
    };

    // 获取草稿箱列表
    const getDraftsList = () => {
      // http.ApiGetDraftsList(draftsParam).then((res) => {
      //   const { result } = res;
      //   draftData.info = result;
      // });
    };

    const clickItem = (cur:DraftsItem) => {
      context.emit("on-change", cur);
    };

    watch(
      () => props.selectNode,
      (now) => {
        // console.log("props", now);
        if(!now) {
          draftData.info.shape = '';
          draftData.info.options = '';
          return;
        };
        draftData.info.shape = now.shape;
        draftData.info.options = now.attrs.options;
      }
    );

    onMounted(() => {
      // getDraftsList();
    });
    return {
      handleDraft,
      ...toRefs(draftData),
      clickItem,
    };
  },
});
</script>
<style lang="scss" scoped>
.content-box {
  padding: 4px;
}
</style>
