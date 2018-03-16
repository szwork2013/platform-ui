import React from 'react'
import {Icon, Modal} from 'antd'
import {connect} from 'dva'
import Form from '../Form'

const CopySheetModal = (props) => {
  const {
    dispatch,
    loading,
    modalVisible,
  } = props

  const modalProps = {

    title: <div><Icon type="copy"/>拷贝</div>,
    visible: modalVisible,
    maskClosable: false,
    width: '500px',
    confirmLoading: loading,
    wrapClassName: 'vertical-center-modal',
    onCancel() {
      dispatch({
        type: 'copySheet/hide',
      })
    },
    footer: null,
  }
  return (
    <Modal {...modalProps}>
      <Form loading={loading} dispatch={dispatch}/>
    </Modal>
  )
}

export default connect(({copySheet: {modalVisible, currentPassword, newPassword, passwordConfirm}, loading}) => ({
  modalVisible,
  currentPassword,
  newPassword,
  passwordConfirm,
  loading: loading.models.copySheet,
}))(CopySheetModal);
