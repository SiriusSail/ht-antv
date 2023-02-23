// 类型卡片
import { Nodes, Relations } from "../api/index";

class RenderTypeCard {
  //渲染矩形
  renderRect(node: Nodes) {
    return {
      name: node.nodeId,
      value: 10,
      label: {
        fontSize: 12,
        formatter: node.nodeName,
      },
      tooltip: {
        formatter(params: any) {
          return params.data.label.formatter;
        },
      },
      symbol: "rect",
    };
  }
  //渲染三角形
  renderTriangle(node: Nodes) {
    return {
      name: node.nodeId,
      value: 10,
      label: {
        fontSize: 12,
        formatter: node.nodeName,
      },
      tooltip: {
        formatter(params: any) {
          return params.data.label.formatter;
        },
      },
      symbol: "triangle",
    };
  }
  // 渲染菱形
  renderDiamond(node: Nodes) {
    return {
      name: node.nodeId,
      value: 10,
      label: {
        fontSize: 12,
        formatter: node.nodeName,
      },
      tooltip: {
        formatter(params: any) {
          return params.data.label.formatter;
        },
      },
      symbol: "diamond",
    };
  }
  //渲染圆形
  renderCircle(node: Nodes) {
    return {
      name: node.nodeId,
      value: 10,
      label: {
        fontSize: 12,
        formatter: node.nodeName,
      },
      tooltip: {
        formatter(params: any) {
          return params.data.label.formatter;
        },
      },
      symbol: "circle",
    };
  }
  // pin
  rendrPin(node: Nodes) {
    return {
      name: node.nodeId,
      value: 10,
      label: {
        fontSize: 12,
        formatter: node.nodeName,
      },
      tooltip: {
        formatter(params: any) {
          return params.data.label.formatter;
        },
      },
      symbol: "pin",
    };
  }

  //"节点类型:1.指标 圆形 2.数据源 pin 3.数据资产 矩形 4.数据卡片 三角形 5.组件 菱形")
  //类型判断渲染卡片
  selectRander(node: Nodes) {
    if (node.noteType === 1) {
      return this.renderCircle(node); //圆形
    } else if (node.noteType === 2) {
      return this.renderDiamond(node); // 矩形
    } else if (node.noteType === 3) {
      return this.renderRect(node); // 矩形
    } else if (node.noteType === 4) {
      return this.renderTriangle(node); //三角形
    } else if (node.noteType === 5) {
      return this.renderDiamond(node); //菱形
    }
  }

  // 渲染
  getLinks(link: Relations) {
    return {
      source: link.fromId,
      target: link.toId,
      tooltip: {
        // formatter(params: any) {
        //   console.log(params);
        //   return "{b}";
        // },
      },
    };
  }
}

export default RenderTypeCard;
