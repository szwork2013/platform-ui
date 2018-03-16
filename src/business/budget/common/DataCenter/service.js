import service from 'service';

import { config, httprequest } from 'utils';
const { api } = config; //取得RESTful api配置信息

//请求立项表单统计信息
export const statForForm = async (record) => {
	const { rootPath } = api; //RESTful请求的根路径
  const url = rootPath+'/expenditure_executions/stat/forform';

  //构造请求参数
  let categoryId = service.extractIdFromRecordHref(record.category);
  let projectId = service.extractIdFromRecordHref(record.fundSource);
  let deptId = record.createdByOrgId;
  if (!deptId) deptId = service.userInfo.user.org.id;

  if (!categoryId||!projectId) return;
  
  const param = {
    deptId,
  	year: record.year,
  	usePermission: record.usePermission, 
  	categoryId,
  	projectId,
  }
  
  return service.queryRecord(url, param);
}

//构造相关制度搜索条件
export const constructInstitutionWhere = (record) => {
  const keywords = ['费','差','金','备用','劳务','保险','财务',
    '合同','大额','报销','福利','职工','采购','包','招标','评标',
    '评审','物资','三重','一大','办公','设备','车辆','机票','档案',
    '公务','接待','车','驾驶','网络','医疗','考勤','休假','绩效',
    '安全','培训','事故','灾','环境','污染','劳动保护','奖励','支出',
    '预算','资产','法律','损失','备品','配件','供应','招待',
  ];

  let budgetSource = record.budgetSource;
  let projectName = (record.projectName||'')+'三重一大';

  let where='';
  for (let x of keywords) {
    if (projectName.includes(x)||budgetSource.includes(x)) {
      where += (where=='' ? '' : ' or ')+"o.name like '%"+x+"%'"
    }
  }

  return where;
}