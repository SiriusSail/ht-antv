<template>
  <div class="page-container">
    <div class="account-avatar">
      <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <div class="account-coment">
        <div>登录账号：{{userInfo.loginName}}</div>
        <div>账号ID：{{userInfo.loginId}}</div>
        <div class="account-coment_bottom">
          <span>部门：{{userInfo.departmentName}}</span>
          <!-- <i class="el-icon-set-up"></i> -->
        </div>
      </div>
    </div>
    <div class="drop_col">
      <div class="drop_col__user">
        <i class="el-icon-user"></i>
        <span>我的画像</span>
      </div>
      <!-- <el-dropdown>
        <span>请选择</span>
        <i class="el-icon-arrow-right"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </div>
    <div class="col_label">
      <div class="item" v-for="item in labelList">
        <el-tag> {{item}}</el-tag>
      </div>
    </div>
    <div class="drop_col">
      <div class="drop_col__user">
        <i class="el-icon-user"></i>
        <span>我的贡献值</span>
      </div>
      <!-- <el-dropdown>
        <span>请选择</span>
        <i class="el-icon-arrow-right"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </div>
    <div class="contribute">

      <div class="contribute_item">
        <div>贡献值</div>
        <div>0</div>
      </div>
      <div class="contribute_item">
        <div>开发赋能</div>
        <div>0</div>
      </div>
      <div class="contribute_item">
        <div>知识赋能</div>
        <div>0</div>
      </div>
      <div class="contribute_item">
        <div>推荐赋能</div>
        <div>0</div>
      </div>
    </div>

    <div class="drop_col">
      <div class="drop_col__user">
        <i class="el-icon-user"></i>
        <span>成长值</span>
      </div>
    </div>
    敬请期待...
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import Service from './api/index'
import { useStore } from '@/store/index'

interface stateType {
  userInfo: {}
  labelList: any[]
  allLabelList: any[]
}
export default defineComponent({
  name: 'PersonalCenter',
  components: {},
  setup () {
    //http://10.64.64.2:8080/ddm-iic/logout/cas
    // console.log(import.meta.env.VITE_APP_BASE_URL)
    const store = useStore()
    const state = reactive<stateType>({
      userInfo: {},
      labelList: [],
      allLabelList: [],
    })
    /**
     * @description 获取角色
     */
    const getUserInfo = async () => {
      const res = await Service.postSetBasicInfo(store.state.userModule.user.id)
      state.userInfo = res.result
      state.labelList = res.result.userLabels.split(',')
    }
    /**
    * @description 获取全部标签
    */
    const getLabelList = async () => {
      const res = await Service.labelList(store.state.userModule.user.id)
      state.allLabelList = res.result
    }

    onMounted(() => {
      getUserInfo()
      getLabelList()
    })
    return {
      ...toRefs(state),
    }
  },
})
</script>
<style lang="scss" scoped>
  .page-container {
    padding: 20px;

    .account-avatar {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        width: 105px;
        height: 105px;
        border-radius: 50%;
      }

      .account-coment {
        width: 100%;
        margin-left: 20px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        line-height: 28px;

        .account-coment_bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .col_label {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        margin-left: 10px;
        margin-top: 10px;
      }
    }

    .drop_col {
      width: 100%;
      padding: 10px 20px;
      background: #f8f8f8;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50px;
    }

    .contribute {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #c0ccda;
      border-bottom: 1px solid #c0ccda;
      border-right: 1px solid #c0ccda;

      .contribute_item {
        width: 25%;
        padding: 35px 0;
        line-height: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #c0ccda;
      }
    }
  }
</style>
