import React from 'react';

import { Input, Checkbox, InputNumber } from 'antd';
import { View } from 'components';

import { accountingNumberFormat } from 'utils';

import modelDefinition from '../../../itconsumable/purchase/model';

//取得模型名称
const modelName = modelDefinition.namespace;


const ViewComponent = (props) => {
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    newPayloadRender: () => { return { defaultValues: { orgLevel: 0, type: 9 }, processNo: 'ITHCCG_10' } },
    delete: false, //显示删除按钮
    newRow: false
  }
  let searchParam = { //搜索条件

    filter: { //过滤规则
      clazz: 'PurchasePlan', //模型对应的后台实体类
      where: 'o.type=9 and o.orgLevel=0', //条件
    },
    size: 20, //指定每页记录数
    sort: 'o.id,desc' //缺省排序规则
  }

  //定义列表属性
  const listProps = {
    columns: [ // 和antd table组件的列定义相同
      { title: '年度', width: 190, dataIndex: 'year', key: 'year', link: 'open', sorter: true },
      { title: '月份', width: 190, dataIndex: 'month', key: 'month', link: 'open', sorter: true },
      { title: '批次号', width: 190, dataIndex: 'batchNo', key: 'batchNo', sorter: true },
      { title: '填报时间', width: 190, dataIndex: 'createdTime', key: 'createdTime', fulltext: false, sorter: true },
      { title: '填报人', width: 150, dataIndex: 'createdBy.name', key: 'createdBy.name', sorter: true, },
      { title: '备注', width: 190, dataIndex: 'remark', key: 'remark', sorter: true },
    ],
    colDefaultLink: 'open',
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
export default connect(({ purchase_plan, loading }) =>
  ({ purchase_plan, loading: loading.models[modelName] })
)(ViewComponent);
