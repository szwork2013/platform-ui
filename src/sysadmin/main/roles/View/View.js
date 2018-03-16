import React from 'react';

import { Input, Checkbox, InputNumber } from 'antd';

import {
  View
} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

//View组件
const ViewComponent = ( props ) => {
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: false, //显示删除按钮
    saveTablePayloadRender: (model)=>({defaultValues:{}})
  }

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      { title: '序号', width: 80, dataIndex: 'sortNo', key: 'sortNo',
        sorter: true, editor:<Input /> },
      { title: '名称', width: 200, dataIndex: 'name', key: 'name',
        sorter: true, editor:<Input /> },
      { title: '描述', width: 160, dataIndex: 'description', key: 'description',
        editor:<Input /> },        
      {title: '包含用户', dataIndex: 'userList', key: 'userList', fulltext: false,
        render: (text, record) => record.userList && record.userList.join(',')},
    ],
    rowActions:[
      { title:'编辑', type:'edit' },
      { title:'删除', type:'deleteRow' },
      { title:'查看', type:'view' },
    ],
  };

  //翻页器属性
  const paginationBarProps = {};

  //定义搜索条件
  const searchParam = {
    filter: { //过滤规则
    },
    sort: ['o.sortNo,asc', 'o.name,asc'],
    size: 10, //指定每页记录数
  };

  return (
    <View key={modelName+'ViewLayout'} {...props}
      searchParam={searchParam}
      editMode='row' //编辑模式：单行编辑
      modelName={modelName} //模型名称
      actionBar={actionBarProps} //操作条定义
      list={listProps} //列表定义
      paginationBar={paginationBarProps}
    />
  )
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva'
export default connect(({roles, loading, apptabs:{tabs}}) =>
  ({roles, loading: loading.models[modelName], tabs})
)(ViewComponent);