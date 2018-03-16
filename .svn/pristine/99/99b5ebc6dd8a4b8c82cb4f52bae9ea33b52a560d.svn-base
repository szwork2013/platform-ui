import { Input, Checkbox, InputNumber } from 'antd';

import {
  View, Attachment,
} from 'components';

import modelDefinition from '../model';

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
      {title: '序号', width: 70, dataIndex: 'sortNo', key: 'sortNo', sorter:true, editor:<Input />},
      {title: '名称', width: 160, dataIndex: 'name', key: 'name', sorter:true, editor:<Input />},
      {title: '编号', width: 160, dataIndex: 'no', key: 'no', sorter:true, editor:<Input />},
      {title: '模板附件', type:'attachment', dataIndex: '_files', key: '_files',
        editor:<Attachment showDetail={false}/>, controlProps:{multiple: true}}
    ],
    rowActions:[
      { title:'编辑', type:'edit' },
      { title:'删除', type:'deleteRow' },
    ],
  };

  //定义过滤条件
  const searchParam = {
    filter:{
    },
    size:1000,
    //排序规则
    sort: 'o.sortNo,asc',
  };

  return (
    <View key={modelName + 'ListView'} {...props}
      editMode='row'
      searchParam={searchParam}
      modelName={modelName} //模型名称
      actionBar={actionBarProps} //操作条定义
      list={listProps} //列表定义
    />
  )
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import {connect} from 'dva';
export default connect(({template_excel, loading, apptabs:{tabs}}) =>
  ({template_excel, loading: loading.models[modelName], tabs})
)(Layout);
