import QueueAnim from 'rc-queue-anim';

import { Form, Button, Input, Icon } from 'antd';
const FormItem = Form.Item;

//引入styled组件
import {
  StyledSpin,
  StyledLayout,
  StyledHeader,
  StyledContent,
  StyledContentLeftDiv,
  StyledContentRightDiv,
  StyledTitleH1,
  StyledLogoDiv,
  StyledFormDiv,
  StyledFooter
} from './styled';

import config from 'config';
import service from 'service';

//引入图片
import companyLogo from './image/login_logo.png';
import loginLargeImg from './image/loginMain.jpg';
import loginLogo from './image/login_head.png';
import loginDivBackgroundImg from './image/form_ground.png';

//登录表单组件
const LoginForm = ({
  loading = false,
  onOk,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  }
}) => {
  // 显示UI
  const savedUserName = service.readUserNameFromLocal();
  return (
    <StyledLayout>
      <StyledHeader>
        <img src={companyLogo}/>
      </StyledHeader>
      <StyledContent>
        <StyledSpin tip='正在加载数据...' spinning={loading} size='large'>
          <StyledContentLeftDiv>
             <img src={loginLargeImg}/>
          </StyledContentLeftDiv>
          <StyledContentRightDiv>
            <StyledTitleH1>华能辅助办公</StyledTitleH1>
            <StyledLogoDiv>
              <img src={loginLogo}/>
            </StyledLogoDiv>
            <StyledFormDiv>
              <img src={loginDivBackgroundImg} />
              <form>
                <QueueAnim delay={0} type='top'>
                  <FormItem hasFeedback key='1'>
                    {getFieldDecorator('username', {
                      initialValue:savedUserName,
                      rules: [
                        {
                          required: true,
                          message: '请填写用户名'
                        }
                      ]
                    })(<Input onPressEnter={handleOk} prefix={<Icon type="user"/>} size='large' placeholder='用户名' />)}
                  </FormItem>
                  <FormItem hasFeedback key='2'>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: '请填写密码'
                        }
                      ]
                    })(<Input ref={input=>input.focus()} onPressEnter={handleOk} size='large' type='password' placeholder='密码'  prefix={<Icon type="lock" />}/>)}
                  </FormItem>
                  <FormItem key='3'>
                    <Button type='primary' onClick={handleOk} loading={loading}>
                      登录
                    </Button>
                  </FormItem>      
                </QueueAnim>
              </form>
            </StyledFormDiv>
          </StyledContentRightDiv>
        </StyledSpin>
      </StyledContent>
      <StyledFooter>
        {config.footerText}
      </StyledFooter>
    </StyledLayout>
  )

  // 提交登录事件处理
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      if (onOk) {
        onOk(values);
      }
    })
  }
}

import PropTypes from 'prop-types';
LoginForm.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func
}

export default Form.create()(LoginForm);