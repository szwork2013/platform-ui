import React from 'react';
import config from 'config';
import { Input } from 'antd';
import { AttachmentDownload, DropdownSelect, UploadButton, View } from 'components';
import modelDefinition from '../model';
import { connect } from 'dva';

//取得模型名称
const modelName = modelDefinition.namespace;
const { api } = config; //取得RESTful api配置信息
let { rootPath } = api;

const ViewComponent = (props) => {

  let { dispatch } = props;

  let searchParam = { //搜索条件
    filter: { //过滤规则
      clazz: 'Material', //模型对应的后台实体类
      where: 'o.type=0 and o.isStopProduction=0', //条件
    },
    size: 20, //指定每页记录数
    sort: ['o.year,desc', 'o.name,desc'] //缺省排序规则
  }

  const type = 'IT_CONSUMABLE';//耗材类型编码
  const uploadProps = {
    name: 'excel',
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    action: `${rootPath}/material/importExcel?type=${type}`,
    icon: "file-excel",
    onSuccess(info) {
      dispatch({
        type: 'material/query',
        payload: { queryType: undefined, searchParam }
      });
    },
  };

  const templateDownload = <AttachmentDownload id={2} fileName='物资导入模板.xls' title={'下载模板'}
    style={{ marginLeft: '15px' }} />
  const exportButton = <UploadButton {...uploadProps} style={{ marginLeft: '15px' }} />;
  //定义操作条属性

  let buttons = [];
  buttons.push({
    title: '批量停产', OnClick: () => {
      props.dispatch({
        type: 'material/batchStopProduction',
        payload: { isStopProduction: 1 }
      })
    }
  });
  buttons.push(exportButton);
  buttons.push(templateDownload);
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: true, //显示删除按钮
    buttons: buttons,
    newrowPayloadRender: () => {
      return {
        record: {
          _isNew: true, _key: (new Date().getTime() + ''),
          type: 0, year: new Date().getFullYear(), isStopProduction: '0', taxRate: 0.17
        }
      }
    },
  }

  const supplierSelect = supplierSelectProps();
  const isStopProductionProps = isStopProductionTreeProps();
  //定义列表属性
  const listProps = {
    columns: [ // 和antd table组件的列定义相同
      { title: '物资名称', width: 120, dataIndex: 'name', key: 'name', sorter: true, editor: <Input /> },
      { title: '规格型号', width: 300, dataIndex: 'specification', key: 'specification', sorter: true, editor: <Input /> },
      { title: '单位', width: 70, dataIndex: 'measurementUnit', key: 'measurementUnit', sorter: true, editor: <Input /> },
      { title: '税率', width: 70, dataIndex: 'taxRate', key: 'taxRate', sorter: true, editor: <Input /> },
      { title: '单价(含税)', width: 120, dataIndex: 'priceWithTax', key: 'priceWithTax', sorter: true, editor: <Input /> },
      { title: '产品编码', width: 120, dataIndex: 'code', key: 'code', sorter: true, editor: <Input /> },
      { title: '适用设备', width: 300, dataIndex: 'applyDevice', key: 'applyDevice', sorter: true, editor: <Input /> },
      {
        type: 'select', width:100, title: '是否停产', dataIndex: 'isStopProduction', key: 'isStopProduction', sorter: true,
        editor: <DropdownSelect {...isStopProductionProps} />, textRender: isStopProductionTextRender
      },
    ],
    rowSelection: {},
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


  function handleImport() {
    dispatch(
      { type: 'todo_link/moveToDone' }
    );
  }
}

//构造数据项树的属性
function supplierSelectProps() {
  const props = props;
  const supplierProps = {
    type: 'list',
    labelKey: 'name',
    modelName: 'material_supplier',
    searchParam: {
      filter: {
        where: '1=1'
      },
      sort: ['o.id,asc'],
    },
  };
  return supplierProps;
}

//构造停用的属性
function isStopProductionTreeProps() {
  const props = props;
  const isStopProductionProps = {
    type: 'list',
    labelKey: 'name',
    options: [{ id: '0', name: '否' }, { id: '1', name: '是' },]
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

export default connect(({ material, loading }) =>
  ({ material, loading: loading.models[modelName] })
)(ViewComponent);
