import { message } from 'antd';
import { modelTemplate } from 'utils';
import Form from './Form';

import service from 'service';
import wfservice from 'wfservice';
import config from 'config';

//权限模型定义
const namespace = {
  name: 'demand_plan',
  title: '需求计划',
  clazz: 'DemandPlan', //模型对应的后台实体类
  linkAttrs: ['createdBy']
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则

    },
    size: 20, //指定每页记录数
    sort: 'o.id,asc' //缺省排序规则
  },
  form: Form, //使用的表单
  titleRender: (record) => {

    let orgType = '公司';
    if (record.orgLevel == 1)
      orgType = '单位';

    if (record && record.year) {
      return record.year + '年' + record.month + '月' + orgType + '需求计划';
    } else {
      return '新' + orgType + '需求计划';
    }
  },
  effects: {
    //表单消息：打开部门计划
    *newDepartmentPlan({ payload }, { call, put, select }) {
      //解构消息
      let { record } = payload;

      //查询有没有创建过，没有创建就创建一条新的数据
      const user = service.userInfo.user;
      let departmentPlanRecord = yield call(service.queryRecord,
        config.API + '/department_plan/org_and_demandplan?orgId=' + user.org.id + '&demandPlanId=' + service.getRecordId(record), {})
      if (!departmentPlanRecord) {
        let entityLink = service.getHrefOfLinkAttr(record);
        let departRecord = {
          demandPlan: entityLink,
          demandPlanRecord: record,
        };
        let model = { record: departRecord, state: { mode: 'new', origin: departRecord } }

        let mytype = record.type;
        let myprocessNo = 'BMITHCJH';
        if ((mytype == 'OFFICE_EQUIPMENT') || (mytype == 1)) {
          myprocessNo = 'BMITHCJH_2';
        }
        if ((mytype == 'NON_INSTALLATION_EQUIPMENT') || (mytype == 2)) {
          myprocessNo = 'BMITHCJH_3';
        }
        if ((mytype == 'PRODUCTION_EQUIPMENT') || (mytype == 3)) {
          myprocessNo = 'BMITHCJH_4';
        }
        if ((mytype == 'ENGINEERING_MATERIALS') || (mytype == 4)) {
          myprocessNo = 'BMITHCJH_5';
        }
        if ((mytype == 'OFFICE_SUPPLIES') || (mytype == 5)) {
          myprocessNo = 'BMITHCJH_6';
        }
        if (mytype == 'LABOUR_SUPPLIES' || mytype == 6) {
          myprocessNo = 'BMITHCJH_7';
        }
        if (mytype == 'TYRE' || mytype == 7) {
          myprocessNo = 'BMITHCJH_8';
        }
        if (mytype == 'SOFT' || mytype == 8) {
          myprocessNo = 'BMITHCJH_9';
        }
        if (mytype == 'LABORATORY_SUPPLIES' || mytype == 9) {
          myprocessNo = 'BMITHCJH_10';
        }
        yield put({
          type: 'department_plan/new',
          payload: {
            processNo: myprocessNo,
            parentInstanceId: wfservice.getInstanceId(record),
            parentInstanceEntityLink: entityLink, model
          }
        })

      } else {
        departmentPlanRecord._links = {};
        departmentPlanRecord._links.self = {};
        departmentPlanRecord._links.self.href = service.constructRecordUrl({ modelName: 'department_plan', id: departmentPlanRecord.id });
        yield put({
          type: 'department_plan/open',
          payload: { record: departmentPlanRecord, state: { mode: 'edit' } }
        })
      }
    },

    //表单消息：汇总需求计划
    *collectPlan({ payload }, { call, put, select }) {
      //解构消息
      let { record } = payload;
      let recordId = service.getRecordId(record);
      let dataKey = recordId + '0' + record.type;
      let result = yield call(service.updateRecord, service.parseRecordUrl(record) + '/collect_plan', {});

      if (result) {
        let searchParam = {
          filter: { //过滤规则
            clazz: 'PlanItem', //模型对应的后台实体类
            where: 'o.demandPlan.id=' + recordId, //条件
          },
          size: 100, //指定每页记录数
          sort: 'o.id,asc', //缺省排序规则
        };
        yield put({
          type: 'plan_item/query',
          payload: {
            searchParam,
            dataKey: dataKey,
          }
        });
      }
    },

    //打开采购表单
    *newPurchase({ payload }, { call, put, select }) {
      let { record } = payload;

      //查询有没有创建过，没有创建就创建一条新的数据
      let demandPlanRecord = yield call(service.updateRecord, service.getHrefOfLinkAttr(record) + '/has_purchase', {})
      //没有采购计划
      if (!demandPlanRecord) {
        let purchasePlan = {
          type: record.type,
          periodType: record.periodType,
          orgLevel: record.orgLevel,
          year: record.year,
          quarter: record.quarter,
          month: record.month,
          batchNo: record.batchNo,
          demandPlans: [service.getHrefOfLinkAttr(record)],
        }
          ;
        let model = { record: purchasePlan, state: { mode: 'new', origin: purchasePlan } }
        let cgtype = record.type;
        let cgprocessNo = '';
        if ((cgtype == 'IT_CONSUMABLE') || (cgtype == 0)) {
          if (record.orgLevel != 1) {
            cgprocessNo = 'ITHCCG';
          } else {
            cgprocessNo = 'TlUNITITCP';
          }
        }
        if ((cgtype == 'OFFICE_EQUIPMENT') || (cgtype == 1)) {
          if (record.orgLevel != 1) {
            cgprocessNo = 'ITHCCG_2';
          } else {
            cgprocessNo = 'TlUNITITCP_2';
          }
        }
        if ((cgtype == 'NON_INSTALLATION_EQUIPMENT') || (cgtype == 2)) {
          if (record.orgLevel != 1) {
            cgprocessNo = 'ITHCCG_3';
          } else {
            cgprocessNo = 'TlUNITITCP_3';
          }
        }
        if ((cgtype == 'PRODUCTION_EQUIPMENT') || (cgtype == 3)) {
          if (record.orgLevel != 1) {
            cgprocessNo = 'ITHCCG_4';
          } else {
            cgprocessNo = 'TlUNITITCP_4';
          }
        }
        if ((cgtype == 'ENGINEERING_MATERIALS') || (cgtype == 4)) {
          if (record.orgLevel != 1) {
            cgprocessNo = 'ITHCCG_5';
          } else {
            cgprocessNo = 'TlUNITITCP_5';
          }
        }
        if ((cgtype == 'OFFICE_SUPPLIES') || (cgtype == 5)) {
          if (record.orgLevel != 1) {
            cgprocessNo = 'ITHCCG_6';
          } else {
            cgprocessNo = 'TlUNITITCP_6';
          }
        }
        if (cgtype == 'LABOUR_SUPPLIES' || cgtype == 6) {
          if (record.orgLevel != 1) {
            cgprocessNo = 'ITHCCG_7';
          } else {
            cgprocessNo = 'TlUNITITCP_7';
          }
        }
        if (cgtype == 'TYRE' || cgtype == 7) {
        if (record.orgLevel != 1) {
          cgprocessNo = 'ITHCCG_8';
        } else {
          cgprocessNo = 'TlUNITITCP_8';
        }
      }
      if (cgtype == 'SOFT' || cgtype == 8) {
      if (record.orgLevel != 1) {
        cgprocessNo = 'ITHCCG_9';
      } else {
        cgprocessNo = 'TlUNITITCP_9';
      }
    }
    if (cgtype == 'LABORATORY_SUPPLIES' || cgtype ==9) {
      if (record.orgLevel != 1) {
        cgprocessNo = 'ITHCCG_10';
      } else {
        cgprocessNo = 'TlUNITITCP_10';
      }
    }
      yield put({
        type: 'purchase_plan/new',
        payload: { processNo: cgprocessNo, model }
      })
      } else {
        //有采购计划就编辑打开采购计划
        let planId = service.getRecordId(record);
        let purchasePlan = yield call(service.queryRecord,
          config.API + '/purchase_plan/find_by_plan_id?planId=' + planId, {})
        purchasePlan._links = {};
        purchasePlan._links.self = {};
        purchasePlan._links.self.href = service.constructRecordUrl({ modelName: 'purchase_plan', id: purchasePlan.id });
        yield put({
          type: 'purchase_plan/open',
          payload: { record: purchasePlan, state: { mode: 'edit' } }
        })
      }
    },

    //设置批次号
    *initBatchNo({ payload }, { call, put, select }) {
      let { record, href } = payload;
      record.year = new Date().getFullYear();
      record.month = new Date().getMonth() + 1;
      record.quarter=1;
      if(record.month>=4&&record.month<=6)
        record.quarter=2;
      if(record.month>=7&&record.month<=9)
        record.quarter=3;
      if(record.month>=10&&record.month<=12)
        record.quarter=4;
      const user = service.userInfo.user;
      let result = yield call(service.queryRecord,
        config.API + '/demand_plan/get_init_batchno?orgId='
        + user.org.id + '&orgLevel=' + record.orgLevel + '&type=' + record.type, {});
      if (result);
      record.batchNo = result;
    },

    //生成采购表单
    *createPurchase({ payload }, { call, put, select }) {
      let { type, orgLevel } = payload;
      const state = yield select(state => state['demand_plan']);
      let viewData = service.getViewData(state);
      if (viewData.selectedRowKeys.length == 0) {
        message.info('请选择采购计划');
        return;
      }
      let purchasePlan = {
        type: type,
        orgLevel,
        demandPlans: viewData.selectedRowKeys,
      }
        ;
      let model = { record: purchasePlan, state: { mode: 'new', origin: purchasePlan } }
      yield put({
        type: 'purchase_plan/new',
        payload: { processNo: 'ITHCCG', model }
      })
    },

    //表单消息：盖章
    *stamp({ payload }, { call, put, select }) {
      //结构参数
      let { record, href } = payload;
      const user = service.userInfo.user;
      let callParam = {
        method: 'get',
        data: {
          entityLink: service.getHrefOfLinkAttr(record).replace(config.API, ''),
          sealLink: '/orgs/' + user.org.id,
          sealCategory: 'seal',
        }
      }
      let result = yield call(service.httprequest, config.API + '/stamp', callParam);
      if (!result) return;
      //调用接口更新tab的model
      yield put({
        type: 'apptabs/updateTab',
        payload: {
          key: href,
          model: {
            record, state: {
              origin: Object.assign(record)
            }
          }
        },
      });
    },

    //表单消息：获取已使用等金额信息。
    *getUsedInfo ({payload}, { call, put,select }) {
      //结构参数
      let { record,href }=payload;
      let result =yield call(service.httprequest,service.getHrefOfLinkAttr(record)+'/get_used_info',{});
      if(!result) return;
      record.usedAmount=result;
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

  },
};

export default modelTemplate.createModel(namespace, modelParam);
