import React from 'react'
import PropTypes from 'prop-types'
import {Col, Icon, message, Modal} from 'antd'
import UsefulExpressionsList from '../UsefulExpression'
import Comment from '../Comment'
import {connect} from 'dva';
import {StyledRow,FlexCol} from './styled'

const CommentModal = (props) => {
  const {
    dispatch,
    modalVisible,
    modalType,
    callback,
    comment,
    action,
    commentActionId,
    users,
    extraData
  } = props


  let title='填写意见';
  if (action&&action.actionType === 'FILL_IN_COMMENT') {
    title=action.name;
  }

  const modalProps = {

    title: <div><Icon type="plus"/>{title}</div>,
    visible: modalVisible,
    maskClosable: false,
    width: '600px',
    wrapClassName: 'vertical-center-modal',
    onOk() {
      if (comment && comment.trim() !== '') {
        if (callback && typeof callback === "function") {
          callback(comment,action,commentActionId,users,extraData);
        }
      } else {
        message.warning('请先填写或选择意见', 1);
        return;
      }
      dispatch({
        type: 'commentButton/hide',
      })
    },
    onCancel() {
      dispatch({
        type: 'commentButton/hide',
      })
    },
    afterClose() {
      dispatch({
        type: 'commentButton/clean',
      })
    }
  }

  return (
    <Modal {...modalProps}>
      <StyledRow>
        <Col span={16}>
          <UsefulExpressionsList/>
        </Col>
        <FlexCol span={8}>
          <Comment/>
        </FlexCol>
      </StyledRow>
    </Modal>
  )
}

CommentModal.propTypes = {
  callBack: PropTypes.func,
}

export default connect(({commentButton}) => ({
  comment: commentButton.comment,
  action:commentButton.action,
  modalVisible: commentButton.modalVisible,
  modalType: commentButton.modalType,
  commentActionId:commentButton.commentActionId,
  users:commentButton.users,
  extraData:commentButton.extraData
}))(CommentModal);
