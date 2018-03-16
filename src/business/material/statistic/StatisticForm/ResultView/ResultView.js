import React from 'react';
import { DatePicker, Input } from 'antd';

import {
  View,
  DropdownSelect,
  ExportButton
} from 'components';

import service from 'service';
import wfservice from 'wfservice';
import { config } from 'utils';
const { api } = config; //取得RESTful api配置信息

import modelDefinition from '../../../common/PlanItems/model';
import materialService from '../../../server';

//取得模型名称
const modelName = modelDefinition.namespace;

//权限定义表单
class ResultView extends React.Component {

  render() {

  let {
    conditionData,
  } = this.props;

  let uid = 'wztj';
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
    footer: this.constructFooter,
  };

  //显示UI
  return (
    <View key={'plantItem' + 'ViewLayout' + uid} {...this.props}
          searchParam={searchParam}
          heightOffset={-35}
          modelName={modelName} //模型名称
          actionBar={actionBarProps} //操作条定义
          list={listProps} //列表定义
          uid={uid}
          paginationBar={paginationBarProps}
    />
  )
  }

  constructColumns = () => {
     let columns = [ // 和antd table组件的列定义相同
        { title: '物资名称', width: 150, dataIndex: 'material.name', key: 'material.name' },
        { title: '规格型号', width: 250, dataIndex: 'material.specification', key: 'material.specification' },
        { title: '单位', width: 80, dataIndex: 'material.measurementUnit', key: 'material.measurementUnit' },
        {
          title: '单价(含税)(元)', width: 135, dataIndex: 'material.priceWithTax',
          key: 'material.priceWithTax', textRender: (value, record) => Number(value).toFixed(2)
        },
        { title: '需求数量', width: 90, dataIndex: 'demandQuantity', key: 'demandQuantity' },
        {
         title: '需求总价(含税)(元)', width: 145, dataIndex: 'demandTotal', key: 'demandTotal',
         textRender: (value, record) => {
           let totalAmount = record.material.priceWithTax * record.demandQuantity;
           if(record.material.type=='ENGINEERING_MATERIALS'||record.material.type==4){
             totalAmount = record.material.priceWithTax * record.demandQuantity* record.material.convertRule;
           }
           return totalAmount.toFixed(2);
         }
        },
        { title: '采购数量', width: 90, dataIndex: 'purchaseQuantity', key: 'purchaseQuantity' },

        {
          title: '采购总价(元)', width: 145, dataIndex: 'purchasePrice', key: 'purchasePrice',
          textRender: (value, record) => {
            return value.toFixed(2);
          }
        },
      ];
    return columns;
  }

  //构造底部信息
  constructFooter = (list) => {
    if (!list) return '';
    let footer = '';
    let totalAmount = 0;
    let purchaseAmount = 0;
    list.map((item) => {
      totalAmount = totalAmount + (item.material.priceWithTax * item.demandQuantity);
      purchaseAmount=purchaseAmount+item.purchasePrice;
    });
    totalAmount = totalAmount.toFixed(2);
    purchaseAmount = purchaseAmount.toFixed(2);
    footer = '合计金额:    |    计划合计：' + totalAmount + '元。   |    采购合计:'+purchaseAmount+'元。';
    return footer;
  }

}
//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({ plan_item, loading }) =>
  ({ plan_item, loading: loading.models[modelName] })
)(ResultView);
