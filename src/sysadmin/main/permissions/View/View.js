import React from 'react';

import { Input, Checkbox, InputNumber } from 'antd';

import {
  View
} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

const ViewComponent = ( props ) => {
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: false, //显示删除按钮
  }

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      { title: '名称', width: 160, dataIndex: 'name', key: 'name',
        sorter:true, editor:<Input.TextArea /> },
      { title: '编号', width: 200, dataIndex: 'no', key: 'no',
        sorter:true, editor:<Input.TextArea /> },
      { title: '规则', dataIndex: 'authorizationRule', key: 'authorizationRule', editor:<Input.TextArea /> },
      { title: '启用', width: 70, dataIndex: 'enable', key: 'enable', fulltext: false,
        sorter:true, editor: <Checkbox>启用</Checkbox>, type:'checkbox'},
      { title: '描述', width: 200, dataIndex: 'description', key: 'description',
        editor:<Input.TextArea /> },
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
    size: 20, //指定每页记录数
    sort: 'no,asc' //缺省排序规则
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
import { connect } from 'dva';
export default connect(({permissions, loading}) =>
  ({permissions, loading: loading.models[modelName]})
)(ViewComponent);
