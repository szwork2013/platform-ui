import React from 'react'
import {message,Modal} from 'antd';
import {AutoButton, SelectButton} from './SendeeButton';
import CommentButton from './CommentButton'

import {StyledButton, StyledButtonsDiv} from './styled';

import { PrintButton } from 'components';

import wfservice from 'wfservice';
import service from 'service';
import PropTypes from 'prop-types';


const WorkflowButtons = (props) => {
  //解构参数
  const {record, dispatch, modelName, href,validateFields} = props;

  //无对应流程实例，不构造按钮
  let instanceId=wfservice.getInstanceId(record);
  if (!instanceId)
    return null;

  //获取操作按钮列表
  let todoId = wfservice.getTodoId(record);
  let starterId = wfservice.getStarterId(record);
  let senderId = wfservice.getSenderId(record);
  let actionButtons = wfservice.getActionButtons(record);
  let extraData={href,todoId,record};
  //构造操作按钮
  return (
    <StyledButtonsDiv>
      {
        renderActionButtons()
      }
      {
        renderTackBackButton()
      }
    </StyledButtonsDiv>
  );

  //构造操作按钮
  function renderActionButtons() {
    if (!actionButtons || actionButtons.length == 0) return null;
    return actionButtons.map((action, index) => {
      //选人发送操作
      if (action.actionType === 'SELECT_PEOPLE_SEND') {
        return renderSelectButton(action, index);
      }

      //自动发送操作
      if (action.actionType === 'AUTO_SEND') {
        return renderAutoButton(action, index);
      }

      //填写意见操作
      if (action.actionType === 'FILL_IN_COMMENT') {
        return renderCommentButton(action, index);
      }

      //普通操作
      if (action.actionType === 'COMMON') {
        return renderCommonButton(action, index);
      }
    });
  }

  //构建选人发送按钮
  function renderSelectButton(action, index) {
    //组装按钮的参数
    const componentProps = {
      multiple: action.sendMode === 'MULTIPLE' ? true : false,
      action:action,
      instanceId:instanceId,
      roleCondition: action.roleCondition,
      ouLevel: action.ouLevel,
      ouType: action.ouType,
      starterId,
      senderId,
      extraData,
      specificReceiverUrl:action.specificReceiverUrl,
      validateFields,
      callback: (users,actionSelect,extraData) => {
        senderCheck(users,actionSelect,extraData);
      },
      icon: "team",
      title: action.name
    };
    return(
      <SelectButton key={modelName+index} {...componentProps}/>
    );
  }


  //构建自动发送按钮
  function renderAutoButton(action, index) {
    //组装按钮的参数
    const componentProps = {
      action:action,
      instanceId:instanceId,
      roleCondition: action.roleCondition,
      ouLevel: action.ouLevel,
      ouType: action.ouType,
      starterId,
      senderId,
      extraData,
      specificReceiverUrl:action.specificReceiverUrl,
      validateFields,
      callback: (users,actionAuto,extraData) => {
        senderCheck(users,actionAuto,extraData);
      },
      icon: "team",
      title: action.name
    };

    return(
      <AutoButton key={modelName+index} {...componentProps}  />
    );
  }

  //构建填写意见按钮
  function renderCommentButton(action, index) {
    record._commentAction=action;
    //组装按钮的参数
    let initComment=wfservice.getSelfComments(record,action.commentColumn.no,todoId);
    const componentProps={
      action:action,
      initComment,
      extraData,
      callback:(comment,actionComment,commentActionId,users,extraData)=>{
        //告知是填写意见操作
        extraData.record._isComment=true;
        senderCallback(users,actionComment,extraData,commentActionId,comment);
      },
      icon: "form",
      title: action.name
    };
    return(
      <CommentButton key={modelName+index} {...componentProps}/>
    );
  }

  //构建普通操作按钮
  function renderCommonButton(action, index) {
    //打印按钮单独处理
    if(action.no==='print'){
      let entityLink=service.parseEntityLink(record);
      let attachmentLink=service.parseEntityLink(entityLink,true);
      return <PrintButton title={action.name} key={modelName + index} record={record}
                          attachmentLink={attachmentLink} entityLink={entityLink} fileName={'printForm'} templateNo={action.message}/>
    }
    //组装按钮的参数
    const componentProps = {
      type: 'primary',
      onClick: () => {
        Modal.confirm({
          title: '是否确认'+action.name,
          okText: '确定',
          cancelText: '取消',
          onOk() {
            //发送关闭tab消息
            if(action.completeTodo){
              dispatch({
                type:  modelName + '/completeTodo',
                payload: {
                  href: href,
                  todoId,
                  action,
                  record,
                  thenClose:action.thenClose,
                }
              })
            }else{
              //普通操作如果有接受着的状态则执行操作。
              if(action.sendeeState){
                dispatch({
                  type: modelName + '/executeProcessAction',
                  payload: {
                    href: href,
                    record: record,
                    thenClose:action.thenClose,
                    todoId: todoId,
                    actionId: action.id,
                    sendees: [],
                    action,
                  }
                })
              }else{
                dispatch({
                  type: modelName + '/sendCommonMessage',
                  payload: {
                    href: href,
                    record: record,
                    thenClose:action.thenClose,
                    todoId: todoId,
                    actionId: action.id,
                    sendees: [],
                    action,
                  }
                })
              }

            }
          },
        });

      },
      icon: "save",
    };

    return (
      <StyledButton key={modelName + index} {...componentProps}
      >{action.name}</StyledButton>
    );
  }

  function senderCheck(users,actionSend,extraData){

    if(!actionSend.checkComment||!extraData.record._commentAction||!extraData.record._commentAction.commentColumn){
      senderCallback(users,actionSend,extraData);
      return;
    }
    //检测意见，设置默认意见
    let comment=wfservice.getSelfComments(extraData.record,extraData.record._commentAction.commentColumn.no,extraData.todoId);
    if(!comment||comment==''){
      dispatch({
        type: 'commentButton/refresh',
        payload: {
          modalType: actionSend.defaultComment && actionSend.defaultComment.trim() !== '' ? 'update' : 'create',
          modalVisible: true,
          comment: actionSend.defaultComment,
          action:actionSend,
          commentActionId:extraData.record._commentAction.id,
          users,
          extraData
        },
      });

      dispatch({
        type: 'usefulExpression/refresh',
        payload: {
          userSelfLink:service.userInfo.user.selfLink,
        },
      })

    }else{
      senderCallback(users,actionSend,extraData);
    }
  }

  function senderCallback(users=[],actionSend,extraData,commentActionId,comment,) {
    let sendees = [];
    users.forEach((user) => {
      sendees.push({id: user.id, name: user.name,orgFullName:user.orgFullName})
    });
    dispatch({
      type: modelName + '/executeProcessAction',
      payload: {
        href: extraData.href,
        record: extraData.record,
        thenClose:actionSend.thenClose,
        todoId: extraData.todoId,
        actionId: actionSend.id,
        sendees: sendees,
        commentActionId,
        comment,
        action:actionSend,
      }
    })
  }
  //构建收回按钮
  function renderTackBackButton() {
    let tackBackId=wfservice.getCanTackBackTodoId(record)
    if(!tackBackId)
      return;
    //组装按钮的参数
    const componentProps = {
      type: 'danger',
      onClick: () => {
        Modal.confirm({
          title: '是否确认收回',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            //发送关闭tab消息
            dispatch({
              type:  modelName + '/tackBack',
              payload: {
                href: href,
                todoId:tackBackId,
                record,
              }
            })
          },
        });
      },
      icon: "rollback",
    };

    return (
      <StyledButton key={modelName + 'tackBack'} {...componentProps}
      >收回重新办理</StyledButton>
    );
  }

}

WorkflowButtons.propTypes = {
  record: PropTypes.object,
  dispatch: PropTypes.func,
  modelName: PropTypes.string,
  validateFields:PropTypes.func,
}

export default WorkflowButtons;
