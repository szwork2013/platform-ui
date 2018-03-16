import React from 'react';

import {View} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;


const ViewComponent = ( props ) => {
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    newRow:false,
    buttons:[{type:'newGradeTarget',title:'新增',icon:'add'}]
  }

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      { title: '年度', width: 190, dataIndex: 'year', key: 'year', sorter:true,link:'open'},
      { title: '状态',width: 100, dataIndex: 'workFlowStatus', key: 'workFlowStatus', sorter:true,
        link:'open'},
      { title: '备注', width: 250,dataIndex: 'remark', key: 'remark', sorter:true,link:'open'},
    ],
  };

  //翻页器属性
  const paginationBarProps = {};

  return (
    <View key={modelName+'ViewLayout'} {...props}
          modelName={modelName} //模型名称
          actionBar={actionBarProps} //操作条定义
          list={listProps} //列表定义
          paginationBar={paginationBarProps}
    />
  )
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({grade_target, loading}) =>
  ({grade_target, loading: loading.models[modelName]})
)(ViewComponent);
