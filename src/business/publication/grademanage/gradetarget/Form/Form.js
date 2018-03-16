import {message} from 'antd';

import {Form as  FormLayout} from 'components'
import Form from './EmbeddedForm';
import wfservice from 'wfservice';
import service from 'service';

const Layout = (props) => {
  const {model} = props;
  const {record} = model;

  //获取表单能否编辑
  let isNew = FormLayout.isNewRecord(model);
   let formCanEdit = isNew || wfservice.authz(record, ['formEdit']);
   //let formCanEdit = true;

  const actionBar = {
    edit: true, //显示编辑按钮
    save: isNew ? true : formCanEdit, //显示保存按钮
    beforeSaveType:'beforeSave',
    close: true, //显示关闭按钮
    print: false,
  };

  //显示UI
  return (
    <FormLayout actionBar={actionBar}
                embeddedForm={<Form formCanEdit={formCanEdit}/>} {...props}>
    </FormLayout>
  );
}

import { connect } from 'dva';
export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.grade_target})
)(Layout);
