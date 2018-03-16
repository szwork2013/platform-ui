import React from 'react';
import {Icon, Button } from 'antd';

import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;

import SearchBar from './SearchBar';
import ResultView from './ResultView';


//权限定义表单
class StatisticForm extends React.Component {

  render() {
    //显示UI
    return (
          <Form layout='inline'>
            <SearchBar {...this.props}/>
            <Row>
              <ResultView {...this.props}/>
            </Row>
          </Form>
    );
  }

}

//表单字段被修改事件处理
const onFieldsChange = (props, fields) => {
  //解构参数
  let {
    conditionData,
    dispatch,
  } = props;

  for (let x in fields) {
    conditionData[fields[x].name] = fields[x].value;
  }

  //发消息通知模型条件发生变化
  dispatch({
    type: 'publication_statisticForm/save',
    payload: { conditionData }
  })
}

import { Form as AntdForm } from 'antd';
const antdOptionsForm = AntdForm.create({
  onFieldsChange: onFieldsChange
})(StatisticForm);

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({
  publication_statisticForm: { conditionData }
  }) =>
    ({ conditionData })
)(antdOptionsForm);
