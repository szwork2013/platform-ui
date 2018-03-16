import {
  Radio} from 'antd'
const RadioGroup = Radio.Group;

import { StyledFormItem } from '../styled'

const FormItemRadioGroup = ( props ) => {
  //解构参数
  const {
    getFieldDecorator,
    title, //字段标题
    itemKey, //字段名
    rules, //校验规则
    width = ['48%', '20%', '80%'], //[整体宽度，lable宽度，内容宽度]，支持px和百分比
    initialValue, //初始值
    required = false, //是否必须填写
    canEdit = true,  //是否可编辑
    list, //时需要提供的数组{id，name}
    controlProps = {}, //控件属性
    onChange,
    ...rest
  } = props;

  //构造校验规则
  let ruleArr = required ? [
    {
      required: required,
      message: title + '不能为空',
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
      })(<RadioGroup disabled={disabled} onChange={onChange} {...controlProps}>
        {list.map((listItem, index) => <Radio key={index} value={listItem.id.toString()} {...controlProps}>{listItem.name}</Radio>)}
      </RadioGroup>)}
    </StyledFormItem>
  )
}

import PropTypes from 'prop-types';
FormItemRadioGroup.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  initialValue:  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  rules: PropTypes.array,
  width: PropTypes.array,
  required: PropTypes.bool,
  list:PropTypes.array,
  canEdit: PropTypes.bool,
  onChange:PropTypes.func,
  controlProps: PropTypes.object,
}

export default FormItemRadioGroup;
