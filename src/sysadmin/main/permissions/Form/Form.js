import { connect } from 'dva';

import { Form } from 'components'
import EmbeddedForm from './EmbeddedForm';

const FormComponent = (props) => {
  const actionBar = {
    edit: true, //显示编辑按钮
    saveAndClose: true, //显示保存并关闭按钮
    save: true, //显示保存按钮
    close: true, //显示关闭按钮
    buttons:[
      //{ title:'测试', type:'test', payloadRender: () => '测试消息！123' },
    ],
  };

  //表单配置
  const oneItem = ['96%','10%','90%'];

  const embeddedForm=[
    { row: 0, type:'Checkbox', title:'启用', key:'enable', required: true },
    { row: 1, type:'Input', title:'名称', key:'name', required: true,
      placeholder:'权限的名称，用于显示，必须唯一。'},
    { row: 2, type:'Input', title:'编号', key:'no', required: true,
      placeholder:'权限的编号，用于编程，必须唯一。示例：sys.admin或者user:*'},
    { row: 3, type:'TextArea', title:'规则', key:'authorizationRule',
      width: oneItem, required: true,
      placeholder:'权限的规则表达式，javascript语法。示例：hasRole("管理员")'},
    { row: 4, type:'TextArea', title:'描述', key:'description',
      width: oneItem, required: false,
      placeholder:'对权限定义的用途、规则等进行解释说明。'},
  ];

	//显示UI
	return (
    <Form actionBar={actionBar} embeddedForm={<EmbeddedForm />} {...props}>
    </Form>
	);
}

export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.permissions})
)(FormComponent);
