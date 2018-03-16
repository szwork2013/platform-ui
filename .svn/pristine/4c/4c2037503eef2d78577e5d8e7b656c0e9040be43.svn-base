import {modelTemplate} from 'utils';
import Form from './Form';

//权限模型定义
const namespace = {
  name: 'workflow_runtime_todos',
  title: '工作流待办',
  clazz: 'Todo',
  linkAttrs: ['instance','state'],
};

const modelParam = {
  form: Form,
  titleRender: (record) => {
    return !record.id ? '新流程待办' : '待办实例：' + record.id;
  },
};

export default modelTemplate.createModel(namespace, modelParam);
