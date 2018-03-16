import { modelTemplate } from 'utils';
import Form from './Form';

//权限模型定义
const namespace = {
  name: 'users',
  title:'用户',
  clazz: 'SysUser',
  linkAttrs: ['org', 'roles'],
};

const modelParam = {
  form: Form, //使用的表单
  //打开窗口标题生成器
  titleRender: (record) => !record||!record.name ? '新用户' :'用户：'+record.name,
};

export default modelTemplate.createModel(namespace, modelParam);