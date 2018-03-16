import * as service from '../service'
import _ from 'lodash';

export default {

  namespace: 'sendeeSelect',
  state: {
    modalVisible: false,
    action: {},
    instanceId: -1,
    roleCondition: '',//角色条件
    ouLevel: -1,//ou层级0-1-2
    ouType: -1,//ou类型:0-本ou;1-外ou
    multiple: false,//是否可多选
    starterId: '',
    senderId: '',
    specificReceiverUrl: '',
    userList: [],
    selectedSendee: [],//选择人员结果
    extraData:{},
  },
  reducers: {
    refresh(state, {payload}) {
      return {...state, ...payload}
    },
    show(state) {
      return {...state, modalVisible: true}
    },
    hide(state) {
      return {...state, modalVisible: false}
    },
    reset(state) {
      return {
        ...state, roleCondition: '', ouLevel: -1, ouType: -1, multiple: false, userList: [], selectedSendee: []
      }
    },
    rowSelected(state, {payload}) {
      const {record} = payload;
      let {multiple, selectedSendee} = state;
      const index = selectedSendee.findIndex((item) => item._links.self.href === record._links.self.href);
      const selected = index === -1;
      const result = service.selectChange(record, selected, multiple, selectedSendee);
      return {...state, selectedSendee: result}
    },
    selectChange(state, {payload}) {
      const {record, selected,} = payload;
      let {multiple, selectedSendee} = state;
      const result = service.selectChange(record, selected, multiple, selectedSendee);
      return {...state, selectedSendee: result}
    },
    selectAll(state, {payload}) {
      const {changeRows, selected,} = payload;
      let {selectedSendee} = state;
      let result;
      if (selected) {
        result = _.concat(selectedSendee, changeRows)
      } else {
        result = _.differenceWith(selectedSendee, changeRows, _.isEqual);
      }
      return {...state, selectedSendee: result}
    },
  },
  effects: {
    * init({payload}, {call, put}) {
      const {roleCondition, ouLevel, ouType, starterId, senderId, specificReceiverUrl, instanceId} = payload;
      if (roleCondition !== '' && ouType === 0) {
        let url = specificReceiverUrl + (specificReceiverUrl && specificReceiverUrl.includes('?') ? '&' : '?') + 'instanceId=' + instanceId;
        const users = yield call(service.getUserList, {
          roleCondition,
          ouLevel,
          ouType,
          starterId,
          senderId,
          specificReceiverUrl: url
        });
        if (users._embedded) {
          let responseUsers = users._embedded.sysUsers;
          yield put({
            type: 'refresh', payload: {userList: responseUsers, ...payload}
          });
        } else {
          yield put({
            type: 'refresh', payload: {...payload}
          });
        }
      } else {
        yield put({type: 'refresh', payload: {...payload}});
      }
    },
    * queryUserList({payload}, {select, call, put}) {
      const {orgId} = payload;
      const {roleCondition, ouLevel, ouType} = yield select(({sendeeSelect}) => sendeeSelect);
      const users = yield call(service.getUserList, {orgId, roleCondition, ouLevel, ouType});
      let userList = [];
      if (users._embedded) {
        userList = users._embedded.sysUsers;
      }
      yield put({
        type: 'refresh', payload: {userList}
      });
    },
    * remove({payload}, {call, put, select}) {
      const {key} = payload;
      let {selectedSendee} = yield select(({sendeeSelect}) => sendeeSelect);
      let result = selectedSendee.filter((item) => {
        return item._links.self.href !== key;
      });
      yield put({
        type: 'refresh', payload: {selectedSendee: result}
      });
    },
  },

}

