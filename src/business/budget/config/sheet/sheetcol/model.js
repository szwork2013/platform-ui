import {modelTemplate} from 'utils';
import Form from './Form';
import service from 'service';

const namespace = {
  name: 'sheetcol',
  title: '表配置列',
  clazz: 'SheetCol', //模型对应的后台实体类
  linkAttrs: ['sheet']
};

const modelParam = {
  recordProjection: 'list',
  searchParam: { //搜索条件
    filter: { //过滤规则

    },
    size: 20, //指定每页记录数
    sort: 'o.id,asc' //缺省排序规则
  },
  form: Form, //使用的表单
  titleRender: (record) => record && record.id ? record.name : '新表列配置',
  effects: {
    * addRows({type, payload}, {call, put, select}) {
      //结构参数
      let {dataKey, sheetUrl} = payload;
      const namespace = service.getNamespace(type);
      let state = yield select(state => state[namespace]);
      let viewData = service.getViewData(state, dataKey);
      let list = viewData.list;
      //创建行
      let newRow = {
        _isNew: true,
        _key: new Date().getTime()
      };
      if (sheetUrl) {
        newRow.sheet = sheetUrl;
      }

      list.push(newRow);

      yield put({
        type: 'save', payload: {dataKey}
      })
    },
  },
};

export default modelTemplate.createModel(namespace, modelParam);
