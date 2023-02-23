<template>
  <div class="draggable-item" :cid='item.rowId' @click="handleItem()">
    <div class="title">【{{item.parentId?'任务':'需求'}}】{{ item.demandName }}</div>
    <div class="desc">创建人：{{ item.createBy }} </div>
    <div class="desc">更新人：{{ item.modifiedBy }}</div>
    <div class="footer">
      <div class="time">{{ item.gmtCreate }}</div>
      <div class="user-info">
        <!-- <span class="user-name"> {{ userName }} </span> -->
        <!-- <el-avatar :size="18" :src="userImg" /> -->

      </div>
    </div>

  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: {},
    },
    color: {
      type: String,
      default: "#fff1db",
    },
    types: {
      type: Number,
      default: "",
    },
  },
  setup (props, { emit }) {
    const state = reactive({
      ...props
    });
    const handleItem = () => {
      emit('eventItem', props)
    }
    return {
      handleItem,
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss">
  .draggable-item {
    position: relative;
    padding: 10px;
    border: 1px solid #e0eaf2;
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    // min-width: 188px;

    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 4px;
      background-color: v-bind(color);
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      line-height: 25px;
    }
    .desc {
      margin-top: 10px;
      font-size: 13px;
      line-height: 17px;
    }
    .footer {
      padding-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666666;
      font-size: 12px;
      color: #cccccc;
    }
    .user-info {
      display: flex;
      align-items: center;
    }
    .user-name {
      padding-right: 5px;
    }
    .btn {
      padding: 7px 10px;
    }
  }
</style>
