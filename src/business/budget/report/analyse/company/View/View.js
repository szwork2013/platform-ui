import React from 'react';
import {DropdownSelect, View} from 'components';
import modelDefinition from '../model';
import {connect} from 'dva';


const modelName = modelDefinition.namespace;

class ViewComponent extends React.Component {

  render() {
    let {
      conditionData = {},
      columnInfo,
    } = this.props;

    //定义操作条属性
    const actionBarProps = {
      barHeight:0,
      searchBar: false,
      newRow: false,
      new: false,
      delete: false,
      saveTable: false,
      reloadTable: false,
      buttons: []
    }
    //定义搜索条件
    const searchParam = {
      filter: undefined,
      size: undefined,
      sort: undefined,
      search: 'company',
      ...conditionData,
    };

    //定义列表属性
    const listProps = {
      scrollx: 3000,
      columns: columnInfo,
    }
    return (
      <View key={modelName + 'ViewLayout'} {...this.props}
            modelName={modelName} //模型名称
            searchParam={searchParam}
            actionBar={actionBarProps} //操作条定义
            list={listProps} //列表定义
            paginationBar={false}
            heightOffset={-80}
            notQueryData={true}
      />
    )
  }
}


export default connect(({budgetAnalyse, budgetAnalyse: {viewData}, loading}) =>
  ({budgetAnalyse, conditionData: viewData[0].conditionData,columnInfo:viewData[0].columnInfo, loading: loading.models[modelName]})
)(ViewComponent);
