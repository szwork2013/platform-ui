import React from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'
import {CommentItemListDiv} from './styled'

const CommentItemList = (props) => {
  const {
    comments,
  } = props
  return (
      <div>
        {comments && comments.length > 0 ? renderCommentItems(comments) : ''}
      </div>
  )

  function renderCommentItems(comments) {
    return comments.map((comment, index) => {
      return <CommentItem key={index} comment={comment}/>
    })
  }
}

CommentItemList.propTypes = {
  comments: PropTypes.array,
}

export default CommentItemList;
