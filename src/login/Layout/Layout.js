import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva';
import LoginForm from '../LoginForm';

//登录界面
const Layout = ({
  dispatch,
  loading = false,
}) => {
  return (
    <LoginForm key={'LoginLayout'} loading={loading} onOk={
      (data) => dispatch({type: 'webapp/login', payload: data})
    }/>
  )
}

Layout.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.bool
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
export default connect(({loading, dispatch}) =>
	({loading: loading.models.webapp, dispatch:dispatch})
)(Layout);