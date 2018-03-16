import { modelTemplate } from 'utils';
import Form from './Form';

//权限模型定义
const namespace = {
  name: 'permissions', //模型的命名空间
  clazz: 'SysPermission',
  title: '权限定义', //模型的名称
};

const modelParam = {
  form: Form, //使用的表单
};

export default modelTemplate.createModel(namespace, modelParam);