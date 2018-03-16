import React from 'react';

import {View} from 'components';

import {accountingNumberFormat} from 'utils';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;


const ViewComponent = ( props ) => {
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: false, //显示删除按钮
    newRow: false,
    newPayloadRender:()=>{return {processNo:'ZWXXFB'}},
  }
  let searchParam={ //搜索条件
    filter: { //过滤规则
      clazz: 'Publication', //模型对应的后台实体类
    },
    size: 20, //指定每页记录数
    sort: 'o.id,desc' //缺省排序规则
  }

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      {title: '标题', width: 390, dataIndex: 'subject', key: 'subject', link: 'open', sorter: true},
      {title: '编号', width: 150, dataIndex: 'number', key: 'number', sorter: true},
      {title: '发布日期', width: 150, dataIndex: 'publishDate', key: 'publishDate', sorter: true},
      {title: '备注', width: 190, dataIndex: 'remark', key: 'remark', sorter: true},
    ],
    colDefaultLink: 'open',
  };

  //翻页器属性
  const paginationBarProps = {};

  return (
    <View key={modelName+'ViewLayout'} {...props}
      modelName={modelName} //模型名称
      searchParam={searchParam}
      actionBar={actionBarProps} //操作条定义
      list={listProps} //列表定义
      paginationBar={paginationBarProps}
    />
  )
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({publication, loading}) =>
  ({publication, loading: loading.models[modelName]})
)(ViewComponent);
