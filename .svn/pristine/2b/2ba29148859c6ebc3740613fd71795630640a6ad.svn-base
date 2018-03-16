import React from 'react'
import {Button, Form, Input} from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
//登录表单组件
const ModifyForm = ({
                      loading = false,
                      dispatch,
                      form,
                      otherUsers, //兼职用户列表
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
  // 显示UI
  return (
    <Form
      onSubmit={handleSubmit}
      hideRequiredMark
    >
      <FormItem
        {...formItemLayout}
        label="当前密码"
        hasFeedback
      >
        {getFieldDecorator('currentPassword', {
          rules: [{
            required: true, message: '请输入当前密码',
          }, {pattern: /^[A-Za-z0-9]*$/, message: '密码只能为数字和字母的组合'}],
        })(
          <Input type='password' placeholder="请输入当前密码" onBlur={handleCurrentPasswordBlur}/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="新密码"
        hasFeedback
      >
        {getFieldDecorator('newPassword', {
          rules: [{
            required: true, message: '请输入新密码',
          }, {
            validator: checkConfirm,
          }, {pattern: /^[A-Za-z0-9]*$/, message: '密码只能为数字和字母的组合'}],
        })(
          <Input type='password' placeholder="请输入新密码"/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="密码确认"
        hasFeedback
      >
        {getFieldDecorator('passwordConfirm', {
          rules: [{
            required: true, message: '请填写确认密码',
          }, {
            validator: checkPassword,
          }, {pattern: /^[A-Za-z0-9]*$/, message: '密码只能为数字和字母的组合'}],
        })(
          <Input type='password' placeholder="再次输入新密码"/>
        )}
      </FormItem>
      <FormItem {...submitFormLayout} style={{marginTop: 32}}>
        <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
        <Button style={{marginLeft: 8}} onClick={handleCancel}>取消</Button>
      </FormItem>
    </Form>
  )

  function handleCurrentPasswordBlur(e) {

  }

  function checkCurrentPassword(rule, value, callback) {
    if (value) {
      callback('当前密码输入不正确');
    } else {
      callback();
    }
  }

  function checkPassword(rule, value, callback) {
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  }


  function checkConfirm(rule, value, callback) {
    if (value) {
      form.validateFields(['passwordConfirm'], {force: true});
    }
    callback();
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'modifyPassword/changePassword',
          payload: {...values, otherUsers}
        });
      }
    });
  }

  function handleCancel(e) {
    e.preventDefault();
    dispatch({
      type: 'modifyPassword/hide',
    });
  }

}

ModifyForm.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func
}

export default Form.create()(ModifyForm);
