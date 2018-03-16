import React from 'react';
import { Button,Checkbox,Input} from 'antd'
import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
import {  ModuleLayout,Tree,View} from 'components';
import {
  StyledTable as Table, 
  StyledTr as Row,
  StyledLabelTd as LabelCol,
  StyledTd as Col,
} from '../../../../styled';

import service from 'service';
import wfservice from 'wfservice';

//权限定义表单
class ReportViewEX extends React.Component{
  //构造函数：初始化组件
  constructor(props) {
    super(props);
 
  }
  batchSaveHref='';
  componentWillMount() {
   let{
      dispatch,
      dataMethod,
      sheetCode
    }=this.props;
    dispatch({
      type:'budget_reportView/getSheetCols',
      payload:{
        sheetCode:sheetCode,
        dataKey:sheetCode,
      }
    });
  }
  //为列添加editor
  addColumnEditor(columns){
    if(columns&&columns.length>0){
      for(let i=0;i<columns.length;i++){
        let column=columns[i];
        if(column.title=='名称'){
          column.fixed='left';
          columns[i]=column;
        }
        if(column.editor){
          if(column.title=='备注'){
             column.width=undefined;
          }
          column.editor=<Input />;
          columns[i]=column;
        }
        if(column.children){
          this.addColumnEditor(column.children);
        }
      }
    }
    return columns;

  }

  render() {
    //1 解构参数
    let {
      canEdit = true, //FormContainer注入：是否可编辑
      dispatch,
      getFieldDecorator,
      setFieldsValue,
      formCanEdit,
      key,
      dataMethod,
      sheetCode,
      record,
      budget_reportView,
    } = this.props;
    let viewData = service.getViewData(budget_reportView, sheetCode);
    let columnInfo=viewData.columnInfo;
    if(!columnInfo||columnInfo.length==0) return null;
    let props=this.props;
    //获取当前用户名
    const userName = service.userInfo.user.name;
        //翻页器属性
    const paginationBarProps = false;
    //定义操作条属性
    const actionBarProps = {
      new: false, //显示新增按钮
      delete: false, //显示删除按钮
      newRow: false,
  }

  //获取当前用户id
  const userId=service.userInfo.user.id;
  let reportId=record==null?null:service.getRecordId(record);
  let orgId=record==null?null:record.orgId;
    //构造左侧选择树
    const treeProps = this.constructTreeProps();
    const siderTree = (<Tree {...treeProps} />);

    //设置sider属性
    const title = (
      <span style={{paddingLeft:10, color:'#108ee9'}}>导航信息</span>
    );

    const siderProps = {
      title,
      icon: false,
      width: 120,
      className:'background: #fbfbfb !important;',
      titleBar:{
        className:'background: #ebf8f9 !important;'
      }
    };
  let searchParam = {
      filter:undefined,
      treedata: true,
      search:dataMethod,
      sheetCode,
      reportId:reportId,
    };
  if(columnInfo){
      columnInfo=this.addColumnEditor(columnInfo);
  }  
  let listProps = {
    columns:columnInfo,
    defaultExpandAllRows:true,
  };
    //显示UI
    return (
      <ModuleLayout menu={siderTree} enableCollapsed={false} siderProps={siderProps}>
        <View {...props}
          key={sheetCode} 
          editMode='row' //编辑模式：单行编辑
          uid={sheetCode}
          notQueryData={true}
          batchSaveHref={this.batchSaveHref}
          searchParam ={searchParam}
          modelName='budget_reportView' //模型名称
          actionBar={actionBarProps} //操作条定义
          paginationBar={paginationBarProps}
          heightOffset={-80}
          list={listProps} //列表定义
        />
       </ModuleLayout>
    )
   } 

 //构造月份树的属性
  constructTreeProps = () => {
    //1 解构参数
    let {
      record,
      keyMethod,
    } = this.props;
    let reportId=record==null?null:service.getRecordId(record);
    let orgId=record==null?null:record.orgId;
    const treeProps = {
      labelKey: 'name',
      parentKey: 'parentId',
      modelName: 'budget_reportView',
      searchParam: {
        projection: 'default',
        filter: undefined,
        search:keyMethod,
        reportId:reportId,
        orgId:orgId,
      },
      dynamicLoading: false,
      defaultExpandAll: true,
      defaultSelectFirst: true,
      onSelect: this.handleTreeOnSelect,
    };

    return treeProps;
  }

  //处理树被选中事件
  handleTreeOnSelect = (key, e, initQuery) => {
    //获取所选行的值
        //1 解构参数
    let {
      sheetCode,
      dataMethod,
      record,
    } = this.props;
    let reportId=record==null?null:service.getRecordId(record);
    const nodeData = e.node.props.dataRef;
    let orgId=nodeData.orgId;
    let itemId=nodeData.itemId;
    this.batchSaveHref='http://localhost:8080/api/budget_reportView/batchSave?';
    if(orgId!=undefined&&orgId!=null){
      this.batchSaveHref+="reportId="+reportId+"&sheetCode="+sheetCode+"&orgId="+orgId;
    }
    if(itemId!=undefined&&itemId!=null){
      this.batchSaveHref+="reportId="+reportId+"&sheetCode="+sheetCode+"&itemId="+itemId;
    }    
    //请求视图的数据：返回指定组织机构下的所有分类
    var searchParam = {
      filter: undefined,
      search: dataMethod,
      sheetCode,
      reportId:reportId,
      orgId:orgId,
      itemId:itemId,
    };
    this.props.dispatch({
      type: 'budget_reportView'+'/query',
      payload: {
        dataKey:sheetCode,
        searchParam: searchParam,
        where: initQuery ? '' : undefined,
      }
    });
  }

}// end of class

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({budget_reportView,loading,apptabs:{tabs}}) =>
  ({budget_reportView,loading: loading.models.budget_reportView,tabs})
)(ReportViewEX);
