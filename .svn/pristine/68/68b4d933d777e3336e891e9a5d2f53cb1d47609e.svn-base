import { modelTemplate } from 'utils';
//模型定义
const namespace = {
  name: 'budget_represent',
  title: '代表配置',
  clazz: 'Represent',
  linkAttrs: ['sourceOrg', 'targetOrg'], //需要抓取的关联属性
};
const modelParam = {
  form: undefined, //使用的表单
  titleRender: (record) => record && record.id ? record.name : '新代表配置',
};

export default modelTemplate.createModel(namespace, modelParam);
