import React from 'react'
import {Button, Icon, Modal, Tabs} from 'antd'
import {connect} from 'dva'
import List from '../List'

const TabPane = Tabs.TabPane;

const WorkFlowHistoryModal = (props) => {
  const {
    dispatch,
    loading,
    modalVisible,
    currentStatus,
    flowHistory,
  } = props

  const modalProps = {

    title: <div><Icon type="clock-circle-o"/>流程记录</div>,
    visible: modalVisible,
    maskClosable: false,
    width: '750px',
    cancelText: '',
    okText: '关闭',
    wrapClassName: 'vertical-center-modal',
    afterClose() {
      dispatch({
        type: 'workflowHistory/reset',
      })
    },
    onCancel() {
      dispatch({
        type: 'workflowHistory/hide',
      })
    },
    footer: [<Button key="back" type='primary' size="large" onClick={() => {
      dispatch({
        type: 'workflowHistory/hide',
      })
    }}>关闭</Button>
    ]
  }

  const currentStatusColumns = [
    {
      title: '当前办理人',
      dataIndex: 'executorName',
      width: '400px',
      render:nameTitleRender
    },
    {
      title: '文件状态',
      dataIndex: 'stateName',
      width: '200px',
    }
  ];

  const flowHistoryColumns = [
    {
      title: '操作时间',
      dataIndex: 'createdTime',
      width: '180px',
      className: 'alignCenter',
    },
    {
      title: '办理人',
      dataIndex: 'executorName',
      width: '400px',
      className: 'alignCenter',
      render:nameTitleRender
    },

    {
      title: '文件状态',
      dataIndex: 'executionStateName',
      width: '200px',
      className: 'alignCenter',
    },
    {
      title: '执行操作',
      dataIndex: 'actionName',
      width: '200px',
      className: 'alignCenter',
    },
    {
      title: '接收人',
      dataIndex: 'sendeeName',
      width: '400px',
      className: 'alignCenter',
      render:nameTitleRender
    }
  ];

  return (
    <Modal {...modalProps}>
      <Tabs size="small">
        <TabPane tab="当前状态" key="1">
          <List listData={currentStatus} loading={loading} columns={currentStatusColumns}/>
        </TabPane>
        <TabPane tab="流程历史" key="2">
          <List listData={flowHistory} loading={loading} columns={flowHistoryColumns}/>
        </TabPane>
      </Tabs>
    </Modal>
  )

  function nameTitleRender(text) {
    let result='';
    if(text){
      let textArray=text.split('/');
       result=textArray[0];
      if(textArray.length>1)
        result=result+'/'+textArray[1];
    }
    return result;
  }
}

export default connect(({workflowHistory: {modalVisible, currentStatus, flowHistory}, loading}) => ({
  modalVisible,
  currentStatus,
  flowHistory,
  loading: loading.models.workflowHistory,
  initLoading: loading.effects['workflowHistory/init']
}))(WorkFlowHistoryModal);
