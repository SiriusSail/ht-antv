<template>
  <div class="dashboard">
    <!-- 图表 -->
    <div class="chart_gourp">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card class="box-card">
            <div class="chart_box_head">
              <div class="box_head_title">
                <span @click="href('/demandManage/kanban')">我的任务</span>
              </div>
              <div class="operate" @click="href('/demandManage/kanban?add=1')">
                新建任务
              </div>
            </div>
            <div class="chart_box_body">
              <div class="body_left">
                <div class="bodyInfo">
                  <div class="num_label">
                    任务总数
                    <span class="index_num">{{ count.taskTotal }}</span>
                  </div>
                </div>
                <MyChart
                  v-if="Object.keys(myTaskOptions.dows).length > 0"
                  :option="myTaskOptions.dows"
                />
              </div>
              <div class="body_right">
                <div class="progress">
                  <p class="pending">
                    待进行
                    <span>{{ count.pending }}</span>
                  </p>
                  <p class="handing">
                    进行中
                    <span>{{ count.haveInHand }}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card">
            <div class="chart_box_head">
              <div class="box_head_title">
                <span @click="href('/myhelp')">我的求助</span>
              </div>
              <div class="operate" @click="href('/mySeekHelp')">发起求助</div>
            </div>

            <div class="chart_box_body">
              <div class="body_left">
                <div class="bodyInfo">
                  <div class="num_label">
                    已邀请
                    <span class="index_num">{{ helpTotal }}</span>
                  </div>
                </div>
                <MyChart v-if="chartData.xData.length > 0" :option="options" />
              </div>
              <div class="body_right">
                <div class="progress">
                  <!-- <p class="pending">
                    待进行
                    <span>90</span>
                  </p> -->
                  <p class="handing">
                    待完成
                    <span>{{ finishedTotal }}</span>
                  </p>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card chart3">
            <div class="chart_box_head">
              <div class="box_head_title">
                <span @click="href('/empowerment')">我的赋能</span>
              </div>
              <div class="operate disable" @click="handleTip">点亮赋能</div>
            </div>
            <div class="chart_box_body">
              <div class="body_left">
                <div class="bodyInfo">
                  <div class="num_label">
                    当前排名
                    <span class="index_num">0</span>
                    <i class="icon-rise iconfont" />
                    <i class="icon-decline iconfont" />
                  </div>
                  <div class="num_label">
                    奉献值
                    <span class="index_num">0</span>
                  </div>
                  <div class="empowerment">
                    <p>开发赋能：0</p>
                    <p>知识赋能：0</p>
                    <p>推荐赋能：0</p>
                  </div>
                </div>

                <MyChart :option="options3" />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card chart4">
            <div class="chart_box_head">
              <div class="box_head_title"><span> 我的画像</span></div>
            </div>
            <div class="chart_box_body">
              <div class="body_left">
                <MyChart :option="options4" />
              </div>
              <div class="body_left">
                <MyChart
                  v-if="Object.keys(profileOptions).length > 0"
                  :option="profileOptions"
                />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 搜索指标 -->
    <div class="search_con always-shadow">
      <el-row :gutter="20">
        <el-col :span="18">
          <!-- 搜索header-->
          <div class="search_box">
            <div class="search_hd">
              <p class="search_date">数据期间：2021年9月28日</p>
              <Search
                class="searchInput"
                v-model="key"
                @search="indexsearch"
              ></Search>
            </div>
            <!-- 搜索body -->

            <div class="search_body">
              <div
                v-for="(item, index) in flowList"
                :key="index"
                class="item_box"
              >
                <div class="item always-shadow">
                  <div
                    class="item_hd"
                    :style="{ backgroundImage: `url(${item.bgImage})` }"
                  >
                    <div class="name">{{ item.dimension }}</div>
                  </div>
                  <div class="item_bd">
                    <div class="Index_online">
                      指标在线
                      <span class="index_num">{{ item.totalOnline }}</span>
                    </div>
                    <div class="norm_con">
                      <div class="right">
                        <MyChart class="chart2" :option="item.options1" />
                      </div>
                      <div class="hr" />
                      <div class="left">
                        <MyChart class="chart2" :option="item.options2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 创建指标 -->
        <el-col :span="6">
          <div class="create_box">
            <div class="create_header">
              <el-button type="primary" class="create_btn" @click="flowChart">
                创建指标</el-button
              >
              <div class="statistics">
                <div class="tips_con">
                  <div class="tips_help" @click="handleTip">
                    <i class="icon-online-help iconfont" />
                    <span>在线帮助中心</span>
                  </div>
                  <div class="tips_help" @click="href('/mySeekHelp')">
                    <i class="icon-invite iconfont" />
                    <span>邀请帮助</span>
                  </div>
                </div>
                <div class="li">
                  <div class="label">
                    <i class="icon-index iconfont" />
                    <span class="label_content">指标在线</span>
                  </div>
                  <div class="num">{{ thousands(0) }}</div>
                  <div class="unit">人</div>
                </div>
                <div class="li">
                  <div class="label">
                    <i class="icon-version iconfont" />
                    <span class="label_content">累计版本</span>
                  </div>
                  <div class="num">{{ thousands(0) }}</div>
                  <div class="unit">人</div>
                </div>
                <div class="li">
                  <div class="label">
                    <i class="icon-participant iconfont" />
                    <span class="label_content">参与贡献</span>
                  </div>
                  <div class="num">{{ thousands(0) }}</div>
                  <div class="unit">人</div>
                </div>
                <div class="li">
                  <div class="label">
                    <i class="icon-mutual iconfont" />
                    <span class="label_content">知识互助</span>
                  </div>
                  <div class="num">{{ thousands(0) }}</div>
                  <div class="unit">人</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 贡献 -->
    <div class="contribution">
      <el-row :gutter="50">
        <el-col :span="16">
          <div class="contribution_graph always-shadow" @click="goOverview">
            <PromptBoard />
            <div id="x6Container" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="contribution_ranking">
            <div class="always-shadow ranking_tabs">
              <div class="ranking_title" @click="href('/empowerment')">
                贡献TOP5
              </div>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="11月榜" name="1">
                  <div class="ranking_con">
                    <div class="ranking_list">
                      <div
                        v-for="(item, index) in ranking_list"
                        :key="index"
                        class="item"
                      >
                        <img v-if="index < 3" :src="ranking_img[index]" alt />
                        <span v-else>{{ index + 1 }}</span>
                        <span class="label">{{ item.label }}</span>
                        <span class="num">0</span>
                      </div>
                    </div>
                    <div class="hr" />
                    <div class="ranking_list">
                      <div
                        v-for="(item, index) in ranking_list"
                        :key="index"
                        class="item"
                      >
                        <img v-if="index < 3" :src="ranking_img[index]" alt />
                        <span v-else>{{ index + 1 }}</span>
                        <span class="label"></span>
                        <span class="num"></span>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="总榜" name="2">
                  <div class="ranking_con">
                    <div class="ranking_list">
                      <div
                        v-for="(item, index) in ranking_list"
                        :key="index"
                        class="item"
                      >
                        <img v-if="index < 3" :src="ranking_img[index]" alt />
                        <span v-else>{{ index + 1 }}</span>
                        <span class="label">{{ item.label }}</span>
                        <span class="num">0</span>
                      </div>
                    </div>
                    <div class="hr" />
                    <div class="ranking_list">
                      <div
                        v-for="(item, index) in ranking_list"
                        :key="index"
                        class="item"
                      >
                        <img v-if="index < 3" :src="ranking_img[index]" alt />
                        <span v-else>{{ index + 1 }}</span>
                        <span class="label"></span>
                        <span class="num"></span>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <!-- 矩形图 -->
          <div class="rectangle_box">
            <MyChart class="chart3" :option="options6" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
  onDeactivated,
} from "vue";

import * as echarts from "echarts";
import { useRouter } from "vue-router";
import MyChart from "@/components/Echart/index.vue";
import json from "./api/dome";
import numberone from "@/assets/images/numberone.svg";
import numbertwo from "@/assets/images/numbertwo.svg";
import numberthree from "@/assets/images/numberthree.svg";
import bg1 from "@/assets/images/bg-1.png";
import bg2 from "@/assets/images/bg-2.png";
import bg3 from "@/assets/images/bg-3.png";
import bg4 from "@/assets/images/bg-4.png";
import bg5 from "@/assets/images/bg-5.png";
import PromptBoard from "@/components/FlowChart/PromptBoard.vue";
import FlowChart from "@/components/FlowChart";
import { getedge, getVueCard } from "@/components/FlowChart/x6Component";
import Search from "@/components/Search/Search-input.vue";

import {
  ApiPortraitProfile,
  ApiTargetFlow,
  ApiTargetfield,
  ApiForMyHelp,
  ApiMyTask,
  FlowItem,
  NodeItem,
  RelationsItem,
} from "./api/index";
import * as Element from "element-plus";
import { AnyARecord } from "dns";
const { ElMessage } = Element;

const flowDynamicData: { nodes: any; edges: any } = {
  nodes: [],
  edges: [],
};
// 指标的坐标
const coordinate = [
  { x: 300, y: 40 },
  { x: 540, y: 240 },
  { x: 300, y: 450 },
  { x: 60, y: 240 },
];
// 数据
// const flowDefaultData = {
//   // 节点
//   nodes: [
//     getVueCard({
//       id: "node1",
//       x: 300, // Number，必选，节点位置的 x 值
//       y: 40, // Number，必选，节点位置的 y 值
//       data: {
//         title: "产品指标",
//         count: 500,
//         atomic: 400,
//         composite: 300,
//         derivative: 200,
//         state: 1,
//       },
//     }),
//     getVueCard({
//       id: "node2",
//       x: 540, // Number，必选，节点位置的 x 值
//       y: 240, // Number，必选，节点位置的 y 值
//       data: {
//         title: "产品指标",
//         count: 800,
//         atomic: 600,
//         composite: 100,
//         derivative: 100,
//         state: 1,
//       },
//     }),

//     getVueCard({
//       id: "node3",
//       x: 300, // Number，必选，节点位置的 x 值
//       y: 450, // Number，必选，节点位置的 y 值
//       data: {
//         title: "产品指标",
//         count: 800,
//         atomic: 600,
//         composite: 100,
//         derivative: 100,
//         state: 1,
//       },
//     }),
//     getVueCard({
//       id: "node4",
//       x: 60, // Number，必选，节点位置的 x 值
//       y: 240, // Number，必选，节点位置的 y 值
//       data: {
//         title: "产品指标",
//         count: 800,
//         atomic: 600,
//         composite: 100,
//         derivative: 100,
//         state: 1,
//       },
//     }),
//     getVueCard({
//       id: "node5",
//       x: 700, // Number，必选，节点位置的 x 值
//       y: 450, // Number，必选，节点位置的 y 值
//       data: {
//         title: "产品指标",
//         count: 800,
//         atomic: 600,
//         composite: 100,
//         derivative: 100,
//         state: 1,
//       },
//     }),
//   ],
//   // 边
//   edges: [
//     getedge({
//       source: "node2", // String，必须，起始节点 id
//       target: "node1", // String，必须，目标节点 id
//       label: "贡献度\n1000",
//       index: 1,
//     }),
//     getedge({
//       source: "node2", // String，必须，起始节点 id
//       target: "node3", // String，必须，目标节点 id
//       label: "贡献度\n2000",
//       index: 1,
//       // vertices: [{ y: 250, x: 300 }],
//     }),
//     getedge({
//       source: "node4", // String，必须，起始节点 id
//       target: "node3", // String，必须，目标节点 id
//       label: "贡献度\n3000",
//       // vertices: [{ y: 250, x: 300 }],
//     }),
//     getedge({
//       source: "node4", // String，必须，起始节点 id
//       target: "node1", // String，必须，目标节点 id
//       label: "贡献度\n4000",
//       // vertices: [{ y: 250, x: 300 }],
//     }),
//     getedge({
//       source: "node1", // String，必须，起始节点 id
//       target: "node3", // String，必须，目标节点 id
//       label: " 贡献度\n5000",
//       // vertices: [{ y: 250, x: 300 }],
//     }),
//     getedge({
//       source: "node3", // String，必须，起始节点 id
//       target: "node1", // String，必须，目标节点 id
//       label: "贡献度\n6000",
//       // vertices: [{ y: 250, x: 300 }],
//     }),
//   ],
// };

export default defineComponent({
  components: { MyChart, PromptBoard, Search },
  setup() {
    const router = useRouter();
    const flowChart = () => {
      router.push("/flowchart/index");
    };
    const flowList: FlowItem[] = reactive([]);
    const state = reactive({
      ranking_img: [numberone, numbertwo, numberthree],
      list: [{}, {}, {}, {}, {}],
      activeName: "1",
      ranking_list: [
        { label: "营销" },
        { label: "产品" },
        { label: "质量" },
        { label: "研发" },
        { label: "财务" },
        { label: "制造" },
      ],
      key: "",
      card_list: [
        { name: "IPD", bgImage: bg1, index_num: 100 },
        { name: "SRM", bgImage: bg2, index_num: 100 },
        { name: "STE", bgImage: bg3, index_num: 100 },
        { name: "OTD", bgImage: bg4, index_num: 100 },
        { name: "PMS", bgImage: bg5, index_num: 100 },
      ],
    });

    const thousands = (num: number) => {
      const str = num.toString();
      const reg =
        str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
      return str.replace(reg, "$1,");
    };
    // 折线图
    const options = ref({
      grid: {
        left: 0,
        right: 0,
        top: "15%",
        bottom: 0,
        containLabel: true,
      },
      tooltip: {},
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: { type: "value" },
      series: [
        {
          itemStyle: {
            color: "rgba(91,143,249)",
            borderColor: "#fff",
            borderWidth: 1,
            //   borderWidth: 4
          },
          symbol: "circle", // 实心
          symbolSize: 6,
          lineStyle: {
            color: "rgba(91,143,249)",
          },
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    });
    // 仪表盘
    const options1 = ref({
      series: [
        {
          center: ["50%", "70%"],
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,

          splitNumber: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#B0D0FF",
              },
              {
                offset: 1,
                color: "#5B8FF9",
              },
            ]),

            shadowColor: "rgba(0,138,255,0.45)",
          },

          detail: {
            fontSize: 12,
            offsetCenter: [0, "0"],
            show: true,
            formatter(value: any) {
              return `${value}%`;
            },
          },
          pointer: {
            show: false, // 是否显示指针
          },
          axisLabel: false,
          progress: {
            show: true,
            roundCap: true,
            width: 5, // 进度宽
            itemStyle: {},
          },
          axisLine: {
            lineStyle: {
              width: 5, // 仪表盘修改宽度的属性
            },
          },
          axisTick: false, // 是否显示刻度
          splitLine: {
            show: false, // 是否显示分隔线。
          },
          data: [
            {
              value: 50,
            },
          ],
        },
      ],
    });
    // 圆形图
    const options2 = ref({
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          // tooltip: {
          //   formatter: "{d}%",
          // },
          label: {
            // 饼图图形上的文本标签
            show: true,
            position: "inner", // 标签的位置
            color: "#fff",
            textStyle: {
              fontSize: 5, // 文字的字体大小
            },
            formatter: "{d}%",
          },

          emphasis: {
            // 选择的样式
            label: {
              show: true,
              color: "#fff",
              fontSize: 7,
              fontWeight: "bold",
              formatter: "{d}%",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "1" },
            { value: 735, name: "2" },
            { value: 580, name: "3" },
            { value: 484, name: "4" },
            { value: 300, name: "5" },
          ],
        },
      ],
    });
    // 依赖图
    const options3 = ref({
      title: {
        show: false,
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: "quinticInOut",

      series: [
        {
          center: ["80%", "50%"],
          type: "graph",
          layout: "none",
          // progressiveThreshold: 700,
          data: json.nodes.map((node) => ({
            x: node.x,
            y: node.y,
            id: node.id,
            name: node.label,
            symbolSize: node.size / 2,
            itemStyle: {
              color: node.color,
            },
          })),
          edges: json.edges.map((edge) => ({
            source: edge.sourceID,
            target: edge.targetID,
          })),
          emphasis: {
            focus: "adjacency",
            label: {
              position: "right",
              show: true,
            },
          },
          roam: true,
          lineStyle: {
            width: 0.5,
            curveness: 0.3,
            opacity: 0.7,
          },
        },
      ],
    });
    // 雷达图
    const options4 = ref({
      title: {
        text: "Basic Radar Chart",
        show: false,
      },

      legend: {
        show: false,
        data: ["Allocated Budget", "Actual Spending"],
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: "A", max: 100 },
          { name: "B", max: 100 },
          { name: "C", max: 100 },
          { name: "D", max: 100 },
          { name: "E", max: 100 },
          { name: "F", max: 100 },
        ],
        axisName: {
          fontSize: 10,
        },
        center: ["50%", "50%"],
      },
      series: [
        {
          colors: ["#61DDAA", "#5B8FF9"],
          type: "radar",
          symbol: "circle", // 拐点的样式圆，还可以取值'rect'-方
          symbolSize: 4, // 拐点的大小
          areaStyle: {
            normal: {
              opacity: 0.5,
            },
          },

          data: [
            {
              symbolSize: 6,
              label: {
                show: true,
              },
              value: [67, 87, 56, 93, 73, 79],
            },
            {
              symbolSize: 6,
              label: {
                show: true,
              },
              value: [77, 57, 86, 63, 53, 89],
            },
          ],
        },
      ],
    });
    // 词云
    const options5 = ref({
      title: {
        show: false,
      },
      backgroundColor: "#fff",
      series: [
        {
          type: "wordCloud",
          // 用来调整词之间的距离
          gridSize: 1,
          // 用来调整字的大小范围
          sizeRange: [6, 24],
          rotationRange: [0, 0],
          left: "center",
          top: "center",
          right: null,
          bottom: null,
          width: "100%",
          height: "100%",
          textStyle: {
            color() {
              const str = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
                Math.random() * 255
              )}, ${Math.round(Math.random() * 255)})`;
              return str;
            },
          },

          data: [
            {
              name: "营销",
              value: 15000,
            },
            {
              name: "质量",
              value: 10081,
            },
            {
              name: "产品",

              value: 9386,
            },
            {
              name: "研发",
              value: 7500,
            },
            {
              name: "指标开发",
              value: 7500,
            },
            {
              name: "需求",
              value: 6500,
            },
            {
              name: "互助",
              value: 6500,
            },
            {
              name: "创新",
              value: 6000,
            },
          ],
        },
      ],
    });
    //  矩形图
    const getLevelOption = () => [
      {
        itemStyle: {
          borderWidth: 0,
          gapWidth: 5,
        },
      },
      {
        itemStyle: {
          gapWidth: 1,
          borderColorSaturation: 1,
        },
      },
      {
        itemStyle: {
          gapWidth: 1,
        },
      },
    ];

    // 矩形
    const options6 = ref({
      tooltip: {
        formatter: (info: any) => `${info.data.name}：${info.data.value}`,
      },
      series: [
        {
          legend: {
            selectedMode: false,
          },
          nodeClick: false, // 禁止点击
          roam: false, // 禁止拖动

          labelLine: {
            show: false,
          },
          breadcrumb: {
            show: false,
          },
          label: {
            color: "#666666",
          },
          height: "100%",
          width: "100%",
          type: "treemap",
          colorAlpha: [1, 1],
          colorSaturation: [1, 1],
          color: [
            "#C6F6E2",
            "#DFECFF",
            "#DFECFF",
            "#D8F0FF",
            "#C2E8FF",
            "#FFE8E3",
            "#DFECFF",
            "#D8F0FF",
            "#DFECFF",
          ],
          emphasis: {
            focus: "none",
            itemStyle: {
              colorSaturation: [0.9, 1],
              colorAlpha: [0.9, 1],
            },
          },
          data: [
            {
              name: "nodeB",
              value: 100,
              children: [
                {
                  name: "首客成交率",
                  value: 20,
                  children: [
                    {
                      name: "总客流",
                      value: 20,
                    },
                    {
                      name: "有效线索量",
                      value: 10,
                    },
                    {
                      name: "有效线索量",
                      value: 8,
                    },
                    {
                      name: "有效线索成交率",
                      value: 50,
                    },
                    {
                      name: "新增订单数",
                      value: 20,
                    },
                    {
                      name: "未交车订单数",
                      value: 10,
                    },
                  ],
                },
              ],
            },
          ],
          levels: getLevelOption(),
        },
      ],
    });

    const profileOptions = ref({});
    const myTaskOptions = reactive({
      dows: {},
      count: { haveInHand: 1, pending: 1, taskTotal: 1 },
    });
    const helpData = reactive({
      finishedTotal: 1,
      helpTotal: 1,
      chartData: { yData: [], xData: [] },
    });

    let graph: FlowChart;

    // 加载关系图形
    const graphInit = () => {
      if (graph) {
        graph.dispose();
      }
      const dom = document.getElementById("x6Container");
      if (dom) {
        graph = new FlowChart(dom);
        // graph.fromJSON(flowDefaultData);
        graph.fromJSON(flowDynamicData);
      }
    };

    // 我的任务
    const getMyTask = () => {
      ApiMyTask().then((res: any) => {
        const result = res?.result;
        const arrX: string[] = [];
        const arrY: number[] = [];
        Object.keys(result).forEach((item: string) => {
          if (
            item === "haveInHand" ||
            item === "pending" ||
            item === "taskTotal"
          ) {
            myTaskOptions.count[item] = result[item];
          } else {
            arrY.push(result[item]);
            arrX.push(`${item}月`);
          }
        });
        options.value.series[0].data = arrY;
        options.value.xAxis.data = arrX;
        myTaskOptions.dows = options.value;
        // console.log('任务', myTaskOptions);
      });
    };

    // 我的求助
    const getForMyHelp = () => {
      ApiForMyHelp().then((res) => {
        helpData.finishedTotal = res?.result.finishedTotal;
        helpData.helpTotal = res?.result.helpTotal;
        helpData.chartData = res?.result.chartData;
        options.value.series[0].data = helpData.chartData.yData;
        options.value.xAxis.data = helpData.chartData.xData;
      });
    };

    // 我的画像
    const getPortraitProfile = () => {
      ApiPortraitProfile().then((res: any) => {
        const lable = res?.result?.userLabels;
        if (!lable) {
          profileOptions.value = options5.value;
          return;
        }
        options5.value.series[0].data = lable
          .split(",")
          .map((item: string, index: number) => ({
            name: item,
            value: index * 3,
          }));
        profileOptions.value = options5.value;
      });
    };

    const bgList = [bg1, bg2, bg3, bg4, bg5];
    // 指标总览（分流程）
    const getTargetFlow = () => {
      ApiTargetFlow().then((res: any) => {
        res?.result?.forEach((item: FlowItem, index: number) => {
          const percentage = Math.round((item.totalOnline / item.total) * 100);
          const copyOption1 = JSON.parse(JSON.stringify(options1.value));
          copyOption1.series[0].data = [{ value: percentage }];
          const copyOption2 = JSON.parse(JSON.stringify(options2.value));
          copyOption2.series[0].data = item.domainDetail.map((now) => ({
            value: now.total,
            name: now.domain,
          }));
          item.options1 = copyOption1;
          item.options2 = copyOption2;
          item.bgImage = bgList[index];
          flowList.push(item);
        });
        // console.log('分流程', flowList);
      });
    };

    // 指标总览（领域）
    const getTargetfield = () => {
      flowDynamicData.nodes = [];
      flowDynamicData.edges = [];
      ApiTargetfield().then((res: any) => {
        res?.result?.nodes.forEach((item: NodeItem, index: number): void => {
          const tem = getVueCard({
            id: item.rowId,
            x: coordinate[index].x,
            y: coordinate[index].y,
            data: {
              domain: item.domain,
              rowId: item.rowId,
              total: item.total,
              totalComplex: item.totalComplex,
              totalExtend: item.totalExtend,
              totalOnline: item.totalOnline,
              totalOrigin: item.totalOrigin,
            },
          });
          flowDynamicData.nodes.push(tem);
        });
        res?.result?.relations.forEach(
          (item: RelationsItem, index: number): void => {
            const cur = getedge({
              source: item.fromId,
              target: item.toId,
              label: "贡献度\n" + item.weightVal,
              index: index,
            });
            flowDynamicData.edges.push(cur);
          }
        );
        graphInit();
      });
      // console.log('领域', flowDynamicData);
    };

    // DOM加载完毕
    onMounted(() => {
      // graphInit();
      getTargetfield();
      getPortraitProfile();
      getTargetFlow();
      getMyTask();
      getForMyHelp();
      window.addEventListener("resize", graphInit);
    });
    onDeactivated(() => {
      window.removeEventListener("resize", graphInit);
    });

    const indexsearch = () => {
      router.push(`/IndexCenter/Manage/marketingIndicators?key=${state.key}`);
    };

    const handleClick = () => {
      console.log(state.activeName);
    };
    const href = (url: string) => {
      router.push(url);
    };
    const handleTip = () => {
      ElMessage.error("敬请期待");
    };

    return {
      indexsearch,
      options,
      options1,
      options2,
      options3,
      options4,
      options5,
      options6,
      thousands,
      router,
      flowChart,
      handleTip,
      ...toRefs(helpData),
      ...toRefs(state),
      ...toRefs(myTaskOptions),
      handleClick,
      href,
      flowList,
      profileOptions,
      myTaskOptions,
    };
  },
});
</script>

<style scoped lang="scss">
#x6Container {
  width: 800px;
  height: 100%;
  margin: 0 auto;
}
.icon-rise {
  font-size: 24px;
  color: #1ec435;
}
.icon-decline {
  font-size: 24px;
  color: #f53535;
}
.dashboard {
  padding: 30px;
}
//卡片阴影
.always-shadow {
  box-shadow: var(--el-box-shadow-light);
}
.index_num {
  font-size: 24px;
  color: rgb(27, 60, 144);
  padding-left: 10px;
  font-weight: 700;
}
.empowerment {
  font-size: 12px;
  font-weight: 400;
  color: #cccccc;
  line-height: 17px;
  p {
    padding-top: 8px;
  }
}
//图表
.chart_gourp {
  :deep(.el-card__body) {
    height: 250px;
  }
  .chart_box_head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .box_head_title {
      font-weight: 500;
      font-size: 20px;

      line-height: 30px;
      flex: 1;
      span {
        cursor: pointer;
      }
    }
    .operate {
      font-size: 14px;
      color: #20a0ff;
      cursor: pointer;
    }

    .num_label {
      font-size: 14px;
      color: #333333;
    }
  }

  .bodyInfo {
    position: absolute;
    left: 0;
    top: 18px;
    z-index: 1;
  }
  .chart_box_body {
    position: relative;
    display: flex;
    padding-top: 40px;
    :deep(.chart_dom) {
      width: 100%;
      height: 140px;
    }
  }
  .body_right {
    padding-left: 4px;
    font-size: 14px;
    min-width: 60px;
    color: #cccccc;
    width: 50px;

    .progress {
      font-size: 12px;
      .pending {
        span {
          color: #b22711;
        }
      }
      .handing {
        span {
          color: #1b3c90;
        }
      }
    }
  }
  .body_left {
    flex: 1;
  }
}

// 搜索
.search_con {
  padding: 20px 30px;
  margin-top: 30px;
  background-color: #fff;

  .search_box {
    flex: 3;
  }
  .create_box {
    flex: 1;
  }
  .search_hd {
    position: relative;
    height: 50px;
    display: flex;

    .search_date {
      padding-right: 160px;
      display: flex;
      align-items: flex-end;
      font-size: 14px;
      color: #666;
    }
    .searchInput {
      position: relative;
      width: 50%;
      display: flex;
      align-items: center;
      :deep(.el-input__inner) {
        padding-left: 36px;
      }
      .search-icon {
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        color: rgb(32, 160, 255);
      }
      .search-btn {
        position: relative;
        z-index: 11;
        margin-left: -50px;
      }
    }
  }
  .search_body {
    margin-top: 23px;
    display: flex;
    flex-wrap: wrap;
    .item_box {
      width: 20%;
      padding: 10px;

      .item {
        background-color: #fff;
        border-radius: 5px;
        .item_hd {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;

          background-repeat: no-repeat;
          background-position: top center;
          background-size: 100% auto;
          height: 70px;
          .name {
            color: #fff;
            font-size: 16px;
            padding-top: 16px;
            padding-left: 20px;
            font-weight: bold;
          }
        }
        .Index_online {
          text-align: center;
          padding: 10px 15px;
          .index_num {
            font-size: 20px;
          }
        }
        .item_bd {
          padding-bottom: 10px;

          .chart2 {
            width: 100%;
            height: 70px;
          }
        }
        .norm_con {
          display: flex;
          .hr {
            margin-top: 10px;
            height: 50px;
            width: 1px;
            background-color: #e5e5e5;
          }
          .right,
          .left {
            width: 100%;
          }
        }
      }
    }
  }

  .tips_con {
    margin-top: 20px;
    display: flex;
    .tips_help {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 12px;

      color: #ccc;
      span {
        padding-left: 4px;
      }
      &:not(:first-child) {
        margin-left: 20px;
      }
    }
  }
  .create_btn {
    display: block;
    margin: 0 auto;
  }
  .statistics {
    padding-left: 40px;
    .li {
      padding: 10px 0;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #666;
      .label {
        color: #666;
        display: flex;
        align-items: center;
      }
      .iconfont {
        font-size: 20px;
      }
      .label_content {
        padding-left: 5px;
      }
      .num {
        padding-left: 30px;
        padding-right: 10px;
        text-align: left;
        width: 150px;
        font-size: 22px;
        color: #20a0ff;
        font-weight: 800;
      }
      .unit {
        font-size: 12px;
        color: #666;
        font-weight: 400;
      }
    }
  }
}

//奉献排行
.contribution {
  margin-top: 23px;

  .contribution_graph {
    height: 600px;
    position: relative;
    overflow: hidden;
    background-image: url("@/assets/images/background.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .contribution_ranking {
    // margin-left: 40px;
    flex: 1;
    :deep(.el-tabs__nav) {
      margin-left: 120px;
    }
    .el-tabs__item {
      font-weight: 500;
      font-size: 16px;
    }
    .ranking_tabs {
      position: relative;
      padding: 20px;
    }
    :deep(.el-tabs__active-bar) {
      height: 4px;
      border-radius: 2px;
    }
    :deep(.el-tabs__nav-wrap::after) {
      height: 3px;
    }
    .ranking_title {
      position: absolute;
      left: 20px;
      top: 20px;
      font-weight: 700;
      font-size: 14px;
    }
    .ranking_con {
      display: flex;
      position: relative;
    }
    .hr {
      position: absolute;
      left: 50%;
      top: 0;
      height: 100%;
      width: 2px;
      background-color: #e5e5e5;
    }
    .ranking_list {
      flex: 1;
      .item {
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #e5e5e5;
        img {
          width: 22px;
          height: 22px;
        }
        &:last-child {
          border-bottom: none;
        }
        .label {
          padding-left: 10px;
        }
        .num {
          padding-left: 10px;
        }
      }
      &:not(:first-child) {
        margin-left: 40px;
      }
    }
  }
}
.rectangle_box {
  height: 236px;
  margin-top: 20px;
  .chart3 {
    height: 200px;
  }
}
.chart3 {
  .chart_box_body {
    padding-top: 0;
    .chart_dom {
      margin-top: 20px;
      height: 160px;
      padding-left: 120px;
    }
  }
}
.chart4 {
  .chart_box_body {
    padding-top: 0;
    .chart_dom {
      height: 180px;
    }
  }
}
.disable {
  color: #ccc !important;
}
</style>
