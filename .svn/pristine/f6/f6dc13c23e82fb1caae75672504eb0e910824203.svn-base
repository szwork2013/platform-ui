import React from 'react'
import {Button, Checkbox, Form, Input} from 'antd';

import PropTypes from 'prop-types';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

const CopyForm = ({
                    loading = false,
                    dispatch,
                    form,
                    initCode,
                  }) => {
  const {getFieldDecorator, validateFieldsAndScroll} = form;
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 5},
      md: {span: 5},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 17},
      md: {span: 17},
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: {span: 24, offset: 0},
      sm: {span: 10, offset: 7},
      md: {span: 17, offset: 5},
    },
  };

  const options = [
    {label: '复制行', value: 'row'},
    {label: '复制列', value: 'col'},
  ];
  // 显示UI
  return (
    <Form
      onSubmit={handleSubmit}
      hideRequiredMark
    >
      <FormItem
        {...formItemLayout}
        label="原行编码"
        hasFeedback
      >
        {getFieldDecorator('originalRowCode', {
          rules: [{
            required: false, message: '请输入原始行编码',
          }]
        })(
          <Input placeholder="请输入原始行编码" value={initCode}/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="原列编码"
        hasFeedback
      >
        {getFieldDecorator('originalCellCode', {
          rules: [{
            required: false, message: '请输入原始列编码',
          }]
        })(
          <Input placeholder="请输入原始列编码" value={initCode}/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="新表编码"
        hasFeedback
      >
        {getFieldDecorator('newCode', {
          rules: [{
            required: true, message: '请输入新编码',
          }],
        })(
          <Input placeholder="请输入新编码"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="新名称"
        hasFeedback
      >
        {getFieldDecorator('newName', {
          rules: [{
            required: true, message: '请输入新名称',
          }],
        })(
          <Input placeholder="请输入新名称"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="备注"
        hasFeedback
      >
        {getFieldDecorator('remark', {})(
          <Input.TextArea placeholder="请输入备注"/>
        )}
      </FormItem>
      <FormItem {...submitFormLayout} style={{marginTop: 32}}>
        <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
        <Button style={{marginLeft: 8}} onClick={handleCancel}>取消</Button>
      </FormItem>
    </Form>
  )

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'copySheet/copySheet',
          payload: {...values}
        }).then(() => {
          dispatch({
            type: 'copySheet/hide',
          });
          dispatch({
            type: 'budget_sheet/query',
            payload: {queryType: undefined}
          });
        });
      }
    });
  }

  function handleCancel(e) {
    e.preventDefault();
    dispatch({
      type: 'copySheet/hide',
    });
  }

  function onChange(checkedValues) {
    let copyType;
    if (checkedValues.length === 2) {
      copyType = 3
    } else if (checkedValues.includes('row')) {
      copyType = 1;
    } else if (checkedValues.includes('col')) {
      copyType = 2;
    } else {
      copyType = 0;
    }
    dispatch({
      type: 'copySheet/refresh',
      payload: {
        copyType: copyType
      }
    });
  }
}

CopyForm.propTypes = {
  initCode: PropTypes.string,
  dispatch: PropTypes.func
}

export default Form.create()(CopyForm);
