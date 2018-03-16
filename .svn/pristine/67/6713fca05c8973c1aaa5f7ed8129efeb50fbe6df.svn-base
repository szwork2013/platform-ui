import * as service from '../service'

export default {

  namespace: 'sendeeAuto',
  state: {
    modalVisible: false,
    action: {},
    todoId: -1,
    instanceId: -1,
    receiverCondition: '',
    roleCondition: '',//角色条件
    ouLevel: -1,//ou层级0-1-2
    ouType: -1,//ou类型:0-本ou;1-外ou
    starterId: '',
    senderId: '',
    specificReceiverUrl: '',
    selectedSendee: [],//选择人员结果
    extraData:{},
  },
  reducers: {
    refresh(state, {payload}) {
      return {...state, ...payload}
    },
    hide(state) {
      return {...state, modalVisible: false}
    },
    reset(state) {
      return {
        ...state, roleCondition: '', ouLevel: -1, ouType: -1, selectedSendee: []
      }
    },
  },
  effects: {
    * init({payload}, {call, put}) {
      let {
        selectedSendee,
        roleCondition,
        ouLevel,
        ouType,
        starterId,
        senderId,
        specificReceiverUrl,
        instanceId
      } = payload;
      let url = specificReceiverUrl + (specificReceiverUrl && specificReceiverUrl.includes('?') ? '&' : '?') + 'instanceId=' + instanceId;
      const response = yield call(service.getUserList, {
        roleCondition,
        ouLevel,
        ouType,
        starterId,
        senderId,
        specificReceiverUrl: url
      });
      if (response._embedded) {
        selectedSendee = response._embedded.sysUsers;
      }
      yield put({
        type: 'refresh', payload: {...payload, selectedSendee}
      });
    },
  },
}

