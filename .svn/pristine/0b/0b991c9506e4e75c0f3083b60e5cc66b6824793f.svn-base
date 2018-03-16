import { message } from 'antd';
import { modelTemplate } from 'utils';

import service from 'service';

//权限模型定义
const namespace = {
  name: 'grade_review_rule',
  title:'评分标准',
  clazz: 'GradeReviewRule', //模型对应的后台实体类
  linkAttrs:[]
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则

    },
    size: 20, //指定每页记录数
    sort: 'o.year,desc' //缺省排序规则
  },
  effects: {
  },
};

export default modelTemplate.createModel(namespace, modelParam);
