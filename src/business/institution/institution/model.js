import service from 'service';

import { modelTemplate } from 'utils';
import Form from './Form';

//制度模型定义
const namespace = {
  name: 'institution_institutions', //模型的命名空间
  title: '制度', //模型的名称
  clazz: 'Institution', //模型对应的后台实体类
  linkAttrs: ['publishedOrg', 'category'], //需要抓取的关联属性
};

const modelParam = {
  searchParam: { //搜索条件
    filter: { //过滤规则
    },
    size: 20, //指定每页记录数
    sort: 'id,asc' //缺省排序规则
  },
  form: Form, //使用的表单
  titleRender: (record) => !record.name ? '新制度' :'制度：'+record.name,
  effects: {
    //表单消息：发布制度
    *publish (message, { call, put,select }) {
      //解构消息
      const {type, payload} = message;

      //获取当前制度记录
      let {record} = payload;

      //发送消息弹出对话框
      yield put({
        type:'modaldialog/show',
        payload: {
          title: '发布确认',
          content: '发布此制度，是否确定？',
          onOk: (dispatch) => { //点击ok按钮处理
            //设置发布状态为已发布
            record.publishedState = 2;

            //发送消息保存当前记录到数据库并关闭当前记录
            dispatch({
              type: namespace.name+'/update',
              payload:{
                href: service.parseRecordUrl(record),
                record,
                thenClose: true, //保存后关闭记录
              }
            });
            return true;
          },
        }
      });
    },

    //表单消息：撤回制度
    *tackback (message, { call, put,select }) {
      //解构消息
      const {type, payload} = message;

      //获取当前制度记录
      let {record} = payload;

      //发送消息弹出对话框
      yield put({
        type:'modaldialog/show',
        payload: {
          title: '撤回确认',
          content: '撤回此制度，是否确定？',
          onOk: (dispatch) => { //点击ok按钮处理
            //设置发布状态为草稿
            record.publishedState = 1;

            //发送消息保存当前记录到数据库并关闭当前记录
            dispatch({
              type: namespace.name+'/update',
              payload:{
                href: service.parseRecordUrl(record),
                record,
                thenReload: {}, //保存后重新打开记录
              }
            });
            return true;
          }
        }
      });
    },
  },
};

export default modelTemplate.createModel(namespace, modelParam);