import React from 'react';

import { Input } from 'antd';
import {View} from 'components';

import service from 'service';
import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

class Items extends React.Component {

  componentDidMount() {
    let {
      record,
      dispatch,
    } = this.props;
    dispatch({
      type: 'grade_target_item/initItems',
      payload: {
        record: record,
      }
    })
  }

  render() {
    const {record,canEdit,...rest} = this.props;
    let uid = service.getRecordId(record);

    //定义操作条属性
    const actionBarProps = {
      new: false, //显示新增按钮
      newRow: false,
      searchBar: false,
      barHeight:canEdit?undefined:0,
    }

    //定义列表属性
    const listProps = {
      columns: [ // 和antd table组件的列定义相同
        {title: '机构', width: 190, dataIndex: 'orgName', key: 'orgName'},
        {title: '采用稿件指标 ', width: 190, dataIndex: 'yearGradeTarget', key: 'yearGradeTarget', editor: <Input/>},
        {title: '备注', width: 190, dataIndex: 'remark', key: 'remark', editor: <Input/>},
      ],
    };

    return (
      <View key={modelName + 'ViewLayout'} {...rest}
            editMode={canEdit?'row':undefined}
            notQueryData={true}
            modelName={modelName} //模型名称
            actionBar={actionBarProps} //操作条定义
            list={listProps} //列表定义
            paginationBar={false}
            uid={uid}
      />
    )
  }
}
//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({grade_target_item, loading}) =>
  ({grade_target_item, loading: loading.models[modelName]})
)(Items);
