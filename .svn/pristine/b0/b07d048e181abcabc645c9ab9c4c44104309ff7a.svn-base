import React from 'react'
import PropTypes from 'prop-types'
import {message, Col} from 'antd'
import {connect} from 'dva';
import {AddButton, CommentTextArea, CommentDiv} from './styled'

const Comment = (props) => {

  const {
    dispatch,
    comment,
    addAllowed,
  } = props

  function handleChange(e) {
    const value = e.target.value;
    dispatch({
      type: 'commentButton/refresh',
      payload: {
        comment: value,
        addAllowed: value && value.trim() !== '',
      },
    })
  }

  function addUsefulExpression() {
    if (comment && comment.trim() !== '') {
      dispatch({
        type: 'usefulExpression/create',
        payload: {
          comment: comment
        },
      })
    } else {
      message.warning('请先填写或选择意见', 1);
    }
  }

  return (
    <CommentDiv>
      <CommentTextArea
        placeholder="请填写或选择意见"
        value={comment}
        onChange={(e) => handleChange(e)}
      />
      <AddButton
        type="primary"
        icon="plus"
        onClick={() => addUsefulExpression()}
        disabled={!addAllowed}
      >
        添加
      </AddButton>
    </CommentDiv>
  )
}

Comment.propTypes = {
  comment: PropTypes.string,
  addAllowed: PropTypes.bool,
}

export default connect(({commentButton}) => (commentButton))(Comment);

