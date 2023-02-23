import asset from './images/asset.svg';
import card from './images/card.svg';
import RDS from './images/RDS.svg';
import HTTP from './images/HTTP.svg';
import outputDDM from './images/output_DDM.svg';
import outputHTTP from './images/output_HTTP.svg';
import outputRDS from './images/output_RDS.svg';
import parameter from './images/parameter.svg';
import constant from './images/constant.svg';
import staticText from './images/static_text.svg';
import dynamicText from './images/dynamic_text.svg';

import EchatView from "@/components/Graph/echatView";

import { FormOption } from '@/components/TableFormItem/index.d'


const files = import.meta.globEager("../../components/Graph/images/*.webp")
const images: any = {};

Object.keys(files).forEach((key) => {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    images[key.replace(/(\.\.\/\.\.\/components\/Graph\/images\/|\.webp)/g, '')] = files[key].default
  }
});

// 'radar'
// 'radar-custom'
// 'radar-multiple'
// 'sunburst-borderRadius'
console.log(images);

export const dataDevelopmentConfig = [
  {
    title: '输入',
    options: [
      {
        shape: 'imageText',
        // 还有什么属性可以加在这一层
        attrs: { // 这一层可以添加放入其他的数据
          label: { // 组件名称
            text: '资产',
          },
          body: { // 可以不用要
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: { // 图片地址 svg 格式
            'xlink:href': asset,
          },
        },
      },
      {
        shape: 'imageText',
        attrs: {
          label: {
            text: '卡片',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': card,
          },
        },
      },
      {
        shape: 'imageText',
        attrs: {
          label: {
            text: 'RDS',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': RDS,
          },
        },
      },
      {
        shape: 'imageText',
        attrs: {
          label: {
            text: 'HTTP',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': HTTP,
          },
        },
      },
    ]
  },
  {
    title: '输出',
    options: [
      {
        shape: 'imageText',
        attrs: {
          label: {
            text: 'DOM数据湖',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': outputDDM,
          },
        },
      },
      {
        shape: 'imageText',
        attrs: {
          label: {
            text: 'RDS',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': outputHTTP,
          },
        },
      },
      {
        shape: 'imageText',
        attrs: {
          label: {
            text: 'HTTP',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': outputRDS,
          },
        },
      },
    ]
  },
  {
    title: '变量',
    options: [
      {
        shape: 'imageText',
        attrs: {
          label: {
            text: '参数',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': parameter,
          },
        },
      },
      {
        shape: 'imageText',
        attrs: {
          label: {
            text: '常量',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': constant,
          },
        },
      },
    ]
  }
]
export const chartConfig = [
  {
    title: '折线图',
    options: [
      {
        shape: 'echart-shape',
        id: 'line-simple',
        attrs: {
          // image: '',
          option: {
            title: {
              text: 'Stacked Line'
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
              }
            ]

          }
        }
      },
      {
        shape: 'echart-shape',
        id: 'line-smooth',
        attrs: {
          option: {
            title: {
              text: 'Stacked Line'
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
              }
            ]
          }
        },
      },
      {
        shape: 'echart-shape',
        id: 'line-stack',
        attrs: {
          option: {
            title: {
              text: 'Stacked Line'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
            ]
          }
        },
      },
    ]
  },
  {
    title: '面积图',
    options: [
      {
        shape: 'echart-shape',
        id: 'area-basic',
        attrs: {
          // image: '',
          option: {
            title: {
              text: 'Stacked Area Chart'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
              }
            ]
          }
        }
      },
      {
        shape: 'echart-shape',
        id: 'area-stack',
        attrs: {
          option: {
            title: {
              text: 'Stacked Area Chart'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                label: {
                  show: true,
                  position: 'top'
                },
                areaStyle: {},
                emphasis: {
                  focus: 'series'
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
            ]
          }
        },
      },
      {
        shape: 'echart-shape',
        id: 'area-pieces',
        attrs: {
          option: {
            title: {
              text: 'Stacked Area Chart'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false
            },
            yAxis: {
              type: 'value',
              boundaryGap: [0, '30%']
            },
            visualMap: {
              type: 'piecewise',
              show: false,
              dimension: 0,
              seriesIndex: 0,
              pieces: [
                {
                  gt: 1,
                  lt: 3,
                  color: 'rgba(0, 0, 180, 0.4)'
                },
                {
                  gt: 5,
                  lt: 7,
                  color: 'rgba(0, 0, 180, 0.4)'
                }
              ]
            },
            series: [
              {
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                lineStyle: {
                  color: '#5470C6',
                  width: 5
                },
                markLine: {
                  symbol: ['none', 'none'],
                  label: { show: false },
                  data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
                },
                areaStyle: {},
                data: [
                  ['2019-10-10', 200],
                  ['2019-10-11', 560],
                  ['2019-10-12', 750],
                  ['2019-10-13', 580],
                  ['2019-10-14', 250],
                  ['2019-10-15', 300],
                  ['2019-10-16', 450],
                  ['2019-10-17', 300],
                  ['2019-10-18', 100]
                ]
              }
            ]
          }
        },
      },
    ]
  },
  {
    title: '柱状图',
    options: [
      {
        shape: 'echart-shape',
        id: 'bar-brush',
        attrs: {
          // image: '',
          option: {
            title: {
              text: '基础柱状图'
            },
            "legend": {
              "data": [
                "bar",
                "bar2",
                "bar3",
                "bar4"
              ],
              "left": "10%",
              "top": "25"
            },
            "brush": {
              "toolbox": [
                "polygon",
                "lineX",
                "lineY",
                "keep",
                "clear",
                "clear"
              ],
              "xAxisIndex": 1
            },
            "toolbox": {
              "feature": {
                "magicType": {
                  "type": [
                    "stack"
                  ]
                },
                "dataView": {}
              }
            },
            "tooltip": {},
            "xAxis": {
              "data": [
                "Class0",
                "Class1",
                "Class2",
                "Class3",
                "Class4",
                "Class5",
                "Class6",
                "Class7",
                "Class8",
                "Class9"
              ],
              "name": "X Axis",
              "axisLine": {
                "onZero": true
              },
              "splitLine": {
                "show": false
              },
              "splitArea": {
                "show": false
              }
            },
            "yAxis": {},
            "grid": {
              "bottom": 100
            },
            "series": [
              {
                "name": "bar",
                "type": "bar",
                "stack": "one",
                "emphasis": {
                  "itemStyle": {
                    "shadowBlur": 10,
                    "shadowColor": "rgba(0,0,0,0.3)"
                  }
                },
                "data": [
                  0.5,
                  1.07,
                  1.8,
                  0.51,
                  1.24,
                  0.16,
                  1.3,
                  0.54,
                  1.56,
                  0.1
                ]
              },
              {
                "name": "bar2",
                "type": "bar",
                "stack": "one",
                "emphasis": {
                  "itemStyle": {
                    "shadowBlur": 10,
                    "shadowColor": "rgba(0,0,0,0.3)"
                  }
                },
                "data": [
                  2.44,
                  1.13,
                  0.79,
                  2.02,
                  3.45,
                  0.6,
                  4.34,
                  1.82,
                  1.78,
                  2.72
                ]
              },
              {
                "name": "bar3",
                "type": "bar",
                "stack": "two",
                "emphasis": {
                  "itemStyle": {
                    "shadowBlur": 10,
                    "shadowColor": "rgba(0,0,0,0.3)"
                  }
                },
                "data": [
                  0.52,
                  0.73,
                  1.17,
                  1.04,
                  1.07,
                  0.47,
                  0.46,
                  0.38,
                  0.79,
                  0.53
                ]
              },
              {
                "name": "bar4",
                "type": "bar",
                "stack": "two",
                "emphasis": {
                  "itemStyle": {
                    "shadowBlur": 10,
                    "shadowColor": "rgba(0,0,0,0.3)"
                  }
                },
                "data": [
                  0.36,
                  0.06,
                  0.88,
                  0.08,
                  0.37,
                  0.57,
                  0.23,
                  0.28,
                  0.2,
                  0.86
                ]
              }
            ]
          }
        }
      },
      {
        shape: 'echart-shape',
        id: 'bar-gradient',
        attrs: {
          option: {
            title: {
              text: '基础柱状图'
            },
            xAxis: {
              data: ['你', '要', '天', '天', '快', '快', '乐', '乐', '，', '万', '物', '可', '爱', '，', '生', '活', '可', '期', '！', '！'],
              axisLabel: {
                inside: true,
                color: '#fff'
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              z: 10
            },
            yAxis: {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#999'
              }
            },
            dataZoom: [
              {
                type: 'inside'
              }
            ],
            series: [
              {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                },
                emphasis: {
                },
                data: [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
              }
            ]
          }
        },
      },
      {
        shape: 'echart-shape',
        id: 'bar-stack',
        attrs: {
          option: {
            title: {
              text: '堆叠柱状图'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              top: 25
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: 100,
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: 'Direct',
                type: 'bar',
                emphasis: {
                  focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: 'Email',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: 'Union Ads',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: 'Video Ads',
                type: 'bar',
                stack: 'Ad',
                emphasis: {
                  focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: 'Search Engine',
                type: 'bar',
                data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                emphasis: {
                  focus: 'series'
                },
                markLine: {
                  lineStyle: {
                    type: 'dashed'
                  },
                  data: [[{ type: 'min' }, { type: 'max' }]]
                }
              },
              {
                name: 'Baidu',
                type: 'bar',
                barWidth: 5,
                stack: 'Search Engine',
                emphasis: {
                  focus: 'series'
                },
                data: [620, 732, 701, 734, 1090, 1130, 1120]
              },
              {
                name: 'Google',
                type: 'bar',
                stack: 'Search Engine',
                emphasis: {
                  focus: 'series'
                },
                data: [120, 132, 101, 134, 290, 230, 220]
              },
              {
                name: 'Bing',
                type: 'bar',
                stack: 'Search Engine',
                emphasis: {
                  focus: 'series'
                },
                data: [60, 72, 71, 74, 190, 130, 110]
              },
              {
                name: 'Others',
                type: 'bar',
                stack: 'Search Engine',
                emphasis: {
                  focus: 'series'
                },
                data: [62, 82, 91, 84, 109, 110, 120]
              }
            ]
          }
        },
      },
      {
        shape: 'echart-shape',
        id: 'bar-y-category-stack',
        attrs: {
          option: {
            title: {
              text: '横向柱状图'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
              }
            },
            legend: {
              top: 25
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: 80,
              containLabel: true
            },
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series: [
              {
                name: 'Direct',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330, 320]
              },
              {
                name: 'Mail Ad',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: 'Affiliate Ad',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: 'Video Ad',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [150, 212, 201, 154, 190, 330, 410]
              },
              {
                name: 'Search Engine',
                type: 'bar',
                stack: 'total',
                label: {
                  show: true
                },
                emphasis: {
                  focus: 'series'
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
              }
            ]
          }
        },
      },
    ]
  },

  // title: {
  //   text: '环形饼状图'
  // },
  {
    title: '饼状图',
    options: [
      {
        shape: 'echart-shape',
        id: 'pie-simple',
        attrs: {
          option: {
            title: {
              text: '基础饼状图'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              top: 20,
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        },
      },
      {
        shape: 'echart-shape',
        id: 'pie-borderRadius',
        attrs: {
          // image: '',
          option: {
            title: {
              text: '环形饼状图'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: 25,
              left: 'center'
            },
            grid: {
              top: 80,
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' }
                ]
              }
            ]
          }
        }
      },
      {
        shape: 'echart-shape',
        id: 'pie-custom',
        attrs: {
          option: {
            title: {
              text: '自定义饼图',
              textStyle: {
                color: '#ccc'
              }
            },
            backgroundColor: '#2c343c',
            tooltip: {
              trigger: 'item'
            },

            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                  { value: 335, name: 'Direct' },
                  { value: 310, name: 'Email' },
                  { value: 274, name: 'Union Ads' },
                  { value: 235, name: 'Video Ads' },
                  { value: 400, name: 'Search Engine' }
                ],
                roseType: 'radius',
                label: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                labelLine: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                },
                itemStyle: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },

                animationType: 'scale',
                animationEasing: 'elasticOut'
              }
            ]
          }
        },
      },
      {
        shape: 'echart-shape',
        id: 'pie-roseType',
        attrs: {
          size: {
            width: 800,
            height: 500
          },
          option: {
            title: {
              text: '多组饼状图',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              left: 'center',
              top: 'bottom',
              data: [
                'rose1',
                'rose2',
                'rose3',
                'rose4',
                'rose5',
                'rose6',
                'rose7',
                'rose8'
              ]
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            series: [
              {
                name: 'Radius Mode',
                type: 'pie',
                radius: [20, 140],
                center: ['25%', '50%'],
                roseType: 'radius',
                itemStyle: {
                  borderRadius: 5
                },
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: true
                  }
                },
                data: [
                  { value: 40, name: 'rose 1' },
                  { value: 33, name: 'rose 2' },
                  { value: 28, name: 'rose 3' },
                  { value: 22, name: 'rose 4' },
                  { value: 20, name: 'rose 5' },
                  { value: 15, name: 'rose 6' },
                  { value: 12, name: 'rose 7' },
                  { value: 10, name: 'rose 8' }
                ]
              },
              {
                name: 'Area Mode',
                type: 'pie',
                radius: [20, 140],
                center: ['75%', '50%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 5
                },
                data: [
                  { value: 30, name: 'rose 1' },
                  { value: 28, name: 'rose 2' },
                  { value: 26, name: 'rose 3' },
                  { value: 24, name: 'rose 4' },
                  { value: 22, name: 'rose 5' },
                  { value: 20, name: 'rose 6' },
                  { value: 18, name: 'rose 7' },
                  { value: 16, name: 'rose 8' }
                ]
              }
            ]
          }
        },
      },
    ]
  },
  {
    title: '雷达图',
    options: [
      {
        shape: 'echart-shape',
        id: 'radar',
        attrs: {
          // image: '',
          option: {
            title: {
              text: 'Basic Radar Chart'
            },
            legend: {
              data: ['Allocated Budget', 'Actual Spending'],
              top: 20,
            },
            radar: {
              // shape: 'circle',
              indicator: [
                { name: 'Sales', max: 6500 },
                { name: 'Administration', max: 16000 },
                { name: 'Information Technology', max: 30000 },
                { name: 'Customer Support', max: 38000 },
                { name: 'Development', max: 52000 },
                { name: 'Marketing', max: 25000 }
              ]
            },
            series: [
              {
                name: 'Budget vs spending',
                type: 'radar',
                data: [
                  {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: 'Allocated Budget'
                  },
                  {
                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                    name: 'Actual Spending'
                  }
                ]
              }
            ]
          }
        }
      },
      {
        shape: 'echart-shape',
        id: 'radar-custom',
        attrs: {
          size: {
            width: 800,
            height: 500
          },
          option: {
            color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
            title: {
              text: '多组雷达图'
            },
            legend: {},
            radar: [
              {
                indicator: [
                  { text: 'Indicator1' },
                  { text: 'Indicator2' },
                  { text: 'Indicator3' },
                  { text: 'Indicator4' },
                  { text: 'Indicator5' }
                ],
                center: ['25%', '50%'],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                axisName: {
                  formatter: '【{value}】',
                  color: '#428BD4'
                },
                splitArea: {
                  areaStyle: {
                    color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 10
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: 'rgba(211, 253, 250, 0.8)'
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: 'rgba(211, 253, 250, 0.8)'
                  }
                }
              },
              {
                indicator: [
                  { text: 'Indicator1', max: 150 },
                  { text: 'Indicator2', max: 150 },
                  { text: 'Indicator3', max: 150 },
                  { text: 'Indicator4', max: 120 },
                  { text: 'Indicator5', max: 108 },
                  { text: 'Indicator6', max: 72 }
                ],
                center: ['75%', '50%'],
                radius: 120,
                axisName: {
                  color: '#fff',
                  backgroundColor: '#666',
                  borderRadius: 3,
                  padding: [3, 5]
                }
              }
            ],
            series: [
              {
                type: 'radar',
                emphasis: {
                  lineStyle: {
                    width: 4
                  }
                },
                data: [
                  {
                    value: [100, 8, 0.4, -80, 2000],
                    name: 'Data A'
                  },
                  {
                    value: [60, 5, 0.3, -100, 1500],
                    name: 'Data B',
                    areaStyle: {
                      color: 'rgba(255, 228, 52, 0.6)'
                    }
                  }
                ]
              },
              {
                type: 'radar',
                radarIndex: 1,
                data: [
                  {
                    value: [120, 118, 130, 100, 99, 70],
                    name: 'Data C',
                    symbol: 'rect',
                    symbolSize: 12,
                    lineStyle: {
                      type: 'dashed'
                    },
                    label: {
                      show: true,
                    }
                  },
                  {
                    value: [100, 93, 50, 90, 70, 60],
                    name: 'Data D',
                  }
                ]
              }
            ]
          }
        },
      },
      {
        shape: 'echart-shape',
        id: 'sunburst-borderRadius',
        attrs: {
          option: {
            title: {
              text: '圆角旭日图'
            },
            series: {
              type: 'sunburst',
              data: [
                {
                  name: 'Grandpa',
                  children: [
                    {
                      name: 'Uncle Leo',
                      value: 15,
                      children: [
                        {
                          name: 'Cousin Jack',
                          value: 2
                        },
                        {
                          name: 'Cousin Mary',
                          value: 5,
                          children: [
                            {
                              name: 'Jackson',
                              value: 2
                            }
                          ]
                        },
                        {
                          name: 'Cousin Ben',
                          value: 4
                        }
                      ]
                    },
                    {
                      name: 'Father',
                      value: 10,
                      children: [
                        {
                          name: 'Me',
                          value: 5
                        },
                        {
                          name: 'Brother Peter',
                          value: 1
                        }
                      ]
                    }
                  ]
                },
                {
                  name: 'Nancy',
                  children: [
                    {
                      name: 'Uncle Nike',
                      children: [
                        {
                          name: 'Cousin Betty',
                          value: 1
                        },
                        {
                          name: 'Cousin Jenny',
                          value: 2
                        }
                      ]
                    }
                  ]
                }
              ],
              radius: [60, '90%'],
              itemStyle: {
                borderRadius: 7,
                borderWidth: 2
              },
              label: {
                show: false
              }
            }
          }
        },
      },
    ]
  },
  {
    title: '文本',
    options: [
      {
        shape: 'customText',
        id: 'static-text',
        attrs: {
          label: {
            text: '静态',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': staticText,
          },
        },
      },
      {
        shape: 'customText',
        id: 'dynamic-text',
        attrs: {
          label: {
            text: '动态',
          },
          body: {
            stroke: '#CDEAFF',
            fill: '#CDEAFF',
          },
          image: {
            'xlink:href': dynamicText,
          },
        }
      }
    ]
  }
].map((item) => ({
  ...item,
  options: item.options.map((item2) => ({
    ...item2,
    attrs: {
      ...item2.attrs,
      //  image: images[item2.id]
      // eslint-disable-next-line no-nested-ternary
      image: item2.id === 'static-text' ? {'xlink:href': staticText} : item2.id === 'dynamic-text' ? {'xlink:href': dynamicText} : images[item2.id]
    }
  }))
}))

console.log('默认指标', chartConfig)

export const initTableForm: FormOption[] = [
  {
    tag: 'text',
    label: '数据卡片',
    name: 'title',
  },
  {
    tag: 'select',
    label: '筛选框',
    name: 'selectName',
    placeholder: '请选择',
    options: [{
      value: '1',
      label: '选项1'
    }, {
      value: '2',
      label: '选项2'
    }, {
      value: '3',
      label: '选项3'
    }]
  },
  {
    tag: 'input',
    label: '数据2',
    name: 'name2',
    placeholder: '请选择'
  },
  {
    tag: 'input',
    name: 'name',
    placeholder: '请选择'
  },
  {
    tag: 'hr',
  },
  {
    tag: 'rate',
    label: '数据卡片',
    name: 'rate',
  },
  {
    tag: 'text',
    label: '贡献者',
    name: 'username',
  },
  {
    tag: 'table',
    columns: [
      {
        label: '业务字段',
        prop: 'a',
      },
      {
        label: '类型',
        prop: 'a2',
      },
      {
        label: '表2',
        prop: 'a3',
      },
    ],
    name: 'table',
    data: [
      {
        a: '字段名称',
        a2: '字段类型',
        a3: '字段长度',
      },
      {
        a: '字段名称',
        a2: '字段类型',
        a3: '字段长度',
      }
    ]
  },
  {
    tag: 'tabs',
    name: 'username',
    childs: [{
      tag: 'a',
      text: '数据1',
      link: '链接1'
    }, {
      tag: 'a',
      text: '数据1',
      link: '链接1'
    }, {
      tag: 'a',
      text: '数据1',
      link: '链接1'
    }, {
      tag: 'a',
      text: '数据1',
      link: '链接1',
      style: {color: "#ff0"}
    }]
  },
]
export default dataDevelopmentConfig;

export const initGraphData = [
  {
    "shape": "edge",
    "attrs": {
      "line": {
        "stroke": "#A2B1C3",
        "targetMarker": {
          "name": "block",
          "width": 12,
          "height": 8
        }
      }
    },
    "id": "0d5ad783-c298-432c-b55e-845265f6d4ea",
    "zIndex": 0,
    "source": {
      "cell": "0a35403b-1a1d-4464-b10a-2d640103f5e2",
      "port": "32bfa616-1902-4cf7-84be-bc20a4f94e0e"
    },
    "target": {
      "cell": "1894179d-78f9-4693-9964-658fc76dc699",
      "port": "6591fe2f-f973-4ea5-9947-9f77461e737f"
    }
  },
  {
    "shape": "edge",
    "attrs": {
      "line": {
        "stroke": "#A2B1C3",
        "targetMarker": {
          "name": "block",
          "width": 12,
          "height": 8
        }
      }
    },
    "id": "c5730917-3ff1-44ee-bc56-ea3ab1125933",
    "zIndex": 0,
    "source": {
      "cell": "4ca13f76-e177-45af-8c47-6d552f7158f9",
      "port": "32bfa616-1902-4cf7-84be-bc20a4f94e0e"
    },
    "target": {
      "cell": "1894179d-78f9-4693-9964-658fc76dc699",
      "port": "6591fe2f-f973-4ea5-9947-9f77461e737f"
    }
  },
  {
    "position": {
      "x": 190,
      "y": 190
    },
    "size": {
      "width": 32,
      "height": 50
    },
    "attrs": {
      "body": {
        "stroke": "#CDEAFF",
        "fill": "#CDEAFF"
      },
      "image": {
        "xlink:href": "/admin/src/views/FlowChart/images/asset.svg"
      },
      "label": {
        "text": "资产"
      },
      "moduleData": {
        "headBigTypeRule": [
          "MODEL_TYPE_INPUT"
        ],
        "tailBigTypeRule": [
          "MODEL_TYPE_INPUT",
          "MODEL_TYPE_VARIABLE",
          "MODEL_TYPE_NODE",
          "MODEL_TYPE_OUTPUT"
        ],
        "rejectHeadNodeRule": [
          "INPUT_DB_CARD",
          "INPUT_DB_ASSETS"
        ],
        "rejectTailNodeRule": [
          "INPUT_DB_CARD",
          "INPUT_DB_ASSETS"
        ],
        "bigType": "MODEL_TYPE_INPUT",
        "type": "INPUT_DB_ASSETS",
        "description": "资产",
        "attributes": {
          "MODEL_PARAMS_ASSETS_ID": "{%s}"
        }
      },
      "params": {
        "selectName": {
          "name": "MODEL_PARAMS_ASSETS_ID",
          "value": "b7b3d370-80dd-4292-b1f2-212e496fe897"
        },
        "name": {
          "value": '资产'
        },
        "tableData": {
          "upDateTime": "2021-11-18 17:40:30",
          "value": [
            {
              "id": 14,
              "rowId": "583a34e4-ecc7-4b68-ba48-015d1d44b70e",
              "createBy": "system",
              "gmtCreate": "2021-11-17 17:30:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-17 17:30:22",
              "isDeleted": 0,
              "assetId": "b7b3d370-80dd-4292-b1f2-212e496fe897",
              "columnName": "first_name",
              "columnChName": "first_name",
              "columnType": "VARCHAR"
            },
            {
              "id": 15,
              "rowId": "2ccb291a-4881-4f9d-8e7c-423c92e37434",
              "createBy": "system",
              "gmtCreate": "2021-11-17 17:30:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-17 17:30:22",
              "isDeleted": 0,
              "assetId": "b7b3d370-80dd-4292-b1f2-212e496fe897",
              "columnName": "last_name",
              "columnChName": "last_name",
              "columnType": "VARCHAR"
            },
            {
              "id": 16,
              "rowId": "eb4fc589-9bc4-42dc-b313-88d3fd156eed",
              "createBy": "system",
              "gmtCreate": "2021-11-17 17:30:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-17 17:30:22",
              "isDeleted": 0,
              "assetId": "b7b3d370-80dd-4292-b1f2-212e496fe897",
              "columnName": "email",
              "columnChName": "邮箱",
              "columnType": "VARCHAR"
            }
          ]
        }
      }
    },
    "shape": "imageText",
    "ports": {
      "groups": {
        "top": {
          "position": "top",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        },
        "right": {
          "position": "right",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        },
        "bottom": {
          "position": "bottom",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        },
        "left": {
          "position": "left",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        }
      },
      "items": [
        {
          "group": "top",
          "id": "1db3bd7d-a192-4208-a8b5-da05d00186cc"
        },
        {
          "group": "right",
          "id": "32bfa616-1902-4cf7-84be-bc20a4f94e0e"
        },
        {
          "group": "bottom",
          "id": "b88ce4b2-c5fa-42db-b400-a97f6197a9ef"
        },
        {
          "group": "left",
          "id": "a1da7009-5df1-4d45-b7d5-529815f7640b"
        }
      ]
    },
    "id": "0a35403b-1a1d-4464-b10a-2d640103f5e2",
    "zIndex": 1
  },
  {
    "position": {
      "x": 120,
      "y": 30
    },
    "size": {
      "width": 32,
      "height": 50
    },
    "attrs": {
      "body": {
        "stroke": "#CDEAFF",
        "fill": "#CDEAFF"
      },
      "image": {
        "xlink:href": "/admin/src/views/FlowChart/images/asset.svg"
      },
      "label": {
        "text": "资产"
      },
      "moduleData": {
        "headBigTypeRule": [
          "MODEL_TYPE_INPUT"
        ],
        "tailBigTypeRule": [
          "MODEL_TYPE_INPUT",
          "MODEL_TYPE_VARIABLE",
          "MODEL_TYPE_NODE",
          "MODEL_TYPE_OUTPUT"
        ],
        "rejectHeadNodeRule": [
          "INPUT_DB_CARD",
          "INPUT_DB_ASSETS"
        ],
        "rejectTailNodeRule": [
          "INPUT_DB_CARD",
          "INPUT_DB_ASSETS"
        ],
        "bigType": "MODEL_TYPE_INPUT",
        "type": "INPUT_DB_ASSETS",
        "description": "资产",
        "attributes": {
          "MODEL_PARAMS_ASSETS_ID": "{%s}"
        }
      },
      "params": {
        "name": {
          "value": '资产'
        },
        "selectName": {
          "name": "MODEL_PARAMS_ASSETS_ID",
          "value": "38f77334-b4a5-4b78-995b-69dcf06920ff"
        },
        "tableData": {
          "upDateTime": "2021-11-18 17:40:30",
          "value": [
            {
              "id": 3,
              "rowId": "7f7d7529-7523-4d0f-9c0a-d3c749138667",
              "createBy": "system",
              "gmtCreate": "2021-11-09 11:19:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-09 11:19:22",
              "isDeleted": 0,
              "assetId": "38f77334-b4a5-4b78-995b-69dcf06920ff",
              "columnName": "dept_no",
              "columnChName": "部门编码",
              "columnType": "int",
              "businessType": "1"
            },
            {
              "id": 4,
              "rowId": "1751f9f8-464f-4ff3-b9dc-f95e88937ebc",
              "createBy": "system",
              "gmtCreate": "2021-11-09 11:19:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-09 11:19:22",
              "isDeleted": 0,
              "assetId": "38f77334-b4a5-4b78-995b-69dcf06920ff",
              "columnName": "addr",
              "columnChName": "地址",
              "columnType": "string",
              "businessType": "1"
            },
            {
              "id": 5,
              "rowId": "83a2cee3-9c1d-4f79-b048-bdf5c2005295",
              "createBy": "system",
              "gmtCreate": "2021-11-09 11:19:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-09 11:19:22",
              "isDeleted": 0,
              "assetId": "38f77334-b4a5-4b78-995b-69dcf06920ff",
              "columnName": "tel",
              "columnChName": "电话号码",
              "columnType": "string",
              "businessType": "1"
            },
            {
              "id": 6,
              "rowId": "efaefa38-d244-4a64-8de5-aa3c574b5307",
              "createBy": "system",
              "gmtCreate": "2021-11-09 11:19:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-09 11:19:22",
              "isDeleted": 0,
              "assetId": "38f77334-b4a5-4b78-995b-69dcf06920ff",
              "columnName": "person_count",
              "columnChName": "部门人数",
              "columnType": "int",
              "businessType": "1"
            }
          ]
        }
      }
    },
    "shape": "imageText",
    "ports": {
      "groups": {
        "top": {
          "position": "top",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        },
        "right": {
          "position": "right",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        },
        "bottom": {
          "position": "bottom",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        },
        "left": {
          "position": "left",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        }
      },
      "items": [
        {
          "group": "top",
          "id": "1db3bd7d-a192-4208-a8b5-da05d00186cc"
        },
        {
          "group": "right",
          "id": "32bfa616-1902-4cf7-84be-bc20a4f94e0e"
        },
        {
          "group": "bottom",
          "id": "b88ce4b2-c5fa-42db-b400-a97f6197a9ef"
        },
        {
          "group": "left",
          "id": "a1da7009-5df1-4d45-b7d5-529815f7640b"
        }
      ]
    },
    "id": "4ca13f76-e177-45af-8c47-6d552f7158f9",
    "zIndex": 2
  },
  {
    "position": {
      "x": 380,
      "y": 90
    },
    "size": {
      "width": 32,
      "height": 50
    },
    "attrs": {
      "body": {
        "stroke": "#CDEAFF",
        "fill": "#CDEAFF"
      },
      "image": {
        "xlink:href": "/admin/src/views/FlowChart/images/asset.svg"
      },
      "label": {
        "text": "选择"
      },
      "moduleData": {
        "name": "选择",
        "headBigTypeRule": [
          "MODEL_TYPE_INPUT",
          "MODEL_TYPE_NODE"
        ],
        "tailBigTypeRule": [
          "MODEL_TYPE_OUTPUT",
          "MODEL_TYPE_NODE",
          "MODEL_TYPE_ANALYSIS"
        ],
        "bigType": "MODEL_TYPE_NODE",
        "type": "MODEL_PARAMS_SELECT_FIELD",
        "attributes": {
          "MODEL_PARAMS_SELECT_FIELD": "{%s},{%s}"
        }
      },
      "params": {
        "name": {
          "value": '选择'
        },
        "selectTable": {
          "name": "MODEL_PARAMS_SELECT_FIELD",
          "value": [
            {
              "id": 14,
              "rowId": "583a34e4-ecc7-4b68-ba48-015d1d44b70e",
              "createBy": "system",
              "gmtCreate": "2021-11-17 17:30:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-17 17:30:22",
              "isDeleted": 0,
              "assetId": "b7b3d370-80dd-4292-b1f2-212e496fe897",
              "columnName": "first_name",
              "columnChName": "first_name",
              "columnType": "VARCHAR"
            },
            {
              "id": 15,
              "rowId": "2ccb291a-4881-4f9d-8e7c-423c92e37434",
              "createBy": "system",
              "gmtCreate": "2021-11-17 17:30:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-17 17:30:22",
              "isDeleted": 0,
              "assetId": "b7b3d370-80dd-4292-b1f2-212e496fe897",
              "columnName": "last_name",
              "columnChName": "last_name",
              "columnType": "VARCHAR"
            }
          ]
        },
        "tableData": {
          "upDateTime": "2021-11-18 17:40:33",
          "value": [
            {
              "id": 14,
              "rowId": "583a34e4-ecc7-4b68-ba48-015d1d44b70e",
              "createBy": "system",
              "gmtCreate": "2021-11-17 17:30:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-17 17:30:22",
              "isDeleted": 0,
              "assetId": "b7b3d370-80dd-4292-b1f2-212e496fe897",
              "columnName": "first_name",
              "columnChName": "first_name",
              "columnType": "VARCHAR"
            },
            {
              "id": 15,
              "rowId": "2ccb291a-4881-4f9d-8e7c-423c92e37434",
              "createBy": "system",
              "gmtCreate": "2021-11-17 17:30:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-17 17:30:22",
              "isDeleted": 0,
              "assetId": "b7b3d370-80dd-4292-b1f2-212e496fe897",
              "columnName": "last_name",
              "columnChName": "last_name",
              "columnType": "VARCHAR"
            },
            {
              "id": 16,
              "rowId": "eb4fc589-9bc4-42dc-b313-88d3fd156eed",
              "createBy": "system",
              "gmtCreate": "2021-11-17 17:30:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-17 17:30:22",
              "isDeleted": 0,
              "assetId": "b7b3d370-80dd-4292-b1f2-212e496fe897",
              "columnName": "email",
              "columnChName": "邮箱",
              "columnType": "VARCHAR"
            },
            {
              "id": 3,
              "rowId": "7f7d7529-7523-4d0f-9c0a-d3c749138667",
              "createBy": "system",
              "gmtCreate": "2021-11-09 11:19:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-09 11:19:22",
              "isDeleted": 0,
              "assetId": "38f77334-b4a5-4b78-995b-69dcf06920ff",
              "columnName": "dept_no",
              "columnChName": "部门编码",
              "columnType": "int",
              "businessType": "1"
            },
            {
              "id": 4,
              "rowId": "1751f9f8-464f-4ff3-b9dc-f95e88937ebc",
              "createBy": "system",
              "gmtCreate": "2021-11-09 11:19:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-09 11:19:22",
              "isDeleted": 0,
              "assetId": "38f77334-b4a5-4b78-995b-69dcf06920ff",
              "columnName": "addr",
              "columnChName": "地址",
              "columnType": "string",
              "businessType": "1"
            },
            {
              "id": 5,
              "rowId": "83a2cee3-9c1d-4f79-b048-bdf5c2005295",
              "createBy": "system",
              "gmtCreate": "2021-11-09 11:19:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-09 11:19:22",
              "isDeleted": 0,
              "assetId": "38f77334-b4a5-4b78-995b-69dcf06920ff",
              "columnName": "tel",
              "columnChName": "电话号码",
              "columnType": "string",
              "businessType": "1"
            },
            {
              "id": 6,
              "rowId": "efaefa38-d244-4a64-8de5-aa3c574b5307",
              "createBy": "system",
              "gmtCreate": "2021-11-09 11:19:22",
              "modifiedBy": "system",
              "gmtModified": "2021-11-09 11:19:22",
              "isDeleted": 0,
              "assetId": "38f77334-b4a5-4b78-995b-69dcf06920ff",
              "columnName": "person_count",
              "columnChName": "部门人数",
              "columnType": "int",
              "businessType": "1"
            }
          ]
        }
      }
    },
    "shape": "imageText",
    "ports": {
      "groups": {
        "top": {
          "position": "top",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        },
        "right": {
          "position": "right",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        },
        "bottom": {
          "position": "bottom",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        },
        "left": {
          "position": "left",
          "attrs": {
            "circle": {
              "r": 4,
              "magnet": true,
              "stroke": "#5F95FF",
              "strokeWidth": 1,
              "fill": "#fff",
              "style": {
                "visibility": "hidden"
              }
            }
          }
        }
      },
      "items": [
        {
          "group": "top",
          "id": "2e859125-5899-47e7-82d0-bbb2328a4398"
        },
        {
          "group": "right",
          "id": "2632388d-87de-4e04-ba39-0c165b2f8905"
        },
        {
          "group": "bottom",
          "id": "a18f35e7-113d-4f1b-936f-9044e97dd824"
        },
        {
          "group": "left",
          "id": "6591fe2f-f973-4ea5-9947-9f77461e737f"
        }
      ]
    },
    "id": "1894179d-78f9-4693-9964-658fc76dc699",
    "zIndex": 3
  }
]
