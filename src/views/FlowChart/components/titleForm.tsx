import { defineComponent, ref, PropType, inject, watchEffect } from 'vue'
import * as Element from 'element-plus'
import apis from '../apis'


export type FormData = {
  code: string;
  name: string;
  type: string;
}


const {
  ElButton,
  ElDialog,
  ElForm,
  ElSelect,
  ElOption,
  ElInput,
  ElFormItem
} = Element;

export default defineComponent({
  props: {
    isShowForm: {
      type: Boolean,
      default: false,
    },
    intValue: {
      type: Object as PropType<FormData>,
      required: true,
    },
    onSubmit: {
      type: Function as PropType<(value: FormData) =>void>,
      required: true,
    },
    onClose: {
      type: Function as PropType<() =>void>,
      required: true,
    },
  },
  setup(props) {
    const pageStore = inject<{
      domain: {
        value: {
          dictLabel: string;
          dictValue: string;
        }[]
      },
      flowType: {
        value: {
          dictLabel: string;
          dictValue: string;
        }[]
      },
    }>('pageStore')

    const form = ref<FormData>(props.intValue);
    watchEffect(() => {
      form.value = props.intValue;
    })
    return () => <div>
      <ElDialog
        v-model={props.isShowForm}
        title='编辑指标信息'
        onClose={props.onClose}
        v-slots={{
          footer: () => <span class='dialog-footer'>
            <ElButton
              onClick={() => {
                props.onClose?.()
              }}
            >
              取消
            </ElButton>
            <ElButton
              type='primary'
              onClick={() => {
                props.onSubmit?.(form.value)
                props.onClose?.()
              }}
            >
              确定
            </ElButton>
          </span>,
        }}
      >
        <ElForm
          model={form.value}
          label-width={120}>
          <ElFormItem label='指标名称'>
            <ElInput
              type='input'
              v-model={form.value.name}
              placeholder='请输入指标名称'
              autocomplete='off'
            />
          </ElFormItem>
          <ElFormItem label='指标领域'>
            <ElSelect
              type='datetime'
              v-model={form.value.code}
              placeholder='请选择指标领域'
            >
              {pageStore.domain.value.map((item) =><ElOption
                key={item.dictValue}
                value={item.dictValue}
                label={item.dictLabel} />)}
            </ElSelect>
          </ElFormItem>
          <ElFormItem label='指标类型'>
            <ElSelect
              type='datetime'
              v-model={form.value.type}
              placeholder='请选择指标类型'
            >
              {pageStore.flowType.value.map((item) =><ElOption
                key={item.dictValue}
                value={item.dictValue}
                label={item.dictLabel} />)}
            </ElSelect>
          </ElFormItem>
        </ElForm>
      </ElDialog>
    </div>
  }
})
