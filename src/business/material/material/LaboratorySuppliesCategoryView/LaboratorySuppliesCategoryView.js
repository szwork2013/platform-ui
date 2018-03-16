import React from 'react';

import { Input, Checkbox, Select, InputNumber } from 'antd';
import { View, DropdownSelect } from 'components';
import service from 'service';
import modelDefinition from '../model';
const Option = Select.Option;
//取得模型名称
const modelName = modelDefinition.namespace;

const ViewComponent = (props) => {

  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: true, //显示删除按钮
    newrowPayloadRender:()=>{
      return {record:{_isNew: true,_key: (new Date().getTime()+''),type:9}}
    }
  }
  let searchParam = { //搜索条件
    filter: { //过滤规则
      clazz: 'Material', //模型对应的后台实体类
      where: 'o.type=9', //条件
    },
    size: 20, //指定每页记录数
    sort: 'o.id,desc' //缺省排序规则
  }
  //定义列表属性
  const listProps = {
    columns: [ // 和antd table组件的列定义相同
      { title: '分类名称', dataIndex: 'name', key: 'name', sorter: true, editor: <Input /> },
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
export default connect(({ material, loading }) =>
  ({ material, loading: loading.models[modelName] })
)(ViewComponent);
