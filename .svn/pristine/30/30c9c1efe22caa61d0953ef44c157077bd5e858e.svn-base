import service from 'service';
import wfservice from 'wfservice';
import {getSheetsInfo} from './service';
const model =  {
  namespace: 'budget_reportViews',
  state: {
    sheets:[],
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload}
    }
  }, // end of reducers
  subscriptions: {

  },
  effects: {
    //初始化模型消息
    *initialize({payload}, {select, call, put}) {

    },    
    // 获取报表配置信息
    *getSheetsInfo({type,payload}, {call, put,select}) {
      let allSheets=yield getSheetsInfo(payload);
      const namespace = service.getNamespace(type);
      let sheets = yield select((state) => state[namespace].sheets);
      sheets=allSheets;
        yield put({
        type: 'save',
        payload: {sheets}
      });  
    },
    //获取表头信息
    *getSheetHeadInfo({payload}, {call, put,select}) {
 
    },  
    //获取表行数据
    *getSheetRowData({payload}, {call, put,select}) {
 
    }, 
    //保存表数据
    *saveSheetRowData({payload}, {call, put,select}) {
 
    },          
  }, // end of effects
};

export default model;
