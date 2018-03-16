import {connect} from 'dva';
import {message} from 'antd'
import {Form as  FormLayout} from 'components'
import Form from './EmbeddedForm';
import wfservice from 'wfservice';
import service from 'service';

const FormComponent = (props) => {

  const {model} = props;
  const {record} = model;

  //获取表单能否编辑
  let isNew = FormLayout.isNewRecord(model);
  let formCanEdit = isNew || wfservice.authz(record, ['formEdit']);

  const actionBar = {
    edit: true, //显示编辑按钮
    save: isNew ? true : formCanEdit, //显示保存按钮
    close: true, //显示关闭按钮
    print: false,
    templateNo: 'contract',
  };

  //显示UI
  return (
    <FormLayout actionBar={actionBar}
                embeddedForm={<Form formCanEdit={formCanEdit}/>} {...props}>
    </FormLayout>
  );

}

export default connect(({apptabs, loading}) =>
  ({apptabs, loading: loading.models.department_plan})
)(FormComponent);
