import { Input } from 'antd'
const { TextArea } = Input;

import { StyledFormItem } from '../styled'

const FormItemTextArea= ( props ) => {
  //解构参数
  const {
    getFieldDecorator,
    title, //字段标题
    itemKey, //字段名
    rules, //校验规则
    width = ['48%', '20%', '77%'], //[整体宽度，lable宽度，内容宽度]，支持px和百分比
    initialValue, //初始值
    lines = 3,//行数
    required = true, //是否必须填写
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
    {
      getFieldDecorator(itemKey, {
        initialValue: defaultValue,
        rules: ruleArr
      })(<TextArea rows={lines} disabled={disabled}
          placeholder={placeholder || '请填写'+title}  {...controlProps}
        ></TextArea>)
    }
    </StyledFormItem>
  )
}

import PropTypes from 'prop-types';

FormItemTextArea.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  rules: PropTypes.array,
  width: PropTypes.array,
  required: PropTypes.bool,
  lines: PropTypes.number,
  canEdit: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  placeholder: PropTypes.string,
  controlProps: PropTypes.object,
}

export default FormItemTextArea;
