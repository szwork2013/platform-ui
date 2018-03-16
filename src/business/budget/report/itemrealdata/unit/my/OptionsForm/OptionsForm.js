import React from 'react';
import {Button, Col, Form as AntdForm, message, Upload} from 'antd';
import {Form as FormLayout, FormItem} from 'components';
import config from 'config';
import {connect} from 'dva';
import service from 'service';
import {monthOptions, typeOptions, yearOptions} from '../model'

const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;
const {api} = config; //取得RESTful api配置信息
let {rootPath} = api;
rootPath = rootPath.substring(0, rootPath.length - 4);
//选项设置表单
const OptionsForm = (props) => {
  //解构参数
  let {dispatch, viewData: {conditionData = {}, uploading = false}} = props;
  //构造FormItem的公共参数
  const oneItemWidth = ['96%', '10%', '90%'];
  const {getFieldDecorator, setFieldsValue} = props.form;
  const {year, month, useType} = conditionData;
  const itemProps = {
    canEdit: true, getFieldDecorator, setFieldsValue, width: oneItemWidth,
    controlProps: {allowClear: true}, required: false,
  };
  const uploadDisabled = !(year && month && useType);
  const uploadProps = {
    name: 'excel',
    accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    action: `${rootPath}/budget_itemrealdata/importExcel?year=${year}&month=${month}&useType=${useType}`,
    showUploadList:false,
    headers: {
      xpnToken: service.userInfo.token.value,
    },
    disabled: uploadDisabled,
    onChange(info) {
      if (info.file.status === 'uploading') {
        dispatch({
          type: 'budget_itemrealdata/save',
          payload: {uploading: true}
        });
      }
      if (info.file.status !== 'uploading') {
        dispatch({
          type: 'budget_itemrealdata/save',
          payload: {uploading: false}
        });
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 导入成功!`, 2);
        dispatch({
          type: 'budget_itemrealdata/query',
          payload: {queryType: undefined}
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 导入失败!.`, 2);
      }
    },
  };
  return (
    <Form layout='inline' style={{height: '44px'}}>
      <Row>
        <Col span={3}>
          <FormItem type='Select' initialValue={conditionData.year} required={false} title=''
                    options={yearOptions} {...itemProps} itemKey='year' placeholder='选择年度'
          />
        </Col>
        <Col span={3}>
          <FormItem type='Select' initialValue={conditionData.month} width={oneItemWidth} required={false} title=''
                    options={monthOptions} {...itemProps} itemKey='month' placeholder='选择月份'/>
        </Col>
        <Col span={3}>
          <FormItem type='Select' initialValue={conditionData.useType} width={oneItemWidth} required={false} title=''
                    options={typeOptions} {...itemProps} itemKey='useType' placeholder='选择类型'/>
        </Col>
        <Col span={1}>
          <Upload {...uploadProps}>
            <Button type="primary" onClick={onUploadClick} loading={uploading}>导入</Button>
          </Upload>
        </Col>
      </Row>
    </Form>
  )

  function onUploadClick() {
    if (uploadDisabled) {
      message.warn(`请先选择左边导入条件!`, 1);
    }
    return false;
  }
}
//表单字段被修改事件处理
const onFieldsChange = (props, fields) => {
  //解构参数
  const {
    dispatch,
  } = props;

  let changed;

  let changedData = {};
  for (let x in fields) {
    changedData[fields[x].name] = fields[x].value;
    changed = true;
  }
  if (changed) {
    //发消息通知模型条件发生变化
    dispatch({
      type: 'budget_itemrealdata/changeConditionData',
      payload: {...changedData}
    })
  }
}

const antdOptionsForm = AntdForm.create({
  onFieldsChange: onFieldsChange
})(OptionsForm);

export default connect(({budget_itemrealdata: {viewData}}) => {
  return {viewData: viewData[0]}
})(antdOptionsForm);
