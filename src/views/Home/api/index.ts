import request from '@/utils/request'

type ProfileProp = {
  result: {
    userLabels?: string,
  },
}

export type FlowItem = {
  dimension: string,
  domainDetail:{
    domain: string,
    total: number,
  }[],
  rowId: string,
  total: number,
  bgImage?:string,
  totalOnline: number,
  options1?: any
  options2?: any
}

// 节点类型
export interface NodeItem {
  domain: string,  // 标题
  rowId: string,
  total: number,   // 总数
  totalComplex: number, // 复合指标
  totalExtend: number, // 衍生指标
  totalOnline: number,
  totalOrigin: number, // 原子指标
}

// 节点之间的关系类型
export interface MyHelpItem {
  chartData: {
    xData: string[],
    yData: number[],
  },
  finishedTotal: number,
  helpTotal: number,
}

// 节点之间的关系类型
export interface RelationsItem {
  fromId: string,
  toId: string,
  weightVal: number | string,
}

interface NodeObj {
  shape: string,
  id: number | string,
  x: number,
  y: number,
  width: number,
  height: number,
  component: any
}

interface edgesObj {
  attrs: {
    fill: any,
    text: any,
  },
  connector: {
    args: {total: number, index: number},
    name: string
  },
  labels: any[],
  markup: any[],
  router: {
    args: any,
    name: string
  },
  source: string,
  target: string,
  vertices?: undefined
}

export type FlowDynamicProp = {
  nodes: NodeObj[],
  edges: edgesObj[],
}

export interface MyTaskItem {
    1?: number,
    2?: number,
    3?: number,
    4?: number,
    5?: number,
    6?: number,
    7?: number,
    8?: number,
    9?: number,
    10?: number,
    11?: number,
    pending: number,
    haveInHand: number,
    taskTotal: number
}
type MyTaskProp = {
  result: MyTaskItem,
  pending?: number,
  haveInHand?: number,
  taskTotal?: number
}

type MyHelpProp = {
  result: MyHelpItem,
  finishedTotal?: number,
  helpTotal?: number,
  chartData: {
    xData: string[],
    yData: number[],
  },
}

type TargetFlowProp = {
  result: FlowItem[]
}

type TargetFileProp = {
  result: {
    nodes: NodeItem[],
    relations: RelationsItem[],
  }
}

// 我的任务
export const ApiMyTask = () => request<MyTaskProp>({
  url: '/ddm-iic/dem/demand/myDemandTask',
  method: 'get',
  json: true
})

// 我的求助
export const ApiForMyHelp = () => request<MyHelpProp>({
  url: '/ddm-iic/help/iichelp/homePageStatistics',
  method: 'get',
  json: true
})

// 我的画像
export const ApiPortraitProfile = () => request<ProfileProp>({
  url: '/ddm-iic/sys/sysuser/detail',
  method: 'get',
  json: true
})

// 指标总览（分流程）
export const ApiTargetFlow = () => request<TargetFlowProp>({
  url: '/ddm-iic/flowManager/iicindflowdverview/dimension/list',
  method: 'get',
  json: true
})


// 指标总览（领域）
export const ApiTargetfield = () => request<TargetFileProp>({
  url: '/ddm-iic/flowManager/iicindflowdverview/domain/list',
  method: 'get',
  json: true
})



export default { }
