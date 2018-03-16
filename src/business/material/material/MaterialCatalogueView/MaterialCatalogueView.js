import React from 'react';
import {config} from 'utils';
import {Icon, Input} from 'antd';
import {DropdownSelect, View} from 'components';
import service from 'service';
import modelDefinition from '../model';
import {connect} from 'dva';

//取得模型名称
const modelName = modelDefinition.namespace;
const {api} = config; //取得RESTful api配置信息
let {rootPath} = api;
const ViewComponent = (props) => {

  let buttons = [];
  buttons.push({
    title: '批量停产', OnClick: () => {
      props.dispatch({
        type: 'material/batchStopProduction',
        payload: {isStopProduction: 1}
      })
    }
  });
  const type = 'IT_CONSUMABLE';//耗材类型编码
  let href = `${rootPath}/material/exportExcel?xpnToken=${service.userInfo.token.value}&type=${type}`;
  let exportButton = <a className='poplink' href={href} target='_blank' style={{marginLeft: '15px'}}><Icon
    type='download'/>导出</a>;
  buttons.push(exportButton);
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: true, //显示删除按钮
    newrowPayloadRender: () => {
      return {
        record: {
          _isNew: true, _key: (new Date().getTime() + ''), type: 0,
          year: new Date().getFullYear(), isStopProduction: '0', inAgreement: '1', taxRate: 0.17
        }
      }
    },
    buttons
  }
  let searchParam = { //搜索条件
    filter: { //过滤规则
      clazz: 'Material', //模型对应的后台实体类
      where: 'o.type=0 and o.isStopProduction=0', //条件
    },
    size: 20, //指定每页记录数
    sort: ['o.year,desc', 'o.name,desc'] //缺省排序规则
  }
  const supplierSelect = supplierSelectProps();
  const isStopProductionProps = isStopProductionTreeProps();
  const inAgreementProps = inAgreementTreeProps();
  const typeProps = typeTreeProps();
  //定义列表属性
  const listProps = {
    scrollx: 1400,
    columns: [ // 和antd table组件的列定义相同
      {title: '年度', width: 60, dataIndex: 'year', key: 'year', sorter: true, editor: <Input/>},
      {title: '物资名称', width: 100, dataIndex: 'name', key: 'name', sorter: true, editor: <Input/>},
      {
        type: 'select',
        title: '供应商',
        width: 200,
        dataIndex: 'supplier',
        key: 'supplier',
        sorter: true,
        editor: <DropdownSelect {...supplierSelect} />,
        textRender: (value, record) => {
          if (record.supplierId && !record.supplier) {
            let href = service.constructRecordUrl({modelName: 'material_supplier', id: record.supplierId});
            record.supplier = href ? href : '';
          }
          return record.supplierName;
        }
      },
      {title: '规格型号', dataIndex: 'specification', key: 'specification', sorter: true, editor: <Input/>},
      {title: '单位', width: 65, dataIndex: 'measurementUnit', key: 'measurementUnit', sorter: true, editor: <Input/>},
      {title: '税率', width: 65, dataIndex: 'taxRate', key: 'taxRate', sorter: true, editor: <Input/>},
      {title: '单价(含税)', width: 100, dataIndex: 'priceWithTax', key: 'priceWithTax', sorter: true, editor: <Input/>},
      {title: '产品编码', width: 100, dataIndex: 'code', key: 'code', sorter: true, editor: <Input/>},
      {title: 'ERP编码', width: 100, dataIndex: 'erpCode', key: 'erpCode', sorter: true, editor: <Input/>},
      {
        title: '耗材类型', width: 120, dataIndex: 'subType', key: 'subType', sorter: true,
        editor: <DropdownSelect {...typeProps} />, textRender: typeTextRender
      },
      {
        type: 'select', width: 145, title: '是否在框架协议内', dataIndex: 'inAgreement', key: 'inAgreement', sorter: true,
        editor: <DropdownSelect {...inAgreementProps} />, textRender: inAgreementTextRender
      },
      {
        type: 'select', width: 100, title: '是否停产', dataIndex: 'isStopProduction', key: 'isStopProduction', sorter: true,
        editor: <DropdownSelect {...isStopProductionProps} />, textRender: isStopProductionTextRender
      },
      {title: '适用设备', width: 135, dataIndex: 'applyDevice', key: 'applyDevice', sorter: true, editor: <Input/>}
    ],
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

//构造数据项树的属性
function supplierSelectProps() {
  const supplierProps = {
    type: 'list',
    labelKey: 'name',
    modelName: 'material_supplier',
    searchParam: {
      filter: {
        where: 'o.type=0'
      },
      sort: ['o.id,asc'],
    },
    onSelect: (value, option, record) => {
      record.supplierName = option.props.dataRef.name;
    }
  };
  return supplierProps;
}

//构造停用的属性
function isStopProductionTreeProps() {
  const props = props;
  const isStopProductionProps = {
    type: 'list',
    labelKey: 'name',
    options: [{id: '0', name: '否'}, {id: '1', name: '是'},]
  };
  return isStopProductionProps;
}

function isStopProductionTextRender(value, record) {
  if (record.isStopProduction)
    record.isStopProduction = record.isStopProduction + '';
  else record.isStopProduction = '0';
  if ((record.isStopProduction == 0) && (record.isStopProduction + '')) {
    return '否';
  } else if ((record.isStopProduction == 1) && (record.isStopProduction + '')) {
    return '是';
  }
}

//构造框架协议的属性
function inAgreementTreeProps() {
  const props = props;
  const inAgreementProps = {
    type: 'list',
    labelKey: 'name',
    options: [{id: '1', name: '是'}, {id: '0', name: '否'},]
  };
  return inAgreementProps;
}

function inAgreementTextRender(value, record) {
  if (record.inAgreement)
    record.inAgreement = record.inAgreement + '';
  else record.inAgreement = '0';
  if ((record.inAgreement == 0) && (record.inAgreement + '')) {
    return '否';
  } else if ((record.inAgreement == 1) && (record.inAgreement + '')) {
    return '是';
  }
}

//构造耗材类型树的属性
function typeTreeProps() {
  const props = props;
  const treeProps = {
    type: 'list',
    labelKey: 'name',
    options: [{id: '0', name: '一般耗材'}, {id: '1', name: '惠普耗材'}]
  };
  return treeProps;
}

function typeTextRender(value, record) {
  if (record.subType)
    record.subType = record.subType + '';
  else record.subType = '0';
  if ((record.subType == 0) && (record.subType + '')) {
    return '一般耗材';
  } else if ((record.subType == 1) && (record.subType + '')) {
    return '惠普耗材';
  }
}

export default connect(({material, loading}) =>
  ({material, loading: loading.models[modelName]})
)(ViewComponent);
