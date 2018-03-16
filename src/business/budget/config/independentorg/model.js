import { modelTemplate } from 'utils';
//模型定义
const namespace = {
  name: 'budget_independentorg',
  title: '独立分解机构',
  clazz: 'IndependentOrg',
};
const modelParam = {
  form: undefined, //使用的表单
  titleRender: (record) => record && record.id ? record.name : '新独立分解机构',
};

export default modelTemplate.createModel(namespace, modelParam);
