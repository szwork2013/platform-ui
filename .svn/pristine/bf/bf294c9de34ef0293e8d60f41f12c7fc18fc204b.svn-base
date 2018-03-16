import service from 'service';

import { config} from 'utils';
const { api } = config; //取得RESTful api配置信息

//构造查询参数
export const constructSearchParam = (conditionData) => {
  if (!conditionData) return;

}

//获取表配置信息
export const getSheetsInfo = (conditionData) => {
  const { rootPath } = api; //RESTful请求的根路径
  const url = rootPath+'/budget_reportView/getSheetsInfo';
  const sheets=service.queryRecord(url, conditionData);
  return sheets;
}