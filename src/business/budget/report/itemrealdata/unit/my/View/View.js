import React from 'react';
import {Input} from 'antd';
import {DropdownSelect, View} from 'components';
import modelDefinition, {monthOptions, typeOptions, yearOptions} from '../model';
import {connect} from 'dva';

//取得模型名称
const modelName = modelDefinition.namespace;

const ViewComponent = (props) => {

  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: false, //显示删除按钮
  }
  let searchParam = { //搜索条件
    filter: { //过滤规则
      clazz: 'ItemRealData', //模型对应的后台实体类
      where: '1=1', //条件
    },
    size: 20, //指定每页记录数
    sort: 'o.id,desc' //缺省排序规则
  }

  //定义列表属性
  const listProps = {
    columns: [ // 和antd table组件的列定义相同
      {
        type: 'select', title: '年度', width: 100, dataIndex: 'year', key: 'year',
        fulltext: 'year',
        editor: <DropdownSelect type='list' labelKey='name' options={yearOptions}/>,
        textRender: (value, record) => {
          let option = yearOptions.find((option) => option.id === value);
          return option && option.name;
        },
      },
      {
        type: 'select', title: '月份', width: 60, dataIndex: 'month', key: 'month',
        fulltext: 'month',
        editor: <DropdownSelect type='list' labelKey='name' options={monthOptions}/>,
        textRender: (value, record) => {
          let option = monthOptions.find((option) => option.id === value);
          return option && option.name;
        },
      },
      {
        type: 'select', title: '用途类型', width: 130, dataIndex: 'useType', key: 'useType',
        fulltext: 'useType',
        editor: <DropdownSelect type='list' labelKey='name' options={typeOptions}/>,
        textRender: (value, record) => {
          let option = typeOptions.find((option) => option.id === value);
          return option && option.name;
        },
      },
      {title: 'ERP编码', width: 100, dataIndex: 'itemCode', key: 'itemCode', editor: <Input/>},
      {title: 'ERP名称', width: 100, dataIndex: 'itemName', key: 'itemName', editor: <Input/>},
      {title: '数据项值 ', width: 100, dataIndex: 'itemValue', key: 'itemValue', editor: <Input/>},
      {title: 'ERP部门编码 ', width: 100, dataIndex: 'deptCode', key: 'deptCode', editor: <Input/>},
      {title: '所属单位ID ', width: 100, dataIndex: 'unitId', key: 'unitId', editor: <Input/>},
    ],
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
          heightOffset={-45}
    />
  )
}


export default connect(({budget_itemrealdata, loading}) =>
  ({budget_itemrealdata, loading: loading.models[modelName]})
)(ViewComponent);
