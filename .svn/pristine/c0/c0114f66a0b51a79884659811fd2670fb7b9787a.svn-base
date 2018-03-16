import React from 'react';

import { Input } from 'antd';
import {DropdownSelect,View} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;


const ViewComponent = ( props ) => {
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
  }

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      { title: '采用状态',width: 190, dataIndex: 'status', key: 'status', sorter:true,
        type: 'select', editor: <DropdownSelect {...statusSelectProps()} />, textRender: statusTextRender},
      { title: '基本分数', width: 190, dataIndex: 'grade', key: 'grade', sorter:true,editor: <Input/>},
      { title: '生效年度', width: 190, dataIndex: 'year', key: 'year', sorter:true,editor: <Input/>},
      { title: '备注', width: 290,dataIndex: 'remark', key: 'remark', sorter:true,editor: <Input/>},
    ],
  };

  //翻页器属性
  const paginationBarProps = {};

  return (
    <View key={modelName+'ViewLayout'} {...props}
      editMode={'row'}
      modelName={modelName} //模型名称
      actionBar={actionBarProps} //操作条定义
      list={listProps} //列表定义
      paginationBar={paginationBarProps}
    />
  )
}

function statusSelectProps() {
  const statusProps = {
    type: 'list',
    labelKey: 'name',
    options: [{id: '1', name: '已采用'}, {id: '0', name: '未采用'},]
  };
  return statusProps;
}

function statusTextRender(value, record) {
  if (record.status)
    record.status = record.status + '';
  else record.status = '0';
  if ((record.status == 0) && (record.status + '')) {
    return '未采用';
  } else if ((record.status == 1) && (record.status + '')) {
    return '已采用';
  }
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({grade_review_rule, loading}) =>
  ({grade_review_rule, loading: loading.models[modelName]})
)(ViewComponent);
