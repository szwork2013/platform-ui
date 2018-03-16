import { message } from 'antd';

//初始的模型数据
const initInfo = {
  visible: false,
  maskClosable: false,
  closable: false,
  iconType: 'question-circle',
  title: '确认对话框',
  content: '要执行xxx操作，是否确定？',
  okText: '确定',
  cancelText: '取消',
  onOk: () => {return true;},
  onCancel: () => {return true},
}

//模型：apptabs
const model =  {
  namespace: 'modaldialog',
  state: {
    ...initInfo
  },
  reducers: {
    // 处理保存消息
    save(state, action) {
      return {...state, ...action.payload}
    },
  }, // end of reducers

  effects: {
    // 处理show消息
    *show({payload}, {call, put, select}) {
      yield put({
        type: 'save',
        payload: { ...payload, visible: true }
      })
    },
  },
};

export default model;
