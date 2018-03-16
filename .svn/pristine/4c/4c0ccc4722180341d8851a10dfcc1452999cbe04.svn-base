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

import TitleSection from '../../../material/common/TitleSection';

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
      dispatch,
    } = this.props;
    let { record, state } = model;
    if (state.mode == 'new') {
      dispatch({
        type: 'draft/initOrg',
        payload: {
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
      formCanEdit,
      ...rest
  } = this.props;
    let { record,state } = model;

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
    //显示UI
    return (
      <Tabs tabPosition='top' activeKey={activeKey}
        onChange={(activeKey) => { this.setState({ activeKey }); record._isComment = false; }}>
        <TabPane tab={<span><Icon type="folder" />表单信息</span>} key="1">
          <Form layout='inline' height={document.body.clientHeight-120}>
            <div style={{ display: 'none' }}>
              <FormItem type='Input' {...itemProps}
                        title='机构' itemKey='org' initialValue={record.org}
              />
              <FormItem type='Input' {...itemProps}
                        title='年份' itemKey='year' initialValue={record.year||new Date().getFullYear()}
              />
            </div>
            <TitleSection title={'稿件信息审批单'} />
            <Row>
            <FormItem type='Input' {...itemProps} title='标题' width={itemWidth}
                      itemKey='subject' initialValue={record.subject}
            />
            </Row>
            <Row>
              <FormItem type='TextArea' {...itemProps} title='内容' width={itemWidth}
                        itemKey='content' initialValue={record.content} lines={28}
              />
            </Row>
            <Row>
              <FormItem type='Input' {...itemProps} title='备注' width={itemWidth}
                        itemKey='remark' initialValue={record.remark} required={false}
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
export default GradeTargetForm;
