import { modelTemplate } from 'utils';
//模型定义
const namespace = {
  name: 'budget_numberrelation',
  title: '特殊取数关系',
  clazz: 'NumberRelation',
  linkAttrs: ['targetItem', 'sourceItems'], //需要抓取的关联属性
};
const modelParam = {
  form: undefined, //使用的表单
};

let typeOptions = [
  {id: '0', name: '年度'},
  {id: '1', name: '月度'},
  {id: '2', name: '公用'},
  {id: '3', name: '其他'},
];
let useTypeOptions = [
  {id: '0', name: '其他业务支出'},
  {id: '1', name: '管理费用'},
  {id: '2', name: '营业外支出'},
];
export {typeOptions,useTypeOptions};
export default modelTemplate.createModel(namespace, modelParam);
