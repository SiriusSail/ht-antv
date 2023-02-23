import request from '@/utils/request'
import axiosApiHooks from '@/hooks/axiosApiHooks';

export interface PageItem {
  limit: number,  //  每页显示记录数
  name?: string,  // 指标卡片名称
  order?: string, // 排序方式，可选值(asc、desc)
  orderField?: string, // 排序字段
  page: number,   // 当前页码，从1开始
}

export interface DraftsItem{
    cardContent: string,
    gmtCreate: string,
    gmtModified: string,
    id: number,
    isDeleted: number,
    name: string,
    rowId: string,
    status: number,
    createBy?:string,
    modifiedBy?:string,
}

export interface DraftsProp{
    current: number,
    hitCount: boolean,
    optimizeCountSql: boolean,
    orders: any[],
    pages: number,
    records: DraftsItem[],
    searchCount: boolean,
    size: number,
    total: number,
}

export default {
  // 保存草稿箱
  ApiSaveDrafts: (param:{content:string, name:string}) => request({
    url: `/ddm-iic/indicatorCard/iicindindicatorcard/sava/${param.name}`,
    method: 'post',
    data: {
      content: param.content
    },
    json: true
  }),
  // 获取草稿箱列表
  ApiGetDraftsList: (param:PageItem) => request<DraftsProp>({
    url: '/ddm-iic/indicatorCard/iicindindicatorcard/page',
    method: 'get',
    params: param,
    json: true
  }),
  // 删除草稿箱
  ApiDelDrafts: (param:string[]) => request({
    url: '/ddm-iic/indicatorCard/iicindindicatorcard',
    method: 'delete',
    data: param,
    json: true
  })
}