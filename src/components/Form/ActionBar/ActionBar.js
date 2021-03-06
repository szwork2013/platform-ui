import {AppTabs, PrintButton, WorkflowButtons} from 'components';
import FormLayout from '../Form';
import {StyledButton, StyledButtonsDiv} from './styled';
import {isSameObject, wfservice} from 'utils';
import service from 'service';

export default (props) => {
  //解构参数
  const {
    actionBar,
    modelName,
    model,
    href,
    validateFields,
    loading,
    dispatch,
  } = props;
  if (!actionBar) return null;

  //直接指定了按钮组件，返回即可
  if (!actionBar.buttons instanceof Array)
    return actionBar.buttons;

  const {record, state} = model;

  //根据指定的buttons属性构造按钮
  if (actionBar.buttons) return (
    service.authz(actionBar.permission) &&
    <StyledButtonsDiv key={modelName + 'FormActionBar'}>
      {renderEditButton()}
      {renderSaveAndCloseButton()}
      {renderSaveButton()}
      {renderWorkflowButtons()}
      {renderWorkflowHistoryButton()}
      {
        actionBar.buttons.map((item, index) => {
          //构造点击按钮发送消息的参数
          let payload;
          if (item.payloadRender) {
            payload = item.payloadRender(record);
          }

          //构造按钮权限
          let permission = item.permission;
          if (typeof permission == 'function') {
            permission = permission(record, state);
          }

          return (
            service.authz(permission) &&
            <StyledButton key={modelName + '-formbtn-' + index} type={item.style || 'primary'}
                          onClick={() => handleButtonClick(item.type, payload)}
            >
              {item.title}
            </StyledButton>
          );
        })
      }
      {renderCloseButton()}
      {renderPritButton()}
    </StyledButtonsDiv>
  );

  //构造保存按钮和关闭按钮
  return (
    <StyledButtonsDiv key={modelName + 'FormActionBar'}>
      {renderEditButton()}
      {renderSaveAndCloseButton()}
      {renderSaveButton()}
      {renderWorkflowButtons()}
      {renderWorkflowHistoryButton()}
      {renderCloseButton()}
      {renderPritButton()}
    </StyledButtonsDiv>
  );

  //构造保存按钮
  function renderSaveButton() {
    if (!actionBar.save || !FormLayout.canEdit(model)) return null;
    //构造按钮发送消息的参数
    let payload;
    if (actionBar.save.payloadRender) {
      payload = actionBar.save.payloadRender();
    }

    //构造按钮的权限
    let permission = actionBar.save.permission;
    if (typeof permission == 'function') {
      permission = permission(record, state);
    }

    return (
      service.authz(actionBar.permission) &&
      service.authz(permission) &&
      <StyledButton icon="save" key={modelName + 'SaveButton'} type={actionBar.saveStyle || 'primary'}
                    onClick={() => handleSaveButtonClick('save', payload)}
      >{actionBar.saveButtonTitle || '保存'}</StyledButton>
    );
  }

  //构造保存并关闭按钮
  function renderSaveAndCloseButton() {
    if (!actionBar.saveAndClose || !FormLayout.canEdit(model)) return null;
    //构造按钮发送消息的参数
    let payload;
    if (actionBar.saveAndClose.payloadRender) {
      payload = actionBar.saveAndClose.payloadRender();
    }

    //构造按钮的权限
    let permission = actionBar.saveAndClose.permission;
    if (typeof permission == 'function') {
      permission = permission(record, state);
    }

    return (
      service.authz(actionBar.permission) &&
      service.authz(permission) &&
      <StyledButton icon="save" key={modelName + 'SaveAndCloseButton'} type={actionBar.saveAndCloseStyle || 'primary'}
                    onClick={() => handleSaveAndCloseButtonClick('saveAndClose', payload)}
      >{actionBar.saveAndCloseButtonTitle || '保存并关闭'}</StyledButton>
    );
  }

  //构造编辑按钮
  function renderEditButton() {
    if (!actionBar.edit || FormLayout.canEdit(model)) return null;
    //构造按钮发送消息的参数
    let payload;
    if (actionBar.edit.payloadRender) {
      payload = actionBar.edit.payloadRender();
    }

    //构造按钮的权限
    let permission = actionBar.edit.permission;
    if (typeof permission == 'function') {
      permission = permission(record, state);
    }

    return (
      service.authz(actionBar.permission) &&
      service.authz(permission) &&
      <StyledButton icon="edit" key={modelName + 'EditButton'} type={actionBar.editStyle || 'primary'}
                    onClick={() => handleEditButtonClick('edit', payload)}
      >{actionBar.editButtonTitle || '编辑'}</StyledButton>
    );
  }

  //构造关闭按钮
  function renderCloseButton() {
    if (!actionBar.close)
      return null;

    //构造按钮发送消息的参数
    let payload;
    if (actionBar.close.payloadRender) {
      payload = actionBar.close.payloadRender();
    }

    //构造按钮的权限
    let permission = actionBar.close.permission;
    if (typeof permission == 'function') {
      permission = permission(record, state);
    }

    return (
      service.authz(actionBar.permission) &&
      service.authz(permission) &&
      <StyledButton icon="close" key={modelName + 'CloseButton'} type={actionBar.closeStyle || 'primary'}
                    onClick={() => handleCloseButtonClick(payload)}
      >{actionBar.closeButtonTitle || '关闭'}</StyledButton>
    );
  }

  //处理保存按钮点击事件
  function handleSaveButtonClick(key, payload) {
    save(key, payload);
  }

  //处理保存并关闭按钮点击事件
  function handleSaveAndCloseButtonClick(key, payload) {
    save(key, payload, true);
  }

  //处理编辑按钮点击事件
  function handleEditButtonClick(key, payload) {
    dispatch({
      type: 'apptabs/updateTab',
      payload: {
        key: href,
        model: {state: {mode: 'edit'}}
      }
    });
  }

  //处理关闭按钮点击事件
  function handleCloseButtonClick(payload) {
    if (FormLayout.canEdit(model))
      AppTabs.service.closeTab(dispatch, href, model);
    else
      AppTabs.service.closeTab(dispatch, href);
  }

  //处理按钮点击事件
  function handleButtonClick(key, param) {
    let payload = param || {};
    payload.record = record;

    dispatch({
      type: modelName + '/' + key,
      payload: payload
    })
  }

  //保存表单
  function save(key, payload, thenClose) {
    return validateFields((errors, values) => {
      if (errors) { //有未正确填写的字段
        return;
      }

      let data = { //获取数据
        ...values
      };

      const isNew = FormLayout.isNewRecord(model);
      if (isNew) { //如果是新建记录，把记录的默认值加入新记录
        data = {
          ...(model.record),
          ...values,
        }
      }

      //处理记录中的时间格式
      service.formatRecordDate(data);

      for (let attr in data) {
        //处理无需保存的字段
        if (data[attr] == '_undefined')
          data[attr] = undefined;
        //
        // //处理时间类型,有_isAMomentObject 代表是时间的对象
        // if(data[attr]&&data[attr]['_isAMomentObject']){
        //   data[attr]=data[attr].format('YYYY-MM-DD HH:mm:ss');
        // }
      }

      if (isNew) { //新建记录：发送创建请求
        //2018-03-02 sgf add 增加一些业务的特殊验证。
        let createType=modelName + '/create';
        if(actionBar.beforeSaveType)
          createType=modelName + '/'+actionBar.beforeSaveType;
        //end
        dispatch({
          type: createType,
          payload: {
            isNew,
            href: href,
            record: data,
            thenClose: thenClose,
          }
        })
      }
      else { //已存在记录：发送更新请求
        //2018-03-02 sgf add 增加一些业务的特殊验证。
        let updateType=modelName + '/update';
        if(actionBar.beforeSaveType)
        updateType=modelName + '/'+actionBar.beforeSaveType;
        //end
        dispatch({
          type: updateType,
          payload: {
            href: href,
            record: data,
            oldRecord: model.record,
            thenClose: thenClose,
          }
        })
      }
    })
  }

  //构造工作流操作按钮
  function renderWorkflowButtons() {
    if (actionBar.workflowButtons === false)
      return null;

    const componentProps = {
      href,
      modelName,
      record: model.record,
      dispatch,
      validateFields
    };

    return (
      <WorkflowButtons {...componentProps} />
    );
  }

  //构造流转历史记录按钮
  function renderWorkflowHistoryButton() {
    if (actionBar.workflowHistoryButton === false)
      return null;

    //获取流程实例id
    const instanceId = wfservice.getInstanceId(model.record);
    if (!instanceId)
      return null;

    const componentProps = {
      instanceId,
    };

    return (
      <WorkflowButtons.HistoryButton {...componentProps} />
    );
  }

  //处理打印
  function renderPritButton() {

    const isNew = FormLayout.isNewRecord(model);
    if (isNew || !actionBar.print || !actionBar.templateNo) return null;
    let templateNo = actionBar.templateNo;
    let entityLink = service.parseEntityLink(record);
    let attachmentLink = service.parseEntityLink(entityLink, true);

    return <PrintButton title={'打印'} attachmentLink={attachmentLink} fileName={'printForm'} templateNo={templateNo}
                        record={record}/>
  }
}
