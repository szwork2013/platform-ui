import React from 'react';
import {  Progress  } from 'antd';

import {
  View,
  DropdownSelect,
  ExportButton
} from 'components';

import service from 'service';
import wfservice from 'wfservice';
import { config } from 'utils';
const { api } = config; //取得RESTful api配置信息

import modelDefinition from '../../../publication/model';

//取得模型名称
const modelName = modelDefinition.namespace;

//权限定义表单
class ResultView extends React.Component {

  render() {
  let {
    conditionData,
  } = this.props;
  const actionBarProps = {
    barHeight:0,
    searchBar: false,
    newRow: false,
    new: false,
    delete:  false,
    saveTable: false,
    reloadTable:false,
    buttons:[]
  }

  //翻页器属性
  const paginationBarProps = {reloadButton:false};

    //定义搜索条件
    const searchParam = {
      filter:undefined,
      size:undefined,
      sort:undefined,
      search: 'get_statistic_data',
      ...conditionData,
    };

  //定义列表属性
  const listProps = {
    columns: this.constructColumns(),
  };

  //显示UI
  return (
    <View key={'publication' + 'ViewLayout'} {...this.props}
          searchParam={searchParam}
          heightOffset={-35}
          modelName={modelName} //模型名称
          actionBar={actionBarProps} //操作条定义
          list={listProps} //列表定义
          paginationBar={paginationBarProps}
    />
  )
  }

  constructColumns = () => {
     let columns = [ // 和antd table组件的列定义相同
        { title: '部门(单位)', width: 250, dataIndex: 'orgName', key: 'orgName' },
        { title: '年度指标(稿件总得分)', width: 150, dataIndex: 'targetGrade', key: 'targetGrade' },
        { title: '完成进度', width: 250, dataIndex: 'progress', key: 'progress',
         textRender:(value, record)=>{
         let percent=0;
         if(record.totalGrade>0&&record.targetGrade>0){
           percent=(record.totalGrade/record.targetGrade)*100
         }
         return <Progress percent={percent.toFixed(2)} style={{width:240}}/>
         }},
        { title: '总得分', width: 100, dataIndex: 'totalGrade', key: 'totalGrade' },
        { title: '采用稿件数', width: 110, dataIndex: 'usedDrafts', key: 'usedDrafts' },
        { title: '未采用稿件数', width: 120, dataIndex: 'notUsedDrafts', key: 'notUsedDrafts' },
        { title: '总稿件数', width: 100, dataIndex: 'totalDrafts', key: 'totalDrafts' },
      ];
    return columns;
  }

}
//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({ publication, loading }) =>
  ({ publication, loading: loading.models[modelName] })
)(ResultView);
