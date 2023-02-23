<template>
  <div class="IndexSearch">
    <MyForm
      ref="formRef"
      :form="query"
      status-icon
      :list="list"
      label-position="right"
      label-width="auto"
      key="formRef"
    >
      <template #searchsubmit>
        <div class="searchsubmit">
          <span @click="search">查询</span>
          <span>下载</span>
        </div>
      </template>
    </MyForm>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import MyForm, {
  InputItem,
  RadioGroupItem,
  SelectItem,
  CheckboxGroupItem,
  CheckboxItem,
  timeSelectItem,
} from "@/components/Form/index.vue";
import Api from "../api/index";
import { async } from "@antv/x6/lib/registry/marker/async";

type StateType = {
  list: (
    | InputItem
    | RadioGroupItem
    | SelectItem
    | CheckboxGroupItem
    | CheckboxItem
    | timeSelectItem
  )[];
};

export default defineComponent({
  components: {
    MyForm,
  },
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof MyForm>>();

    // 指标固化表单
    const state = reactive<StateType>({
      list: [
        {
          name: "flowType",
          type: "select",

          placeholder: "请选择指标类型",
          col: {
            xs: {
              span: 24,
            },
            md: {
              span: 3,
              offset: 1,
            },
            lg: { span: 3 },
          },
          select: [],
        },
        {
          label: "指标名称",
          name: "name",
          labelWidth: "80px",
          type: "text",
          col: {
            xs: {
              span: 24,
            },
            md: {
              span: 5,
            },
            lg: { span: 4 },
          },
        },
        {
          label: "指标编码",
          placeholder: "请输入指标编码",
          name: "code",
          labelWidth: "80px",
          type: "text",
          col: {
            xs: {
              span: 24,
            },
            md: {
              span: 4,
            },
            lg: { span: 5 },
          },
        },
        {
          label: "指标维度",
          placeholder: "请输入指标维度",
          name: "flowAttr",
          labelWidth: "80px",
          type: "text",
          col: {
            xs: {
              span: 24,
            },
            md: {
              span: 4,
            },
            lg: { span: 5 },
          },
        },
        {
          name: "searchsubmit",
          type: "slot",
          col: {
            span: 4,
            lg: { span: 3 },
          },
        },
      ],
    });

    const submit = () => {
      formRef.value?.validate((valid: any) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
        }
      });
    };
    const reset = () => {
      console.log(formRef.value);
      formRef.value?.resetForm();
    };

    const search = () => {
      emit("search");
    };
    const getDomain = async () => {
      const res = await Api.getDomain();
      if (res.code == 200) {
        const item = <SelectItem>state.list.find((v) => v.name == "domain");
        if (item) {
          const select: { label: string; value: string }[] = [];
          select.push({
            value: "",
            label: "全部",
          });
          res.result.forEach((v) => {
            select.push({ label: v.dictLabel, value: v.dictValue });
          });
          item.select = select;
        }
      } else {
        Api.ElMessage.error(res.message);
      }
    };

    const getFlowType = async () => {
      const res = await Api.getFlowType();
      if (res.code == 200) {
        const item = <SelectItem>state.list.find((v) => v.name == "flowType");
        if (item) {
          const select: { label: string; value: string }[] = [];
          select.push({
            value: "",
            label: "全部",
          });
          res.result.forEach((v) => {
            select.push({ label: v.dictLabel, value: v.dictValue });
          });
          item.select = select;
        }
      } else {
        Api.ElMessage.error(res.message);
      }
    };

    getDomain();
    getFlowType();
    return {
      search,
      submit,
      reset,
      formRef,
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss">
:deep(.el-form-item__label) {
  font-size: 14px;
}
.searchsubmit {
  span {
    cursor: pointer;
  }
  font-size: 16px;
  color: #20a0ff;
  padding-left: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-decoration: underline;
}
</style>
