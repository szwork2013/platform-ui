import {routerRedux} from 'dva/router';
import {Button} from 'antd';
import { View } from 'components';

import service from 'service';
import * as myService from '../../../../execution/service';

import Form from '../../../../execution/Form';

import ResultStatInfo from '../../../../queryform/QueryForm/ViewGrid/ResultStatInfo';

//结果视图
const ResultView = ( props ) => {
  const {modelName, record, heightOffset} = props;

  //定义操作条属性
  const actionBarProps = {
    new: false, //显示新增按钮
    delete: false, //显示删除按钮
    newRow: false,
  }

  //定义列表属性
  const listProps = {
    form: <Form modelName={modelName} />, //定义打开记录的表单
    columns:[ // 和antd table组件的列定义相同
      { title: '编号', width: 90, dataIndex: 'projectNo', key: 'projectNo', sorter: true },
      { title: '事项名称', dataIndex: 'projectName', key: 'projectName', link: 'open', sorter: true },
      { title: '申请金额', width: 110, dataIndex: 'budget', key: 'budget',sorter:true},
      { title: '审批状态', width: 90, dataIndex: 'state', key: 'state',sorter:true, 
        textRender: myService.colTextRenderOfState
      },
    ],
    colDefalutLink: 'open',
  };

  //翻页器属性
  const paginationBarProps = {
    controlProps:{
      simple:true,
    }, 
    reloadButton:false,
  };

  let href = service.parseRecordUrl(record);
  return (
    <div>
      <ResultStatInfo uid={href} />
      <View {...props}
        modelName={modelName}
        uid={href}
        notQueryData={true}
        actionBar={actionBarProps} //操作条定义
        list={listProps} //列表定义
        paginationBar={paginationBarProps}
        heightOffset={heightOffset}
        onSearch={handleOnSearch}
        preventDefaultOnSearch={true}
      />
    </div>
  )

  //处理搜索条件变化
  function handleOnSearch({where}) {
    //发送消息初始化历史数据
    props.dispatch({
      type: modelName+'/queryHistory',
      payload: {record, searchWhere:where}
    })
  }
}

import { connect } from 'dva';
export default connect(({
    expenditure_datacenter,
    loading,
    apptabs:{tabs}
  }) =>
  ({
    expenditure_datacenter,
    loading: loading.models.expenditure_datacenter,
    tabs,
  })
)(ResultView);