import { Cell } from '@antv/x6';
import dayjs from 'dayjs';
import TabelForm from './tabelForm';
import { ColumnsItem } from '@/components/TableFormItem/index.d'

// 加
export default class Index extends TabelForm {

  compute = '';

  constructor(cell: Cell) {
    super(cell);
    this.initFrom();
    this.compute = cell.attrs.moduleData.name as string;
  }

  initFrom() {
    this.createNameInput();


    this.createInput({
      name: 'newfieldname',
      label: '字段',
      value: this.getValue('newfieldname')
    })

    this.createInput({
      name: 'compute',
      label: '字段别名',
      value: this.getValue('compute')
    })

    this.createFromItem({
      tag: 'text',
      style: {
        textAlign: 'center',
      },
      text: `请选择两个需要相${this.compute}的字段`,
    })

    this.createFromItem({
      tag: 'hr',
    })

    this.initValue.forEach((item, index) => {
      const name = `addition_${index}`;
      this.createTable({
        ...item,
        name,
        value: this.getValue(name),
        columns: this.defaultColumns,
        isSelection: true,
        useColumns: (oldColumns: ColumnsItem[], changeColumns: ColumnsItem[]) => [
          ...oldColumns,
          ...changeColumns
        ],
      });
    })

  }

  necessary() {
    const data = this.getValues();
    const selectData = Object.entries(data)
      .filter(([, value]) => value.value && /^addition_[0-9]*$/.test(value.name))
      .map(([, value]) => value.value).flat();

    if (selectData?.length !== 2) {
      return this.error(`${this.node.attrs.label.text as string} 需要选择两项`)
    }
    return this.success({
      MODEL_PARAMS_COMPUTE_FIELD: [{
        ...(this.node.attrs.moduleData.attributes as any).MODEL_PARAMS_COMPUTE_FIELD[0],
        newFieldName: this.getValue('newfieldname'),
        newFieldAliasName: this.getValue('compute'),
        sourceFieldName: selectData[0].columnName,
        targetFieldName: selectData[1].columnName,
      }]
    })
  }

  // 序列化值
  format () {
    const data = this.getValues();
    console.log(this.initValue);
    const formatData = this.initValue;

    const selectData = Object.entries(data)
      .filter(([, value]) => value.value && /^addition_[0-9]*$/.test(value.name))
      .map(([, value]) => value.value).flat();

    const newColumn = this.addJourney({
      columnChName: this.getValue('compute'),
      columnName: "",
      gmtCreate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      gmtModified: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      id: `${this.node.id}_compute`,
      rowId: `${this.node.id}_compute`,
      columnType: `${this.compute}法运算`,
    },
    {
      prop: 'source',
      label: '来源',
      // eslint-disable-next-line no-underscore-dangle
      value: selectData.map((item) => `(${item.__source}/${item.columnChName})`).join(' + ')
    })
    const find = formatData.find((item) => item.title === (`运算`))
    if (!find) {
      formatData.push({
        title: `运算`,
        data: [newColumn],
      })
      return formatData
    }
    return formatData.map((item) => {
      if (item.title === (`运算`)) {
        item.data.push(newColumn);
        return item
      }
      return item;
    })

  }
}