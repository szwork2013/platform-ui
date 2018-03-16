import React from 'react';
import Form from './EmbeddedForm';
import {Form as  FormLayout} from 'components'
import wfservice from 'wfservice';
import {connect} from 'dva';

const FormComponent = (props) => {

  const {model} = props;
  const {record} = model;
  //获取表单能否编辑
  let isNew = FormLayout.isNewRecord(model);
  let formCanEdit = isNew || wfservice.authz(record, ['formEdit']);
  //按钮条配置
  const actionBar = {
    edit: true, //显示编辑按钮
    save:true,
    close: true, //显示关闭按钮
    print: false,
  };

  //显示UI
  return (
    <FormLayout actionBar={actionBar} embeddedForm={<Form formCanEdit={formCanEdit}/>} {...props} >
    </FormLayout>
  );
}

export default connect(({apptabs, loading}) =>
  ({apptabs, loading: loading.models.budget_sheet})
)(FormComponent);
