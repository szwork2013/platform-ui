import { Checkbox } from 'antd'

import { StyledFormItem } from '../styled'

const FormItemCheckbox = ( props ) => {
  //解构参数
  const {
    getFieldDecorator,
    title, //字段标题
    itemKey, //字段名
    rules, //校验规则
    width = ['160px', '0px', '160px'], //[整体宽度，lable宽度，内容宽度]，支持px和百分比
    initialValue, //初始值
    required = true, //是否必须填写
    canEdit = true,  //是否可编辑
    controlProps = {}, //控件属性
    ...rest
  } = props;

  //构造校验规则
  let ruleArr = required ? [
    {
      required: required,
      message: title + '不能为空'
    }
  ] : [];
  if (rules)
    ruleArr.concat(rules);

  const defaultValue=initialValue!=undefined ? initialValue : undefined;
  let disabled=!canEdit;

  //显示UI
  const hasFeedback = props.hasFeedback!=undefined ? props.hasFeedback : required;
  return (
    <StyledFormItem hasFeedback={hasFeedback} width={width} {...rest} >
    {
      getFieldDecorator(itemKey, {
        valuePropName: 'checked',
        initialValue: defaultValue!=undefined ? Boolean(defaultValue) : undefined,
        rules: ruleArr,
      })(<Checkbox disabled={disabled} {...controlProps}>{title}</Checkbox>)
    }
    </StyledFormItem>
  )
}

import PropTypes from 'prop-types';
FormItemCheckbox.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  initialValue:  PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  rules: PropTypes.array,
  width: PropTypes.array,
  required: PropTypes.bool,
  canEdit: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  controlProps: PropTypes.object,
}

export default FormItemCheckbox;
