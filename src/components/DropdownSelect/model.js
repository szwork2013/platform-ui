import service from 'service';
import treeService from '../Tree/service';

const modelName = 'dropdownSelect';

const model =  {
  namespace: modelName,
  state: {
    data:[], //元素格式：{key, list:[], tree:[]}
  },
  reducers: {
    // 处理保存消息
    save(state, action) {
      return {...state, ...action.payload}
    },
  }, // end of reducers

  effects: {
    // 请求选项数据消息
    *query({payload}, {call, put,select}) {
      let data = yield select(state=> state[modelName].data);

      let { searchParam, dataKey } = payload;

      //郑波2018-1-16修改：支持多个视图使用一个模型
      //const state = yield select(state=> state[payload.modelName]);
      //searchParam = service.autoConfigSearchParam({searchParam, state});
      const state = yield select(state=> state[payload.modelName]);
      const viewData = service.getViewData(state, dataKey);
      searchParam = service.autoConfigSearchParam({searchParam, state:viewData});
      //---END---

      //1 调用服务获取选项数据
      const result = yield call(service.queryPage,payload.modelName,searchParam);
      if (!result) return; //出错了

      //2 构造选项数据
      let dataResult = service.parseRestResult(result);
      let {list, tree} = dataResult;
      if(payload.type.toLowerCase()==='tree'){
        tree = treeService.arrayToSelectTree(list, payload.labelKey);
      }

      //3 设置选项数据
      let key = payload.uid;
      const oldIndex = data.findIndex(r=>r.key==key);
      if (oldIndex >= 0) //存在选项数据
        data[oldIndex] = {key:key, list:list, tree:tree};
      else //不存在选项数据
        data.push({key:key, list:list, tree:tree});

      //4 调用reducers的save更新数据模型
      yield put({
        type: 'save',
        payload: {data: data}
      });
    },

    // 添加一条数据
    *add({payload}, {call, put,select}) {
      let data = yield select(state=> state[modelName].data);

      let key = payload.uid;
      let item = payload.item;
      const oldIndex = data.findIndex(r=>r.key==key);
      if(!oldIndex)
        return;

      data[oldIndex].list.push(item);
      if(payload.type.toLowerCase()==='tree'){
       let tree = treeService.arrayToSelectTree(data[oldIndex].list, payload.labelKey);
        data[oldIndex].tree=tree;
      }

      //4 调用reducers的save更新数据模型
      yield put({
        type: 'save',
        payload: {data: data}
      });
    },

    // 请求节点的子节点选项数据消息
    *children({payload}, {call, put,select}) {
      let data = yield select(state=> state[modelName].data);
      const {uid, nodeKey, labelKey, node} = payload;

      let { searchParam, parentKey, childrenLink } = payload;

      //郑波2018-1-16修改：支持多个视图使用一个模型
      //const state = yield select(state=> state[payload.modelName]);
      //searchParam = service.autoConfigSearchParam({searchParam, state});
      const state = yield select(state=> state[payload.modelName]);
      const viewData = service.getViewData(state, dataKey);
      searchParam = service.autoConfigSearchParam({searchParam, state:viewData});
      //---END---

      //构造获取儿子节点数据的链接
      childrenLink = treeService.getChildrenLink(childrenLink, searchParam, parentKey);

      //1 调用服务获取选项数据
      const result = yield call(service.queryRecord, childrenLink, {size:1000});
      if (!result) return; //出错了

      //2 构造子节点选项数据
      const dataResult = service.parseRestResult(result);
      const {list} = dataResult;
      const tree = treeService.arrayToSelectTree(list, labelKey);

      //3 调用reducers的save更新数据模型
      node.children = tree;
      yield put({
        type: 'save',
        payload: {data: data}
      });
    },
  }, // end of effects

  subscriptions: {
  }
};

export default model;
