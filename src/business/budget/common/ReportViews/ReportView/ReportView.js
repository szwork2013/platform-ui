import React from 'react';
import { Button,Checkbox,Input} from 'antd'
import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
import {View} from 'components';
import {
  StyledTable as Table,
  StyledTr as Row,
  StyledLabelTd as LabelCol,
  StyledTd as Col,
} from '../../../../styled';

import service from 'service';
import wfservice from 'wfservice';

//权限定义表单
class ReportView extends React.Component{
  //构造函数：初始化组件
  constructor(props) {
    super(props);

  }

  componentWillMount() {
   let{
      dispatch,
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
          column.width=320;
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

  //计算表头列数
  getColumnLength(columns,count){
    if(columns&&columns.length>0){
      for(let i=0;i<columns.length;i++){
        let column=columns[i];
        count++;
        if(column.children){
          count=this.getColumnLength(column.children,count);
        }
      }
    }
    return count;
  }


  render() {
    //1 解构参数
    let {
      canEdit = true, //FormContainer注入：是否可编辑
      dispatch,
      getFieldDecorator,
      setFieldsValue,
      formCanEdit,
      sheetCode,
      dataMethod,
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
      buttons:[{'title':'导出'}]
  }

  //获取当前用户id
  const userId=service.userInfo.user.id;
  let reportId=record==null?null:service.getRecordId(record);
  let searchParam = {
      filter:undefined,
      treedata: true,
      search:dataMethod,
      sheetCode,
      reportId:reportId,
    };
  let colunmLength=0;
  if(columnInfo){
      columnInfo=this.addColumnEditor(columnInfo);
      colunmLength=this.getColumnLength(columnInfo,0);
  }
  let scrollx=null;
  if(colunmLength>=12&&colunmLength<22){
    scrollx=1400;
  }
  if(colunmLength>=22&&colunmLength<28){
    scrollx=1800;
  }  
  if(colunmLength>=28&&colunmLength<36){
    scrollx=2200;
  }  
  if(colunmLength>=36&&colunmLength<44){
    scrollx=3200;
  }
  if(colunmLength>=44){
    scrollx=3900;
  }
  let batchSaveHref='http://localhost:8080/api/budget_reportView/batchSave?reportId='+reportId+'&sheetCode='+sheetCode;
  let listProps = {
    scrollx:scrollx,
    defaultExpandAllRows:true,
    columns:columnInfo,
    /*columns:[{
    title:'部门填报',
    children:[{
      title : '其他业务支出',
      children:[ {
        dataIndex :'A',
        title:'初始',
        key:'A'
      }, {
        dataIndex :'B',
        title:'平衡',
        width:100,
        parentId:2,
        key:'B'
      } ]
    }, {
      title : '管理费用',
      children : [ {
        dataIndex:'C',
        width:100,
        title:'初始',
        key:'C'
      }, {
        dataIndex:'D',
        title:'平衡',
        key:'D'
      }]
    }]
   }],*/
  };
    //显示UI
    return (
        <View {...props}
          editMode='row' //编辑模式：单行编辑
          uid={sheetCode}
          batchSaveHref={batchSaveHref}
          searchParam ={searchParam}
          modelName='budget_reportView' //模型名称
          actionBar={actionBarProps} //操作条定义
          paginationBar={paginationBarProps}
          heightOffset={-130}
          list={listProps} //列表定义
        />
    )
   }
}// end of class

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({budget_reportView,loading,apptabs:{tabs}}) =>
  ({budget_reportView,loading: loading.models.budget_reportView,tabs})
)(ReportView);
