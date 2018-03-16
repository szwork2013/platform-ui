import {Input} from 'antd';
import {DropdownSelect, View} from 'components';
import modelDefinition, {typeOptions, useTypeOptions} from '../model';
import {connect} from 'dva';
import service from 'service';

const modelName = modelDefinition.namespace;

const ViewComponent = (props) => {

  const actionBarProps = {
    new: false, //显示新增按钮
    delete: true, //显示删除按钮
    newRow: true,
    newrowPayloadRender: () => {
      return {record: {_isNew: true, _key: (new Date().getTime() + ''), sourceUseType: '', targetUseType: '', type: ''}}
    }
  }
  let searchParam = { //搜索条件
    filter: { //过滤规则
      where: '1=1', //条件
    },
    size: 20, //指定每页记录数
    sort: 'o.sortNo' //缺省排序规则
  }

  const itemProps = {
    type: 'list',
    labelKey: 'name',
    modelName: 'budget_item',
    searchParam: {
      filter: {
        where: '',
      },
      sort: 'o.sortNo,asc',
      size: 1000,
    },
  };
  //定义列表属性
  const listProps = {
    columns: [
      {title: '编码', width: 150, dataIndex: 'name', key: 'name', editor: <Input/>},
      {title: '排序号', width: 100, dataIndex: 'sortNo', key: 'sortNo', sorter: true, editor: <Input/>},
      {
        title: '源数据项', width: 200, dataIndex: 'sourceItems', key: 'sourceItems', fulltext: false, type: 'select',
        editor: <DropdownSelect {...itemProps} controlId='sourceItems' multiple={true}
                                onSelect={(value, option, record) => {
                                  let selectedItemName = option.props.dataRef.name;
                                  record.sourceItemsNames = record.sourceItemsNames || [];
                                  if (!record.sourceItemsNames.includes(selectedItemName)) {
                                    record.sourceItemsNames.push(selectedItemName);
                                  }
                                }}/>,
        textRender: (value, record) => {
          if (record.sourceItemsIds && !record.sourceItems) {
            let hrefs = record.sourceItemsIds.map((id) => {
              return service.constructRecordUrl({modelName: 'budget_item', id: id});
            });
            record.sourceItems = hrefs ? hrefs : [];
          }
          return record.sourceItemsNames != null ? record.sourceItemsNames.join(',') : '';
        },
      },
      {
        title: '源类型', width: 200, dataIndex: 'sourceUseType', key: 'sourceUseType', fulltext: false,
        editor: <DropdownSelect type='list' labelKey='name' options={useTypeOptions}/>,
        textRender: (value, record) => {
          record.sourceUseType = record.sourceUseType ? record.sourceUseType + '' : '';
          let option = useTypeOptions.find((option) => option.id == value);
          return option && option.name;
        }
      },
      {
        title: '目标数据项', width: 200, dataIndex: 'targetItem', key: 'targetItem', fulltext: false, type: 'select',
        editor: <DropdownSelect {...itemProps} controlId='targetItem'
                                onSelect={(value, option, record) => {
                                  record.targetItemName = option.props.dataRef.name;
                                }}/>,
        textRender: (value, record) => {
          if (record.targetItemId && !record.targetItem) {
            let href = service.constructRecordUrl({modelName: 'budget_item', id: record.targetItemId});
            record.targetItem = href ? href : '';
          }
          return record.targetItemName || '';
        },
      },
      {
        title: '目标类型', width: 200, dataIndex: 'targetUseType', key: 'targetUseType', fulltext: false, type: 'select',
        editor: <DropdownSelect type='list' labelKey='name' options={useTypeOptions}/>,
        textRender: (value, record) => {
          record.targetUseType = record.targetUseType ? record.targetUseType + '' : '';
          let option = useTypeOptions.find((option) => option.id == value);
          return option && option.name;
        }
      },
      {
        title: '适用类型', width: 200, dataIndex: 'type', key: 'type', fulltext: false,
        editor: <DropdownSelect type='list' labelKey='name' options={typeOptions}/>,
        textRender: (value, record) => {
          record.type = record.type ? record.type + '' : '';
          let option = typeOptions.find((option) => option.id == value);
          return option && option.name;
        }
      },
      {title: '加法公式(只能+)', width: 200, dataIndex: 'formula', key: 'formula', fulltext: false, editor: <Input/>},
      {title: '备注', dataIndex: 'remark', key: 'remark', fulltext: false, editor: <Input/>},
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
          uid={modelName + 'ViewLayout'}
    />
  )

}


export default connect(({budget_numberrelation, loading, apptabs: {tabs}}) =>
  ({budget_numberrelation, loading: loading.models[modelName], tabs})
)(ViewComponent);
