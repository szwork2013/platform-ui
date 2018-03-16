import React from 'react';
import {Input} from 'antd';
import {DropdownSelect, View} from 'components';
import service from 'service'
import modelDefinition from '../model';
import {connect} from 'dva';

const modelName = modelDefinition.namespace;

const ViewComponent = (props) => {

  const {record, dispatch} = props;
  let recordId = record && service.getRecordId(record);
  let recordUrl = record && service.getHrefOfLinkAttr(record);
  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    newRow: false,
    delete: true, //显示删除按钮
    buttons: [{
      title: '新增', OnClick: () => {
        dispatch({
          type: 'sheetcol/addRows',
          payload: {
            sheetUrl: recordUrl,
            dataKey: recordId
          }
        });
      }
    }],
  }

  let where = '1=1';
  if (recordId && recordId !== -1) {
    where += 'and o.sheet.id=' + recordId;
  }
  let searchParam = { //搜索条件
    filter: { //过滤规则
      clazz: 'SheetCol', //模型对应的后台实体类
      where: where, //条件
    },
    size: 100, //指定每页记录数
    sort: 'o.pyXuHao,asc' //缺省排序规则
  }
  //类型选项
  const typeProps = {
    type: 'list',
    labelKey: 'name',
    options: [{id: '0', name: '类型0'}, {id: '1', name: '类型1'},
      {id: '2', name: '类型2'}, {id: '3', name: '类型3'},
      {id: '4', name: '类型4'}, {id: '5', name: '类型5'},
      {id: '6', name: '类型6'}, {id: '7', name: '类型7'},
      {id: '8', name: '类型8'}, {id: '9', name: '类型9'},
      {id: '10', name: '类型10'}, 
      {id: '99', name: '备注'}]
  };

  function typeRender(value, record) {
    const array = typeProps.options;
    if (value || value == 0) {
      for (let i = 0; i < array.length; i++) {
        if (value == array[i].id) {
          return array[i].name;
        }
      }
    }
  }

  //使用类型选项
  const useTypeProps = {
    type: 'list',
    labelKey: 'name',
    options: [{id: '0', name: '其他业务支出'}, {id: '1', name: '管理费用'},
      {id: '2', name: '营业外支出'}]
  };

  function useTypeRender(value, record) {
    const array = useTypeProps.options;
    if (value || value == 0) {
      for (let i = 0; i < array.length; i++) {
        if (value == array[i].id) {
          return array[i].name;
        }
      }
    }
  }

  //是否可编辑
  const canEditProps = {
    type: 'list',
    labelKey: 'name',
    options: [{id: '0', name: '否'}, {id: '1', name: '是'}]
  };

  function canEditRender(value, record) {
    if(value==1){
      return '是';
    }
    return '否';
  }

  //值类型选项
  const valueTypeProps = {
    type: 'list',
    labelKey: 'name',
    options: [{id: '0', name: '初始'}, {id: '1', name: '平衡'},
      {id: '2', name: '分解'}, {id: '3', name: '中间'}, {id: '4', name: '指标'}]
  };

  function valueTypeRender(value, record) {
    const array = valueTypeProps.options;
    if (value || value == 0) {
      for (let i = 0; i < array.length; i++) {
        if (value == array[i].id) {
          return array[i].name;
        }
      }
    }
  }
//构造数据项树的属性
function parentSelectProps() {
  const colProps = {
    type: 'list',
    labelKey: 'name',
    modelName: 'sheetcol',
    searchParam: {
      filter: {
        where:where,
      },
      size: 1000,
      sort: ['o.id,asc'],
    },
    onSelect: (value, option, record) => {
      const href = service.parseRecordUrl(record);
      if (href==value) {
        message.error('上级列不能是当前列！');
      }
      record.parentName = option.props.dataRef.name;
    }
  };
  return colProps;
}
  const parentUrl = service.constructRecordUrl({modelName: 'sheetcol', id: ''});
  const parentSelect = parentSelectProps();
  //定义列表属性
  const listProps = {

    columns: [ // 和antd table组件的列定义相同
      {title: 'Id', width: 100, dataIndex: 'id', fulltext: false, key: 'id'},
      {
        type: 'select',title: '上级列', width: 300, dataIndex: 'parent', key: 'parent',
        fulltext: false,
        editor: <DropdownSelect {...parentSelect} />,
        textRender: (value, record) => {
          if (record.parentId && !record.parent) {
            let href = service.constructRecordUrl({modelName: 'sheetcol', id: record.parentId});
            record.parent = href ? href : '';
          }
          return record.parentName;
        }
      },
      {title: '名称', width: 160, dataIndex: 'name', key: 'name', editor: <Input/>},
      {
        title: '列类型',
        type: 'select',
        width: 160,
        dataIndex: 'itemType',
        key: 'itemType',
        editor: <DropdownSelect {...typeProps}/>,
        textRender: typeRender
      },
      {
        title: '使用类型',
        type: 'select',
        width: 130,
        dataIndex: 'useType',
        key: 'useType',
        editor: <DropdownSelect {...useTypeProps}/>,
        textRender: useTypeRender
      },
      {
        title: '值类型',
        type: 'select',
        width: 100,
        dataIndex: 'valueType',
        key: 'valueType',
        editor: <DropdownSelect {...valueTypeProps}/>,
        textRender: valueTypeRender
      },
      {title: '列标识', width: 100, dataIndex: 'exCol', key: 'exCol', editor: <Input/>},      
      {title: '计算公式', width: 200, dataIndex: 'formula', key: 'formula', editor: <Input/>},
      {title: '机构', width: 100, dataIndex: 'deptId', key: 'deptId', editor: <Input/>},
      {title: '排序号', width: 100, dataIndex: 'pyXuHao', key: 'pyXuHao', editor: <Input/>},
      {title: '权限编码', width: 100, dataIndex: 'permission', key: 'permission', editor: <Input/>},
      {
        title: '可编辑',
        type: 'select',
        width: 100,
        dataIndex: 'canEdit',
        key: 'canEdit',
        editor: <DropdownSelect {...canEditProps}/>,
        textRender: canEditRender
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
          uid={recordId}
          heightOffSet={-60}
          paginationBar={paginationBarProps}
    />
  )
}

export default connect(({sheetcol, loading}) =>
  ({sheetcol, loading: loading.models[modelName]})
)(ViewComponent);
