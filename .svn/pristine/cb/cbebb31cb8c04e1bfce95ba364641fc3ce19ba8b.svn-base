import React from 'react';

import {
  View,
} from 'components';

import service from 'service';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

const ViewComponent = ( props ) => {
  //定义操作条属性
  const actionBarProps = {
    new:true, //显示新增按钮
    newPayloadRender: () => {return {}},
    delete: service.authz('institution.admin'), //显示删除按钮
    newRow: false,
  }

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      { title: '文件名称', dataIndex: 'name', key: 'name',sorter:true, link:'edit'},
      { title: '组织分类', dataIndex: 'category.name', key: 'category.name',sorter:true,
        textRender: (value, record)=>record.categoryFullName && record.categoryFullName
      },
    ],
    rowSelection: service.authz('institution.admin') ? {} : undefined, //选择功能配置
    colDefaultLink: 'view',
  };

  //定义过滤条件
  const searchParam = {
    filter: { //过滤规则
    },
    size: 20, //指定每页记录数
    //排序规则：sortNo升序
    sort: ['o.name,asc'],
  };

 //翻页器属性
  const paginationBarProps = {};

  return (
    <View key={modelName + 'ViewLayout'} {...props}
      searchParam={searchParam}
      modelName={modelName} //模型名称
      actionBar={actionBarProps} //操作条定义
      paginationBar={paginationBarProps} //翻页器定义
      list={listProps} //列表定义
    />
  )
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({institution_introduceorg, loading, apptabs:{tabs}}) =>
  ({institution_introduceorg, loading: loading.models[modelName], tabs})
)(ViewComponent);
