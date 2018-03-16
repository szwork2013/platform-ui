import { message } from 'antd';
import { modelTemplate } from 'utils';
import Form from './Form';

import config from 'config';
import service from 'service';

//权限模型定义
const namespace = {
  name: 'draft',
  title:'投稿',
  clazz: 'Draft', //模型对应的后台实体类
  linkAttrs:[]
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则

    },
    size: 20, //指定每页记录数
    sort: 'o.id,desc' //缺省排序规则
  },
  form: Form, //使用的表单
  //打开窗口标题生成器
  titleRender: (record) => !record||!record.subject ? '新稿件' :record.subject+'稿件',
  effects: {
    //新增评分指标单子。
    *newGradeTarget({ payload }, { call, put, select }) {
      let nextYear=new Date().getFullYear()+1;
      //查询有没有创建过，没有创建就创建一条新的数据
      let gradeTarget = yield call(service.updateRecord,
        config.API+'/grade_target/year/' + nextYear, {})
      //没有下一年的指标
      if (!gradeTarget) {
        let gradeTarget = {
            year: nextYear,
          }
          ;
        let model = { record: gradeTarget, state: { mode: 'new', origin: gradeTarget } }
        yield put({
          type: 'new',
          payload: { processNo: '', model }
        })
      } else {
        //有下一年的评分指标就直接打开
        gradeTarget._links = {};
        gradeTarget._links.self = {};
        gradeTarget._links.self.href = service.constructRecordUrl({ modelName: 'grade_target', id: gradeTarget.id });
        yield put({
          type: 'open',
          payload: { record: gradeTarget, state: { mode: 'edit' } }
        })
      }
    },

    //保存前的特殊验证
    *beforeSave({ payload }, { call, put, select }) {
      let {isNew,...rest}=payload;
      let year=payload.record.year;

      //查询有没有创建过同一年份的记录，有就提示返回。
      let gradeTarget = yield call(service.updateRecord,
        config.API+'/grade_target/year/' + year, {});

      let validatePass=true;
      if(gradeTarget){
        if(isNew){
          validatePass=false;
        }else{
          let uid = service.getRecordId(payload.oldRecord);
          if(uid!=gradeTarget.id){
            validatePass=false;
          }
        }
      }
      //没有验证通过
      if (!validatePass) {
        message.warn(year+"年评分指标已经存在！请修改年度！");
      } else {
        let messageType='update';
        if(isNew){
          messageType='create';
        }
        yield put({
          type: messageType,
          payload:{...rest}
        })
      }
    },

    //初始化org信息
    *initOrg({ payload }, { call, put, select }) {
      let {record}=payload;
      const user = service.userInfo.user;

      //查询有没有创建过同一年份的记录，有就提示返回。
      let result = yield call(service.httprequest,
        config.API+'/budget_represent/findRepresentByOrgId?orgId=' + user.org.id, {});

      //有代表机构就保存成代表机构，没有就是当前登录用户所属机构。
      if(result){
        record.org=service.constructRecordUrl({ modelName: 'orgs', id: result.targetOrg.id });
      }else{
        record.org=service.constructRecordUrl({ modelName: 'orgs', id: user.org.id })
      }
    },

    //初始化org信息以及查询
    *initDataAndQuery({ payload }, { call, put, select }) {
      const user = service.userInfo.user;
      let orgId=user.org&&user.org.id;
      let searchParam = { //搜索条件
        filter: { //过滤规则
          clazz: 'Draft', //模型对应的后台实体类
          where: 'o.org.id=' +orgId, //条件
        },
        size: 20, //指定每页记录数
        sort: 'o.id,desc' //缺省排序规则
      }
      //查询有没有创建过同一年份的记录，有就提示返回。
      let result = yield call(service.httprequest,
        config.API+'/budget_represent/findRepresentByOrgId?orgId=' + orgId, {});

      //有代表机构就按照代表机构查询，没有就是当前登录用户所属机构查询。
      if(result){
        searchParam.filter.where='o.org.id='+ result.targetOrg.id;
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
