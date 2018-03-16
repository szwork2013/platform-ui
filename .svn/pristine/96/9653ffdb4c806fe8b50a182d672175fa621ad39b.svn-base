import { modelTemplate } from 'utils';
import Form from './Form';

//权限模型定义
const namespace = {
  name: 'roles',
  title:'角色',
  clazz: 'SysRole',
  recordProjection: 'list',
  linkAttrs: ['users']
};

const modelParam = {
  form: Form, //使用的表单
};

export default modelTemplate.createModel(namespace, modelParam);