import {modelTemplate} from 'utils';
import Form from './Form';

//权限模型定义
const namespace = {
  name: 'workflow_runtime_histories',
  title: '工作流历史',
  clazz: 'History',
  linkAttrs: ['instance', 'executionTodo', 'sendeeTodo']
};

const modelParam = {
  form: Form, //使用的表单
  titleRender: (record) => {
    return !record.id ? '新流程记录' : '流程记录：' + record.id;
  },
};

export default modelTemplate.createModel(namespace, modelParam);
