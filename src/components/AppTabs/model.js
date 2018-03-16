import { message } from 'antd';

//初始的用户信息
const initInfo = {
  tabs:[], //数组元素格式：{tile, key, component, model{record, state {mode, origin}}}
  activeTabKey: 'HomeTab', //缺省活动的tab的key
}

//模型：apptabs
const model =  {
  namespace: 'apptabs',
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
    // 处理新tab消息
    *newTab({payload}, {call, put, select}) {
      let tabs = yield select(state=> state.apptabs.tabs);
      const tab = tabs.find(tab => tab.key === payload.key);
      if (tab) {
        message.warning('“'+tab.title+'”已经被打开，不能重复打开！', 2);
        return;
      }

      //把新tab加入模型
      tabs.push(payload);
      yield put({
        type: 'save',
        payload: { tabs, activeTabKey: payload.key }
      })
    },

    // 处理关闭tab消息
    *closeTab({payload}, {call, put, select}) {
      const tabs = yield select(state=> state.apptabs.tabs);
      const tab = tabs.find(tab => tab.key === payload.key);

      //把指定tab从模型中删除
      let newTabs = [];
      for (let tab of tabs) tab.key != payload.key && newTabs.push(tab);
      //更新模型
      const last = newTabs.length - 1; //取最后一个tab的index
      yield put({
        type: 'save',
        payload: { tabs: newTabs, activeTabKey: last>=0 ? newTabs[last].key:'' }
      })
    },

    // 处理替换tab消息
    *replaceTab({payload}, {call, put, select}) {
      if (!payload.newTab) {
        message.error('参数错误：未指定newTab!');
        return;
      }
      let tabs = yield select(state=> state.apptabs.tabs);
      let activeTabKey = yield select(state=> state.activeTabKey);

      //删除老tab
      let newTabs = [];
      for (let tab of tabs){
        tab.key != payload.oldKey && newTabs.push(tab)
      };

      //加入新tab
      newTabs.push(payload.newTab);
      activeTabKey = payload.newTab.key;
      yield put({
        type: 'save',
        payload: { tabs: newTabs, activeTabKey: activeTabKey }
      })
    },

    // 处理更新tab消息
    *updateTab({payload}, {call, put, select}) {
      let tabs = yield select(state=> state.apptabs.tabs);

      //查找要更新的tab
      const index = tabs.findIndex(tab => tab.key === payload.key);
      if (index < 0) return;

      //更新model
      const { record, state ,needValidate} = payload.model;
      if (state) { //状态数据
        if (state.mode)
          tabs[index].model.state.mode = state.mode;
        if (state.origin)
          tabs[index].model.state.origin = state.origin;
      }
      if (record) //当前数据
        tabs[index].model.record = record;

      yield put({
        type: 'save',
        payload: { tabs: tabs, activeTabKey: payload.key }
      })
    },
  }, // end of effects

  subscriptions: {
    setup({dispatch, history}) {
      dispatch({
        type: 'webapp/subscribe',
        payload: ['saveStateToLocal', 'readStateFromLocal'],
      })
    }
  },
};

export default model;
