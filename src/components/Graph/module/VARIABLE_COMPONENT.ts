import { Cell } from "@antv/x6";
import TabelForm from "./tabelForm";
import { ColumnsItem } from "@/components/TableFormItem/index.d";

// 数组 去重，大小，平均，求和，计数
export default class Index extends TabelForm {
  compute = "";

  constructor(cell: Cell) {
    super(cell);
    this.initFrom();
    this.compute = cell.attrs.moduleData.name as string;
  }

  async initFrom() {
    this.createNameInput();

    this.initValue.forEach((item, index) => {
      const name = `varValue_${index}`;
      this.createTable({
        ...item,
        name,
        value: this.getValue(name),
        columns: this.defaultColumns,
        isSelection: true,
        useColumns: (
          oldColumns: ColumnsItem[],
          changeColumns: ColumnsItem[]
        ) => [...oldColumns, ...changeColumns],
        useChange: (newValue) => {
          console.log(newValue);
          return newValue;
        },
      });
    });

    const data = this.getValues();
    const selectData = Object.entries(data)
      .filter(
        ([, value]) => value.value && /^varValue_[0-9]*$/.test(value.name)
      )
      .map(([, value]) => value.value)
      .flat();
    console.log(data, selectData);
    console.log(
      Object.entries(data).filter(
        ([, value]) => value.value && /^varValue_[0-9]*$/.test(value.name)
      )
    );
    selectData.forEach((item, index) => {
      this.createFromItem({
        tag: "hr",
      });
      this.createFromItem({
        tag: "text",
        text: `字段名称: ${item.columnChName}`,
      });
      this.createSelect({
        name: `select_${index}`,
        value: this.getValue(`select_${index}`),
        label: "接入方式",
        options: [
          {
            label: "eq",
            value: "eq",
          },
        ],
      });
    });
  }

  necessary() {
    const data = this.getValues();
    const funcName = (this.node.attrs.moduleData.attributes as any)
      .MODEL_PARAMS_FUNC_FIELD?.[0].funcName;
    const selectData = Object.entries(data)
      .filter(
        ([, value]) => value.value && /^addition_[0-9]*$/.test(value.name)
      )
      .map(([, value]) => value.value)
      .flat()
      .map((item) => ({
        fieldName: item.columnName,
        funcName,
      }));
    if (selectData.length < 0) {
      return this.error(`${this.node.attrs.label.text as string} 缺少选择项`);
    }
    return this.success({
      MODEL_PARAMS_FUNC_FIELD: selectData,
    });
  }

  // 序列化值
  format() {
    // 获取原本数据
    const data = this.getValues();

    // 获取选择的数据
    const selectData = Object.entries(data)
      .filter(
        ([, value]) => value.value && /^duplicateValue_[0-9]*$/.test(value.name)
      )
      .map(([, value]) => value.value)
      .flat();

    // 修改原始数据
    const formatData = this.initValue.map((item) => ({
      title: item.title,
      data: item.data.map((item2: any) => {
        const find = selectData.find(
          (diffItem: any) => diffItem.rowId === item2.rowId
        );
        console.log(selectData);
        if (!find) return item2;
        const newProps: any = {
          prop: `duplicateValue_${this.compute}`,
          label: `${this.compute}操作`,
          value: this.node.attrs.label.text,
        };
        return this.addJourney(item2, newProps);
      }),
    }));
    console.log(formatData);
    return formatData;
  }
}
