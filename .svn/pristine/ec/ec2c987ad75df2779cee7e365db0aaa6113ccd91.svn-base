import React from 'react'
import PropTypes from 'prop-types'
import {CommentItemDiv, ContentDiv, CommentInfoDiv,UserInfoSpan} from './styled'

const CommentItem = (props) => {
  const {
    comment,
  } = props

  return (
    <CommentItemDiv>
      <ContentDiv> {comment.content} </ContentDiv>
      <CommentInfoDiv>
        <UserInfoSpan>{comment.userName + '/' + (comment.userOrgName?comment.userOrgName.split('/')[0]:'')}</UserInfoSpan>
        <span>{comment.createdTime}</span>
      </CommentInfoDiv>
    </CommentItemDiv>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object,
}

export default CommentItem;
