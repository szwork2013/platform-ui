import {message} from 'antd';
import { modelTemplate } from 'utils';
import Form from './Form';

import config from 'config';
import service from 'service';

//权限模型定义
const namespace = {
  name: 'publication',
  title:'信息发布',
  clazz: 'Publication', //模型对应的后台实体类
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
  titleRender: (record) => !record||!record.subject ? '新信息发布' :record.subject+'信息发布',
  effects: {
    //初始化编号信息
    *initNumber({ payload }, { call, put, select }) {
      let {record,href}=payload;
      let result = yield call(service.httprequest,
        config.API+'/publication/get_number?year='+new Date().getFullYear(), {});
      if(!result) result;
      record.number=result;
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

    //排版
    *compose({ payload }, { call, put, select }) {
      let {record}=payload;
      let result = yield call(service.httprequest,
        service.getHrefOfLinkAttr(record)+'/create_compose_file', {});
      if(!result) {
        message.info('创建数据源失败！');
        return;
      } ;;
      result = yield call(service.httprequest,
        config.API+'/template_excel/service/get_by_no?no=PBMB', {});
      if(!result){
        message.info('请先上传模板文件！');
        return;
      }
      let dataSourceUrl=config.API+'/attachments/file?xpnToken='+service.userInfo.token.value+'&entityLink='+
        service.getHrefOfLinkAttr(record).replace(config.API,'')
        +'&category=composeDataSource&filename=composeDataSource.htm';
      let draftUrl=config.API+'/attachments/file?xpnToken='+service.userInfo.token.value+'&entityLink='+
        service.getHrefOfLinkAttr(record).replace(config.API,'')
        +'&category=draft&filename=draft.doc';
      let templateUrl=config.API+'/attachments/file?xpnToken='+service.userInfo.token.value
        +'&entityLink=/template_excel/'+result.id;
      let contentUrl=config.API+'/attachments/file?xpnToken='+service.userInfo.token.value+'&entityLink='+
        service.getHrefOfLinkAttr(record).replace(config.API,'')
        +'&category=compose';
      let data={sDataSrcFileName:encodeURIComponent(dataSourceUrl),
        sMainDocFileName:encodeURIComponent(templateUrl),
        sDraftFileName:encodeURIComponent(draftUrl),
        sTypeSetDocName:encodeURIComponent(contentUrl)};
       result = yield call(service.httprequest,
        'http://localhost:3000/typeset', {data});
      if(!result) {
        message.info('排版失败！');
        return;
      } ;
      result = yield call(service.httprequest,
        service.getHrefOfLinkAttr(record)+'/set_work_flow_status?workFlowStatus='+encodeURIComponent('已排版'), {});
      message.info('排版成功');
    },

    //阅读
    *read({ payload }, { call, put, select }) {
      let {record}=payload;
      // let result = yield call(service.httprequest,
      //   config.API+'/publication/get_number?year='+new Date().getFullYear(), {});
      // if(!result) result;
      alert("阅读");
    },

    //改稿
    *rewrite({ payload }, { call, put, select }) {
      let {record}=payload;
      // let result = yield call(service.httprequest,
      //   config.API+'/publication/get_number?year='+new Date().getFullYear(), {});
      // if(!result) result;
      alert("改稿");
    },

  },
};

export default modelTemplate.createModel(namespace, modelParam);
