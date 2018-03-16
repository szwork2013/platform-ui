import {Form as  FormLayout } from 'components'
import Form from './IntroduceOrgForm';

const FormComponent = (props) => {
  const actionBar = {
    save: true, //显示保存按钮
    close: true, //显示关闭按钮
  };

  //显示UI
  return (
    <FormLayout actionBar={actionBar} embeddedForm={<Form />} {...props}>
    </FormLayout>
  );
}

import { connect } from 'dva';
export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.institution_introduceorg})
)(FormComponent);
