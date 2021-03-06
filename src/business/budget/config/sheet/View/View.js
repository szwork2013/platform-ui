import React from 'react';
import {connect} from 'dva'
import CopyButton from '../CopySheetButton';

import {View} from 'components';

import modelDefinition from '../model';
//取得模型名称
const modelName = modelDefinition.namespace;
//Layout组件
const Layout = (props) => {
  //定义操作条属性
  const actionBarProps = {
    new: true, //显示新增按钮
    delete: true, //显示删除按钮
    buttons: [<CopyButton />]
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
    columns: [ // 和antd table组件的列定义相同
      {title: '名称', width: 160, dataIndex: 'name', key: 'name', link: 'edit', sorter: true},
      {title: '简称', width: 160, dataIndex: 'simpleName', key: 'simpleName'},
      {title: '编码', width: 160, dataIndex: 'code', key: 'code', fullsorter: true},
      {title: '类型', width: 160, dataIndex: 'type', key: 'type', fullsorter: true},
      {title: '备注', dataIndex: 'remark', key: 'remark',fulltext: false,},
    ],
    rowSelection: {},
  };

//翻页器参数
  const paginationBarProps = {};

  return (
    <View key={modelName + 'ViewLayout'} {...props}
          modelName={modelName} //模型名称
          searchParam={searchParam}
          actionBar={actionBarProps} //操作条定义
          paginationBar={paginationBarProps} //翻页器定义
          list={listProps} //列表定义
          uid={modelName}
    />
  )

  function sheetCopy() {
    const {dispatch} = props;
    //发送消息显示对话框
    dispatch({
      type: 'modaldialog/show',
      payload: {
        iconType: 'copy',
        title: '拷贝',
        content: "拷贝",
        onOk: () => {
          dispatch({type: 'modaldialog/save', payload: {visible: false}});
          dispatch({
            type: 'plan_item/addRows',
            payload: {}
          });
        },
        style: "width:800px !important;",
      }
    });
  }
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
export default connect(({budget_sheet, loading, apptabs: {tabs}}) =>
  ({budget_sheet, loading: loading.models[modelName], tabs})
)(Layout);
