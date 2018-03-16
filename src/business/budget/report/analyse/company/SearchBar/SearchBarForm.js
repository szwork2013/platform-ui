import React from 'react';
import {Button, Col, Form as AntdForm} from 'antd';
import {Form as FormLayout, FormItem} from 'components';
import config from 'config';
import {connect} from 'dva';
import {monthOptions, orgOptions, sheetOptions, yearOptions} from '../model'
import service from 'service';

const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;
const {api} = config; //取得RESTful api配置信息
let {rootPath} = api;
rootPath = rootPath.substring(0, rootPath.length - 4);

const SearchBarForm = (props) => {

  let {dispatch, conditionData = {}, budget_reportView} = props;
  const oneItemWidth = ['96%', '10%', '90%'];
  const {getFieldDecorator, setFieldsValue} = props.form;
  const {year, startMonth, endMonth, orgId, sheetCode} = conditionData;
  const itemProps = {
    canEdit: true, getFieldDecorator, setFieldsValue, width: oneItemWidth,
    controlProps: {allowClear: true}, required: false,
  };
  const queryDisabled = !(year && startMonth && endMonth && orgId && sheetCode);

  return (
    <Form layout='inline' style={{height: '44px'}}>
      <Row>
        <Col span={2}>
          <FormItem type='Select' initialValue={year} required={false} title='' options={yearOptions} {...itemProps}
                    itemKey='year' placeholder='年度'
          />
        </Col>
        <Col span={2}>
          <FormItem type='Select' initialValue={startMonth} width={oneItemWidth} required={false} title=''
                    options={monthOptions} {...itemProps} itemKey='startMonth' placeholder='开始月'/>
        </Col>
        <Col span={2}>
          <FormItem type='Select' initialValue={endMonth} width={oneItemWidth} required={false} title=''
                    options={monthOptions} {...itemProps} itemKey='endMonth' placeholder='结束月'/>
        </Col>
        <Col span={4}>
          <FormItem type='Select' initialValue={orgId} width={oneItemWidth} title=''
                    options={orgOptions} {...itemProps} itemKey='orgId' placeholder='单位'/>
        </Col>
        <Col span={6}>
          <FormItem type='Select' initialValue={sheetCode} width={oneItemWidth} title=''
                    options={sheetOptions} {...itemProps} itemKey='sheetCode' placeholder='表格类型'/>
        </Col>
        <Col span={1}>
          <Button type="primary" onClick={onSearchClick} disabled={queryDisabled}>搜索</Button>
        </Col>
      </Row>
    </Form>
  )

  async function onSearchClick() {
    let viewData = service.getViewData(budget_reportView, sheetCode);
    let columnInfo = viewData.columnInfo;
    if (!columnInfo || columnInfo.length === 0) {
      columnInfo = await dispatch({
        type: 'budget_reportView/getSheetCols',
        payload: {
          dataKey: sheetCode, sheetCode: sheetCode,
        }
      })
    }
    await dispatch({
      type: 'budgetAnalyse/save',
      payload: {columnInfo}
    })
    await  dispatch({
      type: 'budgetAnalyse/query',
      payload: {
        dataKey: 'company',
        searchParam: {
          filter: undefined,
          size: undefined,
          sort: undefined,
          search: 'company',
          ...conditionData,
        }
      }
    });
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
      type: 'budgetAnalyse/changeConditionData',
      payload: {...changedData}
    })
  }
}

const antdOptionsForm = AntdForm.create({
  onFieldsChange: onFieldsChange
})(SearchBarForm);

export default connect(({budgetAnalyse: {viewData}, budget_reportView}) => {
  return {conditionData: viewData[0].conditionData, budget_reportView}
})(antdOptionsForm);
