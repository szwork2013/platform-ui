import React from 'react';
import {Icon} from 'antd'
import {StyledContentDiv, StyledModal, StyledTitleDiv} from './styled';
import {connect} from 'dva';
import PropTypes from 'prop-types';

//弹出对话框
class ModalDialog extends React.Component {
  render() {
    //解构参数
    const {title, iconType, content, onOk, onCancel, ...rest} = this.props;

    //显示UI
    return (
      <StyledModal {...rest}
                   title={this.renderTitle(iconType, title)}
                   onOk={() => this.handleOnClick(onOk)}
                   onCancel={() => this.handleOnClick(onCancel)}
      >
        {this.props.visible && this.renderContent(content)}
      </StyledModal>
    )
  }

  //按钮点击处理函数
  handleOnClick = (onClickFunc) => {
    //调用参数指定的函数
    const ret = onClickFunc && onClickFunc.call(this, this.props.dispatch);
    if (!ret) return; //调用出错

    //发送消息关闭对话框
    this.props.dispatch({
      type: 'modaldialog/save',
      payload: {
        visible: false,
      }
    })
  }

  //构造title
  renderTitle(iconType, title) {
    return (
      <StyledTitleDiv>
        {iconType && <Icon type={iconType}/>}
        <span>{title}</span>
      </StyledTitleDiv>
    )
  }

  //构造内容
  renderContent(content) {
    if (typeof content == 'string') { //内容是字符串
      return (
        <StyledContentDiv>
          {content}
        </StyledContentDiv>
      )
    }
    else { //内容是组件
      return (
        <StyledContentDiv>
          {
            React.cloneElement(content, {dispatch: this.props.dispatch})
          }
        </StyledContentDiv>
      )
    }
  }
}


ModalDialog.propTypes = {
  iconType: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default connect(({modaldialog}) =>
  ({...modaldialog})
)(ModalDialog);
