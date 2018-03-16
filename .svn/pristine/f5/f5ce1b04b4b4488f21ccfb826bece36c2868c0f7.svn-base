import React from 'react';
import { connect } from 'dva'

import {
  View
} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

//Layout组件
const Layout = ( props ) => {
  const {
    dispatch
  } = props;
  //定义操作条属性
  const actionBarProps = {
    new: true, //显示新增按钮
    delete: true, //显示删除按钮
  }

  //机构类型
  const orgTypeOptions = [
    {name: '公司', id: 1}, 
    {name: '部门', id: 2}, 
    {name: '子公司', id: 3}, 
    {name: '工作组', id: 4},
    {name: '场站', id: 5},
    {name: '领导', id: 6},
    {name: '其他', id: 99},
  ];

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      { title: '名称', dataIndex: 'orgName', key: 'orgName', link: 'edit', sorter: true },
      { title: '类型', width: 80, dataIndex: 'type', key: 'type', sorter: true,
        textRender: (value, record)=>value?orgTypeOptions.find(r=>r.id==value).name:'***'},
      { title: '序号', width: 70, dataIndex: 'sortNo', key: 'sortNo', sorter: true },
      { title: '机构编码', width: 120, dataIndex: 'orgCode', key: 'orgCode', sorter: true },
    ],
    rowSelection: {}, //选择功能配置
    defaultExpandAllRows: true,
  };

  //翻页器参数
  const paginationBarProps = { pagination: false };

  //定义搜索条件
  const searchParam = {
    filter: {
    },
    size: 1000,
    treedata: true,
    sort: ['o.sortNo,asc'],
  }

  return (
    <View key={modelName+'ViewLayout'} {...props}
      modelName={modelName} //模型名称
      searchParam={searchParam}
      actionBar={actionBarProps} //操作条定义
      paginationBar={paginationBarProps} //翻页器定义
      list={listProps} //列表定义
    />
  )
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
export default connect(({orgs, loading, apptabs:{tabs}}) =>
  ({orgs, loading: loading.models[modelName], tabs})
)(Layout);
