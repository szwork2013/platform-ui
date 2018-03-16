import { modelTemplate } from 'utils';

import service from 'service';

//权限模型定义
const namespace = {
  name: 'material_inventory',
  title:'物资库存',
  clazz: 'MaterialInventory', //模型对应的后台实体类
  linkAttrs:[]
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则
    },
    size: 20, //指定每页记录数
    sort: 'o.id,asc' //缺省排序规则
  },
  titleRender: (record)=>{
    let material=service.getRecordLinkAttr(record,'material')||{}
    if(record&&record.no){
      return material.name+'物资库存';
    }else{
      return '新物资库存';
    }
  },
  effects: {


  },
};

export default modelTemplate.createModel(namespace, modelParam);
