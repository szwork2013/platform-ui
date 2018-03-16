import React from 'react';

import { Input, Checkbox, InputNumber } from 'antd';
import {View} from 'components';

import {accountingNumberFormat} from 'utils';
import service from 'service';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;


const ViewComponent = ( props ) => {
  const user = service.userInfo.user;
  //定义操作条属性
  const actionBarProps = {
    new: true, //显示新增按钮
    newPayloadRender:()=>{return {defaultValues:{type:6},processNo:'LBYPLY'}},
    delete: false, //显示删除按钮
    newRow: false
  }
  let searchParam={ //搜索条件
    filter: { //过滤规则
      clazz: 'MaterialDraw', //模型对应的后台实体类
      where: 'o.type=6 and org.id='+user.org.id,  //条件
    },
    size: 20, //指定每页记录数
    sort: 'o.id,desc' //缺省排序规则
  }

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      { title: '编号', width: 120,dataIndex: 'no', key: 'no', link: 'open', sorter:true},
      { title: '部门', width: 390, dataIndex: 'org.orgName', key: 'org.orgName',link:'open', sorter:true},
      { title: '备注', dataIndex: 'remark', key: 'remark', sorter:true },
    ],
    colDefaultLink: 'open',
  };

  //翻页器属性
  const paginationBarProps = {};

  return (
    <View key={modelName+'ViewLayout'} {...props}
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
export default connect(({material_draw, loading}) =>
  ({material_draw, loading: loading.models[modelName]})
)(ViewComponent);
