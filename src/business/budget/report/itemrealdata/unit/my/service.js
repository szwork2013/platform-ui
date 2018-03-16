import {config} from 'utils';

//构造查询参数
export const constructSearchParam = (conditionData) => {
  if (!conditionData) return;
  let where = '';
  for (let attrName in conditionData) {
    if (attrName === 'where') continue;
    let attrValue = conditionData[attrName];
    let attrWhere = '';
    if (attrValue === undefined || attrValue === null) continue;
    if (attrName === 'year' && attrValue !== -1) { //年度
      attrWhere = 'o.year=' + attrValue;
    } else if (attrName === 'month' && attrValue !== -1) {
      attrWhere = 'o.month=' + attrValue;//月份
    } else if (attrName === 'useType' && attrValue) { //用途类型
      attrWhere = "o.useType=" + attrValue;
    }
    if (attrWhere && attrWhere !== '')
      where += where === '' ? attrWhere : ' and ' + attrWhere;
  }

  return {
    filter: { //过滤规则
      where,
    },
    size: 20,
    sort: ['o.year,desc', 'o.month,desc',]
  };
}
