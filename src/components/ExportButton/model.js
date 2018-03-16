import service from 'service';
import {config} from 'utils';
const { api } = config; //取得RESTful api配置信息

export default {

  namespace: 'exportDialog',
  state: {
    modalVisible: false,
    selectedList: [],//选择结果
    selectionList:[],
    templateNo:'',
    url:''
  },
  reducers: {

    refresh(state, {payload}) {
      return {...state, ...payload}
    },

    show(state,{payload}) {
      return {...state, ...payload, modalVisible: true}
    },

    hide(state,{payload}) {
      return {...state,  ...payload,modalVisible: false}
    },

    selectChange(state, {payload}) {
      const {record,selected} = payload;
      let {selectedList} = state;
      if(selected){
        let item=selectedList.find(r=>r.key==record.key);
        if(!item)
        selectedList.push(record);
        return {...state, selectedList}
      }
      else{
        let result=[];
        selectedList.forEach((item)=>{
          if(item.key!=record.key)
            result.push(item)
        })
        return {...state, selectedList:result}
      }

    },

    selectAll(state, {payload}) {
      let {selectedList} = state;
      const {changeRows,selected} = payload;
      if(selected){
        changeRows.forEach((item)=>{
          selectedList.push(item)
        })
        return {...state, selectedList}
      }
        else return {...state, selectedList:[]}
    },

    remove(state, {payload}) {
      let {selectedList} = state;
      const {record} = payload;
      let result=[];
      selectedList.forEach((item)=>{
        if(item.key!=record.key)
          result.push(item)
      })
      return {...state, selectedList:result}
    },
  },
  effects: {
    * init({payload}, {call, put}) {
      const { rootPath } = api; //RESTful请求的根路径
      const url=rootPath.replace('api','')+'template_excel/service/extract_column?templateNo='+payload.templateNo;
      const result = yield call(service.httprequest, url);
      if(result!=null) {
        for (let attr in result) {
          payload.selectionList.push(result[attr])
        }
      }
      yield put({
        type: 'show',
        payload
      });
    },
  },
}

