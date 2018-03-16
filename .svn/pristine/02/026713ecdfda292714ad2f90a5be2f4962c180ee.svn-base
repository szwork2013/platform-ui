import { Input } from 'antd'

import { StyledFormItem } from '../styled'

const FormItemInput = ( props ) => {
  //解构参数
  const {
    getFieldDecorator,
    title, //字段标题
    itemKey, //字段名
    rules, //校验规则
    width = ['48%', '20%', '77%'], //[整体宽度，lable宽度，内容宽度]，支持px和百分比
    initialValue, //初始值
    required = true, //是否必须填写
    requiredType, //验证类型
    canEdit = true,  //是否可编辑
    placeholder, //占位说明
    controlProps = {}, //控件属性
    ...rest
  } = props;

  //构造校验规则
  let ruleArr = required ? [
    {
      required: required,
      message: title + '不能为空'
    },
  ] : [];

  if (requiredType)
    ruleArr.push({
      type: requiredType, message: title + '格式不正确'
    });

  if (rules)
    ruleArr.concat(rules);

  let disabled=!canEdit;

  //显示UI
  const hasFeedback = props.hasFeedback!=undefined ? props.hasFeedback : required;
  return (
    <StyledFormItem hasFeedback={hasFeedback} label={title} width={width} {...rest}>
    {
      getFieldDecorator(itemKey, {
        initialValue: initialValue,
        rules: ruleArr,
      })(<Input placeholder={placeholder || '请填写'+title} value={initialValue} disabled={disabled} {...controlProps}/>)
    }
    </StyledFormItem>
  )
}

import PropTypes from 'prop-types';
FormItemInput.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  initialValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  rules: PropTypes.array,
  width: PropTypes.array,
  required: PropTypes.bool,
  requiredType: PropTypes.string,
  canEdit: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  placeholder: PropTypes.string,
  controlProps: PropTypes.object,
}

export default FormItemInput;
