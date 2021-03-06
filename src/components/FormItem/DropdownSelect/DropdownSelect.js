import {DropdownSelect} from 'components'
import {StyledFormItem} from '../styled'
import PropTypes from 'prop-types';

const FormItemDropdownSelect = (props) => {
  //解构参数
  const {
    getFieldDecorator,
    setFieldsValue,
    controlId, //指定的唯一id
    type = 'List', //控件类型： List || Tree
    title, //字段标题
    itemKey, //字段名
    rules, //校验规则
    width = ['48%', '20%', '77%'], //[整体宽度，label宽度，内容宽度]，支持px和百分比
    multiple, //是否允许多选
    tags,//是否可输入
    initialValue, //初始值
    placeholder, //占位说明
    required = true, //是否必须填写
    canEdit = true,  //是否可编辑
    onSelect, //选中节点事件处理
    controlProps = {}, //控件属性
    ...rest
  } = props;

  //构造校验规则
  let ruleArr = required ? [
    {
      required: required,
      message: title + '不能为空',
      type: multiple ? tags ? 'string' : 'array' : 'string'
    }
  ] : [];
  if (rules)
    ruleArr.concat(rules);

  const defaultValue = initialValue != undefined ? initialValue : undefined;
  let disabled = !canEdit;

  //构造组件参数
  const componentProps = {
    controlId,
    type,
    disabled: disabled,
    placeholder: placeholder || '请选择' + title,
    multiple,
    tags,
    initialValue: defaultValue,
    onChange: value => {
      setFieldsValue({itemKey: value})
    },
    onSelect,
    controlProps,
    ...rest
  }

  //显示UI
  const hasFeedback = props.hasFeedback != undefined ? props.hasFeedback : required;
  return (
    <StyledFormItem hasFeedback={hasFeedback} label={title} width={width} {...rest}>
      {
        getFieldDecorator(itemKey, {
          initialValue: defaultValue,
          rules: ruleArr
        })(<DropdownSelect {...componentProps} />)
      }
    </StyledFormItem>
  )
}

FormItemDropdownSelect.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  itemKey: PropTypes.string.isRequired,
  rules: PropTypes.array,
  width: PropTypes.array,
  tags: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  placeholder: PropTypes.string,
  initialValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
  ]),
  required: PropTypes.bool,
  canEdit: PropTypes.bool,
  multiple: PropTypes.bool,
  controlProps: PropTypes.object,
  controlId:PropTypes.string,
}

export default FormItemDropdownSelect;
