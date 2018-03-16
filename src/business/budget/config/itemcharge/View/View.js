import { Input, DatePicker } from 'antd';
import { View, DropdownSelect, Tree } from 'components';

//获取模型名称
import modelDefinition from '../model';
const modelName = modelDefinition.namespace;

import service from 'service';

const ViewComponent = (props) => {

  const actionBarProps = {
    new: false, //显示新增按钮
    delete: true, //显示删除按钮
    newRow: true,
  }
  let searchParam = { //搜索条件
    filter: { //过滤规则
      where: '1=1', //条件
    },
    size: 20, //指定每页记录数
    sort: 'o.id,desc' //缺省排序规则
  }

  const deptTree = orgTreeProps();
  const itemTree = itemTreeProps();
  const typeSelect = typeProps();

  //定义列表属性
  const listProps = {
    columns: [
      {
        type:'select',title: '部门 ', width: 200, dataIndex: 'chargeOrg', key: 'chargeOrg', sorter: true,
        editor: <DropdownSelect {...deptTree} />, textRender: (value, record) => {
          if (record.chargeOrgId) {
            let href = service.constructRecordUrl({ modelName: 'orgs', id: record.chargeOrgId });
            record.chargeOrg = record.chargeOrg ? record.chargeOrg : href;
          }
          return record.chargeOrgName;
        }
      },
      {
        type:'select',title: '数据项', width: 240, dataIndex: 'item', key: 'item', sorter: true,
        editor: <DropdownSelect {...itemTree} />, textRender: (value, record) => {
          if (record.itemId) {
            let href = service.constructRecordUrl({ modelName: 'budget_item', id: record.itemId });
            record.item = record.item ? record.item : href;
          }
          return record.itemName;
        }
      },
      { type:'select', title: '存取控制类型  ', dataIndex: 'type', key: 'type', sorter: true, editor: <DropdownSelect {...typeSelect} />, textRender: typeTextRender },
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

}
//构造机构树的属性
function orgTreeProps() {
  const props = props;
  const treeProps = {
    type: 'tree',
    labelKey: 'orgName',
    modelName: 'orgs',
    searchParam: {
      filter: {
        where: '1=1'
      },
      sort: ['o.sortNo,asc'],
    },
  };
  return treeProps;
}
//构造数据项树的属性
function itemTreeProps() {
  const props = props;
  const treeProps = {
    type: 'list',
    labelKey: 'name',
    modelName: 'budget_item',
    searchParam: {
      filter: {
        where: '1=1'
      },
      size: 1000, //指定每页记录数
      sort: ['o.id,asc'],
    },
  };
  return treeProps;
}
//构造类型的属性
function typeProps() {
  const props = props;
  const typesProps = {
    type: 'list',
    labelKey: 'name',
    options: [{ id: 2, name: '分管分解' }, { id: 3, name: '分管不分解' },]
  };
  return typesProps;
}
function typeTextRender(value, record) {
  if (value === 2) {
    return '分管分解';
  } else if (value === 3) {
    return '分管不分解';
  }

}
//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({ budget_item_charge, loading, apptabs: { tabs } }) =>
  ({ budget_item_charge, loading: loading.models[modelName], tabs })
)(ViewComponent);
