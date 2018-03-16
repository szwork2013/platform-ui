import {message} from 'antd'
import { modelTemplate } from 'utils';
import Form from './Form';

import service from 'service';

//权限模型定义
const namespace = {
  name: 'material_draw',
  title:'物资领用',
  clazz: 'MaterialDraw', //模型对应的后台实体类
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
  titleRender: (record)=>{
    let org=service.getRecordLinkAttr(record,'org')||{}
    if(record&&record.no){
      return org.orgName+'物资领用';
    }else{
      return '新物资领用';
    }
  },
  effects: {
    //表单消息：出库
    *inventoryOut ({payload}, { call, put,select }) {
      //解构消息
      let { record } = payload;
      const user = service.userInfo.user;
      let result=yield call(service.updateRecord,service.parseRecordUrl(record)+'/inventory_out?orgId='+user.org.id,{});
      if(result){
        message.info('出库成功');
        yield put({
          type: 'material_draw/refreshTodo',
          payload
        });
      }
    },

  },
};

export default modelTemplate.createModel(namespace, modelParam);
