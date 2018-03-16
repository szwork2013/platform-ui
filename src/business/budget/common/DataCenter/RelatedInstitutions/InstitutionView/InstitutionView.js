import {View} from 'components';

import service from 'service';
import * as myService from '../../service';

//设置模型名称
const modelName = 'institution_institutions';

const ViewComponent = ( props ) => {
  const {record} = props;
  
  //定义操作条属性
  const actionBarProps = {
    new:false, //显示新增按钮
    delete: false, //显示删除按钮
  }

  //定义列表属性
  const listProps = {
    columns:[ // 和antd table组件的列定义相同
      { title: '发布单位',  width: 160,dataIndex: 'publishedOrg.orgName', key: 'publishedOrg.orgName',sorter:true,
        textRender: (value, record)=>record.publishedOrgName && record.publishedOrgName.split('/')[0]
      },
      { title: '制度名称', dataIndex: 'name', key: 'name',sorter:true, link:'view'},
    ],
    colDefalutLink: 'open',
  };

  //定义过滤条件
  let where = myService.constructInstitutionWhere(props.record);
  where += ' and o.publishedState=2';
  const searchParam = {
    filter: { //过滤规则
      where
    },
    size: 50, //指定每页记录数
    //排序规则：sortNo升序
    sort: ['o.publishedState,desc'],
  };

 //翻页器属性
  const paginationBarProps = {};

  return (
    <View key={modelName + 'ViewLayout'} {...props}
      uid={'Institution_'+service.getRecordId(record)}
      searchParam={searchParam}
      modelName={modelName} //模型名称
      actionBar={actionBarProps} //操作条定义
      paginationBar={paginationBarProps} //翻页器定义
      list={listProps} //列表定义
    />
  )
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({institution_institutions, loading, apptabs:{tabs}}) =>
  ({institution_institutions, loading: loading.models[modelName], tabs})
)(ViewComponent);
