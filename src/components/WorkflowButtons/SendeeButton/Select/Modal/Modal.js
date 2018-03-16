import React from 'react'
import PropTypes from 'prop-types'
import {Col, Icon, message, Modal,Button} from 'antd'

import UserList from '../UserList'
import SendeePanel from '../../SendeePanel'
import OrgTree from '../OrgTree'
import {connect} from 'dva'
import {StyledRow} from './styled'

const SendeeSelectModal = (props) => {
  const {
    dispatch,
    action,
    modalVisible,
    isHideTree,
    selectedSendee,
    extraData,
    callback,
  } = props

  //当没有可选人员时出现在底部的取消按钮
  let footerProps={};
  if(selectedSendee&&selectedSendee.length==0)
    footerProps.footer=<Button onClick={()=>{
      dispatch({
        type: 'sendeeSelect/hide',
      })}}>取消</Button>;
  const modalProps = {
      ...footerProps,
    title: <div><Icon type="user"/>人员选择</div>,
    visible: modalVisible,
    maskClosable: false,
    width: '800px',
    wrapClassName: 'vertical-center-modal',
    onOk() {
      if (selectedSendee && selectedSendee.length > 0) {
        if (callback && typeof callback === "function") {

          //弹框确认是否发送
          let content='';
          selectedSendee.forEach((user)=>{
            if(content==='')
              content=user.name;
            else content=content+'；  '+user.name;
          });
          Modal.confirm({
            title: '是否确认发送给',
            content: content,
            okText: '确定',
            cancelText: '取消',
            onOk() {
              //发送关闭tab消息
              callback(selectedSendee,action,extraData);
            },
          });

        }
      } else {
        message.warning('请先选择接收人', 1);
        return;
      }
      dispatch({
        type: 'sendeeSelect/hide',
      })
    },
    onCancel() {
      dispatch({
        type: 'sendeeSelect/hide',
      })
    },
    afterClose() {
      dispatch({
        type: 'sendeeSelect/reset',
      })
    }
  }


  return (
    <Modal {...modalProps}>
      <StyledRow>
        {isHideTree ? null : <Col span={7}><OrgTree/></Col>}
        <Col span={isHideTree ? 8 : 7}>
          <UserList/>
        </Col>
        <Col span={isHideTree ? 16 : 10}>
          <SendeePanel selectedSendee={selectedSendee} removeCallBack={removeSendee}/>
        </Col>
      </StyledRow>
    </Modal>
  )

  function removeSendee(key) {
    dispatch({
      type: 'sendeeSelect/remove',
      payload: {
        key
      },
    });
  }
}

SendeeSelectModal.propTypes = {
  callBack: PropTypes.func,
}

export default connect(({sendeeSelect: {modalVisible, roleCondition, ouLevel, ouType, selectedSendee,action,extraData}}) => ({
  modalVisible,
  selectedSendee,
  action,
  extraData,
  isHideTree: (roleCondition !== '' && ouType === 0)
}))(SendeeSelectModal);
