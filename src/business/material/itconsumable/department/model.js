import { modelTemplate } from 'utils';
import Form from './Form';

import service from 'service';
import wfservice from 'wfservice';
import config from 'config';

//权限模型定义
const namespace = {
  name: 'department_plan',
  title:'部门计划',
  clazz: 'DepartmentPlan', //模型对应的后台实体类
  linkAttrs:['org','demandPlan']
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则
    },
    size: 20, //指定每页记录数
    sort: 'o.id,asc' //缺省排序规则
  },
  form: Form, //使用的表单
  titleRender: (record)=>record&&record.org? service.getRecordLinkAttr(record,'demandPlan').year+'年'+service.getRecordLinkAttr(record,'demandPlan').month+'月部门需求计划':'新部门需求计划',
  effects: {
    //表单消息：盖章
    *stamp ({payload}, { call, put,select }) {
      //结构参数
      let { record,href }=payload;
      const user = service.userInfo.user;
      let callParam = {
        method: 'get',
        data: {
          entityLink:service.getHrefOfLinkAttr(record).replace(config.API,''),
          sealLink:'/orgs/'+user.org.id,
          sealCategory:'seal',
        }
      }
      let result =yield call(service.httprequest,config.API+'/stamp',callParam);
      if(!result) return;
      //调用接口更新tab的model
      yield put ({
        type:'apptabs/updateTab',
        payload: {
          key: href,
          model: {record, state: {
            origin: Object.assign(record)
          }}
        },
      });
    },

    //表单消息：获取预算已使用等金额信息。
    *getBudgetAndUsedInfo ({payload}, { call, put,select }) {
      //结构参数
      let { record,href }=payload;
      let result =yield call(service.httprequest,service.getHrefOfLinkAttr(record)+'/get_budget_and_used_info',{});
      if(!result) return;
      result=JSON.parse(result);
      record.usedAmount=result.usedAmount;
      record.hasBudget=result.hasBudget;
      record.budgetAmount=result.budgetAmount;
      //调用接口更新tab的model
      yield put ({
        type:'apptabs/updateTab',
        payload: {
          key: href,
          model: {record, state: {
            origin: Object.assign(record)
          }}
        },
      });
    },

    //表单消息：获取预算已使用等金额信息。
    *beforeCreate ({payload}, { call, put,select }) {
      //结构参数
      let { record,href }=payload;
      const user = service.userInfo.user;
      record.org = service.constructRecordUrl({ modelName: 'orgs', id: user.org.id });
      //查询有没有创建过同一年份的记录，有就提示返回。
      let result = yield call(service.httprequest,
        config.API+'/budget_represent/findRepresentByOrgId?orgId=' + user.org.id, {});

      //有代表机构就保存代表机构查询，没有就是当前登录用户所属机构。
      if(result){
        record.org= service.constructRecordUrl({ modelName: 'orgs', id: result.targetOrg.id });
      }
      yield put({
        type: 'create',
        payload: {
          href: href,
          record: record,
          thenClose: false,
        }
      });
    },

    //初始化org信息以及查询
    *initDataAndQuery({ payload }, { call, put, select }) {
      const user = service.userInfo.user;
      let orgId=user.org&&user.org.id;
      let searchParam = { //搜索条件
        filter: { //过滤规则
          clazz: 'DepartmentPlan', //模型对应的后台实体类
          where: 'demandPlan.type='+payload.type+' and org.id=' + orgId, //条件
        },
        size: 20, //指定每页记录数
        sort: 'o.id,desc' //缺省排序规则
      }
      //查询有没有创建过同一年份的记录，有就提示返回。
      let result = yield call(service.httprequest,
        config.API+'/budget_represent/findRepresentByOrgId?orgId=' + orgId, {});

      //有代表机构就按照代表机构查询，没有就是当前登录用户所属机构查询。
      if(result){
        searchParam.filter.where='demandPlan.type='+payload.type+' and org.id=' + + result.targetOrg.id;
      }
      yield put({
        type: 'query',
        payload: {
          searchParam,
        }
      });
    },

  },
};

export default modelTemplate.createModel(namespace, modelParam);
