import {connect} from 'dva';
import {Form} from 'components'

const FormComponent = (props) => {
  //按钮条配置
  const actionBar = {
    save: true, //显示保存按钮
    close: true, //显示关闭按钮
  };

  let {
    model, //FormContainer注入：模型
  } = props;

  const { record, state } = model;

  //表单配置
  const oneItem = ["96%", "10%", "90%"];

  const embeddedForm = [
    {row: 1,type: 'Input',title: '名称', key: 'name', },
    {row: 2,type: 'Input',title: '排序号',key: 'sortNo'},
    {row: 3,type: 'Input', title: '编号',key: 'no',},
    {row: 4,type: 'TextArea', title: '描述',key: 'description', required:false},
    {row: 5,type: 'Attachment', title: '模板附件', key: '', required: true, width:oneItem},
    {row: 6,type: 'TextArea', lines: 12, title: '数据计算规则', key: 'rules', required:false, width:oneItem},
  ]
  //显示UI
  return (
    <Form actionBar={actionBar} embeddedForm={embeddedForm} {...props} ></Form>
  );
}
export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.template_excel})
)(FormComponent);


