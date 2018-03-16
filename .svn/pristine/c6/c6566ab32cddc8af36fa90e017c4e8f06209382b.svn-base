import { modelTemplate } from 'utils';
//模型定义
const namespace = {
  name: 'budget_org_match',
  title: 'erp机构对应',
  clazz: 'OrgMatch',
  linkAttrs: ['unit'], //需要抓取的关联属性
};
const modelParam = {
  form: undefined, //使用的表单
  titleRender: (record) => record && record.id ? record.id : '新erp机构对应',
};

export default modelTemplate.createModel(namespace, modelParam);
