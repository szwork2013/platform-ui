import React from 'react';

import { Input } from 'antd';
import {View,DropdownSelect} from 'components';


import modelDefinition from '../../../draft/model';

//取得模型名称
const modelName = modelDefinition.namespace;


class ViewComponent extends React.Component {

  componentDidMount() {
  }

  render() {
    //定义操作条属性
    const actionBarProps = {
      new: false, //显示新增按钮
      delete: false, //显示删除按钮
      newRow: false,
      customSearchBar: (<div style={{display: 'inline', marginLeft: 15, color: 'red'}}>筛选条件：
        <DropdownSelect {...this.statusSearchProps(this.props.dispatch)} /></div>)
    }
    let searchParam = { //搜索条件
      filter: { //过滤规则
        clazz: 'Draft', //模型对应的后台实体类
        where: 'o.submitDate!=null and o.status>1', //条件
      },
      size: 20, //指定每页记录数
      sort: 'o.id,desc' //缺省排序规则
    }

    //定义列表属性
    const listProps = {
      columns: [ // 和antd table组件的列定义相同
        {title: '投稿日期', width: 100, dataIndex: 'createdTime', key: 'createdTime', link: 'open', sorter: true},
        {title: '投稿部门', width: 150, dataIndex: 'orgName', key: 'orgName', link: 'open', sorter: true, fulltext: false},
        {title: '标题', width: 390, dataIndex: 'subject', key: 'subject', link: 'open', sorter: true},
        {
          title: '状态', width: 120, dataIndex: 'status', key: 'status', sorter: true, fulltext: false,
          type: 'select', editor: <DropdownSelect {...this.statusSelectProps()} />, textRender: this.statusTextRender
        },
        {title: '基本分', width: 120, dataIndex: 'grade', key: 'grade', sorter: true},
        {title: '加分', width: 120, dataIndex: 'gradeBonus', key: 'gradeBonus', sorter: true, editor: <Input/>},
        {title: '备注', width: 130, dataIndex: 'remark', key: 'remark', sorter: true, editor: <Input/>},
      ],
    };

    //翻页器属性
    const paginationBarProps = {};

    return (
      <View key={modelName + 'ViewLayout'} {...this.props}
            editMode={'row'}
            modelName={modelName} //模型名称
            searchParam={searchParam}
            actionBar={actionBarProps} //操作条定义
            list={listProps} //列表定义
            paginationBar={paginationBarProps}
      />
    )
  }

  statusSearchProps=(dispatch)=> {
    const statusProps = {
      type: 'list',
      labelKey: 'name',
      options: [
        {id: '1', name: '所有'},
        {id: '3', name: '已采用'},
        {id: '2', name: '不采用'},
      ],

      initialValue: this.value ? this.value : '1',
      onChange: value => {
        this.value=value;
        const searchParam = {
          filter: { //过滤规则
            clazz: 'Draft', //模型对应的后台实体类
            where: value == 1 ? 'o.submitDate!=null and o.status>1' : ('o.submitDate!=null and o.status=' + value), //条件
          },
          size: 100, //指定每页记录数
          sort: 'o.id,asc', //缺省排序规则
        };
        dispatch({
          type: 'draft/query',
          payload: {
            searchParam,
          }
        });
      },
      width: 120
    };
    return statusProps;
  }

  statusSelectProps=()=> {
    const statusProps = {
      type: 'list',
      labelKey: 'name',
      options: [
        {id: '3', name: '已采用'},
        {id: '2', name: '不采用'},
      ]
    };
    return statusProps;
  }

  statusTextRender=(value, record)=> {
    if (record.status)
      record.status = record.status + '';
    else record.status = '0';
    if ((record.status == 0) && (record.status + '')) {
      return '不采用';
    } else if ((record.status == 1) && (record.status + '')) {
      return '不采用';
    } else if ((record.status == 2) && (record.status + '')) {
      return '不采用';
    } else if ((record.status == 3) && (record.status + '')) {
      return '已采用';
    }
  }
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({draft, loading}) =>
  ({draft, loading: loading.models[modelName]})
)(ViewComponent);
