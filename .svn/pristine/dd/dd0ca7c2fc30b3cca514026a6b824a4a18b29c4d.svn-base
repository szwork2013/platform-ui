import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva';
import SendeeSelecModal from './Modal'
import {StyledButtonsDiv, StyledButton} from '../styled';

const Select = (props) => {
  const {dispatch,
    modalVisible,
    title,
    initSendee,
    action,
    instanceId,
    multiple,
    roleCondition,
    ouLevel,
    ouType,
    callback,
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
        type: 'sendeeSelect/init',
        payload: {
          selectedSendee: initSendee,
          multiple,
          action,
          instanceId,
          roleCondition,
          ouLevel,
          ouType,
          starterId,
          senderId,
          specificReceiverUrl,
          modalVisible: true,
          extraData
        },
      });
    })

  }

  return (
    <StyledButtonsDiv>
      <StyledButton {...{type: "primary", ...customProps}} onClick={showModal}>{title}</StyledButton>
      {modalVisible ? <SendeeSelecModal callback={callback}/> : null}
    </StyledButtonsDiv>
  )
}

Select.defaultProps = {
  title: '选择发送',
  initSendee: [],
  multiple: true,
  roleCondition: '',
  ouLevel: -1,
  ouType: -1,
}

Select.propTypes = {
  title: PropTypes.string,
  initSendee: PropTypes.array,
  action:PropTypes.object,
  instanceId:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  roleCondition: PropTypes.string,
  ouLevel: PropTypes.oneOf([-1, 0, 1, 2]),
  ouType: PropTypes.oneOf([-1, 0, 1]),
  multiple: PropTypes.bool,
  starterId:PropTypes.string,
  senderId:PropTypes.string,
  specificReceiverUrl:PropTypes.string,
  callback: PropTypes.func,
  validateFields:PropTypes.func,
}

export default connect(({sendeeSelect: {modalVisible}}) => ({modalVisible}))(Select);
