import service from 'service';
import {config} from 'utils';

const {api} = config; //取得RESTful api配置信息
const {rootPath} = api; //RESTful请求的根路径

const modelName = 'attachments';

const model = {
  namespace: modelName,
  state: {
    data: [],
  },
  reducers: {
    // 处理保存消息
    save(state, action) {
      return {...state, ...action.payload}
    },
  }, // end of reducers

  effects: {
    // 处理登录消息
    * query({payload}, {call, put, select}) {
      let data = yield select(state => state[modelName].data);
      let {uid: key, setFieldsValue} = payload;
      let oldKeyData = data.find(r => r.key == key);
      if (oldKeyData) {
        //如果已经存在数据，去掉原来的数据，就重新查询。
        data = data.filter(r => {
          return r.key != key
        });
        if (!data)
          data = [];
      }
      //1 调用服务获取数据
      let result = yield call(service.queryPage, modelName, payload.searchParam);
      if (!result) return; //出错了
      //把数据加到列表里面
      let dataResult = service.parseRestResult(result);
      data.push({key: key, list: dataResult.list});

      if (setFieldsValue && typeof setFieldsValue === "function") {
        if (dataResult.list && dataResult.list.length > 0) {
          setFieldsValue('hasFile');//设值 用于required检查 add by duwei 17-12-04
        }else {
          setFieldsValue('');//设值 用于required检查 add by duwei 17-12-04
        }
      }
      yield put({ //调用reducers的save保存用户信息到模型
        type: 'save',
        payload: {data: [...data]}
      });
    },
    //表单消息：新建记录后保存
    * create({type, payload}, {call, put, select}) {
      const {record, searchParam, uid, setFieldsValue} = payload
      const result = yield call(service.createRecord, modelName, record);
      if (result != null) {
        yield put({type: 'query', payload: {searchParam, uid, setFieldsValue}});
      }
    },

    //视图消息：删除数据库中单条记录
    * delete({type, payload}, {call, put, select}) {
      const {record, searchParam, uid, setFieldsValue} = payload
      const result = yield call(service.deleteRecord, rootPath + '/attachments', record);
      if (result != null) {
        yield put({type: 'query', payload: {searchParam, uid, setFieldsValue}});
      }
    },
  }, // end of effects


  subscriptions: {}
};
export default model;
