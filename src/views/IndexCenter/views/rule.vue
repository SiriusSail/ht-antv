<template>
  <div class="index_rule">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-table
          show-summary
          sum-text="合计"
          header-cell-class-name="rowHeader"
          :data="tableData1"
        >
          <el-table-column align="center" label="复合指标">
            <el-table-column
              v-for="(item, index) in columnList"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="index"
            />
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6">
        <el-table
          header-cell-class-name="rowHeader"
          show-summary
          sum-text="合计"
          :data="tableData2"
          style="width: 100%"
        >
          <el-table-column align="center" label="衍生指标">
            <el-table-column
              v-for="(item, index) in columnList"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="index"
            />
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6">
        <el-table
          header-cell-class-name="rowHeader"
          show-summary
          sum-text="合计"
          :data="tableData3"
          style="width: 100%"
        >
          <el-table-column align="center" label="原子指标">
            <el-table-column
              v-for="(item, index) in columnList"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="index"
            />
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6">
        <el-table
          header-cell-class-name="rowHeader"
          show-summary
          sum-text="合计"
          :data="tableData4"
          style="width: 100%"
        >
          <el-table-column align="center" label="修饰词">
            <el-table-column
              v-for="(item, index) in columnList"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="index"
            />
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onActivated } from "vue";
import Api, { Rule } from "../api/index";
export default defineComponent({
  setup() {
    const state = reactive({
      columnList: [
        {
          prop: "description",
          label: "描述",
          width: "auto",
        },
        {
          prop: "code",
          label: "代码",
          width: "auto",
        },
        {
          prop: "serialNum",
          label: "流水",
          width: "auto",
        },
      ],
      tableData1: <Rule[]>[],
      tableData2: <Rule[]>[],
      tableData3: <Rule[]>[],
      tableData4: <Rule[]>[],
    });
    // 获取原子指标
    const getAtomic = async () => {
      const res = await Api.getRule(1);
      if (res.code === 200) {
        state.tableData3 = res.result;
      }
    };
    //衍生指标
    const getDerivative = async () => {
      const res = await Api.getRule(2);
      if (res.code === 200) {
        state.tableData2 = res.result;
      }
    };

    //复合指标
    const getComposite = async () => {
      const res = await Api.getRule(3);
      if (res.code === 200) {
        state.tableData1 = res.result;
      }
    };

    //修饰词
    const getModifier = async () => {
      const res = await Api.getRule(4);
      if (res.code === 200) {
        state.tableData4 = res.result;
      }
    };

    getAtomic();
    getDerivative();
    getComposite();
    getModifier();
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss">
.index_rule {
  padding: 30px;
  .el-table {
    --el-table-border: 1px solid #c0ccda;
    --el-table-border-color: #c0ccda;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    width: 0;
  }

  :deep(.rowHeader) {
    background-color: #dfecff !important;
    color: #475669;
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
