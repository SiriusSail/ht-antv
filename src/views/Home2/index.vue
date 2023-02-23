<template>
  <div class="">
    <MyForm
      ref="myform"
      :form="form"
      status-icon
      :list="list"
      label-position="right"
      label-width="100px"
    >
    </MyForm>
    <MyButton @click="onclick">测试</MyButton>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import MyForm, {
  InputItem,
  RadioItem,
  SelectItem,
  CheckboxItem,
} from "@/components/Form/index.vue";

type stateType = {
  list: (InputItem | RadioItem | SelectItem | CheckboxItem)[];
  form: {
    name: string;
    name2: string;
    radio: number;
    select: string;
    checkbox: any[];
  };
};

export default defineComponent({
  components: { MyForm },
  setup() {
    const state = reactive<stateType>({
      form: {
        name: "",
        name2: "",
        radio: 1,
        select: "",
        checkbox: [],
      },
      list: [
        {
          name: "name",
          type: "text",
          label: "姓名1",
          span: 7,
          offset: 1,
          prop: "name",
          rules: [{ required: true, message: "age is required" }],
        },
        {
          name: "name2",
          type: "number",
          label: "姓名1",
          span: 7,
          offset: 1,
          prop: "name2",
          rules: [{ required: true, message: "age is required" }],
        },
        {
          name: "name3",
          type: "textarea",
          label: "姓名1",
          span: 7,
          offset: 1,
          prop: "name3",
        },
        {
          name: "radio",
          type: "radio",
          label: "姓名1",
          span: 7,
          offset: 1,
          prop: "name3",
          select: [
            {
              label: "测试",
              value: 1,
            },
            {
              label: "测试",
              value: 2,
            },
          ],
        },
        {
          name: "select",
          type: "select",
          label: "姓名1",
          span: 7,
          offset: 1,
          prop: "name3",
          select: [
            {
              label: "测试",
              value: 1,
            },
            {
              label: "测试",
              value: 2,
            },
          ],
        },
        {
          name: "checkbox",
          type: "checkbox",
          label: "复选框",
          span: 7,
          offset: 1,
          prop: "name4",
          select: [
            {
              label: "测试",
              value: 5,
            },
            {
              label: "测试",
              value: 8,
            },
          ],
        },
      ],
    });
    const myform = ref<InstanceType<typeof MyForm>>();

    const onclick = () => {
      console.log("测试");
      myform.value!.validate((valid) => {
        if (valid) {
          console.log("sucscss submit!!");
          myform.value!.resetForm();
        } else {
          console.log("error submit!!");
        }
      });
    };
    // setTimeout(() => {}, 1000);
    return {
      myform,
      onclick,
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss">
.el-form-item__label {
  display: flex;
  align-items: center;
}
</style>
