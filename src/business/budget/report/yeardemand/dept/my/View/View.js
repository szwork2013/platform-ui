import {routerRedux} from 'dva/router';
import lodash from 'lodash';

import {Button} from 'antd';
import { View } from 'components';
import service from 'service';

//结果视图
class MyDeptView extends React.Component{
  representOrgIds=null;
  //进入组件路由
  componentDidMount() {
   //获取当前用户部门id
   let orgId=service.userInfo.user.org.id;
   //解构参数
    const {
      dispatch,
    } = this.props;
    /*dispatch({
      type:'budget_report/getRepresentOrgIds',
      payload:{
        orgId:orgId,
        dataKey:'yeardemanddept_my'
      }
    });*/
    dispatch({
      type:'budget_report/getdeptReports',
      payload:{
        orgId:orgId,
        reportType:0,
        periodType:0,
        orgLevel:3,
        dataKey:'yeardemanddept_my'
      }
    });
  }  

 
  render(){
    let props=this.props;
    let{
         budget_report,
         dispatch
       }=props;
    let representOrgIds=null;
    let viewData = service.getViewData(budget_report, 'yeardemanddept_my');
    if(viewData.representOrgIds){
      representOrgIds=viewData.representOrgIds.toString();
    }
    //获取当前用户部门id
      let deptId=service.userInfo.user.org.id;
      let deptHref=service.constructRecordUrl({modelName:'orgs', id:deptId});
      let where='o.reportType=0 and o.periodType=0 and o.orgLevel=3 ';
      if(representOrgIds){
        where+=' and o.createdBy.org.id in('+representOrgIds+')';
      } 
      let searchParam={ //搜索条件
        linkAttrs:[],
        filter: { //过滤规则
          clazz: 'Report', //模型对应的后台实体类
          where:where
        },
        size: 20, //指定每页记录数
        sort: 'o.createdTime,desc' //缺省排序规则
      }
      //定义操作条属性
      const actionBarProps = {
      new: true, //显示新增按钮
      newPayloadRender: () => {
          let record={reportType:0,periodType:0,orgLevel:3,dept:deptHref};
          let origin = lodash.cloneDeep(record);
          let model = {record, state:{mode:'new', origin}};
          return {processNo:'',model}
        },
      delete: true, //显示删除按钮
      buttons:[
          { title:'数据转换', type:'convert'},
    ],
      newRow:false
      }

    //定义列表属性
    const listProps = {
      columns: [   
        {
          title: '年度',
          width: 160,
          dataIndex: 'year',
          key: 'year',
          link: 'open',
          sorter: true,
        },
        {
          title: '当前状态',
          width: 180,
          dataIndex: 'status',
          key: 'status',
          link: 'open',
          sorter: true,
          
        },
        {
          title: '填报人',
          width: 180,
          dataIndex: 'createdByName',
          key: 'createdByName',
        },
        {
          title: '版本号',
          width: 180,
          dataIndex: 'version',
          key: 'version',
        },      
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        }
      ],
      rowSelection:{}, //选择功能配置
    };

    //翻页器属性
    const paginationBarProps = {
      controlProps:{
        simple:true,
      }, 
      reloadButton:false,
    };
    return (
        <View {...props}
          uid='yeardemanddept_my'
          notQueryData={true}
          modelName='budget_report' //模型名称
          searchParam={searchParam}
          actionBar={actionBarProps} //操作条定义
          list={listProps} //列表定义
          paginationBar={paginationBarProps}
        />  
    )
  }

}

import { connect } from 'dva';
export default connect(({
    budget_report,
    loading,
    apptabs:{tabs}
  }) =>
  ({
    budget_report, 
    loading: loading.models.budget_report,
    tabs,
  })
)(MyDeptView);