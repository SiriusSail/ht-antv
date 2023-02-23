import { defineComponent, inject, reactive, onUpdated, ref, watchEffect } from 'vue'
import * as Element from 'element-plus'
import classnames from 'classnames'
import * as echarts from 'echarts'
import styles from './index.module.scss'
import IdeaEchat from './module/ideaEchat'
import Iconfont from '@/components/Iconfont'
import { FormOption} from './index.d'
import Components from './module/index'

const { ElForm } = Element

export default defineComponent({
  setup() {
    const pageStore = inject<{
      formOptions: {
        value: FormOption[]
      },
    }>('pageStore')
    // const formOptions: FormOption[] = [];
    const form = ref<any>({});

    const Component = (item: FormOption, index?: number) => {
      const Modu = Components[item?.tag];
      if (!Modu) return <div>没有标签为{item?.tag}的组件</div>;
      const props: any = {
        key: item.tag + index,
        ...item
      }
      switch(item.tag) {
        case 'tabs':
          console.log(props);
          props.content = item.childs.map(Component);
          break;
        case 'input':
        case 'rate':
        case 'select':
        case 'table':
        case 'dateTimePicker':
          return <Modu {...props} v-models={[
            [item.value, 'value']
          ]}/>
        case 'hr':
        case 'a':
        case 'text':
        case 'button':
        default:
      }
      return <Modu {...props} />
    }

    // watchEffect(() => {
    //   console.log('123', pageStore?.echatOption.value?.title.text);
    // })
    return () => <div className='flex-column'>
      <div className={classnames(styles.table_title, 'flex-row')}>
        <div>属性编辑</div>
        <Iconfont name='icon-share' />
      </div>
      <ElForm ref={(e: any) => {
        form.value = e
      }} label-width='80px' className={styles.form}>
        {pageStore?.formOptions.value?.map((item, index) =>
          <div key={index}>{Component(item, index)}</div>
        )}
        <IdeaEchat />
      </ElForm>
    </div> // 写一个 hello world祭天
  }
})
