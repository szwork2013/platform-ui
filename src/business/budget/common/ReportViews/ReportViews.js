import React from 'react';
import {Collapse, Tabs, Icon, Badge,Button} from 'antd';
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
import ReportView from './ReportView'
import ReportViewEX from './ReportViewEX'

import {StyledTabs} from './styled'

import service from 'service';
import {getSheetsInfo} from './service';
//注册模型
//import {modelRegister} from 'utils';
//import model from './model';
//modelRegister(model);
//权限定义表单
class ReportViews extends React.Component {
  constructor(props) {
    let {
      parentField,
      parentLink,
      sheetGroupCode,
      dispatch,
    } = props;
     super(props);
     dispatch({
          type:'budget_reportViews/getSheetsInfo',
          payload:{
            sheetGroupCode:sheetGroupCode,
          }
        });
     }


  componentDidMount() {
    let {
      parentField,
      parentLink,
      sheetGroupCode,
      dispatch,
    } = this.props;
    //this.sheetArray= getSheetsInfo({sheetGroupCode});
    //alert(JSON.stringify(this.sheetArray));
    //发消息查询支付数据
    /*dispatch({
      type:'budget_reportView/getSheetsInfo',
      payload:{
        sheetGroupCode:'ND_BMXQYS',
      }
    });*/
  }

  render(){
    //1 解构参数
    let {
     sheets,

    } = this.props;
   // alert(JSON.stringify(sheets))
    let defaultActiveKey='0';
    //新增会在老数组基础上加一条，所以新增的时候，默认打开的key要多加一，
   //显示UI
    return (
      <StyledTabs tabPosition='top'>
          {this.renderReporViews()}
      </StyledTabs>
    );
  }

  //渲染子表数据
  renderReporViews=()=> {
    //1 解构参数
    let {
      mode,//编辑模式
      record, //FormContainer注入：模型
      sheets,
      ...rest
    } = this.props;

    return sheets.map( (item,index) => {
      let keyMethod;
      let ReportViewProps={
         sheetCode:item.code,
         dataMethod:item.dataMethod,
         record,
      }
    if(item.keyMethod){
      keyMethod=item.keyMethod;
      ReportViewProps.keyMethod=keyMethod;
    }
      //处理新增默认第一次支付和第n次支付。
      let tab=item.name;
      return(
        <TabPane tab={tab} key={index+''}>
          {!keyMethod&&<ReportView {...ReportViewProps}/>}
          {keyMethod&&<ReportViewEX {...ReportViewProps}/>}
         </TabPane>
      )
    });
  }
}
//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({budget_reportViews:sheets}) =>
  (sheets)
)(ReportViews);

