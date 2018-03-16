import { modelTemplate } from 'utils';
import service from 'service';
import {getSheetCols} from './service';
//模型定义
const namespace = {
  name: 'budget_reportView',
  title:'预算',
  clazz: '',
};
const modelParam = {
  state:{
    columnInfo:[],
  },
  subscriptions: {

  }, // end of subscriptions
  effects: {
    // 获取报表配置信息
    *getSheetCols({type,payload}, {call, put,select}) {
      let{dataKey}=payload;
      let columnInfo=yield  getSheetCols(payload);
      yield put({
        type: 'save',
        payload:{dataKey,columnInfo}
      });
      return columnInfo;
    },

  },// end of effects
  reducers: {
    //根据列配置构造
    constructListProp(){

    },
    saveParam (state, action) {
      //郑波2018-1-16增加：支持多个视图使用一个模型
      return { ...state, ...action.payload }
      //return saveViewData(state, action.payload);
      //---END---
    }
  }// end of reducers
};

export default modelTemplate.createModel(namespace, modelParam);
