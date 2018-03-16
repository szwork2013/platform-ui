import { connect } from 'dva';

import { Form } from 'components'

const FormComponent = (props) => {
  //按钮条配置
  const actionBar = {
    save: true, //显示保存按钮
    saveAndClose: true, //显示保存并关闭按钮
    edit: true, //显示编辑按钮
    close: true, //显示关闭按钮
  };

  //表单配置
  const oneItem = ['99%','10%','61%'];

  //构造用户列表的选项
  const { record } = props.model;
  const usersOptions = record.userList&&record.userList.map((userName, index) => {
    return {name: userName}
  });

  const embeddedForm=[
    { row: 1, type:'Input', title:'名称', key:'name' },
    { row: 2, type:'InputNumber', title:'序号', key:'sortNo' },
    { row: 3, type:'TextArea', title:'描述', key:'description', width:oneItem,
      required: false, lines: 3 },
    { row: 4, type:'Select', title:'包含用户', key:'userList', width:oneItem,
      required: false, multiple: true, disabled: true, placeholder:'无',
      options:usersOptions
    },
  ]

	//显示UI
	return (
    <Form actionBar={actionBar} embeddedForm={embeddedForm} {...props}>
    </Form>
	);
}

export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.permissions})
)(FormComponent);
