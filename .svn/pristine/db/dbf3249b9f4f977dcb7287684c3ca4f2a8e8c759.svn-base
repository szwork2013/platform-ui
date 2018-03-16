import React from 'react'
import CommentRow from '../CommentRow'
import PropTypes from 'prop-types'

const CommentView = (props) => {
  const {
    commentColumns=[],
    ...rest
  } = props
  return (
    <div>
      {renderCommentRow()}
    </div>
  )

  function renderCommentRow() {
     return commentColumns.map((item, index) => {
        return <CommentRow {...rest} key={index} title={item.name} itemKey={item.no} comments={item.comments}/>
     })

  }
}

CommentView.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  width: PropTypes.array,
  hasFeedback: PropTypes.bool,
  commentColumns: PropTypes.array,
}

export default CommentView;
