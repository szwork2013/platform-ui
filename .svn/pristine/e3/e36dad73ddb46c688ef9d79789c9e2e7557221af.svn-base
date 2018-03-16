import React from 'react'
import {Icon, Modal} from 'antd'
import {connect} from 'dva'
import Form from '../Form'

const ModifyPasswordModal = (props) => {
  const {
    dispatch,
    loading,
    modalVisible,
    otherUsers, //兼职用户列表
  } = props

  const modalProps = {

    title: <div><Icon type="key"/>修改密码</div>,
    visible: modalVisible,
    maskClosable: false,
    width: '500px',
    confirmLoading: loading,
    wrapClassName: 'vertical-center-modal',
    onCancel() {
      dispatch({
        type: 'modifyPassword/hide',
      })
    },
    footer: null,
  }
  return (
    <Modal {...modalProps}>
      <Form loading={loading} dispatch={dispatch} otherUsers={otherUsers}/>
    </Modal>
  )
}

export default connect(({users:{list},modifyPassword: {modalVisible, currentPassword, newPassword, passwordConfirm}, loading}) => ({
  modalVisible,
  currentPassword,
  newPassword,
  passwordConfirm,
  loading: loading.models.modifyPassword,
  otherUsers: list,
}))(ModifyPasswordModal);
