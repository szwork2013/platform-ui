import {modelTemplate} from 'utils';
import Form from './Form';
import {constructSearchParam} from './service';

let date = new Date();
let curYear = date.getFullYear();
//模型定义
const namespace = {
  name: 'budget_itemrealdata',
  title: '预算实际发生数据',
  clazz: 'ItemRealData', //模型对应的后台实体类
};

const modelParam = {
  conditionData: {}, //查询条件数据
  uploading:false,//是否在上传中
  recordProjection: 'list',
  searchParam: { //搜索条件
    filter: { //过滤规则
    },
    size: 20, //指定每页记录数
    sort: 'o.id,asc' //缺省排序规则
  },
  form: Form, //使用的表单
  titleRender: (record) => record && record.id ? record.name : '新预算实际发生数据',
  effects: {
    //修改条件数据消息
    * changeConditionData({type, payload}, {select, call, put}) {
      let conditionData = yield select(({budget_itemrealdata}) => budget_itemrealdata.viewData[0].conditionData);
      conditionData = {...conditionData, ...payload};
      yield put({
        type: 'save',
        payload: {conditionData}
      });

      //发送消息请求符合条件的支出数据
      let searchParam = constructSearchParam(conditionData);
      searchParam.linkAttrs = [];
      yield put({
        type: 'query',
        payload: {searchParam}
      })
    },
  },
};

//构造年度的选项
let yearOptions = [];
for (let i = curYear; i >= curYear - 5; i--) {
  let option = {'id': i, 'name': i};
  yearOptions.push(option);
}
//构造月份的选项
let monthOptions = [];
for (let i = 1; i <= 12; i++) {
  let option = {id: i, name: i + '月'};
  monthOptions.push(option);
}

let typeOptions = [
  {id: '0', name: '其他业务支出'},
  {id: '1', name: '管理费用'},
  {id: '2', name: '营业外支出'},
];
export {yearOptions, monthOptions, typeOptions};
export default modelTemplate.createModel(namespace, modelParam);
