import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'dva';
import {StyledTable} from './styled';

const UserList = (props) => {

  const {dispatch, multiple, selectedSendee, loading, userList} = props

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: '300px',
      render:(text,record)=>{return text+(record.orgFullName?('   /'+record.orgFullName.split('/')[0]):'')}
    }
  ];
  const rowSelection = {
    type: multiple ? 'checkbox' : 'radio',
    selectedRowKeys: selectedSendee.map((item) => item._links.self.href),
    onSelect: onSelect,
    onSelectAll:onSelectAll,
  };

  return (
    <StyledTable
      showHeader={true}
      columns={columns}
      loading={loading}
      dataSource={userList}
      pagination={false}
      onRowClick={onRowClick}
      rowKey={record => record._links.self.href}
      scroll={{y: 300}}
      rowSelection={rowSelection}
    />
  );

  function onSelect(record, selected, selectedRows) {
    dispatch({
      type: 'sendeeSelect/selectChange',
      payload: {
        record,
        selected,
      },
    })
  }
  function onSelectAll(selected, selectedRows, changeRows) {
    dispatch({
      type: 'sendeeSelect/selectAll',
      payload: {
        changeRows,
        selected,
      },
    })
  }


  function onSelectChange(selectedRowKeys) {
    // let selectedSendee = selectedRows.map((item) => ({
    //   key: item._links.self.href,
    //   name: item.name
    // }));
    dispatch({
      type: 'sendeeSelect/selectChange',
      payload: {
        selected:selectedRowKeys
      },
    })
  }

  function onRowClick(record, index, event) {
    dispatch({
      type: 'sendeeSelect/rowSelected',
      payload: {
        record
      },
    })
  }
}

UserList.propTypes = {
  userList: PropTypes.array,
}

export default connect(({sendeeSelect: {selectedSendee, userList, multiple}, loading}) => {
  return {
    selectedSendee,
    multiple,
    userList,
    loading: loading.effects['sendeeSelect/init'] || loading.effects['sendeeSelect/queryUserList']
  }
})(UserList);
