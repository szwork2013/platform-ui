import * as service from './service'
import {message} from 'antd';


export default {
  namespace: 'copySheet',
  state: {
    modalVisible: false,
    copyType:3,//复制类型:0-均不复制;1-复制行;2-复制列;3-行列都复制
  },
  reducers: {
    refresh(state,{payload}) {
      return {...state, ...payload}
    },
    show(state, {payload}) {
      return {...state, modalVisible: true}
    },
    hide(state) {
      return {...state, modalVisible: false}
    },
  },
  effects: {
    * copySheet({payload}, {select, call, put}) {
      let param = payload;
      const {copyType} = yield select(({copySheet}) => copySheet);
      param.copyType = copyType;
      let response = yield call(service.copySheet, param);
      if (response === "") {
        yield put({type: 'hide'});
        message.success('拷贝成功！', 1);
      }
    },
  },
}
