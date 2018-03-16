import React from 'react';

import {
  View,
} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

const ViewComponent = ( props ) => {
  //定义操作条属性
  const actionBarProps = {
    new: true, //显示新增按钮
    newPayloadRender: () => {return {}},
    delete: true, //显示删除按钮
    newRow: false,
  }

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      { title: '制度名称', dataIndex: 'name', key: 'name',sorter:true, link:'view'},
      { title: '发布单位',  width: 300,dataIndex: 'publishedOrg.orgName', key: 'publishedOrg.orgName',sorter:true,
        textRender: (value, record)=>record.publishedOrgName && record.publishedOrgName
      },
      { title: '发布日期', width: 100, dataIndex: 'publishedDate', key: 'publishedDate',sorter:true,
        fulltext:false, 
        textRender:(value)=>value&&value.split(' ')[0] },
    ],
    rowSelection: {}, //选择功能配置
    colDefaultLink: 'open',
  };

//定义过滤条件
  const searchParam = {
    filter: { //过滤规则
      where:'not o.publishedState=2',
    },
    size: 20, //指定每页记录数
    //排序规则：sortNo升序
    sort: ['o.publishedState,desc'],
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
export default connect(({institution_institutions, loading, apptabs:{tabs}}) =>
  ({institution_institutions, loading: loading.models[modelName], tabs})
)(ViewComponent);
