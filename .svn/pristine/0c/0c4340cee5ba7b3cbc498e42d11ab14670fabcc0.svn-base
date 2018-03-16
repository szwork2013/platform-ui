import { modelTemplate } from 'utils';
//模型定义
const namespace = {
  name: 'budget_item_charge',
  title: '科目分管配置',
  clazz: 'ItemCharge',
  linkAttrs: ['chargeOrg','item'], //需要抓取的关联属性
};
const modelParam = {
  form: undefined, //使用的表单
  titleRender: (record) => record && record.id ? record.id : '新科目分管配置',
};

export default modelTemplate.createModel(namespace, modelParam);
