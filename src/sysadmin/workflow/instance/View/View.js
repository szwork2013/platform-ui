import {Input} from 'antd';

import {Attachment, View,} from 'components';

import modelDefinition from '../model';
//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import {connect} from 'dva';

//取得模型名称
const modelName = modelDefinition.namespace;

//Layout组件
const Layout = (props) => {
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: false, //显示删除按钮
  }

  //定义列表属性
  const listProps = {
    columns: [
      {title: '启动者id', width: 100, dataIndex: 'starterId', key: 'starterId', link: 'edit'},
      {title: '创建时间', width: 200, dataIndex: 'createdTime', key: 'createdTime', fulltext: false},
      {
        title: '所属流程id',
        width: 100,
        dataIndex: 'process.id',
        key: 'process.id',
        editor: <Input/>,
        textRender: (text, record) => record.processId
      },
      {
        title: '所属流程名称',
        dataIndex: 'process.name',
        key: 'process.name',
        textRender: (text, record) => record.processName
      },

    ],
    rowActions: [
      {title: '编辑', type: 'edit'},
      {title: '删除', type: 'deleteRow'},
    ],
  };

  //定义过滤条件
  const searchParam = {
    filter: {},
    linkAttrs: ['process'],
    sort: 'o.createdTime,desc',
  };

  return (
    <View key={modelName + 'ListView'} {...props}
          searchParam={searchParam}
          modelName={modelName}
          actionBar={actionBarProps}
          list={listProps}
    />
  )
}

export default connect(({workflow_runtime_instances, loading, apptabs: {tabs}}) =>
  ({workflow_runtime_instances, loading: loading.models[modelName], tabs})
)(Layout);
