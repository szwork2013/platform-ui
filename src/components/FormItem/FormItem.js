import Checkbox from './Checkbox';
import Input from './Input';
import DatePicker from './DatePicker';
import InputNumber from './InputNumber';
import RadioGroup from './RadioGroup';
import TextArea from './TextArea';
import DropdownSelect from './DropdownSelect';
import Attachment from './Attachment';
import CommentRow from './CommentRow';
import CommentView from './CommentView';

const FormItem = ( props ) => {
  //解构参数
  let {
    type,//控件类型
    initialValue,
    canEdit,
    required,
    placeholder,
    ...rest
  } = props;

  //郑波2017-11-3增加：避免缺省值是数字时不正常
  if (initialValue && (type == 'Select' || type=='TreeSelect') &&
    !(initialValue instanceof Array ||
      initialValue instanceof Object))
    initialValue += '';
  //---END---

  const componentProps={
    required: !canEdit?false:required,
    controlId: props.itemKey, //设置控件的id
    initialValue,
    canEdit,
    placeholder: !canEdit ? ' ' : placeholder,
    ...rest
  }

  //显示UI
  if (type === 'Input') {
    return (
      <Input {...componentProps}/>
    )
  }
  else if (type === 'Checkbox') {
    return <Checkbox type='Checkbox' {...componentProps} />
  }
  else if (type === 'DatePicker') {
    return (
      <DatePicker {...componentProps}/>
    )
  }
  else if (type === 'InputNumber') {
    return (
      <InputNumber {...componentProps}/>
    )
  }
  else if (type === 'RadioGroup') {
    return (
      <RadioGroup  {...componentProps}/>
    )
  }
  else if (type === 'TextArea') {
    return (
      <TextArea {...componentProps}/>
    )
  }
  else if (type === 'Select') {
    return (
      <DropdownSelect type='List' {...componentProps}/>
    )
  }
  else if (type === 'TreeSelect') {
    return (
      <DropdownSelect type='Tree' {...componentProps}/>
    )
  }
  else if (type === 'Attachment') {
    return (
      <Attachment  {...componentProps}/>
    )
  }
  else if (type === 'CommentRow') {
    return (
      <CommentRow  {...componentProps}/>
    )
  }
  else if (type === 'CommentView') {
    return (
      <CommentView  {...componentProps}/>
    )
  }
  else return null;
}

import PropTypes from 'prop-types';
FormItem.propTypes = {
  type: PropTypes.string.isRequired,
  canEdit:PropTypes.bool,
  disable:PropTypes.bool,
}

export default FormItem;
