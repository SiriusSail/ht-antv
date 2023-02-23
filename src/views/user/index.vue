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
        <el-button type="success" icon="el-icon-refresh" size="small" :loading='isBtnLoading' @click="onRefresh">刷新</el-button>
      </div>
      <!-- 表格 -->
      <MyTable border :data="tableData" :column="tableColumn" is-pagination :isLoading="isLoading" empty-text='暂无数据' :pagination="pagination" @paginationChange="handleCurrentChange" @paginationSizeChange='handleSizeChange'>
        <template #gender='{data}'>
          <span>{{data.row.gender==1?'女':'男'}}</span>
        </template>
        <template #operation='{data}'>
          <div class="operation">
            <el-button type="primary" size="mini" @click="handleEdit(data.row)">分配角色</el-button>
          </div>
        </template>
      </MyTable>
    </div>

    <el-dialog v-model="add_visible" :title="editType==='save'?'新增用户':'分配角色' " @closed="handleClose">
      <MyForm ref="formRef" :form="queryData" status-icon :list="fromData" label-position="right" label-width="auto">
        <template #roleIds='{data}'>
          <el-transfer :titles="['全部角色', '已授权角色']" v-model="queryData[data.name]" :props="{key: 'row_id',label: 'role_name'}" :data="roleList">
          </el-transfer>
        </template>
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
import MyForm from '@/components/Form/index.vue'
import { ElMessage } from 'element-plus/lib/components/message'
import Icons from '@/components/icon.vue'

type StateType = {
  rowId: any
  queryData: {
    roleIds: []
  }
  querySearchData: {
    orderField: string
    order: string
    menuName: string
  }
  fromSearchData: any[]
  fromData: any[]
  tableData: any[]
  roleList: any[]
  tableColumn: Colum[]
  add_visible: Boolean
  isBtnLoading: Boolean
  editType: string
}

export default defineComponent({
  components: {
    MyTable,
    MyForm,
    Icons
  },

  setup () {
    /****************************************** 初始化数据 **************************************************/


    const formRef = ref<any>(null)
    const state = reactive<StateType>({
      rowId: '',
      querySearchData: { orderField: 'gmt_create', order: 'desc', menuName: '', },
      fromSearchData: [
        {
          type: 'text', label: '用户名称：', name: 'userCode', placeholder: '请输入用户名称', labelWidth: '90px',
          col: { span: 5 }
        },
        {
          type: 'select', label: '时间排序：', name: 'orderField', placeholder: '请选择', labelWidth: '90px',
          col: { span: 5 },
          select: [{ value: "gmt_create", label: "创建时间" }, { value: "gmt_modified", label: "更新时间" }],
        },
        {
          type: 'select', label: '排序方式：', name: 'order', placeholder: '请选择', labelWidth: '90px',
          col: { span: 5 },
          select: [{ value: "desc", label: "降序" }, { value: "asc", label: "升序" }],
        },
        { name: 'submit', type: 'slot', labelWidth: '10px', col: { span: 1 } },
      ],

      queryData: { roleIds: [] },

      fromData: [
        { type: 'slot', name: 'roleIds', labelWidth: '0px' },
        { name: 'submit', type: 'slot', labelWidth: '0px' },
      ],
      tableColumn: [
        { label: '工号', prop: 'loginId', minWidth: '80px', showOverflowTooltip: true },
        { label: '登录名', prop: 'loginName', minWidth: '80px', showOverflowTooltip: true },
        { label: '手机', prop: 'mobileNumber', minWidth: '100px', showOverflowTooltip: true },
        { label: '记录更新人', prop: 'modifiedBy', minWidth: '100px', showOverflowTooltip: true },
        { label: '电话', prop: 'telNumber', minWidth: '80px', showOverflowTooltip: true },
        { label: '部门名称', prop: 'departmentName', minWidth: '80px', showOverflowTooltip: true },
        { label: '邮箱', prop: 'email', minWidth: '80px', showOverflowTooltip: true },
        { label: '性别', prop: 'gender', minWidth: '80px', showOverflowTooltip: true, slot: true },
        { label: '姓名', prop: 'userCode', minWidth: '80px', showOverflowTooltip: true },
        { label: '用户标签', prop: 'userLabels', minWidth: '80px', showOverflowTooltip: true },
        { label: '记录创建人', prop: 'createBy', minWidth: '100px', showOverflowTooltip: true },
        { label: '更新时间', prop: 'gmtModified', minWidth: '150px', showOverflowTooltip: true },
        { label: '创建时间', prop: 'gmtCreate', minWidth: '150px', showOverflowTooltip: true },
        { label: '部门描述', prop: 'departmentDesc' },
        { label: '操作', prop: 'operation', width: '120px', slot: true, fixed: 'right', }
      ],
      tableData: [],
      roleList: [],
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

    // tabble查询
    const handleSerach = () => {
      let bData: any = JSON.parse(JSON.stringify(state.querySearchData))
      comState.pagination = { ...comState.pagination, ...bData }
      getList()
    }

    // 编辑
    const handleEdit = (item: any) => {
      getRoleList()
      const objItem = JSON.parse(JSON.stringify(item))
      state.rowId = objItem.rowId
      detailUser()
      state.editType = 'edit'
      state.add_visible = true
    }

    // 关闭弹出层时清空表单数据
    const handleClose = () => {
      state.queryData = {
        roleIds: []
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
            sData.rowId = state.rowId
          } else {

          }
          const res = await Service.multifunction(meothod, sData)
          if (res.success)
            ElMessage.success({
              message: '操作成功',
              type: 'success',
            })
          state.add_visible = false
          state.editType = 'save'
          getList()
        }
      })
    }

    /****************************************** 自定义方法 **************************************************/


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
    // 获取所有角色列表
    const getRoleList = async () => {
      const res = await Service.getRoleList()
      state.roleList = res.result
    }
    // 获取详情
    const detailUser = async () => {
      const res = await Service.detailUser(state.rowId)
      state.queryData = res.result
    }
    const { comState, handleSizeChange, handleCurrentChange, delField } = hwTableMixins(getList)
    return {
      handleCurrentChange,
      handleSizeChange,
      handleEdit,
      handleSerach,
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