import React from 'react'
import ModifyPasswordModal from './Modal'
import {connect} from 'dva';

const ModifyPassword = (props) => {
  const {modalVisible} = props

  return (
    <span>
      <span>修改密码</span>
      {modalVisible ? <ModifyPasswordModal/> : null}
    </span>
  )
}

export default connect(({modifyPassword: {modalVisible}}) =>
  ({modalVisible}))
(ModifyPassword);
