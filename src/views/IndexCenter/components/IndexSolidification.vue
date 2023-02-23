<template>
  <div class="IndexSolidification">
    <el-row style="padding: 10px">
      <el-col :span="6">执行状态：健康</el-col>
      <el-col :span="6">上次运算日期：{{ form.lastSyncTime }}</el-col>
      <el-col :span="8">下次运算日期：{{ form.nextSyncTime }}</el-col>
      <el-col :span="4">
        <el-button type="primary" disabled>数据重跑</el-button></el-col
      >
    </el-row>
    <MyForm
      ref="formRef"
      :form="form"
      status-icon
      :list="list2"
      label-position="right"
      label-width="130px"
    >
      <template #a>
        <EasyCronInput v-model="form.cron"></EasyCronInput>
      </template>
    </MyForm>

    <div class="footer"></div>
  </div>
</template>
<script lang="ts">
import EasyCronInput from "./EasyCronInput.vue";

import { defineComponent, ref, reactive, toRefs, watch } from "vue";
import Api, { Solidify } from "../api/index";
import MyForm, {
  InputItem,
  RadioGroupItem,
  SelectItem,
  CheckboxGroupItem,
  CheckboxItem,
  TimePickerItem,
} from "@/components/Form/index.vue";

type StateType = {
  list2: (
    | InputItem
    | RadioGroupItem
    | SelectItem
    | CheckboxGroupItem
    | CheckboxItem
    | TimePickerItem
  )[];
  form: Solidify;
};

export default defineComponent({
  components: {
    MyForm,
    EasyCronInput,
  },
  setup() {
    const formRef = ref<InstanceType<typeof MyForm>>();

    const yearItem: InputItem = {
      name: "month",
      label: "每年的第",
      type: "text",
      col: {
        span: 7,
      },
      rightSlot: "monthRight",
    };
    const monthItem: InputItem = {
      label: "每月的",
      name: "time",
      type: "text",
      col: {
        span: 7,
      },
    };
    const weekItme: SelectItem = {
      name: "week",
      label: "每周星期",
      type: "select",
      col: {
        span: 7,
      },
      select: [
        { label: "2", value: "星期一" },
        { label: "3", value: "星期二" },
        { label: "4", value: "星期三" },
        { label: "5", value: "星期四" },
        { label: "6", value: "星期五" },
        { label: "7", value: "星期六" },
        { label: "1", value: "星期日" },
      ],
    };
    const dayItem: TimePickerItem = {
      label: "每天的",
      name: "time",
      type: "timePicker",
      col: {
        span: 7,
      },
    };

    const staticArr: (
      | InputItem
      | RadioGroupItem
      | SelectItem
      | CheckboxGroupItem
      | CheckboxItem
      | TimePickerItem
    )[] = [
      {
        name: "syncEnable",
        type: "checkbox",
        label: "启用",
        trueLabel: 0,
        falseLabel: 1,
      },
      {
        name: "a",
        type: "slot",
        label: "执行周期",
        col: {
          span: 24,
        },
      },
    ];
    // 指标固化表单
    const state = reactive<StateType>({
      form: {
        createBy: "",
        cron: "",
        cycleType: null,
        day: "",
        gmtCreate: "",
        gmtModified: "",
        healthStatus: null,
        id: null,
        lastSyncTime: "",
        modifiedBy: "",
        month: "",
        nextSyncTime: "",
        repeatInterval: null,
        repeatTimes: null,
        rowId: "",
        syncEnable: null,
        time: null,
        week: "",
      },
      list2: [],
    });
    watch(
      () => state.form.cycleType,
      () => {
        changeCycleType();
      }
    );
    const changeCycleType = () => {
      if (state.form.cycleType == 1) {
        state.list2 = [...staticArr, yearItem, monthItem, dayItem];
      } else if (state.form.cycleType == 2) {
        state.list2 = [...staticArr, monthItem, dayItem];
      } else if (state.form.cycleType == 3) {
        state.list2 = [...staticArr, weekItme, dayItem];
      } else if (state.form.cycleType == 4) {
        state.list2 = [...staticArr, dayItem];
      } else {
        state.list2 = [...staticArr];
      }
      const data = state.form.cycleType;
    };

    const request = async (rowId: string) => {
      const res = await Api.getSolidify(rowId);
      if (res.code == 200) {
        state.form = res.result;

        changeCycleType();
      } else {
        Api.ElMessage.error(res.message);
      }
    };
    return {
      request,
      formRef,

      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss">
.cronTip {
  display: flex;
  white-space: nowrap;
  span {
    margin-left: 10px;
    color: #20a0ff;
    text-decoration: underline;
    font-size: 12px;
  }
}
.retryTip {
  color: #aaaaaa;
  font-size: 12px;
  white-space: nowrap;
}
.footer {
  text-align: center;
}
</style>
