import { modelTemplate } from 'utils';

import service from 'service';
import * as myService from './service';

const namespace = {
    name: 'expenditure_datacenter',
    dataSource: 'expenditure_executions', //数据源
    title:'数据中心',
    clazz: 'Execution',
    linkAttrs: ['category', 'category.parent', 'categoryparent.parent', 'categoryparentparent.parent', 'createdBy','fundSource', 'fundSource.org', 'reserveFundPayee','contractPayee'],
};

const modelParam = {
  titleRender: (record)=>record&&record.projectName?'立项：'+record.projectName:'新立项',
  effects: {
    //消息处理：获取表单统计信息
    *statForForm({payload}, {call, put}) {
      const {record} = payload;
      //调用服务获取统计信息
      let formStatInfo = yield call(myService.statForForm, record);
      if (formStatInfo == null) return;
      
      yield put({
        type: 'save',
        payload: {formStatInfo},
      })
    },

    //消息处理：请求历史数据
    *queryHistory({payload}, {call, put}) {
      const {record, searchWhere} = payload;
      let range = record._historyExecutionsRange;

      //构造请求参数
      let category = service.getRecordLinkAttr(record, 'category')||record._category||{};
      let id = service.getRecordId(record);

      if (!category.id) return; 

      let where = 'o.category.id='+category.id+' and not o.id='+id;
      if (range=='dept') { //部门自行管理或者公司统筹
        where += ' and o.usePermission='+record.usePermission;
        if (record.usePermission==1) {//部门自行管理
          let orgId = record.createdByOrgId;
          if (!orgId) orgId = service.userInfo.user.org.id;
          where += ' and o.createdBy.org.id='+orgId;
        }
      }
      else if (range=='fundSource') { //场站或者项目
        let fundSource = service.getRecordLinkAttr(record, 'fundSource')||record._fundSource||{};
        where += ' and o.fundSource.id='+fundSource.id;
      }

      let searchParam = {
        filter: {
          where: where
        },
        size: 20,
        sort: ['o.projectNo,desc'],
      }

      //请求数据
      let dataKey = service.parseRecordUrl(record);
      yield put({
        type: 'query',
        payload: {searchParam, where: searchWhere||'', dataKey},
      })

      //发消息通知queryform模型进行统计
      yield put({
        type: 'expenditure_queryform/statForQuery',
        payload: {
          conditionData : {
            where: searchParam.filter.where,
            searchWhere,
          },
          dataKey,
        }
      })
    },
  },

};

export default modelTemplate.createModel(namespace, modelParam);