<template>
  <div class="MessageInfo">
    <div class="message-title">{{ helpInfo.title }}</div>
    <div class="list">
      <MessageItem
        v-for="item in detailList"
        :key="item.id"
        :message="item.messageContent"
        :avatar-name="item.createBy"
        :avatar-img="item.createBy"
        :time="item.gmtCreate"
        :download="item.attachmentPath"
      />
    </div>

    <MyForm
      ref="formRef"
      :form="form"
      :list="formList"
      label-position="right"
      label-width="auto"
    >
      <template #messageContent>
        <LeaveMessage
          ref="leaveMessageRef"
          v-model="form.messageContent"
          label="回复留言"
          show-component
          show-indicator
          @fileChange="fileChange"
        />
      </template>
    </MyForm>

    <div class="footer">
      <el-button type="primary" @click="submit">回复留言</el-button>
      <el-popconfirm
        confirm-button-text="已解决"
        cancel-button-text="未解决"
        cancel-button-type="danger"
        icon-color="red"
        title="是否解决问题？"
      >
        <template #reference>
          <el-button type="primary">结束沟通</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onActivated } from "vue";
import { useRoute } from "vue-router";

import MessageItem from "./component/MessageItem.vue";
import LeaveMessage from "./component/LeaveMessage.vue";
import MyForm, { InputItem } from "@/components/Form/index.vue";
import Api, { GetMessageInfo } from "./api/index";

type StateType = {
  formList: InputItem[];
  form: {
    componentIds: string;
    componentNames: string;
    helpId: string;
    messageContent: string;
    indicatorsIds: string;
    indicatorsNames: string;
    attachmentPath: string;
  };
} & GetMessageInfo;

export default defineComponent({
  components: {
    MessageItem,
    MyForm,
    LeaveMessage,
  },
  setup() {
    // const leaveMessageRef = <InstanceType<typeof LeaveMessage>>ref();
    const route = useRoute();
    const formRef = ref<InstanceType<typeof MyForm>>();
    const state = reactive<StateType>({
      form: {
        componentIds: "", // 逗号分隔
        componentNames: "", // 逗号分隔
        helpId: "",
        messageContent: "",
        indicatorsIds: "", // 逗号分隔
        indicatorsNames: "", // 逗号分隔
        attachmentPath: "",
      },
      formList: [
        {
          label: "",
          name: "messageContent",
          labelWidth: "",
          type: "slot",
          rules: { required: true, message: "请输入回复内容", trigger: "blur" },
          col: {
            xs: {
              span: 24,
            },
            md: {
              span: 24,
            },
            lg: { span: 24 },
          },
        },
      ],

      helpInfo: {
        createBy: "",
        forHelpBy: "",
        forHelpById: "",
        forHelpDomain: "",
        forHelpType: "",
        gmtCreate: "",
        gmtModified: "",
        helpBy: "",
        id: 0,
        isDeleted: "",
        modifiedBy: "",
        rowId: "",
        status: "",
        title: "",
      },
      detailList: [],
    });

    const getInfo = async () => {
      const res = await Api.getMessageInfo(state.form.helpId);
      if (res.code == 200) {
        state.helpInfo = res.result.helpInfo;
        state.detailList = res.result.detailList;
      } else {
        Api.ElMessage.error(res.message);
      }
    };

    const deleteHelp = async () => {};

    onActivated(() => {
      if (!route.query.id) {
        Api.ElMessage.error("缺少必要参数");
        return;
      }
      state.form.helpId = route.query.id.toString();
      getInfo();
    });

    const submit = () => {
      formRef.value?.validate(async (valid: any, aaa) => {
        if (valid) {
          const res = await Api.iichelpdetail(state.form);
          if (res.code === 200) {
            Api.ElMessage.success(res.message);
            formRef.value?.resetForm();
            getInfo();
          } else {
            Api.ElMessage.error(res.message);
          }
        }
      });
    };
    //设置图片文件
    const fileChange = (path: string) => {
      state.form.attachmentPath = path;
    };

    return {
      submit,
      fileChange,
      ...toRefs(state),
      formRef,
    };
  },
});
</script>
<style scoped lang="scss">
.MessageInfo {
  padding: 40px;
  padding-bottom: 60px;
  .message-title {
    font-size: 18px;
    font-weight: 550;
    // border-bottom: 1px solid #ccc;
    line-height: 22px;
  }
  .footer {
    text-align: center;
  }
}
:deep(.el-popconfirm__main) {
  padding: 20px 0;
}
.pagination {
  padding-top: 10px;
  text-align: right;
}
</style>
