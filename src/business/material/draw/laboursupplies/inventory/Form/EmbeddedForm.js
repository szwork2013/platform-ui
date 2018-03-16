import React from 'react';
import {Collapse, Tabs, Icon, Badge,Button} from 'antd';
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;

import service from 'service';
import wfservice from 'wfservice';

//权限定义表单
class MaterialDrawForm extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render(){
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
//显示UI
  return (
    <Tabs tabPosition='top' >
      <TabPane tab={<span><Icon type="folder"/>表单</span>} key="1">
      <Form layout='inline'>
        <div style={{display:'none'}}>
          <FormItem type='Input' {...itemProps}
                    title='物资类型' itemKey='type' initialValue={record.type||6}
          />
          <FormItem type='Input' {...itemProps}
                    title='机构' itemKey='org'
                    initialValue={record.org||service.constructRecordUrl({ modelName: 'orgs', id: user.org.id })}
          />
        </div>
      </Form>
      </TabPane>
    </Tabs>
  );
  }

}
export default MaterialDrawForm;
