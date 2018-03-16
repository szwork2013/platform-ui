import {modelTemplate} from 'utils';
import Form from './Form';

//权限模型定义
const namespace = {
  name: 'workflow_runtime_instances',
  title: '工作流实例',
  clazz: 'Instance',
  linkAttrs: ['process'],
};

const modelParam = {
  form: Form, //使用的表单
  titleRender: (record) => {
    return !record.id ? '新流程实例' : '流程实例：' + record.id;
  },
};

export default modelTemplate.createModel(namespace, modelParam);
