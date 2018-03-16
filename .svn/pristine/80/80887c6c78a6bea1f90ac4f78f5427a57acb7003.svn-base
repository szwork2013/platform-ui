import service from 'service';

import { modelTemplate } from 'utils';
import Form from './Form';

//制度模型定义
const namespace = {
  name: 'institution_introduceorg', //模型的命名空间
  title: '制度', //模型的名称
  clazz: 'IntroduceOrg', //模型对应的后台实体类
  linkAttrs: ['category'], //需要抓取的关联属性
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则
    },
    size: 20, //指定每页记录数
    sort: 'id,asc' //缺省排序规则
  },
  form: Form, //使用的表单
  titleRender: (record) => !record.name ? '新组织文件' :'组织文件：'+record.name,
  
};

export default modelTemplate.createModel(namespace, modelParam);