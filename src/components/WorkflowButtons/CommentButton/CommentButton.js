import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva';
import service from 'service';
import CommentModal from './Modal'

import {StyledButton, StyledButtonsDiv} from './styled';

const CommentButton = (props) => {

  const {
    dispatch,
    userSelfLink = service.userInfo.user.selfLink,
    initComment,
    action,
    extraData,
    title = '提交意见',
    callback,
    ...customProps
  } = props


  function showModal() {
    dispatch({
      type: 'commentButton/refresh',
      payload: {
        modalType: initComment && initComment.trim() !== '' ? 'update' : 'create',
        modalVisible: true,
        comment: initComment,
        action,
        extraData
      },
    });

    dispatch({
      type: 'usefulExpression/refresh',
      payload: {
        userSelfLink,
      },
    })
  }

  return (
    <StyledButtonsDiv>
      <StyledButton {...{type: "primary", ...customProps}} onClick={() => showModal()}>{title}</StyledButton>
      <CommentModal callback={callback}/>
    </StyledButtonsDiv>
  )
}

CommentButton.propTypes = {
  initComment: PropTypes.string,
  action:PropTypes.object,
  userSelfLink: PropTypes.string,
  callback: PropTypes.func,
}

export default connect()(CommentButton);
