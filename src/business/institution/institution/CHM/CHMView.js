import React from 'react';

import {ModuleLayout, Tree, View,} from 'components';

import service from 'service';
import config from 'config';

//取得模型名称
import modelDefinition from '../model';
const modelName = modelDefinition.namespace;

class ViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {srcLink: ''};
  }

  render() {
    const props = this.props;

    //定义操作条属性
    const actionBarProps = {
      new: false, //显示新增按钮
      delete: false, //显示删除按钮
      newRow: false,
      newPayloadRender: (model) => (
        {defaultValues: {org: this.selectedOrgValue}}
      )
    }

    //定义列表属性
    const listProps = {};

    //构造机构树
    const treeProps = this.constructTreeProps();
    const siderTree = (<Tree {...treeProps} />);

    //翻页器属性
    const paginationBarProps = {};
    let srcLink = {};

    //sider属性
    const siderProps = {
      title: '汇编目录',
      icon: 'file-pdf',
      width: 260,
      className:'background: #fbfbfb !important;',
      titleBar:{
        className:'background: #ebf8f9 !important;'
      }
    };

    return (
      <ModuleLayout menu={siderTree} siderProps={siderProps} enableCollapsed={false}>
        <iframe src={this.state.srcLink}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 0,
                  margin: 0,
                  padding: 0
                }}
        />
      </ModuleLayout>
    )
  }

  //构造机构树的属性
  constructTreeProps = () => {
    const props = this.props;

    const treeProps = {
      labelKey: 'text',
      modelName: 'institution_institutions',
      searchParam: {
        search: 'listAllInstitution',
        sort: 'o.id,asc',
        size: 1000, //指定每页记录数
      },
      type: 'tree',
      dynamicLoading: true,
      defaultSelectFirst: false,
      onSelect: this.handleTreeOnSelect,
    };

    return treeProps;
  }

  //处理树被选中事件
  handleTreeOnSelect = (key, e, initQuery) => {

    if(!e.selected){
      return;
    }
    //设置所属组织机构的值
    const record = e.node.props.dataRef;
    if(!record.isLeaf){
      return;
    }
   
    const documentName=record.title;
    const text=record.text;
    const keyparentid=record.parentId;

    if (record.value) {
      this.selectedOrgValue = record.value; //保存选中的机构的值
      this.setState({refresh: true}) //刷新组件
    }

    let xpnToken = service.userInfo.token.value;
    const rootUrl = config.API.replace('api', '');

    if(key[0].indexOf("ins_")!=-1){
      let mykey=key[0].substring(4);
      this.setState({
        srcLink: rootUrl + 'pdfjs-1.9.426-dist/web/viewer.html?file=' + encodeURIComponent('/api/attachments/file?xpnToken=' + xpnToken + '&entityLink=/institution_introduceorg/' + mykey + '&category=_files&name='+documentName+'.pdf')
      });
    }else{
      this.setState({
        srcLink: rootUrl + 'pdfjs-1.9.426-dist/web/viewer.html?file=' + encodeURIComponent('/api/attachments/file?xpnToken=' + xpnToken + '&entityLink=/institution_institutions/' + keyparentid.substring(keyparentid.indexOf('_')+1) + '&category=_files&name='+documentName+'&filename='+text)
      });
    }
    
  }
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import {connect} from 'dva';
export default connect(({institution_institutions, loading, apptabs: {tabs}}) =>
  ({institution_institutions, loading: loading.models[modelName], tabs})
)(ViewComponent);