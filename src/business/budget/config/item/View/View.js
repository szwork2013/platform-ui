import { Input, DatePicker } from 'antd';
import { View, DropdownSelect, Tree } from 'components';

//获取模型名称
import modelDefinition from '../model';
const modelName = modelDefinition.namespace;

import service from 'service';

const ViewComponent = (props) => {

  const actionBarProps = {
    new: false, //显示新增按钮
    delete: true, //显示删除按钮
    newRow: true,
  }
  let searchParam = { //搜索条件
    filter: { //过滤规则
      where: '1=1', //条件
    },
    size: 20, //指定每页记录数
    sort: 'o.id,desc' //缺省排序规则
  }
  //定义列表属性
  const listProps = {
    columns: [
      { title: '名称', width: 200, dataIndex: 'name', key: 'name', sorter: true, editor: <Input /> },
      { title: '排序号', width: 80, dataIndex: 'sortNo', key: 'sortNo', sorter: true, editor: <Input /> },
      { title: '编码', width: 300, dataIndex: 'code', key: 'code', sorter: true, editor: <Input /> },
      { title: '备注', dataIndex: 'remark', key: 'remark', sorter: true, editor: <Input.TextArea /> },
    ],
    rowSelection: {},
  };
  //翻页器属性
  const paginationBarProps = {};
  return (
    <View key={modelName + 'ViewLayout'} {...props}
      editMode='row' //编辑模式：单行编辑
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
export default connect(({ budget_item, loading, apptabs: { tabs } }) =>
  ({ budget_item, loading: loading.models[modelName], tabs })
)(ViewComponent);
