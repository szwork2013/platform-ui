import React from 'react'
import CommentItemList from './CommentItemList'
import {StyledFormItem} from '../styled'
import PropTypes from 'prop-types';

const CommentRow = (props) => {
  //解构参数
  const {
    title, //字段标题
    width = ['48%', '20%', '77%'], //[整体宽度，lable宽度，内容宽度]，支持px和百分比
    comments = [],
    ...rest
  } = props;

  //显示UI
  const hasFeedback = props.hasFeedback !== undefined ? props.hasFeedback : false;
  return (
    <StyledFormItem hasFeedback={hasFeedback} label={title} width={width} {...rest}>
      <CommentItemList comments={comments}/>
    </StyledFormItem>
  )
}

CommentRow.propTypes = {
  title: PropTypes.string.isRequired,
  width: PropTypes.array,
  hasFeedback: PropTypes.bool,
  comments: PropTypes.array,
}

export default CommentRow;

