import React from 'react';
import {Collapse, Tabs, Icon, Badge,Button} from 'antd';
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;
import service from 'service';

import { Form as FormLayout, FormItem, DropdownSelect } from 'components';
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;
import ReportViews from '../../common/ReportViews';
//const Row = FormContainer.StyledRow;

//引入styled组件
import {
  StyledHeaderDiv,
} from './styled';
import {
  StyledTable as Table, 
  StyledLabelTd as LabelCol,
  StyledTd as Col,
} from '../../styled';
//权限定义表单
class EmbeddedForm  extends React.Component {
  componentWillMount() {

  }
  render(){
  //1 解构参数
    let {
      model, //FormContainer注入：模型
      canEdit = true, //FormContainer注入：是否可编辑
      getFieldDecorator,
      setFieldsValue,
      sheets,
      dispatch,
    } = this.props;
    const { record, state } = model;
    //2 构造FormItem的公共参数
    const itemProps = { canEdit, setFieldsValue, getFieldDecorator };
    const itemWidth = ['96%','10%','90%'];
    const twoItemWidth = ['48%','20%','80%'];
    const threeItemWidth = ['32%', '30%', '70%'];
    const fourItemWidth = ['24%', '40%', '60%'];
    const fiveItemWidth = ['19%', '40%', '60%'];

    //3 构造发布单位选项的搜索参数
    const orgsSearchParam= { //搜索条件
      filter: { //过滤规则
      },
      size: 1000, //指定每页记录数
      sort: 'o.sortNo,asc' //缺省排序规则
    };

    //4 构造分类选项的搜索参数
    const reportViewsProps={
      parentFiled:'report',
      sheets,
      record,
      sheetGroupCode:'ND_DWXQYS',
      dispatch,
    };
	//5 显示UI
	return (
        <Tabs tabPosition='top'>
          <TabPane tab={<span><Icon type="solution"/>表单</span>} key="1">
              <StyledHeaderDiv>单位年度需求预算（金额单位：万元）</StyledHeaderDiv>
               <Form layout='inline'>
                <Row style={{display:'none'}}>
                    <FormItem title='报表类型' type='Input' {...itemProps} width={itemWidth}
                      itemKey='reportType' initialValue={record.reportType}
                    />
                    <FormItem title='周期类型' type='Input' {...itemProps} width={itemWidth}
                      itemKey='periodType' initialValue={record.periodType}
                    />
                    <FormItem title='机构层级' type='Input' {...itemProps} width={itemWidth}
                      itemKey='orgLevel' initialValue={record.orgLevel}
                    />    
                </Row>        
                <Row>
                    <FormItem title='年度' type='Input' {...itemProps} width={fourItemWidth}
                      itemKey='year' initialValue={record.year}
                    />
                    <FormItem title='版本号' type='Input' {...itemProps} width={fourItemWidth}
                      itemKey='version' initialValue={record.version}
                    />
                    <FormItem title='备注' type='Input' {...itemProps} width={twoItemWidth}
                      itemKey='remark' initialValue={record.remark} required={false}
                    />        
                </Row>
                <ReportViews {...reportViewsProps}/>
              </Form>
          </TabPane>
          <TabPane  key="2" tab={<span><Icon type="file-text"/>批阅意见</span>}>
            <Form layout='inline'>
              <div>意见</div>
            </Form>
          </TabPane>
          <TabPane  key="3" tab={<span><Icon type="file"/>附件</span>}>
            <Form layout='inline'>
              <Row>
                <FormItem title='附件' type='Attachment' {...itemProps}
                          itemKey='_files' link={service.getHrefOfLinkAttr(record)} mode={state.mode}
                          multiple  width={itemWidth}
                />
              </Row>
            </Form>
          </TabPane>
        </Tabs>    
    );    
  }
 
}

export default  EmbeddedForm;
