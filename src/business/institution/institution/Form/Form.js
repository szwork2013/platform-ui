import {Form as  FormLayout } from 'components'
import Form from './InstitutionForm';

const FormComponent = (props) => {
  const actionBar = {
    save: true, //显示保存按钮
    close: true, //显示关闭按钮
    buttons:[
      { title:'发布', type:'publish', permission: (record, state) => {
          return record.publishedState&&record.publishedState!=2 ? 'institution.admin' : 'nobody';
      }
      },
      { title:'撤回', type:'tackback', permission: (record, state) => {
          return record.publishedState==2 ? 'institution.admin' : 'nobody';
        },
      }
    ],
  };

  //显示UI
  return (
    <FormLayout actionBar={actionBar} embeddedForm={<Form />} {...props}>
    </FormLayout>
  );
}

import { connect } from 'dva';
export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.institution_institutions})
)(FormComponent);
