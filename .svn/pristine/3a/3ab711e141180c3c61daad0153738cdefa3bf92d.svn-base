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
      title: '所处状态',
      key: 'state',
      initialValue: service.getHrefOfLinkAttr(record._embedded.state),
      required: true
    },
    {row: 5, type: 'Input', title: '批次号', key: 'batchNumber', required: true},
    {row: 6, type: 'Checkbox', title: '是否完成', key: 'completed', required: true},
  ]
  //显示UI
  return (
    <Form actionBar={actionBar} embeddedForm={embeddedForm} {...props} ></Form>
  );
}
export default connect(({apptabs, loading}) =>
  ({apptabs, loading: loading.models.workflow_runtime_todos})
)(FormComponent);


