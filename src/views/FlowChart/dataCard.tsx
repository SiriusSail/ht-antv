import { defineComponent, ref, onMounted } from 'vue'
// import Graph from '@/components/Graph'
import * as Element from 'element-plus'
import styles from './index.module.scss'
import apis, { DataSourceResType, IndassetDatabaseType, ColumnDataType, IicindcardItem, ColumnByTableInfo } from './apis'
import Sidebar from './components/sidebar.vue'
import Input from '@/components/TableFormItem/module/input'

const {
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn,
  ElButton,
  ElDialog,
  ElForm,
  ElInput,
  ElMessageBox,
  ElTooltip,
  ElFormItem
} = Element;


export default defineComponent({
  setup() {
    const sideBarIndex = ref('3'); // 菜单 index
    const dialogFormVisible = ref(false); // 菜单 index
    const ideaDialogFormVisible = ref(false); // 菜单 index
    const formRef = ref<any>(); // 数据源 的 资产列表
    // const indassetDataList = ref<IndassetDatabaseType[]>([]);
    const iicindcardDataList = apis.数据卡片列表({
      needInit: true,
      initValue: []
    })
    const columnByTableInfo = apis.获取表字段({
      needInit: false,
      initValue: []
    })
    const putIicindcard = apis.修改数据资产({
      needInit: false,
      initValue: []
    })
    const domain = apis.查询领域({
      needInit: true,
      initValue: []
    })
    // 主页资产列表
    const postIndasset = apis.新增数据资产({
      needInit: false,
      initValue: []
    })
    const tableRef = ref<any>(); // 选择源的Ref
    const sourceDataList = ref<DataSourceResType[]>([]); // 数据源列表
    const selectColumnList = ref<ColumnDataType[]>([]); // 选择的资产列表
    const columnByTableInfoList = ref<{
      [key: string]: ColumnByTableInfo[]
    }>({}); // 选择的资产列表
    const selectNameList = ref<{
      tableEnName: string;
      assetName: string;
      description: string;
    }[]>([]); // 资产列表的数据

    const form = ref<IndassetDatabaseType>({
      assetName: '',
      columnList: [],
      createBy: '',
      datasourceName: '',
      datasourceId: '',
      description: '',
      domain: '',
      gmtCreate: '',
      gmtModified: '',
      id: 0,
      isDeleted: 0,
      modifiedBy: '',
      rowId: '',
      tableChName: '',
      tableEnName: '',
    }); // 菜单 index

    const initValue = () => {
      form.value = {
        assetName: '',
        columnList: [],
        createBy: '',
        datasourceName: '',
        datasourceId: '',
        description: '',
        domain: '',
        gmtCreate: '',
        gmtModified: '',
        id: 0,
        isDeleted: 0,
        modifiedBy: '',
        rowId: '',
        tableChName: '',
        tableEnName: '',
      };
      formRef.value?.resetFields();
      sourceDataList.value = [];
      selectColumnList.value = [];
      selectNameList.value = [];
    }
    const upDateTable = () => {
      iicindcardDataList.request();
      // apis.数据资产列表().then((res) => {
      //   indassetDataList.value = res.result
      // });
    }

    const getSourceList = () => apis.数据源列表2().then((res) => {
      sourceDataList.value = res.result;
    })
    const datasource = apis.获取源数据资产列表({
      initValue: [],
      needInit: false
    })
    const getColumnList = (row: string) => datasource.request(row).then((res) => {
      form.value.tableChName = undefined;
      columnByTableInfoList.value = {};
      selectNameList.value = res.map((item) => ({
        tableEnName: item.tableEnName,
        assetName: '',
        description: '',
      }))

      return res
    })

    const setSelectName = (data: {
      tableEnName: string;
      name: 'assetName' | 'description';
      value: string;
    }) => {
      let selectIndex = -1;
      selectNameList.value.find((item, index) => {
        if (item.tableEnName === data.tableEnName) {
          selectIndex = index;
          return true
        }
        return false
      })
      selectNameList.value[selectIndex][(data.name)] = data.value;
    }

    const handleSelectionChange = (val: any, row: any) => {
      selectColumnList.value = val;
      console.log(val)
      console.log(selectColumnList.value)
      selectColumnList.value.forEach((item) => {
        if (!columnByTableInfoList.value[item.tableEnName]) {
          columnByTableInfo.request({
            datasourceId: form.value.datasourceId,
            tableName: item.tableEnName
          }).then((res) => {
            columnByTableInfoList.value[item.tableEnName] = res
          })
        }
      })
    }

    return () => (
      <div className={styles.flow_chart}>
        {/* 左侧 */}
        <div className={styles.left}>
          <Sidebar value={sideBarIndex} key='2'/>
        </div>

        {/* 中间 */}
        <div className={styles.center}>
          <ElTable
            v-loading={iicindcardDataList.loading}
            data={iicindcardDataList.data}
            default-sort="{ prop: 'date', order: 'descending' }"
            style='width: 100%'
            height='100%'
          >
            <ElTableColumn
              type='expand'
              v-slots={{
                default: ({ row }: { row: IicindcardItem }) =>{
                  const data = [
                    {
                      assetId: row.asset1Id,
                      tableChName: row.table1ChName,
                      tableEnName: row.table1EnName,
                    },
                    {
                      assetId: row.asset2Id,
                      tableChName: row.table2ChName,
                      tableEnName: row.table2EnName,
                    },
                    {
                      assetId: row.asset3Id,
                      tableChName: row.table3ChName,
                      tableEnName: row.table3EnName,
                    }
                  ].filter((item) => item.tableEnName || item.tableChName)
                  return <ElTable
                    data={data}
                    border
                    default-sort="{ prop: 'date', order: 'descending' }"
                    style='width: 300px'
                  >

                    <ElTableColumn prop='tableChName' label='中文名称'/>
                    <ElTableColumn prop='tableEnName' label='英文名'/>
                  </ElTable>
                }

              }}
            />
            <ElTableColumn prop='cardName' label='名称'/>
            <ElTableColumn prop='createBy' label='创建者'/>
            <ElTableColumn width='150px' prop='gmtCreate' label='创建时间' sortable />
            <ElTableColumn width='150px' prop='gmtModified' label='最近修改时间'/>
            <ElTableColumn
              prop='description'
              label='备注'
              width='150px'
              v-slots={{
                default: ({ row }: { row: IndassetDatabaseType }) =>

                  <ElTooltip
                    class={styles.text_overflow}
                    effect='dark'
                    content={row.description}
                    placement='bottom-start'
                  >
                    <div className={styles.text_overflow} >
                      {row.description}
                    </div>
                  </ElTooltip>

              }}
            />
            <ElTableColumn
              fixed='right'
              width='200px'
              label='Operations'
              v-slots={{
                header: () => <div>
                  <ElButton size='mini' onClick={async () => {
                    dialogFormVisible.value = true;
                    initValue();
                    await getSourceList();
                  }}>
                    创建自定义数据资产
                  </ElButton>
                </div>,
                default: ({ row }: { row: IndassetDatabaseType }) => <div>
                  <ElButton
                    loading={datasource?.loading}
                    size='mini'
                    onClick={async () => {
                      const sourceList = getSourceList();
                      initValue();
                      const columnDataList = getColumnList(row.datasourceId);
                      const indassetData = await apis.查询数据资产(row.rowId)
                      await sourceList;
                      await columnDataList;
                      form.value = indassetData;
                      ideaDialogFormVisible.value = true;
                    // attributeList.value = attributeListData;
                    }}>
                    修改
                  </ElButton>
                  <ElButton
                    size='mini'
                    type='danger'
                    onClick={() => {
                      ElMessageBox.confirm(
                        `是否删除 ${row.assetName} 数据资产`,
                        '提示',
                        {
                          confirmButtonText: '确定删除',
                          cancelButtonText: '取消',
                          type: 'warning',
                        }
                      )
                        .then(() => {
                          apis.删除数据资产([row.rowId]).then(() => {
                            upDateTable();
                          })
                        })
                      // propsData.value.data.result = []
                    }}
                  >
                    删除
                  </ElButton>
                </div>
              }}
            />
          </ElTable>
        </div>

        <ElDialog
          v-model={dialogFormVisible.value}
          title='添加数据资产'
          width='75%'
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
                loading={postIndasset.loading}
                onClick={() => {
                  console.log(columnByTableInfoList.value);
                  const assetList = selectColumnList.value.map((item) => {
                    const find = selectNameList.value.find((item2) => item.tableEnName === item2.tableEnName)
                    const data = {
                      ...item,
                      ...(find || {}),
                      columnList: columnByTableInfoList.value[item.tableEnName]
                    }
                    return data
                  })
                  postIndasset.request({
                    assetList,
                    datasourceId: form.value.datasourceId,
                    domain: form.value.domain
                  }).then(() => {
                    dialogFormVisible.value = false;
                    upDateTable();
                  })
                }}
              >
              保存
              </ElButton>
            </span>,
          }}
        >
          <ElForm
            model={form.value}
            ref={(e: any) => {
              formRef.value = e
            }}
            label-width={120}>
            <ElFormItem label='数据源'>
              <ElSelect
                v-model={form.value.datasourceId}
                placeholder='请选择数据源'
                onChange={getColumnList}
                autocomplete='off'
              >
                {sourceDataList.value.map((res) =>
                  <ElOption key={res.id} value={res.rowId} label={res.datasourceName} />
                )}
              </ElSelect>
            </ElFormItem>
            <ElFormItem label='领域'>
              <ElSelect
                v-model={form.value.domain}
                placeholder='请选择领域'
              >
                {domain.data.map((res) =>
                  <ElOption key={res.dictType} value={res.dictType} label={res.dictLabel} />
                )}
              </ElSelect>
            </ElFormItem>
            <ElTable
              ref={(e: any) => {
                tableRef.value = e
              }}
              load={columnByTableInfo.loading}
              data={datasource.data}
              style={{width: '100%'}}
              height='300px'
              onSelectionChange={handleSelectionChange}
            >
              <ElTableColumn type='selection' width='55' />
              <ElTableColumn prop='tableChName' label='中文名称'/>
              <ElTableColumn prop='tableEnName' label='英文名称'/>
              <ElTableColumn
                v-slots={{
                  header: () => <div>名称</div>,
                  default: ({row}: { row: ColumnDataType}) => {
                    const find = selectColumnList.value.find((item) => item.tableEnName === row.tableEnName)
                    return <Input
                      onInput={(value: string) => {
                        setSelectName({
                          tableEnName: row.tableEnName,
                          name: 'assetName',
                          value,
                        })
                      }}
                      disabled={!find} />
                  },
                }}/>
              <ElTableColumn
                v-slots={{
                  header: () => <div>备注</div>,
                  default: ({row}: { row: ColumnDataType}) => {
                    const find = selectColumnList.value.find((item) => item.tableEnName === row.tableEnName)
                    return <Input
                      onInput={(value: string) => {
                        setSelectName({
                          tableEnName: row.tableEnName,
                          name: 'description',
                          value,
                        })
                      }}
                      disabled={!find} />
                  },
                }}/>
            </ElTable>
          </ElForm>
        </ElDialog>
      </div>
    ) // 写一个 hello world祭天
  }
})
