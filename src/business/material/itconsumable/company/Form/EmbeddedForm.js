import React from 'react';
import { Collapse, Tabs, Icon, Badge, Button } from 'antd';
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;

import service from 'service';
import wfservice from 'wfservice';
import materialService from '../../../server';

import TitleSection from '../../../common/TitleSection';
import PlanContent from '../../../common/PlanContent';
import PlanItems from '../../../common/PlanItems';
import Seal from '../../../common/Seal';

//权限定义表单
class DemandPlanForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
    };
  }

  componentDidMount() {
    //解构参数
    let {
      model, //FormContainer注入：模型
      href,
      dispatch,
    } = this.props;
    let { record, state } = model;
    if (state.mode == 'new') {
      dispatch({
        type: 'demand_plan/initBatchNo',
        payload: {
          href: href,
          record: record,
          thenClose: false,
        }
      })
    }
    else{
      //获取预算，已使用等信息。
      dispatch({
        type: 'demand_plan/getUsedInfo',
        payload: {
          href: href,
          record: record,
          thenClose: false,
        }
      })
    }
  }

  render() {
    //解构参数
    let {
    model, //FormContainer注入：模型
      canEdit = true, //FormContainer注入：是否可编辑
      getFieldDecorator,
      setFieldsValue,
      dispatch,
      formCanEdit,
      ...rest
  } = this.props;
    let { record, state } = model;


    canEdit = canEdit ? formCanEdit : false;
    //构造FormItem的公共参数
    const itemProps = {
      canEdit, required: canEdit,
      getFieldDecorator, setFieldsValue,
    };
    const itemWidth = ['96%', '10%', '90%'];


    //处理现实部门的信息
    let org = service.getRecordLinkAttr(record, 'org');
    record.orgName = (org && org.orgName) || '';

    let planContentProp = { record, canEdit, getFieldDecorator, setFieldsValue, dispatch, planType: record.orgLevel };
    const user = service.userInfo.user;
    let planItemsProp = {
      record,
      canEdit,
      dispatch,
      year: record.year,
      type: record.type,
      planType: record.orgLevel,
      mode: state.mode
    }
    let opinionsProp = {
      record,
      canEdit,
      dispatch,
      Type: record.type,
      planType: record.orgLevel,
      mode: state.mode
    }
    let activeKey = this.state.activeKey;
    if (record._isComment)
      activeKey = '2';

    let orgLeval = '公司';
    if (record.orgLevel == 1) {
      orgLeval = '单位';
    }
    let typeString = materialService.convertTypeToString(record.type);
    //显示UI
    return (
      <Tabs tabPosition='top' activeKey={activeKey}
        onChange={(activeKey) => { this.setState({ activeKey }); record._isComment = false; }}>
        <TabPane tab={<span><Icon type="folder" />表单</span>} key="1">
          <Form layout='inline'>
            <div style={{ display: 'none' }}>
              <FormItem type='Input' {...itemProps}
                title='物资类型' itemKey='type' initialValue={record.type || 0}
              />
              <FormItem type='Input' {...itemProps}
                title='机构' itemKey='org'
                initialValue={record.org || service.constructRecordUrl({ modelName: 'orgs', id: user.org.id })}
              />
              <FormItem type='Input' {...itemProps}
                title='机构类型' itemKey='orgLevel' initialValue={record.orgLevel}
              />
            </div>
            <TitleSection title={!canEdit ?
              (record.year + '年' + record.month + '月' + record.batchNo + '批次' + orgLeval + typeString + '需求计划审批单')
              : orgLeval + typeString + '需求计划审批单'} />
            <PlanContent {...planContentProp}></PlanContent>

            {!(record.type == 4 || record.type == 'ENGINEERING_MATERIALS') && <PlanItems {...planItemsProp} />}

            {(record.type == 4 || record.type == 'ENGINEERING_MATERIALS') &&
              <Tabs tabPosition='top'>
                <TabPane tab={<span><Icon type="solution" />部门分组汇总</span>} key="4">
                  <PlanItems {...planItemsProp} />
                </TabPane>
                <TabPane tab={<span><Icon type="solution" />规格型号分组汇总</span>} key="5">
                  <PlanItems {...planItemsProp} isEngineerSpec={true} />
                </TabPane>
              </Tabs>
            }

            <Seal record={record} />
          </Form>
        </TabPane>
        <TabPane key="2"
          tab={<span><Icon type="file-text" />批阅意见</span>}
        >
          <Form layout='inline'>
            <Row>
              <FormItem type='CommentView' {...itemProps} width={itemWidth}
                commentColumns={wfservice.getCommentColumns(record)}
              />
            </Row>
          </Form>
        </TabPane>
        <TabPane key="3"
          tab={<span><Icon type="star-o" />附件</span>}
        >
          <Form layout='inline'>
            <Row>
              <FormItem title='附件' type='Attachment' {...itemProps}
                itemKey='_files' link={service.getHrefOfLinkAttr(record)} mode={state.mode}
                multiple width={itemWidth}
              />
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    );
  }

}
export default DemandPlanForm;
