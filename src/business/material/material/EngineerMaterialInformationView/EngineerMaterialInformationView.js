import React from 'react';

import { Input, Checkbox, Select, InputNumber } from 'antd';
import { View, DropdownSelect } from 'components';
import service from 'service';
import modelDefinition from '../model';
const Option = Select.Option;
//取得模型名称
const modelName = modelDefinition.namespace;

const ViewComponent = (props) => {

  let buttons = [];
  buttons.push({
    title: '批量停产', OnClick: () => {
      props.dispatch({
        type: 'material/batchStopProduction',
        payload: { isStopProduction: 1 }
      })
    }
  });
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: true, //显示删除按钮
    newrowPayloadRender: () => {
      return {
        record: {
          _isNew: true, _key: (new Date().getTime() + ''), type: 4,
          year: new Date().getFullYear(), isStopProduction: '0', taxRate: 0.17
        }
      }
    },
    buttons
  }
  let searchParam = { //搜索条件
    filter: { //过滤规则
      clazz: 'Material', //模型对应的后台实体类
      where: 'o.type=4 and o.isStopProduction=0', //条件
    },
    size: 40, //指定每页记录数
    sort: ['o.year,desc', 'o.name,desc'] //缺省排序规则
  }
  const isStopProductionProps = isStopProductionTreeProps();
  //定义列表属性
  const listProps = {
    columns: [ // 和antd table组件的列定义相同
      // { title: '年度', width: 70, dataIndex: 'year', key: 'year', sorter: true, editor: <Input /> },
      { title: '物资名称', width: 120, dataIndex: 'name', key: 'name', sorter: true, editor: <Input /> },
      { title: '规格型号', width: 200, dataIndex: 'specification', key: 'specification', sorter: true, editor: <Input /> },
      { title: '单位', width: 70, dataIndex: 'measurementUnit', key: 'measurementUnit', sorter: true, editor: <Input /> },
      { title: '税率', width: 70, dataIndex: 'taxRate', key: 'taxRate', sorter: true, editor: <Input /> },
      { title: '转换关系(吨/米)', width: 140, dataIndex: 'convertRule', key: 'convertRule', sorter: true, editor: <Input /> },
      { title: '单价(含税)', width: 110, dataIndex: 'priceWithTax', key: 'priceWithTax', sorter: true, editor: <Input /> },
      { title: '产品编码', width: 100, dataIndex: 'code', key: 'code', sorter: true, editor: <Input /> },
      {
        type: 'select', width: 100, title: '是否停产', dataIndex: 'isStopProduction', key: 'isStopProduction', sorter: true,
        editor: <DropdownSelect {...isStopProductionProps} />, textRender: isStopProductionTextRender
      },
      { title: '备注', dataIndex: 'remark', key: 'remark', sorter: true, editor: <Input /> }
    ],
    rowSelection: {},
  };

  //翻页器属性
  const paginationBarProps = {};

  return (
    <View key={modelName + 'ViewLayout'} {...props}
      editMode='row' //编辑模式：单行编辑
      modelName={modelName} //模型名称
      searchParam={searchParam}
      actionBar={actionBarProps} //操作条定义
      list={listProps} //列表定义
      paginationBar={paginationBarProps}
    />
  )
}
//构造停用的属性
function isStopProductionTreeProps() {
  const props = props;
  const isStopProductionProps = {
    type: 'list',
    labelKey: 'name',
    options: [{ id: '0', name: '否' }, { id: '1', name: '是' },]
  };
  return isStopProductionProps;
}
function isStopProductionTextRender(value, record) {
  if (record.isStopProduction)
    record.isStopProduction = record.isStopProduction + '';
  else record.isStopProduction = '0';
  if ((record.isStopProduction == 0) && (record.isStopProduction + '')) {
    return '否';
  } else if ((record.isStopProduction == 1) && (record.isStopProduction + '')) {
    return '是';
  }
}
//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({ material, loading }) =>
  ({ material, loading: loading.models[modelName] })
)(ViewComponent);