import { defineComponent, ref, onMounted, toRef } from 'vue'
// import Graph from '@/components/Graph'
import * as Element from 'element-plus'
import styles from './index.module.scss'
import apis, { DataSourceResType, CreateDataSourceResType } from './apis'
import Sidebar from './components/sidebar.vue'

const {
  ElTabs,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElMessageBox,
  ElButton,
  ElSelect,
  ElOption,
  ElDialog,
  ElForm,
  ElInput,
  ElFormItem
} = Element;


export default defineComponent({
  setup() {
    const sideBarIndex = ref('1'); // 菜单 index
    const dialogFormVisible = ref(false); // 菜单 index
    const tableIndex = ref('0'); // 菜单 index
    const data = ref<DataSourceResType[]>([])
    const putInddatasource = apis.修改数据源({
      needInit: false
    })
    const postInddatasource = apis.新增数据源({
      needInit: false
    })
    const getInddatasource = apis.查询数据源({
      needInit: false
    })
    const form = ref<DataSourceResType | CreateDataSourceResType>({
      attributeList: {
        dbName: '',
        port: '',
        username: '',
        ip: '',
        password: '',
      },
      id: '',
      datasourceType: '',
      datasourceName: '',
      description: '',
    }); // 菜单 index
    const propsData = apis.数据源列表({
      needInit: true,
      initValue: []
    })
    const tabs = [
      {
        label: '自定义',
      },
      {
        label: '数据湖',
      },
      {
        label: '第三方数据源',
      }
    ]
    const upDateTable = () => propsData.request()

    onMounted(() => {
      upDateTable();
    })
    return () => (
      <div className={styles.flow_chart}>
        {/* 左侧 */}
        <div className={styles.left}>
          <Sidebar value={sideBarIndex} key='2' />
        </div>

        {/* 中间 */}
        <ElTabs v-loading={propsData.loading} className={styles.tabs_content} type='card' v-model={tableIndex}>
          {
            tabs.map((item) =>
              <ElTabPane label={item.label} key={item.label}>
                <ElTable height='100%' data={propsData.data}
                  default-sort="{ prop: 'date', order: 'descending' }"
                  style='width: 100%'
                >
                  <ElTableColumn prop='datasourceName' label='名称' sortable/>
                  <ElTableColumn prop='createBy' label='创建者'/>
                  <ElTableColumn prop='gmtCreate' label='创建时间' sortable />
                  <ElTableColumn prop='gmtModified' label='最近修改时间'/>
                  <ElTableColumn prop='description' label='备注' />
                  <ElTableColumn
                    fixed='right'
                    label='Operations'
                    width='200px'
                    v-slots={{
                      header: () => <div>
                        <ElButton size='mini' onClick={() => {
                          dialogFormVisible.value = true;
                          form.value = {
                            attributeList: {
                              dbName: '',
                              username: '',
                              ip: '',
                              password: '',
                              port: '',
                            },
                            id: '',
                            datasourceType: '',
                            datasourceName: '',
                            description: '',
                          }
                        }}>
                            创建自定义数据源
                        </ElButton>
                      </div>,
                      default: ({ row }: any) => <div>
                        <ElButton
                          loading={propsData.loading || getInddatasource.loading}
                          size='mini'
                          onClick={async () => {
                            const res = await getInddatasource.request(row.rowId)
                            dialogFormVisible.value = true;
                            form.value = res;
                          }}>
                            修改
                        </ElButton>
                        <ElButton
                          size='mini'
                          type='danger'
                          loading={propsData.loading}
                          onClick={() => {
                            ElMessageBox.confirm(
                              `是否删除 ${row.datasourceName} 数据源`,
                              '提示',
                              {
                                confirmButtonText: '确定删除',
                                cancelButtonText: '取消',
                                type: 'warning',
                              }
                            )
                              .then(() => {
                                apis.删除数据源([row.rowId]).then((res) => {
                                  upDateTable();
                                })
                              })
                          }}
                        >
                            删除
                        </ElButton>
                      </div>
                    }}
                  />
                </ElTable>
              </ElTabPane>
            )
          }
        </ElTabs>
        <ElDialog
          v-model={dialogFormVisible.value}
          title={form.value.id ? '修改数据源' : '添加数据源'}
          v-slots={{
            footer: () => <span class='dialog-footer'>
              <ElButton
                onClick={() => {
                  dialogFormVisible.value = false
                }}
              >
                取消
              </ElButton>
              <ElButton
                type='primary'
                loading={putInddatasource.loading || postInddatasource.loading}
                onClick={async () => {
                  let d = null;
                  if (form.value.id) {
                    d = putInddatasource.request(form.value as DataSourceResType);
                  } else {
                    d = postInddatasource.request(form.value as CreateDataSourceResType);
                  }
                  await d;
                  dialogFormVisible.value = false;
                  upDateTable()
                }}
              >
              保存
              </ElButton>
            </span>,
          }}
        >
          <ElForm model={form.value}  label-width={120}>
            <ElFormItem label='名称'>
              <ElInput v-model={form.value.datasourceName} autocomplete='off' />
            </ElFormItem>
            <ElFormItem label='类型'>
              <ElSelect
                type='textarea'
                v-model={form.value.datasourceType}
                autocomplete='off'
              >
                <ElOption value='MYSQL' label='MYSQL' />
                <ElOption value='HIVE' label='HIVE' />
                <ElOption value='KYLIN' label='KYLIN' />
              </ElSelect>
            </ElFormItem>
            <ElFormItem label='主机'>
              <ElInput v-model={form.value.attributeList.ip} autocomplete='off' />
            </ElFormItem>
            <ElFormItem label='端口'>
              <ElInput v-model={form.value.attributeList.port} autocomplete='off' />
            </ElFormItem>
            <ElFormItem label='数据库名称'>
              <ElInput v-model={form.value.attributeList.dbName} autocomplete='off' />
            </ElFormItem>
            <ElFormItem label='用户名'>
              <ElInput v-model={form.value.attributeList.username} autocomplete='off' />
            </ElFormItem>
            <ElFormItem label='密码'>
              <ElInput v-model={form.value.attributeList.password} autocomplete='off' />
            </ElFormItem>
            <ElFormItem label='备注'>
              <ElInput
                type='textarea'
                v-model={form.value.description}
                autocomplete='off'
              />
            </ElFormItem>
          </ElForm>
        </ElDialog>
      </div>
    ) // 写一个 hello world祭天
  }
})
