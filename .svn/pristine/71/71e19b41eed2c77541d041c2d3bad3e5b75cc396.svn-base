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
    columns: [ // 和antd table组件的列定义相同
      {
        title: '所属流程实例id',
        width: 120,
        dataIndex: 'instance.id',
        link: 'edit',
        key: 'instance.id',
        textRender: (text, record) => record.instanceId
      },
      {title: '执行者id', width: 80, dataIndex: 'executorId', key: 'executorId'},
      {title: '执行者名称', width: 120, dataIndex: 'executorName', key: 'executorName'},
      {
        title: '执行时待办id',
        width: 100,
        dataIndex: 'executionTodo.id',
        key: 'executionTodo.id',
        textRender: (text, record) => record.executionTodoId
      },
      {title: '执行者所处状态名', width: 140, dataIndex: 'executionStateName', key: 'executionStateName'},
      {title: '操作id', width: 80, dataIndex: 'actionId', key: 'actionId'},
      {title: '操作名称', width: 100, dataIndex: 'actionName', key: 'actionName'},
      {title: '接收者id', width: 80, dataIndex: 'sendeeId', key: 'sendeeId'},
      {title: '接收者名称',dataIndex: 'sendeeName', key: 'sendeeName'},
      {
        title: '接收者待办id',
        width: 100,
        dataIndex: 'sendeeTodo.id',
        key: 'sendeeTodo.id',
        textRender: (text, record) => record.sendeeTodoId
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
    linkAttrs: ['instance', 'executionTodo', 'sendeeTodo'],
    //排序规则
    sort: 'o.createdTime,desc',
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


export default connect(({workflow_runtime_histories, loading, apptabs: {tabs}}) =>
  ({workflow_runtime_histories, loading: loading.models[modelName], tabs})
)(Layout);
