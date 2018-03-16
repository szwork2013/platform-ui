import { modelTemplate } from 'utils';
//模型定义
const namespace = {
  name: 'budget_sheetgroup',
  title: '报表组',
  clazz: 'SheetGroup',
};
const modelParam = {
  form: undefined, //使用的表单
  titleRender: (record) => record && record.id ? record.name : '新报表组',
};

export default modelTemplate.createModel(namespace, modelParam);
