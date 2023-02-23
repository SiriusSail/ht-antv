<template>
  <el-form ref="eleForm" class="demand_rorm" :model="detailData" :rules="rules">

    <el-table :data="tableData" style="width: 100%" v-loading="isLoading">
      <el-table-column align="center" headerAlign="center">
        <template #header>
          <el-form-item prop="demandName">
            <el-input size="mini" v-model="detailData.demandName" :disabled='detailData.reviewState==100?true:false' placeholder="需求名称：安全率指标需求" />
          </el-form-item>
        </template>
        <el-table-column prop="serialNumber" label="序号" width="50" align="center" headerAlign="center">
          <template #default="scope">
            <span>{{scope.row.serialNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="checkContent" label="检查内容" show-overflow-tooltip width="80" align="center" headerAlign="center">
          <template #default="scope">
            <span>{{scope.row.checkContent}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="checkExplain" label="检查说明" show-overflow-tooltip width="80" align="center" headerAlign="center">
          <template #default="scope">
            <span>{{scope.row.checkExplain}}</span>
          </template>
        </el-table-column>
        <el-table-column label="自查信息" align="center" headerAlign="center">
          <el-table-column prop="isMust" label="必填项" width="80" align="center" headerAlign="center" :filters="filters" :filter-method="filterMethod" filter-placement="bottom-start" column-key="isMust" :filter-multiple='false'>
            <template #default="scope">
              <span>{{scope.row.isMust}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="selfCheckContent" label="自查结论" align="center" headerAlign="center">
            <template #default="scope">
              <el-form-item prop="selfCheckContent">
                <el-input size="mini" type="textarea" v-model="scope.row.selfCheckContent" :disabled='detailData.reviewState==100?true:false' placeholder="申请人填写内容" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="fileUrl" width="100px" align="center" headerAlign="center" show-overflow-tooltip>
            <template #header>
              <el-tooltip content="举证材料(导入时不能上传附件、图片，如需上传，请编辑需求申请进行上传附件)" placement="top">
                <div class="long_title">
                  <span>举证材料(导入时不能上传附件、图片，如需上传，请编辑需求申请进行上传附件)</span>
                </div>
              </el-tooltip>
            </template>
            <template #default="scope">
              <el-upload class="upload-demo" :action="urls" multiple :on-success='(data, file, filelsit)=> onSuccess(data, file, filelsit,scope.row)'>
                <el-button size="mini" type="primary" :disabled='detailData.reviewState==100?true:false'>上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column prop="selfCheckDomain" width="80px" label="所属领域" align="center" headerAlign="center">
            <template #default="scope">
              <span>{{scope.row.selfCheckDomain}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <template v-if="type==='edit'">
          <el-table-column prop="rectificatExplain" label="整改事项描述" align="center" headerAlign="center">
            <template #default="scope">
              <el-form-item prop="rectificatExplain">
                <el-input size="mini" type="textarea" v-model="scope.row.rectificatExplain" :disabled='detailData.reviewState==100?true:false' placeholder="审核人填写内容" @input="(data)=>inputChange(data,scope.row)" />
              </el-form-item>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
    <div class="demand_fotter">
      <el-button size='small' type="primary" :disabled='detailData.reviewState==100?true:false' @click="handleSubmit">保存</el-button>
    </div>
  </el-form>

</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { ElMessage } from 'element-plus/lib/components/message'
import { debounces } from '@/utils/func'
import { ElForm } from "element-plus";
export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['eventSubmit', 'reightData'],
  setup (props, { emit }) {
    const eleForm = ref<InstanceType<typeof ElForm>>();
    const { isLoading } = toRefs(props)
    const state = reactive({
      detailData: {},
      reightData: [],
      type: 'save',
      filters: [
        { text: '必填', value: '必填' }
      ],
      rules: {
        demandName: [
          {
            required: true,
            message: '请输入需求名称',
            trigger: 'blur',
          },
        ],
        // selfCheckContent: [
        //   {
        //     required: true,
        //     message: '请输入自查结论',
        //     trigger: 'blur',
        //   },
        // ],
        // rectificatExplain: [
        //   {
        //     required: true,
        //     message: '请输入整改描述',
        //     trigger: 'blur',
        //   },
        // ],
      },
      tableData: [],
      urls: `${import.meta.env.VITE_APP_BASE_URL}/ddm-iic/dem/demand/importExcel`
    });
    const handleSubmit = async () => {
      eleForm.value.validate((valid) => {
        if (valid) {
          let isExp: boolean = true
          for (let index = 0; index < state.tableData.length; index++) {
            let must: any = ''
            let selfCheckContent: any = ''
            let rectificatExplain: any = ''
            const items = state.tableData[index]
            if (items.hasOwnProperty('isMust')) {
              must = items['isMust'];
            }
            if (items.hasOwnProperty('selfCheckContent')) {
              selfCheckContent = items['selfCheckContent'];
            }
            if (items.hasOwnProperty('rectificatExplain')) {
              rectificatExplain = items['rectificatExplain'];
            }
            if (must === '必填' && state.type === 'save' && !selfCheckContent) {
              isExp = false
              break
            }
            if (must === '必填' && state.type === 'edit' && !selfCheckContent && !rectificatExplain) {
              isExp = false
              break
            }
          }
          if (isExp) {
            emit('eventSubmit', { ...state })
          } else {
            ElMessage({
              message: '请完善所有必填项',
              type: 'warning',
              customClass: 'msgZindex'
            })
          }
        } else {
          ElMessage({
            message: '请完善所有必填项',
            type: 'warning',
            customClass: 'msgZindex'
          })
        }
      })

    }
    const update = (data: any, detailData?: any, type?: string) => {
      state.tableData = data
      if (detailData) state.detailData = detailData
      if (type) state.type = type
    }

    const filterMethod = (value: any, row: any) => {
      if (value === '全部') return true
      return row['isMust'] === value
    }

    const onSuccess = (data: any, file: any, filelsit: any, row: any) => {
      row['fileUrl'] = file.name
      ElMessage({
        message: '上传成功',
        type: 'success',
      })
    }
    const inputChange = debounces((data: any, row: any) => {
      const ret = state.reightData.findIndex((v) => {
        return v.id == row.id;
      });
      if (ret === -1) {
        state.reightData = [...state.reightData, row]
      }
      emit('reightData', state.reightData)
    }, 500);


    return {
      handleSubmit,
      filterMethod,
      update,
      onSuccess,
      inputChange,
      isLoading,
      eleForm,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss">
  .demand_rorm {
    .demand_fotter {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }

    .long_title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>
