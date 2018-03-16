import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva';
import SendeeConfirmModal from './Modal'

import {StyledButton, StyledButtonsDiv} from '../styled';

const Auto = (props) => {
  const {dispatch,
    modalVisible,
    title,
    initSendee,
    roleCondition,
    ouLevel,
    ouType,
    callback,
    action,
    instanceId,
    starterId,
    senderId,
    specificReceiverUrl,
    validateFields,
    extraData,
    ...customProps} = props

  function showModal() {
    return validateFields((errors, values) => {
      if (errors) { //有未正确填写的字段
        return;
      }
      dispatch({
        type: 'sendeeAuto/init',
        payload: {
          selectedSendee: initSendee,
          roleCondition,
          ouLevel,
          ouType,
          action,
          instanceId,
          starterId,
          senderId,
          specificReceiverUrl,
          modalVisible: true,
          extraData,
        },
      });
    })
  }

  return (
    <StyledButtonsDiv>
      <StyledButton {...{type: "primary", ...customProps}} onClick={showModal}>{title}</StyledButton>
      {modalVisible ? <SendeeConfirmModal callback={callback}/> : null}
    </StyledButtonsDiv>
  )
}

Auto.defaultProps = {
  title: '自动发送',
  initSendee: [],
  roleCondition: '',
  ouLevel: -1,
  ouType: -1,
}

Auto.propTypes = {
  initSendee: PropTypes.array,
  roleCondition: PropTypes.string,
  ouLevel: PropTypes.oneOf([-1, 0, 1, 2]),
  ouType: PropTypes.oneOf([-1, 0, 1]),
  callback: PropTypes.func,
  action:PropTypes.object,
  instanceId:PropTypes.number,
  starterId:PropTypes.string,
  senderId:PropTypes.string,
  specificReceiverUrl:PropTypes.string,
  validateFields:PropTypes.func,
}

export default connect(({sendeeAuto: {modalVisible}}) => ({modalVisible}))(Auto);
