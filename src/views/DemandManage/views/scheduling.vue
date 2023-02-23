<template>
  <div class="MarketingMetrics">

    <div class="col_table">
      <div class="search"></div>
      <div class="col_btn">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="onCreate">新增</el-button>
        <el-button type="success" icon="el-icon-refresh" size="small" :loading='isBtnLoading' @click="onRefresh">刷新</el-button>
      </div>
      <!-- 表格 -->
      <MyTable border :data="tableData" :column="tableColumn" is-pagination :isLoading="isLoading" empty-text='暂无数据' :pagination="pagination" @paginationChange="handleCurrentChange" @paginationSizeChange='handleSizeChange'>
        <template #demandDomain='{data}'>
          <span>{{data.row.demandDomain==1?'任务':'IT'}}</span>
        </template>
        <template #demandType='{data}'>
          <span>{{data.row.demandType==1?'指标开发':'暂无'}}</span>
        </template>
        <template #operation='{data}'>
          <div class="operation">
            <el-button type="primary" size="mini" @click="handleEdit(data.row)">编辑</el-button>
            <el-button type="info" size="mini" @click="handleDel(data.row)">删除</el-button>
          </div>
        </template>
      </MyTable>
    </div>

    <el-dialog v-model="add_visible" :title="editType==='save'?'新增':'编辑' " @closed="handleClose">
      <MyForm ref="formRef" :form="queryData" status-icon :list="fromData" label-position="right" label-width="auto">
        <template #submit>
          <div class="operation">
            <el-button type="primary" size="small" @click='handleSubmit'>保存</el-button>
          </div>
        </template>
      </MyForm>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import hwTableMixins from '@/mixins/hwTableMixins'
import MyTable, { Colum } from '@/components/table/index.vue'
import Service from '../api/index'
import MyForm from '@/components/Form/index.vue'
import { ElMessage } from 'element-plus/lib/components/message'

type StateType = {
  rowId: string
  queryData: {
    demandType: string
    demandDomain: string
    startDate: string
    endDate: string
    demandIds: any[]
    headId: string
    headName: string
    onlineVersion: string
  }
  fromData: any[]
  tableData: any[]
  tableColumn: Colum[]
  add_visible: Boolean
  isBtnLoading: Boolean
  editType: string
}

export default defineComponent({
  components: {
    MyTable,
    MyForm
  },

  setup () {
    /****************************************** 初始化数据 **************************************************/


    const formRef = ref<any>(null)
    const state = reactive<StateType>({
      rowId: '',
      queryData: { demandType: '', demandDomain: '', startDate: '', endDate: '', demandIds: [], headId: '', headName: '', onlineVersion: '' },
      fromData: [
        {
          type: 'select', label: '需求类型', name: 'demandType', placeholder: '请选择类型', labelWidth: '80px',
          select: [{ label: '指标开发', value: '1' }], col: { span: 12 },
          rules: { required: true, message: '请选择类型', trigger: 'blur' },
        },
        {
          type: 'select', label: '需求领域', name: 'demandDomain', placeholder: '请输入需求领域', labelWidth: '80px', select: [{ label: '任务', value: '1' }, { label: 'IT', value: '2' }], col: { span: 12 },
          rules: { required: true, message: '请输入需求领域', trigger: 'blur' },
        },
        {
          type: 'select', label: '负责人', name: 'headId', placeholder: '请选择负责人', labelWidth: '80px', select: [],
          col: { span: 12 },
          rules: { required: true, message: '请选择负责人', trigger: 'blur' },
        },
        {
          type: 'text', label: '上线版本', name: 'onlineVersion', placeholder: '请输入上线版本时间', col: { span: 12 },
          rules: { required: true, message: '请输入上线版本时间', trigger: 'blur' },
        },
        {
          type: 'date', label: '研发开始日期', name: 'startDate', placeholder: '请选择研发开始日期',
          rules: { required: true, message: '请选择研发开始日期', trigger: 'blur' },
        },
        {
          type: 'date', label: '研发结束日期', name: 'endDate', placeholder: '请选择研发结束日期',
          rules: { required: true, message: '请选择研发结束日期', trigger: 'blur' },
        },

        {
          type: 'select', label: '需求范围', name: 'demandIds', placeholder: '请选择需求范围', multiple: true, select: [],
          rules: { required: true, message: '请选择需求范围', trigger: 'blur' },
        },
        { name: 'submit', type: 'slot', labelWidth: '0px' },
      ],
      tableColumn: [
        { label: '更新人', prop: 'modifiedBy', width: '100px', showOverflowTooltip: true },
        { label: '需求领域', prop: 'demandDomain', width: '100px', showOverflowTooltip: true, slot: true },
        { label: '需求类型', prop: 'demandType', width: '100px', showOverflowTooltip: true, slot: true },
        { label: '上线版本', prop: 'onlineVersion', width: '130px', showOverflowTooltip: true },
        { label: '版本负责人', prop: 'headName', width: '100px', showOverflowTooltip: true },
        { label: '开始日期', prop: 'startDate', width: '150px', showOverflowTooltip: true },
        { label: '结束日期', prop: 'endDate' },
        { label: '操作', prop: 'operation', width: '210px', slot: true, fixed: 'right', }
      ],
      tableData: [],
      add_visible: false,
      isBtnLoading: false,
      editType: 'save',
    })
    /****************************************** vue生命周期 **************************************************/
    onMounted(() => {
      getList()
    })

    /****************************************** 自定义click事件 **************************************************/
    // tabble刷新
    const onRefresh = async () => {
      state.isBtnLoading = true
      await getList()
      setTimeout(() => {
        state.isBtnLoading = false
      }, 500)
    }

    // 编辑
    const handleEdit = async (item: any) => {
      state.editType = 'edit'
      const objItem: any = JSON.parse(JSON.stringify(item))
      objItem.demandIds = objItem.demandIds.split(',')
      objItem.headId = `${objItem.headId}@@${objItem.headName}`
      state.queryData = objItem
      state.rowId = objItem.rowId
      onCreate()
    }

    // 删除
    const handleDel = async (item: any) => {
      const res = await Service.multifunction('delete', [item.rowId])
      if (res.success)
        ElMessage.success({
          message: '成功',
          type: 'success',
        })
      getList()
    }
    // 新增弹出
    const onCreate = () => {
      state.add_visible = true
      getDemandList()
      getUserList()
    }

    // 关闭弹出层时清空表单数据
    const handleClose = () => {
      state.queryData = { demandType: '', demandDomain: '', startDate: '', endDate: '', demandIds: [], headId: '', headName: '', onlineVersion: '' }
      formRef.value?.resetForm(state.queryData)
    }

    //保存数据
    const handleSubmit = () => {
      formRef.value?.validate(async (valid: any) => {
        if (valid) {
          let meothod = 'post'
          let sData: any = JSON.parse(JSON.stringify(state.queryData))
          sData.demandIds = state.queryData.demandIds.join(',')
          sData.headId = state.queryData.headId.split('@@')[0]
          sData.headName = state.queryData.headId.split('@@')[1]
          if (state.editType === 'edit') {
            meothod = 'put'
            sData.rowId = state.rowId
          } else {
            // let num: any = state.queryData
            // sData.orderNum = parseInt(num);
          }
          const res = await Service.multifunction(meothod, sData)
          if (res.success)
            ElMessage.success({
              message: '成功',
              type: 'success',
            })
          state.add_visible = false
          state.editType = 'save'
          getList()
        }
      })
    }

    /****************************************** 自定义方法 **************************************************/
    // 获取需求信息集合
    const getDemandList = async () => {
      const res = await Service.getDemandList()
      state.fromData[6].select = []
      res.result.map((item: any) => {
        let obj: any = { label: '', value: '' }
        obj.label = `${item.demandName}`
        obj.value = `${item.demandId}`
        state.fromData[6].select.push(obj)
      })
    }

    // 获取用户列表
    const getUserList = async () => {
      const res = await Service.getUserList()
      state.fromData[2].select = []
      res.result.map((item: any) => {
        let obj: any = { label: '', value: '' }
        obj.label = `${item.login_name}`
        obj.value = `${item.row_id}@@${item.login_name}`
        state.fromData[2].select.push(obj)
      })
    }

    // 获取弹出层类型数据
    const getList = async () => {
      comState.isLoading = true
      const res = await Service.getscheduleList(delField(comState.pagination))
      // debugger
      state.tableData = res.result.records
      comState.pagination.total = res.result.total
      setTimeout(() => {
        comState.isLoading = false
      }, 300)
    }
    const { comState, handleSizeChange, handleCurrentChange, delField } = hwTableMixins(getList)
    return {
      handleCurrentChange,
      handleSizeChange,
      handleEdit,
      handleDel,
      onCreate,
      onRefresh,
      formRef,
      handleSubmit,
      handleClose,
      ...toRefs(state),
      ...toRefs(comState)
    }
  },
})
</script>
<style lang="scss" scoped>
  .search {
    margin-top: 20px;
  }
  .col_table {
    padding: 0 20px;
    .col_btn {
      margin-bottom: 20px;
    }
  }
  .operation {
    width: 100%;
    text-align: center;
  }
</style>
