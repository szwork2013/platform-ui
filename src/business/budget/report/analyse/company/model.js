import {modelTemplate} from 'utils';
import {message} from "antd/lib/index";

let date = new Date();
let curYear = date.getFullYear();
//模型定义
const namespace = {
  name: 'budgetAnalyse',
};

const modelParam = {
  conditionData: {//查询条件数据
  },
  columnInfo:[],
  effects: {
    //修改条件数据消息
    * changeConditionData({type, payload}, {select, call, put}) {
      let conditionData = yield select(({budgetAnalyse}) => budgetAnalyse.viewData[0].conditionData);
      conditionData = {...conditionData, ...payload};
      if (conditionData.startMonth  && conditionData.endMonth && conditionData.startMonth > conditionData.endMonth) {
        message.error("结束月需晚于开始月！",1);
      }else{
        yield put({
          type: 'save',
          payload: {conditionData}
        });
      }
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

let orgOptions = [
  {id: '0', name: '机关'},
  {id: '1', name: '研究院'},
  {id: '2', name: '供应中心'},
  {id: '3', name: '分公司'},
];
let sheetOptions = [
  {id: 'DWNDFX__FY', name: '费用表'},
  {id: 'DWNDFX_SCJY', name: '生产经营表'},
  {id: 'DWNDFX_LR', name: '利润表'},
];

export {yearOptions, monthOptions, orgOptions,sheetOptions};
export default modelTemplate.createModel(namespace, modelParam);
