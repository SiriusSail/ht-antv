<template>
  <div class="MarketingMetrics">
    <div class="m-head">
      <el-radio-group v-model="tabsName" style="margin-bottom: 30px">
        <el-radio-button label="0">指标地图</el-radio-button>
        <el-radio-button label="1">指标台账</el-radio-button>
      </el-radio-group>
    </div>

    <div v-show="tabsName === '1'">
      <!--  -->
      <div class="m-search">
        <IndexSearch :query="query" @search="search" />
      </div>
      <!-- 表格 -->
      <div class="table-con">
        <MyTable
          ref="mytable"
          border
          is-pagination
          :data="tableData"
          :column="tableColumn"
          row-key="id"
          lazy
          :pagination="IndicatorLedgerPagination"
          @paginationChange="IndicatorLedgerChange"
          @paginationSizeChange="IndicatorLedgerSizeChange"
        >
          <template #id="{ data }">
            {{ data.$index + 1 }}
          </template>
          <template #name="{ data }">
            <div class="index_name">
              <div
                v-if="data.row.hasHistoryVersion"
                @click="showChidren(data.row)"
              >
                <i
                  v-if="data.row.showChildren === 'load'"
                  class="el-icon-loading"
                />
                <i
                  v-else-if="data.row.showChildren === 'show'"
                  class="el-icon-minus"
                />
                <i v-else class="el-icon-plus" />
              </div>
              <span>{{ data.row.name }} </span>
            </div>
          </template>
          <template #flowStatus="{ data }">
            <div class="flwStatus">
              <span v-if="data.row.flowStatus == 0">运行中</span>
              <span v-if="data.row.flowStatus == 1">未开发</span>
              <span v-if="data.row.flowStatus == 2">开发中</span>
              <span v-if="data.row.flowStatus == 3">未启用</span>
              <span v-if="data.row.flowStatus == 4">归档</span>
            </div>
            <!-- 0.运行中，1.未开发，2.开发中，3.未启用，4.归档") -->
          </template>
          <template #operation="{ data }">
            <div class="operation">
              <span class="highlight" @click="setIndicatorId(data.row)"
                >详情</span
              >
              <span>发布API</span>
              <span>开放</span>
              <span>修订</span>
              <span>归档</span>
            </div>
          </template>
        </MyTable>
      </div>
      <div class="tabs-con" v-if="queryId">
        <el-tabs v-model="activeName" class="tabs-con" @tab-click="handleClick">
          <el-tab-pane label="指标定义" name="0">
            <IndexDefinition ref="definitionRef" />
          </el-tab-pane>
          <el-tab-pane label="指标模型" name="1">
            <IndexModel ref="modelRef" />
          </el-tab-pane>
          <el-tab-pane label="指标固化" name="2">
            <IndexSolidification ref="solidificationRef" />
          </el-tab-pane>
          <el-tab-pane label="指标卡片" name="3">
            正在开发中
            <!-- <IndexCard ref="cardRef"></IndexCard> -->
          </el-tab-pane>
          <el-tab-pane label="指标血缘" name="4">
            <IndexlBoodKinship ref="boodKinshipRef" />
          </el-tab-pane>
          <!-- <el-tab-pane label="变更历史" name="fourth">Task</el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
    <div v-show="tabsName === '0'">
      <img class="indexdt" :src="dtImg" alt="" />
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  onMounted,
  nextTick,
  onActivated,
  watch,
} from "vue";

import IndexSearch from "../../components/IndexSearch.vue";
import MyTable, { Colum, Pagination } from "@/components/table/index.vue";

import IndexSolidification from "../../components/IndexSolidification.vue";
import IndexlBoodKinship from "../../components/IndexlBoodKinship.vue";
import IndexModel from "../../components/IndexModel.vue";
import IndexDefinition from "../../components/IndexDefinition.vue";
import IndexCard from "../../components/IndexCard.vue";
import Api, { tableResult, getIicindflowPageQuery } from "../../api/index";
import { useRoute } from "vue-router";
import dtImg from "@/assets/images/indexdt.png";

type tableRow = tableResult & {
  children?: tableResult[];
  showChildren?: "load" | "show" | "hiden";
};
type StateType = {
  tableData: tableRow[];
  tableColumn: Colum[];
  activeName: string;
  expand: boolean;
  IndicatorLedgerPagination: Pagination;
  IndicatorLedgerLoading: boolean;
  tabsName: string; // 台账和指标地图
  queryId: string; // 查询的ID
  query: getIicindflowPageQuery;
};

export default defineComponent({
  components: {
    IndexSearch,
    IndexSolidification,
    IndexlBoodKinship,
    MyTable,
    IndexModel,
    IndexDefinition,
    IndexCard,
  },

  setup() {
    const route = useRoute();
    const mytable = ref();
    const state = reactive<StateType>({
      query: {
        domain: null,
        flowType: null,
        name: null,
        code: null,
        flowAttr: null,
      },
      queryId: null,
      tabsName: "1",
      activeName: "0",
      expand: true,
      IndicatorLedgerLoading: true,
      IndicatorLedgerPagination: {
        layout: "sizes, prev, pager, next, jumper",
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      tableColumn: [
        {
          label: "序号",
          align: "center",
          headerAlign: "center",
          prop: "id",
          minWidth: "80px",
          slot: true,
        },
        {
          label: "指标名称",
          align: "center",
          headerAlign: "center",
          prop: "name",
          minWidth: "150px",
          slot: true,
        },
        {
          label: "指标编码",
          prop: "code",
          width: "150px",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "指标类型",
          prop: "flowType",
          width: "100px",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "版本",
          prop: "version",
          width: "100px",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "状态",
          prop: "flowStatus",
          width: "100px",
          align: "center",
          slot: true,
          headerAlign: "center",
        },
        {
          label: "启用日期",
          prop: "startDate",
          width: "100px",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "归档日期",
          prop: "closeDate",
          width: "100px",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "指标体系层级",
          prop: "flowLevel",
          width: "100px",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "指标层次",
          prop: "indexHierarchy",
          width: "100px",
          align: "center",
          headerAlign: "center",
        },
        {
          label: "操作",
          prop: "operation",
          width: "210px",
          align: "left",
          headerAlign: "center",
          slot: true,
          fixed: "right",
        },
      ],
      tableData: [],
    });

    //指标定义ref
    const definitionRef = ref<InstanceType<typeof IndexDefinition>>(null);
    //指标模型ref
    const modelRef = ref<InstanceType<typeof IndexModel>>(null);
    //指标模型ref
    const solidificationRef =
      ref<InstanceType<typeof IndexSolidification>>(null);
    //指标卡片ref
    const cardRef = ref<InstanceType<typeof IndexCard>>(null);
    //指标血缘ref
    const boodKinshipRef = ref<InstanceType<typeof IndexlBoodKinship>>(null);

    const handleClick = () => {
      if (state.activeName === "0") {
        definitionRef.value.request(state.queryId);
      } else if (state.activeName === "1") {
        modelRef.value.requset(state.queryId);
      } else if (state.activeName === "2") {
        solidificationRef.value.request(state.queryId);
      } else if (state.activeName === "3") {
      } else if (state.activeName === "4") {
        boodKinshipRef.value.requset(state.queryId);
      }
    };
    // 显示子级
    const showChidren = async (
      row: tableResult & {
        children: tableResult[];
        showChildren: "load" | "show" | "hiden";
      }
    ) => {
      if (!row.children || row.children.length <= 0) {
        row.showChildren = "load";
        const res = await getIicindflowPageChidren(row.rowId);
        if (res.code == 200) {
          row.showChildren = "show";
          if (res.result.records && res.result.records.length > 0) {
            row.children = res.result.records;
          } else {
            row.hasHistoryVersion = false;
          }
          nextTick(() => {
            mytable.value.elTable.toggleRowExpansion(row, true);
          });
        } else {
          row.showChildren = "hiden";
        }
      } else {
        if (row.showChildren === "show") {
          row.showChildren = "hiden";
          nextTick(() => {
            mytable.value.elTable.toggleRowExpansion(row, false);
          });
        } else {
          row.showChildren = "show";
          nextTick(() => {
            mytable.value.elTable.toggleRowExpansion(row, true);
          });
        }
      }
    };
    //获取子级接口
    const getIicindflowPageChidren = async (parentId: string) => {
      return Api.getIicindflowPage({
        limit: 10000,
        page: 1,
        parentId,
      });
    };
    // ==========================================
    const getIicindflowPage = async () => {
      const res = await Api.getIicindflowPage({
        limit: state.IndicatorLedgerPagination.pageSize,
        page: state.IndicatorLedgerPagination.currentPage,
        ...state.query,
      });
      state.IndicatorLedgerLoading = false;
      if (res.code === 200) {
        // if (res.result.records && res.result.records[0]) {
        //   const defaultData = res.result.records[0];
        //   setIndicatorId(defaultData);
        // }
        // res.result.records.splice(3, 100);
        state.tableData = res.result.records;
        state.IndicatorLedgerPagination.total = res.result.total;
      }
    };
    // 求助人分页
    const IndicatorLedgerChange = () => {
      getIicindflowPage();
    };
    // 求助人size大小改变
    const IndicatorLedgerSizeChange = () => {
      getIicindflowPage();
    };

    // 设置指标id
    const setIndicatorId = (item: tableResult) => {
      state.queryId = item.rowId;
      //触发一次点击的标签
      nextTick(() => {
        handleClick();
      });
    };

    const search = () => {
      getIicindflowPage();
    };
    watch(route, () => {
      onKeySearch();
    });

    const onKeySearch = () => {
      if (route.query.key) {
        state.query.name = route.query.key.toString() || "";
        search();
      }
    };

    if (route.query.key) {
      state.query.name = route.query.key.toString() || "";
    }
    getIicindflowPage();

    return {
      definitionRef,
      modelRef,
      solidificationRef,
      cardRef,
      boodKinshipRef,
      setIndicatorId,
      showChidren,
      IndicatorLedgerSizeChange,
      IndicatorLedgerChange,
      ...toRefs(state),
      handleClick,
      mytable,
      dtImg,
      search,
    };
  },
});
</script>
<style lang="scss" scoped>
.MarketingMetrics {
  padding: 0 20px;
  :deep(.el-table) {
    .el-table__expand-icon {
      display: none;
    }
  }
  .index_name {
    display: flex;
  }

  .operation {
    span {
      margin-right: 4px;
      cursor: pointer;
    }
    .highlight {
      color: #2082ff;
    }
  }
  .m-head {
    margin-top: 30px;
  }
  .m-search {
    margin-top: 20px;
  }
  .tabs-con {
    background-color: #fff;
    border-radius: 8px;
  }
  :deep(.el-tab-pane) {
    min-height: 400px;
  }
  :deep(.el-tabs__nav) {
    margin-left: 50px;
  }
  :deep(.el-tabs__content) {
    padding: 0 10px;
  }

  .tabs-con {
    margin-top: 20px;
  }
  .indexdt {
    width: 80%;
    display: block;
    margin: 0 auto;
  }
}
</style>
