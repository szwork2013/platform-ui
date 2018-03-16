import {connect} from 'dva';
import {Form} from 'components'
import service from 'service'

const FormComponent = (props) => {
  //按钮条配置
  const actionBar = {
    save: true, //显示保存按钮
    close: true, //显示关闭按钮
  };

  const {record} = props.model;
  //表单配置
  const oneItem = ["96%", "10%", "90%"];

  const embeddedForm = [
    {
      row: 1,
      type: 'Input',
      title: '所属流程',
      key: 'process',
      initialValue: service.getHrefOfLinkAttr(record._embedded.process),
      width: oneItem,
      required: true
    },
    {row: 2, type: 'Input', title: '启动者Id', key: 'starterId', width: oneItem, required: true}
  ]
  //显示UI
  return (
    <Form actionBar={actionBar} embeddedForm={embeddedForm} {...props} ></Form>
  );
}
export default connect(({apptabs, loading}) =>
  ({apptabs, loading: loading.models.workflow_runtime_instances})
)(FormComponent);


