<template>
  <div class="MarketingMetrics">

    <div class="col_table">
      <div class="search">
        <MyForm ref="refSearch" :form="querySearchData" status-icon :list="fromSearchData" label-position="right" label-width="auto">
          <template #submit>
            <el-button type="primary" @click='handleSerach'>查询</el-button>
          </template>
        </MyForm>
      </div>
      <div class="col_btn">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="onCreate">新增</el-button>
        <el-button type="success" icon="el-icon-refresh" size="small" :loading='isBtnLoading' @click="onRefresh">刷新</el-button>
      </div>
      <!-- 表格 -->
      <MyTable border :data="tableData" :column="tableColumn" is-pagination :isLoading="isLoading" empty-text='暂无数据' :pagination="pagination" @paginationChange="handleCurrentChange" @paginationSizeChange='handleSizeChange'>
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
import { defineComponent, reactive, ref, toRefs, onMounted, provide } from 'vue'
import hwTableMixins from '@/mixins/hwTableMixins'
import MyTable, { Colum } from '@/components/table/index.vue'
import Service from './api/index'
import { positiveInteger } from '@/utils/validate'
import MyForm from '@/components/Form/index.vue'
import { ElMessage } from 'element-plus/lib/components/message'

type StateType = {
  sId: any
  queryData: {
    orderNum: string | number
    dictLabel: string | number
    dictType: string | number
    dictValue: string | number
    remark: string | number
    description: string | number
  }
  querySearchData: {
    dictLabel: string
    dictType: string
  }
  fromSearchData: any[]
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
    MyForm,
  },

  setup () {
    /****************************************** 初始化数据 **************************************************/


    const formRef = ref<any>(null)
    let selectList: any[] = []
    const state = reactive<StateType>({
      sId: '',
      querySearchData: { dictLabel: '', dictType: '' },
      fromSearchData: [
        { type: 'text', label: '标签：', name: 'dictLabel', placeholder: '请输入标签', col: { span: 6 } },
        {
          type: 'select', label: '类型', name: 'dictType', placeholder: '请选择类型', select: selectList, labelWidth: '60px', col: { span: 6 },
        },
        { name: 'submit', type: 'slot', labelWidth: '10px', col: { span: 1 } },
      ],

      queryData: { orderNum: '', dictLabel: '', dictType: '', dictValue: '', remark: '', description: '', },

      fromData: [
        {
          type: 'number', label: '排序', name: 'orderNum', placeholder: '请输入数字',
          col: { span: 11 },
          rules: [{ trigger: 'blur', validator: positiveInteger }],
        },
        {
          type: 'text', label: '标签', name: 'dictLabel', placeholder: '请输入标签', labelWidth: '60px',
          col: { span: 13 },
          rules: { required: true, message: '请输入标签', trigger: 'blur', },
        },
        {
          type: 'text', label: '键值', name: 'dictValue', placeholder: '请输入键值',
          col: { span: 11, },
          rules: { required: true, message: '请输入键值', trigger: 'blur' },
        },
        {
          type: 'text', label: '类型', name: 'dictType', placeholder: '请输入编码', labelWidth: '60px',
          col: { span: 13 },
          rules: { required: true, message: '请输入编码', trigger: 'blur' },
        },
        {
          type: 'text', label: '类型描述', name: 'description', placeholder: '请输入类型描述',
          rules: { required: true, message: '请输入类型描述', trigger: 'blur' },
        },
        { type: 'textarea', label: '备注', name: 'remark', placeholder: '写个备注记录下呗' },
        { name: 'submit', type: 'slot', labelWidth: '0px' },
      ],
      tableColumn: [
        { label: '排序', prop: 'orderNum', width: '60px', showOverflowTooltip: true },
        { label: '创建人', prop: 'createBy', width: '100px', showOverflowTooltip: true },
        { label: '标签', prop: 'dictLabel', width: '100px', showOverflowTooltip: true },
        { label: '类型', prop: 'dictType', width: '100px', showOverflowTooltip: true },
        { label: '键值', prop: 'dictValue', width: '130px', showOverflowTooltip: true },
        { label: '更新人', prop: 'modifiedBy', width: '100px', showOverflowTooltip: true },
        { label: '更新时间', prop: 'gmtModified', width: '150px', showOverflowTooltip: true },
        { label: '创建时间', prop: 'gmtCreate', width: '150px', showOverflowTooltip: true },
        { label: '类型描述', prop: 'description', width: '200px', showOverflowTooltip: true },
        { label: '备注', prop: 'remark' },
        { label: '操作', prop: 'operation', width: '210px', slot: true, fixed: 'right', }
      ],
      tableData: [],
      add_visible: false,
      isBtnLoading: false,
      editType: 'save',
    })
    /****************************************** vue生命周期 **************************************************/
    onMounted(() => {
      getSysdictList()
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

    // tabble查询
    const handleSerach = () => {
      let bData: any = JSON.parse(JSON.stringify(state.querySearchData))
      bData.description = state.querySearchData.dictType.split('@&@')[0]
      bData.dictType = state.querySearchData.dictType.split('@&@')[1]
      comState.pagination = { ...comState.pagination, ...bData }
      getList()
    }

    // 编辑
    const handleEdit = (item: any) => {
      state.editType = 'edit'
      const objItem = JSON.parse(JSON.stringify(item))
      const { orderNum, dictLabel, dictType, dictValue, remark, rowId, description } = objItem
      state.queryData.orderNum = orderNum
      state.queryData.dictLabel = dictLabel
      state.queryData.dictType = dictType
      state.queryData.dictValue = dictValue
      state.queryData.remark = remark
      state.queryData.description = description
      state.sId = rowId
      state.add_visible = true
    }

    // 删除
    const handleDel = async (item: any) => {
      const res = await Service.multifunction('delete', [item.rowId])
      if (res.success)
        ElMessage.success({
          message: '成功',
          type: 'success',
        })
      getSysdictList()
      getList()
    }
    // 新增弹出
    const onCreate = () => {
      state.editType = 'save'
      state.add_visible = true
    }

    // 关闭弹出层时清空表单数据
    const handleClose = () => {
      state.queryData = {
        orderNum: '',
        dictLabel: '',
        dictType: '',
        dictValue: '',
        remark: '',
        description: '',
      }
      formRef.value?.resetForm(state.queryData)
    }

    //保存数据
    const handleSubmit = () => {
      formRef.value?.validate(async (valid: any) => {
        if (valid) {
          let meothod = 'post'
          let sData: any = state.queryData
          if (state.editType === 'edit') {
            meothod = 'put'
            sData.rowId = state.sId
          } else {
            let num: any = state.queryData.orderNum
            sData.orderNum = parseInt(num);
          }
          const res = await Service.multifunction(meothod, sData)
          if (res.success)
            ElMessage.success({
              message: '成功',
              type: 'success',
            })
          state.add_visible = false
          getList()
          getSysdictList()
        }
      })
    }

    /****************************************** 自定义方法 **************************************************/

    // 获取弹出层类型数据
    const getSysdictList = async () => {
      const res = await Service.getSysdictList()
      selectList = []
      res.result.map((item: any) => {
        let obj: any = { label: '', value: '' }
        obj.label = `${item.label},${item.value}`
        obj.value = `${item.label}@&@${item.value}`
        selectList.push(obj)
      })

      state.fromSearchData[1].select = selectList
    }



    // 获取弹出层类型数据
    const getList = async () => {
      comState.isLoading = true
      const res = await Service.getList(delField(comState.pagination))
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
      handleSerach,
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
