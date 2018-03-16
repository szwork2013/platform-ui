import {modelTemplate} from 'utils';
import * as doneService from './service'
import service from 'service';

const namespace = {
  name: 'done_link',
  title: '已办事项',
  clazz: 'DoneLink',
};

const modelParam = {
  effects: {
    * doneClick({payload}, {call, put, select}) {
      const {record} = payload;
      if (record.type === 'resource') {
        const linkUrl = record.linkUrl;
        const modelName = linkUrl.split('?')[0];

        const { rootPath } = api; //RESTful请求的根路径
        const href = rootPath+'/'+linkUrl; //构造请求url

        //发送请求给目标模型打开指定的记录
        yield put({
          type: modelName+'/open',
          payload: {
            record: {self: {href}},
            state: {mode:'open'}
          }
        })
      } else {
        window.open(record.linkUrl, '_blank').focus();
      }
    },
    * moveToTodo(param, {call, put, select}) {
      const {list, viewData} = yield select(({done_link}) => done_link);
      const selectedRowKeys = viewData[0].selectedRowKeys;

      let ids = selectedRowKeys.map((item) => service.extractIdFromRecordHref(item));
      yield call(doneService.toTodo, ids);
      yield put({type: 'query', payload: {queryType: undefined}});
      yield put({type: 'todo_link/query', payload: {queryType: undefined}});
    },
  },
};

export default modelTemplate.createModel(namespace, modelParam);
