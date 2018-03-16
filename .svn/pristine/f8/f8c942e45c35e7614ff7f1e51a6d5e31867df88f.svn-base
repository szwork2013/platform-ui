import { Form as FormLayout, FormItem } from 'components';

import service from 'service';

const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;

//权限定义表单
const EmbeddedForm = (props) => {
	//解构参数
	let {
    model, //FormContainer注入：模型
    canEdit = true, //FormContainer注入：是否可编辑
    getFieldDecorator,
	} = props;

  const { record } = model;

  //构造FormItem的公共参数
  const itemProps = { canEdit, getFieldDecorator };
  const oneItemWidth = ['96%','10%','90%'];

	//显示UI
	return (
    <Form layout='inline'>
      <Row>
        <FormItem type='Checkbox' {...itemProps}
          title='启用' itemKey='enable' initialValue={record.enable}
        />
      </Row>
      <Row>
        <FormItem type='Input' {...itemProps}
          title='名称' itemKey='name' initialValue={record.name}
          placeholder='权限的名称，用于显示，必须唯一。'
        />
      </Row>
      <Row>
        <FormItem type='Input' {...itemProps}
          title='编号' itemKey='no' initialValue={record.no}
          placeholder='权限的编号，用于编程，必须唯一。示例：sys.admin或者user:*'
        />
      </Row>
      <Row>
        <FormItem type='TextArea' {...itemProps} width={oneItemWidth}
          title='规则' itemKey='authorizationRule' initialValue={record.authorizationRule}
          placeholder='权限的规则表达式，javascript语法。示例：hasRole("管理员")'
        />
      </Row>
      <Row>
        <FormItem type='TextArea' required={false} {...itemProps} width={oneItemWidth}
          title='描述' itemKey='description' initialValue={record.description}
          placeholder='对权限定义的用途、规则等进行解释说明。'
        />
      </Row>
    </Form>
	);
}

export default EmbeddedForm;