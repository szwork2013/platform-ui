import React from 'react';

import {
  ModuleLayout,
  Tree,
  View,
} from 'components';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

class ViewComponent extends React.Component {

  render() {
    const props = this.props;

    //定义操作条属性
    const actionBarProps = {
      new: true, //显示新增按钮
      delete: true, //显示删除按钮
      newRow:false,
      newPayloadRender: (model) => (
        {defaultValues: {org: this.selectedOrgValue}}
      )
    }

    //定义列表属性
    const listProps = {
      columns: [ // 和antd table组件的列定义相同
        {title: '序号', width: 70, dataIndex: 'sortNo', key: 'sortNo', sorter: true},
        {title: '姓名', width: 80, dataIndex: 'name', key: 'name', link: 'edit'},
        {title: '用户名', width: 160, dataIndex: 'userName', key: 'userName', sorter: true, link: 'edit'},
        {title: '角色', dataIndex: 'roleList', key: 'roleList', fulltext: false,
          textRender: (text, record) => record.roleList.join(',')},
      ],
      rowSelection: {}, //选择功能配置
    };

    //构造机构树
    const treeProps = this.constructTreeProps();
    const siderTree = (<Tree {...treeProps} />);

    //翻页器属性
    const paginationBarProps = {};

    //sider属性
    const siderProps = {
      title: '机构树',
      icon: 'fork',
      width:200,
      titleBar:{
        styled:'margin:10px;background: #ecf6fd !important;'
      }
    };

    return (
    <ModuleLayout menu={siderTree} siderProps={siderProps}
      enableCollapsed={false}>
      <View key={modelName+'ViewLayout'} {...props}
        notQueryData={true}
        modelName={modelName} //模型名称
        actionBar={actionBarProps} //操作条定义
        paginationBar={paginationBarProps} //翻页器定义
        list={listProps} //列表定义
        heightOffset={-ModuleLayout.theme.content.padding}
      />
      </ModuleLayout>
    )
  }

  //构造机构树的属性
  constructTreeProps = () => {
    const props = this.props;

    const treeProps = {
      labelKey: 'orgName',
      parentKey: 'parentOrg',
      modelName: 'orgs',
      searchParam: {
        filter: {
        },
        sort: 'o.sortNo,asc',
        size: 1000, //指定每页记录数
      },
      dynamicLoading: false,
      defaultSelectFirst: true,
      defaultExpandAll: true,
      onSelect: this.handleTreeOnSelect,
    };

    return treeProps;
  }

  //处理树被选中事件
  handleTreeOnSelect = (key, e, initQuery) => {
    //设置所属组织机构的值
    const record = e.node.props.dataRef; //取选中节点的值
    if (record.value) {
      this.selectedOrgValue = record.value; //保存选中的机构的值
      this.setState({refresh: true}) //刷新组件
    }

    //请求视图的数据：返回指定组织机构下的所有分类
    const searchParam = {
      filter: { //过滤规则
        where: e.selected ? `(o.org.id=${key})` : undefined,
      },
      sort: 'o.sortNo,asc',
      size: 1000, //指定每页记录数
      treedata: true,
    };

    this.props.dispatch({
      type: modelName+'/query',
      payload: {
        searchParam: searchParam,
        where: initQuery ? '' : undefined,
      }
    });
  }
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import {connect} from 'dva';
export default connect(({users, loading, apptabs:{tabs}}) =>
  ({users, loading: loading.models[modelName], tabs})
)(ViewComponent);
