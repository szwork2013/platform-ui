import { modelTemplate } from 'utils';
//模型定义
const namespace = {
  name: 'budget_item',
  title: '数据项定义',
  clazz: 'Item',
};
const modelParam = {
  form: undefined, //使用的表单
  titleRender: (record) => record && record.id ? record.name : '新数据项定义',
};

export default modelTemplate.createModel(namespace, modelParam);
