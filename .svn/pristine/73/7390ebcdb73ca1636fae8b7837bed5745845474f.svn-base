import React from 'react';
import {Col} from 'antd'
import {FormItem} from 'components'
import FormLayout from '../Form';
import {StyledForm, StyledRow} from './styled'
import service from 'service';
import PropTypes from 'prop-types';

class FormContainer extends React.Component {
  render() {
    //解构参数
    const {
      href,
      embeddedForm,
      model,
      modelName,
      getFieldDecorator,
      setFieldsValue,
      getFieldValue,
      dispatch,
      validateFields,
    } = this.props;

    if (!embeddedForm) return null;

    //表单能否编辑
    let canEdit = FormLayout.canEdit(model);

    //情形1：embeddedForm不是数组是组件，则返回指定的组件
    if (!(embeddedForm instanceof Array)) {
      return React.cloneElement(embeddedForm, {
        model,
        href,
        modelName,
        canEdit,
        getFieldDecorator,
        setFieldsValue,
        getFieldValue,
        dispatch,
        validateFields
      });
    }

    //情形2： 根据embeddedForm指定的item数据构造表单
    const {record, state} = model;

    //根据配置构造行数组，每行包含一个或多个FormItem
    let rowArray = this.constructRowArray();

    //3 显示UI
    return (
      <StyledForm layout='inline'>
        {
          rowArray.map((row, index) => this.createRow(row, index, record, canEdit, state))
        }
      </StyledForm>
    );
  }

  //构造行数组
  constructRowArray() {
    let embeddedForm = this.props.embeddedForm;
    if (embeddedForm.lenght == 0)
      return [];

    //1 找出有多少行
    let rows = [];
    for (let i = 0; i < embeddedForm.length; i++) {
      let row = rows.find(r => r === embeddedForm[i].row);
      if (!row) {
        rows.push(embeddedForm[i].row);
      }
    }

    //2 组合成需要的行数组，每行包含一个或多个FormItem
    let rowArray = [];
    for (let i = 0; i < rows.length; i++) {
      let items = []
      for (let j = 0; j < embeddedForm.length; j++) {
        if (rows[i] === embeddedForm[j].row) {
          items.push(embeddedForm[j])
        }
      }
      rowArray.push({items: items})
    }
    return rowArray;
  }

  //构造表单的一行组件
  createRow = (row, index, record, canEdit, state) => {
    return (
      <StyledRow key={index}>
        <Col span={24}>
          {
            row.items.map((item, index) => this.createFormItem(item, index, record, canEdit, state))
          }
        </Col>
      </StyledRow>
    )
  }

  //构造表单的一行组件中的一个item组件
  createFormItem(item, index, record, canEdit, state) {
    let initialValue = item.initialValue != undefined ? item.initialValue : record[item.key];
    const componentProps = {
      ...item,
      itemKey: item.key,
      initialValue: initialValue,
      getFieldDecorator: this.props.getFieldDecorator,
      setFieldsValue: this.props.setFieldsValue,
      canEdit,
      mode: item.type == 'Attachment' ? state.mode : undefined,
      link: item.type == 'Attachment' ? service.parseRecordUrl(record) : undefined,
    }
    return (
      <FormItem key={index + '_' + item.key} {...componentProps} />
    )
  }
}

FormContainer.propTypes = {
  model: PropTypes.object.isRequired,
  embeddedForm: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
}

export default FormContainer;
