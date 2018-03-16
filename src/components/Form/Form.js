import {Form, Spin, message} from 'antd'

import ActionBar from './ActionBar';
import FormContainer from './FormContainer';

import service from 'service';

//导入styled组件
import {
  StyledFormDiv,
  theme,
} from './styled';

const FormComponent = (props) => {
  //解构参数
  const {
    modelName, //模型注入
    model, // AppTabs注入：数据
    href, // AppTabs注入：RESTful链接
    actionBar, //操作条
    embeddedForm, //嵌入的表单
    form: {
      getFieldDecorator,
      validateFields,
      setFieldsValue,
      getFieldValue,
    },
    loading=false,
    dispatch,
  } = props;

  //构造form参数
  const formProps = {
    embeddedForm,
    modelName,
    model,
    getFieldDecorator,
    dispatch,
    href,
    setFieldsValue,
    getFieldValue,
    validateFields
  };

  //构造actionBar参数
  const actionBarProps = {
    actionBar,
    modelName,
    model,
    href,
    validateFields,
    loading,
    dispatch,
  };

  theme.hasActionBar = props.actionBar ? true : false;

  return (
    <Spin spinning={loading}>
    <StyledFormDiv key={modelName+'FormComponentDiv'}>
      {/*操作条*/}
      {
        props.actionBar &&
        <ActionBar key={modelName+'FormActionBar'} {...actionBarProps}/>
      }
      {/*表单容器*/}
      <FormContainer key={modelName+'FormContainer'} {...formProps} />
    </StyledFormDiv>
    </Spin>
  );
}

//表单字段被修改事件处理
const onFieldsChange = (props, fields) => {
  //解构参数
  const {
    model, // AppTabs注入：数据
    modelName,
    href, // AppTabs注入：RESTful链接
    dispatch,
  } = props;

  const record = model.record || {};

  //修改模型中的对应字段
  for(let x in fields) {
    record[fields[x].name] = fields[x].value;
  }
}

//更新表单
const updateForm = ({dispatch, modelName, record}) => {
  dispatch && dispatch({
    type: 'apptabs/updateTab',
    payload : {
      key: service.parseRecordUrl(record)||modelName,
      model: {record}
    },
  });

  return true;
}

import PropTypes from 'prop-types';
FormComponent.propTypes = {
  modelName: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  actionBar: PropTypes.object,
  embeddedForm:  PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const exportForm = Form.create({
  onFieldsChange: onFieldsChange
})(FormComponent);

//判断能否编辑
exportForm.canEdit = (model) => {
  return (model.state.mode != 'view')
};

//判断是否为新文档
exportForm.isNewRecord = (model) => {
  return (model.state.mode == 'new')
}

//更新表单
exportForm.updateForm = updateForm;

export default exportForm;
