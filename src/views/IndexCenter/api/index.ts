import request from "@/utils/request";
import * as Element from "element-plus";
import sysdict from "@/publicApi/sysdict";

const { ElMessage } = Element;

export type tableResult = {
  code: string;
  createBy: string;
  domain: string;
  flowLevel: string;
  flowStatus: number;
  flowType: number;
  fromType: number;
  gmtCreate: string;
  gmtModified: string;
  hasHistoryVersion: false;
  id: number;
  modifiedBy: string;
  name: string;
  rowId: string;
  startDate: string;
  topic: string;
  version: string;
};
type ResultList = {
  current: number;
  hitCount: boolean;
  optimizeCountSql: boolean;
  orders: any[];
  pages: number;
  records: tableResult[];
  searchCount: boolean;
  size: number;
  total: number;
};

export type Definition = {
  analyticalMethod: string;
  analyticalType: string;
  code: string;
  dataEngineer: string;
  dataFrom: string;
  dataManager: string;
  defContent: string;
  depart: string;
  domain: string;
  fetchType: string;
  formula: string;
  gradation: string;
  id: number;
  name: string;
  onlineStage: string;
  owner: string;
  rowId: string;
  scriptStr: string;
  topic: string;
  warnRule: string;
};

export type Solidify = {
  createBy: string;
  cron: string;
  cycleType: number;
  day: string;
  gmtCreate: string;
  gmtModified: string;
  healthStatus: number;
  id: number;
  lastSyncTime: string;
  modifiedBy: string;
  month: string;
  nextSyncTime: string;
  repeatInterval: number;
  repeatTimes: number;
  rowId: string;
  syncEnable: number;
  time: string;
  week: string;
};

//===========模型===============

//数据源
export type DataSources = {
  rowId: string;
  sourceName: string;
  sourceType: string;
};
//
export type InputFields = {
  dimension: string;
  desc: string;
  isVariable: boolean;
};
//
export type Modifications = {
  dimension: string;
  modification: string;
};

// 输入
type Detailinputs = {
  nodes: {
    dataSources: {
      nodes: DataSources[];
    };
    inputFields: {
      nodes: InputFields[];
    };
    modifications: {
      nodes: Modifications[];
    };
  }[];
};

//公式 或者图片
export type Detailprocess = {
  processType: number;
  value: string;
};
//输出
export type DetailoutputFields = {
  aliasName: string;
  name: string;
  paramType: string;
};

//权限
export type Detailrights = {
  dept: string;
  effectiveRule: string;
  rightRule: string;
  role: string;
};

//模型
export type Detail = {
  inputs: Detailinputs;
  outputFields: {
    nodes: DetailoutputFields[];
  };
  process: {
    nodes: Detailprocess[];
  };
  rights: {
    nodes: Detailrights[];
  };
};

//
export type Nodes = {
  nodeId: string;
  nodeName: string;
  noteType: number;
};
export type Relations = {
  fromId: string;
  fromType: number;
  toId: string;
  toType: number;
};

export type Blood = {
  nodes: Nodes[];
  relations: Relations[];
};
export type Rule = {
  code: string;
  codeType: number;
  description: string;
  serialNum: string;
};

export type DomainNode = {
  domain: string;
  rowId: string;
  total: number;
  totalComplex: number;
  totalExtend: number;
  totalOnline: number;
  totalOrigin: number;
};
export type DomainRelation = {
  fromId: string;
  toId: string;
  weightVal: number;
};
export type Domain = {
  nodes: DomainNode[];
  relations: DomainRelation[];
};

export type getIicindflowPageQuery = {
  domain?: string;
  flowType?: string;
  name?: string;
  code?: string;
  flowAttr?: string;
  parentId?: string;
};

class Service {
  static ElMessage = ElMessage;

  /**
   * 统计类型:1.领域 2.流程
   * 指标总览（领域）
   * @returns
   */
  static getDomainList(type: 1 | 2) {
    return request<Domain>({
      url: "/ddm-iic/flowManager/iicindflowdverview/domain/list",
      method: "get",
      params: {
        type,
      },
      json: true,
    });
  }

  // /**
  //  * 指标总览（分流程）
  //  * @returns
  //  */
  // static getDimensionList() {
  //   return request<Domain>({
  //     url: "/ddm-iic/flowManager/iicindflowdverview/dimension/list",
  //     method: "get",
  //     json: true,
  //   });
  // }

  //1.原子指标，2.衍生指标，3.复合指标，4.修饰词
  static getRule(codeType: number) {
    return request<Rule[]>({
      url: "/ddm-iic/indFlow/iicindCode/list",
      method: "get",
      params: {
        codeType: codeType,
      },
      json: true,
    });
  }

  /**
   * 台账分页
   * /ddm-iic/indFlow/iicindflow/page
   * @param data
   * @returns
   */
  static getIicindflowPage(
    data: {
      limit: number;
      page: number;
    } & getIicindflowPageQuery
  ) {
    return request<ResultList>({
      url: "/ddm-iic/indFlow/iicindflow/page",
      method: "get",
      params: data,
      json: true,
    });
  }

  /**
   *  获取指标定义
   * @param id
   * @returns
   */
  static getDefinition(id: number | string) {
    return request<Definition>({
      url: `/ddm-iic/indFlow/iicindflowdetail/definition/${id}`,
      method: "get",
      json: true,
    });
  }

  /**
   *  获取指标模型
   * @param id
   * @returns
   */
  static getDetail(id: number | string) {
    return request<Detail>({
      url: `/ddm-iic/flowManage/iicindflowmodel/detail/${id}`,
      method: "get",
      json: true,
    });
  }

  /**
   * 获取指标固化
   * @param id
   * @returns
   */
  static getSolidify(id: number | string) {
    return request<Solidify>({
      url: `/ddm-iic/indFlow/iicindflowsync/solidify/${id}`,
      method: "get",
      json: true,
    });
  }

  /**
   * 获取指标血缘
   * @param id
   * @returns
   */
  static getBlood(id: number | string) {
    return request<Blood>({
      url: `/ddm-iic/flowManage/detail/blood/${id}`,
      method: "get",
      json: true,
    });
  }

  /**
   *
   *获取领域
   * @static
   * @memberof Service
   */
  static getDomain = sysdict.getDomain;
  /**
   *
   *字典表-指标类型
   * @static
   * @memberof Service
   */
  static getFlowType = sysdict.getFlowType;
}

export default Service;
