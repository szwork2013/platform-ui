import { InputNumber } from 'antd'

import { StyledFormItem } from '../styled'

const FormItemInputNumber = ( props ) => {
  //解构参数
  const {
    getFieldDecorator,
    title, //字段标题
    itemKey, //字段名
    rules, //校验规则
    width = ['24%', '40%', '60%'], //[整体宽度，lable宽度，内容宽度]，支持px和百分比
    initialValue, //初始值
    placeholder, //占位说明
    required = true, //是否必须填写
    canEdit = true,  //是否可编辑
    min, //当type 为InputNumber，可设置最小值
    max,//当type 为InputNumber，可设置最大值
    controlProps = {}, //控件属性
    ...rest
  } = props;

  //构造校验规则
  let ruleArr = required ? [
    {
      required: required,
      message: title + '不能为空',
      type:'number'
    }
  ] : [];
  if (rules)
    ruleArr.concat(rules);

  const defaultValue=initialValue!=undefined ? initialValue : undefined;
  let disabled=!canEdit;

  //显示UI
  const hasFeedback = props.hasFeedback!=undefined ? props.hasFeedback : required;
  return (
    <StyledFormItem hasFeedback={hasFeedback} label={title} width={width} {...rest}>
      {getFieldDecorator(itemKey, {
        initialValue: defaultValue,
        rules: ruleArr
      })(<InputNumber min={min} max={max} placeholder={placeholder || '请填写'+title} disabled={disabled} {...controlProps}/>)}
    </StyledFormItem>
  )
}

import PropTypes from 'prop-types';
FormItemInputNumber.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  title: PropTypes.string,
  itemKey: PropTypes.string.isRequired,
  initialValue: PropTypes.number,
  rules: PropTypes.array,
  width: PropTypes.array,
  required: PropTypes.bool,
  max:PropTypes.number,
  min:PropTypes.number,
  canEdit: PropTypes.bool,
  controlProps: PropTypes.object,
  placeholder: PropTypes.string,
}

export default FormItemInputNumber;
