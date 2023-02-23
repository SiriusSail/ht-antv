<template>
  <div class="content-box">
    <div class="table_title">
      <div>属性编辑</div>
      <i class="icon-share iconfont" />
    </div>
    <div class="echarts-inner">
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input
            v-model="info.options.title.text"
            placeholder="请输入名称"
            @input="handleDraft"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="描述">
          <el-input
            v-model="info.options.content"
            type="textarea"
            placeholder="请输入描述"
            @blur="handleDraft"
          ></el-input>
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, inject, reactive, watch, toRefs, PropType } from 'vue';
import { Node, Graph, Cell } from '@antv/x6';
import * as echarts from 'echarts';
import lineSimple from '@/components/Graph/images/lineSimple.jpeg';

type EChartsOption = echarts.EChartsOption;

const { ElMessage, ElMessageBox, ElForm, ElFormItem, ElInput } = Element;

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
    selectNode: {
      type: Object as PropType<Cell>,
      default: () => {},
    },
  },
  setup(props) {
    const pageStore = inject<{
      selectNode: {
        value: Cell
      },
    }>('pageStore');

    const draftData = reactive<DraftDataProp>({
      info: {
        shape: '',
        options: {
          title: {
            text: ''
          },
        }
      }
    });

    const handleDraft = (d:string) => {
      const cur = pageStore?.selectNode.value;
      const op = JSON.parse(JSON.stringify(cur.attrs.option))
      op.title.text = d;
      // console.log('cur', op)
      pageStore?.selectNode.value?.attr('option', op);
    };

    watch(
      () => props.selectNode,
      (now) => {
        if(!now) {
          draftData.info.shape = '';
          draftData.info.options = '';
          return;
        };
        // console.log("props", now.attrs);
        draftData.info.shape = now.shape;
        draftData.info.options = now.attrs.option;
      }
    );

    onMounted(() => {
      // getDraftsList();
    });
    return {
      handleDraft,
      ...toRefs(draftData),
    };
  },
});
</script>
<style lang="scss" scoped>
.echarts-inner {
  padding: 4px;
}

.table_title {
  position: relative;
  height: 50px;
  background: #ECF4FF;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  line-height: 10px;
  .icon-share{
    position: absolute;
    right: 3px;
    top: 20px;
    font-size: 26px;
  }
}
</style>
