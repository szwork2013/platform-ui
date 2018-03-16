import React from 'react';
import {connect} from 'dva'
import {
  ModuleLayout,
  Tree,
  View
} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

//Layout组件
const Layout = (props) => {
  //定义操作条属性
  const actionBarProps = {
    new: true, //显示新增按钮
    delete: true, //显示删除按钮
  }

  //定义列表属性
  const listProps = {
    columns: [ // 和antd table组件的列定义相同
      {title: '姓名', width: 90, dataIndex: 'name', key: 'name', link: 'edit'},
      {title: '用户名', width: 140, dataIndex: 'userName', key: 'userName', sorter:true, link: 'edit'},
      {title: '序号', width: 60, dataIndex: 'sortNo', key: 'sortNo'},
      {title: '机构', width: 260, dataIndex: 'org.orgName', key: 'org.orgName', sorter: true,
        textRender: (text, record)=>record.orgFullName, link: 'edit'},
      {title: '角色', dataIndex: 'roleList', key: 'roleList',  fulltext: false,
        textRender: (text, record) => record.roleList&&record.roleList.join(',')},
    ],
    rowSelection: {}, //选择功能配置
  };

  //定义过滤条件
  const searchParam = {
    filter:{
    },
    size:10,
    //排序规则
    sort: ['o.userName,asc'],
  };

  return (
    <View key={modelName + 'ListView'} {...props}
      searchParam={searchParam}
      modelName={modelName} //模型名称
      actionBar={actionBarProps} //操作条定义
      list={listProps} //列表定义
    />
  )
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
export default connect(({users, loading, apptabs:{tabs}}) =>
  ({users, loading: loading.models[modelName], tabs})
)(Layout);
