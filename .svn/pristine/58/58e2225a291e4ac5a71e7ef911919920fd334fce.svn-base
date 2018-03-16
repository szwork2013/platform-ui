import {StyledFormItem} from '../styled'
import {Attachment} from 'components';
import PropTypes from 'prop-types';

const FormItemAttachment = (props) => {
  //解构参数
  const {
    getFieldDecorator,
    setFieldsValue,
    link,
    itemKey,
    mode,//新增还是编辑
    rules, //校验规则
    title = '附件', //标题
    buttonTitle = '上载文件', //上载按钮标题
    width = ['48%', '20%', '80%'], //[整体宽度，lable宽度，内容宽度]，支持px和百分比
    required = true, //是否需要验证
    canEdit = true,  //是否可编辑
    multiple = false,//是否多选
    layout = 'vertical',//布局
    controlProps = {},//组件属性
  } = props;

  //构造校验规则
  let ruleArr = required ? [
    {
      required: mode == 'new' ? false:required,
      message: title + '不能为空',
      type: 'string',
    }
  ] : [];
  if (rules)
    ruleArr.concat(rules);

  let disabled = mode == 'new' ? true : !canEdit;

  const componentProps = {
    name: 'logo',
    link,
    itemKey,
    disabled: disabled,//新增的情况上传控件不能用
    buttonTitle,
    multiple,
    layout,
    setFieldsValue: value => setFieldsValue({[itemKey?itemKey:'_files']: value}),
    ...controlProps
  };

  //显示UI
  const hasFeedback = props.hasFeedback != undefined ? props.hasFeedback : required;
  return (
    <StyledFormItem hasFeedback={hasFeedback} width={width} label={title}>
      {
        getFieldDecorator(itemKey?itemKey:'_files', {
          rules: ruleArr
        })(<Attachment {...componentProps}/>)
      }
    </StyledFormItem>
  )
}

FormItemAttachment.propTypes = {
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string,
  itemKey: PropTypes.string,
  mode: PropTypes.string,
  link: PropTypes.string,
  rules: PropTypes.array,
  width: PropTypes.array,
  required: PropTypes.bool,
  canEdit: PropTypes.bool,
  layout: PropTypes.string,
  controlProps: PropTypes.object,
  getFieldDecorator: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
}

export default FormItemAttachment;
