<template>
  <div class="MyMission">
    <!-- 搜索框 -->
    <div class="myMission-header">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-select
            v-model="form.value1"
            filterable
            placeholder="全部"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="form.value2"
            filterable
            placeholder="全部"
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="form.value3" placeholder="搜索或过滤结果">
            <template #prefix>
              <i class="el-input__icon el-icon-search" />
            </template>
          </el-input>
        </el-col>
        <el-col :span="4" />
        <el-col :span="3">
          <el-dropdown>
            <span class="el-dropdown-link">
              默认排序<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :span="3">
          <el-dropdown>
            <span class="el-dropdown-link">
              导入导出<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown></el-col>
      </el-row>
    </div>
    <div class="MyMission-body">
      <el-row :gutter="20">
        <el-col
          v-for="(pitem, pindex) in mission_list"
          :key="pindex"
          :span="4"
        >
          <DraggableList
            :color="pitem.color"
            label="待开始"
            num="6"
          >
            <div
              :ref="getRef"
              :key="pindex"
              :index="pindex"
              class="list"
            >
              <DraggableItem
                v-for="item in pitem.children"
                :id="item.id"
                :key="item.id"
                class="item"
                :title="item.title"
                :desc="item.desc"
                :time="item.time"
                :user-img="item.userImg"
                :user-name="item.userName"
                :color="pitem.color2"
              />
            </div>
          </DraggableList>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from "vue";

import Sortable from "sortablejs";
import DraggableList from "./component/draggable-list.vue";
import DraggableItem from "./component/draggable-item.vue";

// interface DraggableItem {
//   firstName: string;
//   lastName: string;
//   sayHi: () => string;
// }

type StateType = {
  id?: number;
  label: string;
  icon: string;
  num: string;
  color: string;
  color2: string;
  children: {
    id: number;
    title: string;
    desc: string;
    time: string;
    userImg: string;
    userName: string;
  }[];
};
// 设置1
type Options1 = {
  value: string;
  label: string;
};
type Form = {
  value1: "";
  value2: "";
  value3: "";
  value4: "";
};
export default defineComponent({
  components: { DraggableList, DraggableItem },

  setup() {
    const state = reactive<{
      options1: Options1[];
      mission_list: StateType[];
      form: Form;
    }>({
      options1: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      form: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
      }, // 表单
      mission_list: [
        {
          label: "待开始",
          icon: "",
          num: "6",
          color: "#FFF1DB",
          color2: "#FFBA48",
          children: [
            {
              id: 1,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 2,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 3,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
          ],
        },
        {
          label: "待开始",
          icon: "",
          color: "#E0EDFF",
          color2: "#C5DEFF",
          num: "6",
          children: [
            {
              id: 4,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 5,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 6,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
          ],
        },
        {
          label: "待开始",
          icon: "",
          color: "#E5EAF0",
          color2: "#DADFE6",
          num: "6",
          children: [
            {
              id: 11,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 12,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 13,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
          ],
        },
        {
          label: "待开始",
          icon: "",
          color: "#D1F8E8",
          color2: "#DADFE6",
          num: "6",
          children: [
            {
              id: 14,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 15,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 16,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
          ],
        },
        {
          label: "待开始",
          icon: "",
          color: "#FFE8E3",
          color2: "#5FE1A9",
          num: "6",
          children: [
            {
              id: 17,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 18,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 19,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
          ],
        },
        {
          label: "待开始",
          icon: "",
          color: "#FFF8E3",
          color2: "#C5DEFF",
          num: "6",
          children: [
            {
              id: 20,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 21,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
            {
              id: 22,
              title: "[待定需求]保存多个城市的天气情况",
              desc: "#I 16OUU [用户故事]",
              time: "2020-09-30",
              userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
              userName: " 张小",
            },
          ],
        },
      ],
    });
    // dom列表
    const domeList = ref<HTMLElement[]>([]);

    const getRef = (e: any) => {
      domeList.value.push(e);
    };

    onMounted(() => {
      domeList.value.forEach((ele) => {
        const s = new Sortable(ele, {
          group: "shared",
          sort: false,
          animation: 150,
          onEnd(evt) {
            const fromIndex = parseInt(evt.from.getAttribute("index")!, 10);
            const toIndex = parseInt(evt.to.getAttribute("index")!, 10);
            const { oldIndex, newIndex } = evt;
            console.log("dom更新");
            // 截取的DOM
            const fromItem = state.mission_list[fromIndex].children.splice(
              oldIndex!,
              1
            );
            console.log("数据", fromItem);
            const toItem = state.mission_list[toIndex].children.splice(
              newIndex!,
              0,
              fromItem[0]
            );

            console.log("from", fromIndex);
            console.log("to", toIndex);
            console.log("旧的下标", evt.oldIndex);
            console.log("新的下标", evt.newIndex);
            console.log("end", evt);
            // console.log(state.mission_list);
          },
          onChange(evt) {
            // console.log(evt);
          },
        });
      });
    });

    return {
      getRef,
      ...toRefs(state),
    };
  },
});
</script>
<style scoped lang="scss">
.MyMission {
  padding: 30px;
  .list {
    min-height: 400px;
  }
  .el-input__icon {
    color: #20a0ff;
    font-size: 20px;
  }
  .container {
    display: flex;
  }
  .MyMission-body {
    margin-top: 30px;
  }
  .item {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
}
</style>
