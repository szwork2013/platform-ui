import { modelTemplate } from 'utils';
import Form from './Form';

import service from 'service';
import wfservice from 'wfservice';

//权限模型定义
const namespace = {
  name: 'material_supplier',
  title:'供应商',
  clazz: 'MaterialSupplier', //模型对应的后台实体类
  linkAttrs:[]
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则

    },
    size: 20, //指定每页记录数
    sort: 'o.id,asc' //缺省排序规则
  },
  form: Form, //使用的表单
  titleRender: (record)=>record&&record.id? record.name:'新供应商',
  effects: {
        
  },
};

export default modelTemplate.createModel(namespace, modelParam);
