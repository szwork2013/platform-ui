import { modelTemplate } from 'utils';
import Form from './Form';

//权限模型定义
const namespace = {
  name: 'institution_categories', //模型的命名空间
  title: '制度分类', //模型的名称
  clazz: 'InstitutionCategory',
  linkAttrs: ['parent', 'children'], //需要抓取的关联属性
};

const modelParam = {
  form: Form, //使用的表单
  titleRender: (record) => !record.name ? '新制度分类' :'制度分类：'+record.name,
};

export default modelTemplate.createModel(namespace, modelParam);