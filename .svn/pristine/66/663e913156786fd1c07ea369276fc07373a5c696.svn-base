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
      title: '所属流程实例',
      key: 'instance',
      initialValue: service.getHrefOfLinkAttr(record._embedded.instance),
      required: true
    },
    {row: 2, type: 'Input', title: '执行者id', key: 'executorId', required: true},
    {row: 3, type: 'Input', title: '执行者名称', key: 'executorName', required: false},
    {
      row: 4,
      type: 'Input',
      title: '执行时待办',
      key: 'executionTodo',
      initialValue: service.getHrefOfLinkAttr(record._embedded.executionTodo),
      width: oneItem,
    },
    {row: 5, type: 'Input', title: '执行者所处状态名', key: 'executionStateName', required: false},
    {row: 6, type: 'Input', title: '操作Id', key: 'actionId', required: true, width: oneItem},
    {row: 7, type: 'Input', title: '操作名称', key: 'actionName', required: false, width: oneItem},
    {row: 8, type: 'Input', title: '接收者id', key: 'sendeeId', required: true, width: oneItem},
    {row: 9, type: 'Input', title: '接收者名称', key: 'sendeeName', required: false, width: oneItem},
    {
      row: 10,
      type: 'Input',
      title: '接收者待办',
      key: 'sendeeTodo',
      initialValue: service.getHrefOfLinkAttr(record._embedded.sendeeTodo),
      required: false,
      width: oneItem
    },
  ]
  //显示UI
  return (
    <Form actionBar={actionBar} embeddedForm={embeddedForm} {...props} ></Form>
  );
}
export default connect(({apptabs, loading}) =>
  ({apptabs, loading: loading.models.workflow_runtime_histories})
)(FormComponent);


