import { modelTemplate } from 'utils';

import service from 'service';
import {config} from 'utils';
const { api } = config; //取得RESTful api配置信息

export default {
  namespace: 'publication_statisticForm',
  state: {
    conditionData: {
      year:new Date().getFullYear(),
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


