import {Attachment, View,} from 'components';
import modelDefinition from '../model';
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
      {
        title: '流程实例id',
        width: 130,
        dataIndex: 'instance.id',
        link: 'edit',
        key: 'instance.id',
        textRender: (text, record) => record.instanceId
      },
      {title: '执行者id', width: 90, dataIndex: 'executorId', key: 'executorId'},
      {title: '执行者名称', width: 300, dataIndex: 'executorName', key: 'executorName'},
      {
        title: '所处状态',
        width: 160,
        dataIndex: 'state.name',
        key: 'state.name',
        textRender: (text, record) => record.stateName
      },
      {title: '批次号', width: 300, dataIndex: 'batchNumber', key: 'batchNumber'},
      {
        title: '是否完成',
        dataIndex: 'completed',
        key: 'completed',
        type: 'checkbox',
        fulltext: false,
        textRender: (text, record) => record.completed ? '是' : '否'
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
    projection: 'list',
    linkAttrs: ['instance', 'state'],
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

export default connect(({workflow_runtime_todos, loading, apptabs: {tabs}}) =>
  ({workflow_runtime_todos, loading: loading.models[modelName], tabs})
)(Layout);
