import * as usefulExpressionService from './service'
import {config} from 'utils';

export default {

  namespace: 'usefulExpression',
  state: {
    userSelfLink: null,
    editRowKey: null,
    editValue: null,
    list: [],
    selectedRowKeys: [],
  },
  reducers: {
    refresh(state, {payload}) {
      return {...state, ...payload}
    },
  },
  effects: {
    * init({payload}, {call, put}) {
      const {userSelfLink} = payload;
      const response = yield call(usefulExpressionService.getList, {user:userSelfLink});
      yield put({
        type: 'refresh',
        payload: {list: response._embedded ? response._embedded.usefulExpressions : []}
      });
    },
    * del({payload}, {select, call, put}) {

      let {list, selectedRowKeys} = yield select(({usefulExpression}) => usefulExpression);
      yield call(usefulExpressionService.del, selectedRowKeys);
      let newList = list.filter((item) => {
        return !selectedRowKeys.includes(item._links.self.href);
      });
      yield put({
        type: 'refresh',
        payload: {list: newList, selectedRowKeys: []}
      });
    },
    * update({payload}, {select, call, put}) {
      const {record} = payload;
      yield call(usefulExpressionService.patch, record._links.self.href,{content:record.content});
      yield put({
        type: 'refresh',
      });
    },
    * create({payload}, {select, call, put}) {
      let {comment} = payload;
      let {list,userSelfLink} = yield select(({usefulExpression}) => usefulExpression);
      let param = {}
      param.content = comment;
      if (userSelfLink) {
        param.user = userSelfLink
      }
      const response = yield call(usefulExpressionService.create, param);
      yield put({
        type: 'refresh',
        payload: {list:  [response,...list]}
      });

      yield put({
        type: 'commentButton/refresh',
        payload: {addAllowed:false}
      });
    },
  },

}

