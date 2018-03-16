import {wfservice} from 'utils';

export default {

  namespace: 'workflowHistory',
  state: {
    instanceId: null,
    modalVisible: false,
    currentStatus: null,
    flowHistory: null,
  },
  reducers: {
    refresh(state, {payload}) {
      return {...state, ...payload}
    },
    show(state) {
      return {...state, modalVisible: true}
    },
    hide(state) {
      return {...state, modalVisible: false,}
    },
    reset(state) {
      return {
        ...state, instanceId: null, currentStatus: [], flowHistory: []
      }
    }
  },
  effects: {
    * init({payload}, {call, put}) {
      const todoResponse = yield call(wfservice.queryTodoByInstance, payload.instanceId);
      const history = yield call(wfservice.queryProcessHistories, payload.instanceId);
      if (todoResponse._embedded) {
        payload.currentStatus = todoResponse._embedded.todos;
      } else {
        payload.currentStatus = [];
      }
      if (history) {
        payload.flowHistory = history;
      } else {
        payload.flowHistory = [];
      }
      yield put({
        type: 'refresh',
        payload: {...payload}
      });
    },
    * queryHistory({payload}, {select, call, put}) {
      const instanceId = yield select(({workflowHistory}) => workflowHistory.instanceId);
      const response = yield call(wfservice.queryProcessHistories, instanceId);
      yield put({
        type: 'refresh', payload: {flowHistory: response}
      });
    },
  },
}

