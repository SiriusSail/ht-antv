
import { defineComponent, ref, PropType, watchEffect } from 'vue'
import * as Element from 'element-plus'
import { OptionsType } from '../index.d'

const { ElFormItem, ElSelect, ElOption } = Element;

export default  defineComponent({
  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    value: {
      type: String,
      required: true,
      default: ''
    },
    placeholder: {
      type: String,
      required: true,
      default: ''
    },
    options: {
      type: Array as PropType<OptionsType[]>,
      required: true,
      default: []
    },
    multiple:{
      type:Boolean,
      required: false,
      default: false,
    },
    onChange: {
      type: Function as PropType<(value: string) => void>,
      required: false,
      default: () => undefined
    },
  },
  emits: {
    'update:value': (val: string) => val
  },
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup({value, label, ...props}, { emit }) {
    const newvalue = ref(value);

    watchEffect(() => {
      emit('update:value', newvalue.value)
    })
    return () => <ElFormItem label={label} label-width={label ? undefined : 0} className='form-item-label-justify'>
      <ElSelect
        {...props}
        v-model={newvalue.value}>
        {props.options.map((item) => <ElOption
          key={item.value}
          label={item.label}
          value={item.value}
        />)}
      </ElSelect>
    </ElFormItem>
  }})

// export default (props: PublicPropsType) => <ElFormItem label={props.label}>
// 	<ElInput v-model={props.value}></ElInput>
// </ElFormItem>
