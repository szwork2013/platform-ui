import React from 'react';
import { connect } from 'dva';
import { View } from 'components';
import service from 'service';
import { Button } from 'antd';

import modelDefinition from '../model';

//取得模型名称
const modelName = modelDefinition.namespace;

const ViewComponent = (props) => {

  const user = service.userInfo.user;

  const {dispatch, done_link: {viewData}} = props;
  const selectedRowKeys = viewData&&viewData[0].selectedRowKeys;

  const buttons = <Button type="primary" disabled={!(selectedRowKeys && selectedRowKeys.length > 0)}
    onClick={handleButtonClicked}>移入待办</Button>
  const actionBarProps = {
    buttons: buttons,
  }

  //定义列表属性
  const listProps = {
    columns: [
      { title: '项目名称', fulltext: false, width: 135, dataIndex: 'projectname', key: 'projectname', textRender: projectNameRender },
      { title: '事项名称', dataIndex: 'subject', key: 'subject', textRender: styleEventRender, sorter: true },
      { title: '分类', width: 150, dataIndex: 'category', key: 'category', textRender: eventRender, sorter: true },
      { title: '创建人', width: 80, dataIndex: 'creatorName', key: 'creatorName', textRender: creatorRender, sorter: true },
      { title: '发送人', width: 80, dataIndex: 'senderName', key: 'senderName', textRender: eventRender, sorter: true },
      { title: '发送时间', width: 145, dataIndex: 'sentTime', fulltext: false, key: 'sentTime', textRender: eventRender, sorter: true }
    ],
    rowSelection: {}, //选择功能配置
  };

  //定义过滤条件
  const searchParam = {
    projection: 'default',
    filter: { //过滤规则
      clazz: 'DoneLink', //模型对应的后台实体类
      where: `o.sendeeId='${user.id}'`, //条件
    },
    size: 20, //指定每页记录数
    sort: ['o.sentTime,desc'] //创建时间降序
  };

  //翻页器属性
  const paginationBarProps = {};

  return (
    <View key={modelName + 'ViewLayout'} {...props}
      modelName={modelName} //模型名称
      searchParam={searchParam}
      actionBar={actionBarProps} //操作条定义
      list={listProps} //列表定义
      paginationBar={paginationBarProps}
    />
  )

  function handleButtonClicked() {
    dispatch(
      { type: 'done_link/moveToTodo' }
    );
  }

  function styleEventRender(text, record, index) {
    //未读
    const event = eventRender(text, record, index);
    if (record.state === 'UNREADED') {
      return <span style={{ color: 'red' }}>*{event}</span>
    }
    return event
  }

  function eventRender(text, record, index) {
    if (text)
      text = text.substring(text.indexOf('$') + 1, text.length);
    return <a onClick={() => {
      dispatch({ type: 'todo_link/todoClick', payload: { record } });
    }}>{text}</a>
  }
  function projectNameRender(text, record, index) {
    let result = record.subject;
    if (result) {
      result = result.substring(0, result.indexOf('$'));
    }
    return <a onClick={() => {
      dispatch({ type: 'todo_link/todoClick', payload: { record } });
    }}>{result}</a>
  }

  //创建人构造函数
  function creatorRender(text, record, index) {
    let renderText = text;
    // let orgFullName = record&&record.creatorOrgName;
    // if (orgFullName) renderText = orgFullName.split('/')[0]+text;

    return eventRender(renderText, record, index);
  }

}


//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件

export default connect(({ done_link, loading }) =>
  ({ done_link, loading: loading.models[modelName] })
)(ViewComponent);
