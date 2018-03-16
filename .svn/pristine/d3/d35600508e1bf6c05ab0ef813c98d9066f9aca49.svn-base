import service from 'service';
import treeService from './service';

const modelName = 'tree';

const model =  {
  namespace: modelName,
  state: {
    data:[], //元素格式：{key, list:[], tree:[]},
    expandedKeys:[], //展开的节点的key数组
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
      const result = yield call(service.queryPage, payload.modelName, searchParam);
      if (!result) return; //出错了

      //2 构造选项数据
      let list=[];
      if(Array.isArray(result)){
        list=result;
      }else{
        let dataResult = service.parseRestResult(result);
        list = dataResult.list;
      }

      const tree = treeService.arrayToSelectTree(list, payload.labelKey);

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

    // 请求节点的子节点选项数据消息
    *children({payload}, {call, put,select}) {
      let data = yield select(state=> state[modelName].data);
      const {uid, nodeKey, labelKey, node} = payload;

      let { searchParam, parentKey, childrenLink, expandAllDescendants, dataKey } = payload;

      //郑波2018-1-16修改：支持多个视图使用一个模型
      //const state = yield select(state=> state[payload.modelName]);
      //searchParam = service.autoConfigSearchParam({searchParam, state});
      const state = yield select(state=> state[payload.modelName]);
      const viewData = service.getViewData(state, dataKey);
      searchParam = service.autoConfigSearchParam({searchParam, state:viewData});
      //---END---

      //构造获取儿子节点数据的链接
      childrenLink = treeService.getChildrenLink(childrenLink, searchParam, parentKey, expandAllDescendants);

      //1 调用服务获取选项数据
      const result = yield call(service.queryRecord, childrenLink, {size:1000});
      if (!result) return; //出错了

      //2 构造子节点选项数据
      const dataResult = service.parseRestResult(result);
      const {list} = dataResult;
      const tree = treeService.arrayToSelectTree(list, labelKey);

      //郑波2017-11-5增加：把子节点设置为展开的节点
      let expandedKeys = [];
      for (let node of list) {
        expandedKeys.push(node.id+'')
      }
      const oldIndex = data.findIndex(r=>r.key==uid);
      if (oldIndex >=0) data[oldIndex].expandedKeys = expandedKeys;
      //---END---

      //3 调用reducers的save更新数据模型
      node.children = tree;
      yield put({
        type: 'save',
        payload: {data}
      });
    },

    // 节点展开折叠消息：仅展开所有后代节点为true时触发
    *onExpand({payload}, {call, put,select}) {
      let data = yield select(state=> state[modelName].data);
      const {uid, expandedKeys, expanded, record} = payload;

      //获得组件数据的位置
      const oldIndex = data.findIndex(r=>r.key==uid);
      if (oldIndex < 0) return;

      if (expanded) { //展开所有后代节点
        let idList = [];
        treeService.getIdListOfAllDescendants(idList, record);
        data[oldIndex].expandedKeys = idList;
      }
      else {//关闭节点
        const newExpandedKeys = [];
        for (let r of data[oldIndex].list) { //把当前节点的父亲节点设置为打开的节点
          if (r.id==record.parentId) {
            newExpandedKeys.push(r.id+'');
            break;
          }
        }

        data[oldIndex].expandedKeys = newExpandedKeys;
      }

      yield put({
        type: 'save',
        payload: {data}
      });
    }
  }, // end of effects

  subscriptions: {
  }
};

export default model;
