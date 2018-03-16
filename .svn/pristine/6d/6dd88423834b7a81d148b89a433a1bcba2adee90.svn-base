import React from 'react';

import {View} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;


class ViewComponent extends React.Component {

  componentDidMount() {
    let {
      record,
      dispatch,
    } = this.props;
    dispatch({
      type: 'draft/initDataAndQuery',
    })
  }

   render() {
    //定义操作条属性
    const actionBarProps = {
      new: true, //显示新增按钮
      delete: false, //显示删除按钮
      newRow: false,
      newPayloadRender:()=>{return {processNo:'ZWXXGJ'}},
    }

    //定义列表属性
    const listProps = {
      columns: [ // 和antd table组件的列定义相同
        {title: '投稿日期', width: 150, dataIndex: 'createdTime', key: 'createdTime', link: 'open', sorter: true},
        {title: '标题', width: 390, dataIndex: 'subject', key: 'subject', link: 'open', sorter: true},
        {title: '状态', width: 150, dataIndex: 'workFlowStatus', key: 'workFlowStatus', sorter: true,
          textRender: (value)=>value?value:'起草'},
        {title: '备注', width: 190, dataIndex: 'remark', key: 'remark', sorter: true},
      ],
      colDefaultLink: 'open',
    };

    //翻页器属性
    const paginationBarProps = {};

    return (
      <View key={modelName + 'ViewLayout'} {...this.props}
            modelName={modelName} //模型名称
            actionBar={actionBarProps} //操作条定义
            list={listProps} //列表定义
            paginationBar={paginationBarProps}
            notQueryData={true}
      />
    )
  }
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({draft, loading}) =>
  ({draft, loading: loading.models[modelName]})
)(ViewComponent);
