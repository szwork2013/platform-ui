import { message } from 'antd';
import { modelTemplate } from 'utils';
import Form from './Form';

import service from 'service';
import wfservice from 'wfservice';

//权限模型定义
const namespace = {
  name: 'material',
  title:'物资',
  clazz: 'Material', //模型对应的后台实体类
  linkAttrs:['supplier']
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则

    },
    size: 20, //指定每页记录数
    sort: 'o.id,asc' //缺省排序规则
  },
  form: Form, //使用的表单
  titleRender: (record)=>record&&record.id? record.name:'新物资',
  effects: {
    //批量停产
    *batchStopProduction({ payload }, { call, put, select }) {
      let { isStopProduction } = payload;
      const state = yield select(state => state['material']);
      let viewData = service.getViewData(state);
      if (viewData.selectedRowKeys.length == 0) {
        message.info('请选择物资');
        return;
      }
      viewData.selectedRows.map((item)=>{
        item.isStopProduction=isStopProduction;
        item._changed=true;
      })
      yield put({
        type: 'material/saveTable',
        payload: {}
      })
    },
  },
};

export default modelTemplate.createModel(namespace, modelParam);
