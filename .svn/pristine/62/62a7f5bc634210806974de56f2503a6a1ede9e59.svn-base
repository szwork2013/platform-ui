import { modelTemplate } from 'utils';

import service from 'service';
import {config} from 'utils';
const { api } = config; //取得RESTful api配置信息

export default {
  namespace: 'material_statisticForm',
  state: {
    conditionData: {
      type:'0',
      year:new Date().getFullYear(),
      month:new Date().getMonth()+1,
      quarter:Math.ceil((new Date().getMonth()+1)/3)
    },
    listData:[]
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload}
    },
  },
  effects: {

  },
}


