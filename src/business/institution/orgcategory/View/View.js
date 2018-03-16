import React from 'react';

import {
  ModuleLayout,
  Tree,
  View,
} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

class ViewComponent extends React.Component {

  render() {
    const props = this.props;

    //定义操作条属性
    const actionBarProps = {
      new: true, //显示新增按钮
      delete: true, //显示删除按钮
      newPayloadRender: (model) => (
        {defaultValues: {org: this.selectedOrgValue}}
      )
    }

    //定义列表属性
    const listProps = {
      columns:[ // 和antd table组件的列定义相同
        { title: '序号', width: 80, dataIndex: 'sortNo', key: 'sortNo',sorter: true },
        { title: '名称', dataIndex: 'name', key: 'name', link: 'edit', sorter: true },
      ],
      rowSelection: {}, //选择功能配置
      defaultExpandAllRows: true,
    };
    //定义过滤条件
    const searchParam = {
      filter: { //过滤规则
      },
      size: 20, //指定每页记录数
      //排序规则：sortNo升序
      sort: ['o.sortNo,asc'],
    };
    //翻页器属性
    const paginationBarProps = {};

    //sider属性
    const siderProps = {
      title: '选择机构',
      icon: 'fork',
      width: 200, 
      styled:'background: rgba(255,255,255,0.8) !important;',
      titleBar:{
        styled:'background: #ecf6fd !important;'
      }
    };

    return (
      <View key={modelName+'ViewLayout'} {...props}
        searchParam={searchParam}
        modelName={modelName} //模型名称
        actionBar={actionBarProps} //操作条定义
        paginationBar={paginationBarProps} //翻页器定义
        list={listProps} //列表定义
      />
    )
  }
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({institution_orgcategories, loading, apptabs:{tabs}}) =>
  ({institution_orgcategories, loading: loading.models[modelName], tabs})
)(ViewComponent);