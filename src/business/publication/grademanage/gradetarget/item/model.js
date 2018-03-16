import { modelTemplate } from 'utils';
import service from 'service';
import config from 'config';

//权限模型定义
const namespace = {
  name: 'grade_target_item',
  title:'评分指标',
  clazz: 'GradeTargetItem', //模型对应的后台实体类
  linkAttrs:[]
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则

    },
    size: 20, //指定每页记录数
    sort: 'o.id,desc' //缺省排序规则
  },
  effects: {
    //表单消息：验证预算
    *initItems ({type,payload}, { call, put,select }) {
      //结构参数
      let {record}=payload;
      let uid = service.getRecordId(record);

      let result=yield call(service.updateRecord,
        config.API+'/grade_target_item/init_data?gradeTargetId='+uid,{});

      const searchParam = {
        filter: { //过滤规则
          clazz: 'GradeTargetItem', //模型对应的后台实体类
          where: 'o.gradeTarget.id='+uid, //条件
        },
        size: 100, //指定每页记录数
        sort: 'o.id,asc', //缺省排序规则
      };
      yield put({
        type: 'query',
        payload: {
          searchParam,
          dataKey: uid,
        }
      });
    },
  },
};

export default modelTemplate.createModel(namespace, modelParam);
