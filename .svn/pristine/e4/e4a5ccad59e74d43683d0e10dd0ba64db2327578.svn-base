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

import {StyledHeaderDiv} from '../styled';

//权限定义表单
class GradeTargetForm extends React.Component {

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
        type: 'publication/initNumber',
        payload: {
          record: record,
          href
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
      formCanEdit,
      dispatch,
      ...rest
  } = this.props;
    let { record } = model;

    canEdit = canEdit ? formCanEdit : false;
    //构造FormItem的公共参数
    const itemProps = {
      canEdit, required: canEdit,
      getFieldDecorator, setFieldsValue,
    };
    const itemWidth = ['96%', '10%', '90%'];

    let activeKey = this.state.activeKey;
    if (record._isComment)
      activeKey = '2';

    let number='';
    if(record.number)
    number=record.number;

    //显示UI
    return (
      <Tabs tabPosition='top' activeKey={activeKey}
        onChange={(activeKey) => { this.setState({ activeKey }); record._isComment = false; }}>
        <TabPane tab={<span><Icon type="folder" />表单信息</span>} key="1">
          <Form layout='inline'>
            <div style={{ display: 'none' }}>
              <FormItem type='Input' {...itemProps}
                        title='' itemKey='subject'
                        initialValue={record.subject||('领导参阅第'+number+'期')}
              />
              <FormItem type='Input' {...itemProps}
                        title='' itemKey='year'
                        initialValue={record.year||new Date().getFullYear()}
              />
            </div>
            <Row>
              <StyledHeaderDiv>{'领导参阅第'}
              <FormItem type='Input' {...itemProps} width={['4%', '1%', '99%']}
               itemKey='number' initialValue={record.number} title='' required={false}
              />{'期'}</StyledHeaderDiv>
            </Row>
            <Row>
              <FormItem type='TextArea' {...itemProps} title='备注' width={itemWidth}
                        itemKey='remark' initialValue={record.remark} lines={10}
                        required={false}
              />
            </Row>
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
      </Tabs>
    );
  }

}
export default GradeTargetForm;
