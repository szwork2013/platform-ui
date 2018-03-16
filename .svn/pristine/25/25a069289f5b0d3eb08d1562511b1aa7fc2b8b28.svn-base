import React from 'react';
import PropTypes from 'prop-types'
import {StyledTable} from './styled';

const SelectionPanel = (props) => {

  const {dispatch, loading,model} = props
  let selectionList=model.selectionList;
  let selectedList=model.selectedList;

  const columns = [
    {
      title: '列名',
      dataIndex: 'name',
      width: '200px'
    }
  ];
  const rowSelection = {
    type: 'checkbox',
    onSelect: onSelect,
    onSelectAll:onSelectAll,
    selectedRowKeys: selectedList.map((item) => item.key),
  };

  return (
    <StyledTable
      showHeader={true}
      columns={columns}
      loading={loading}
      dataSource={selectionList}
      pagination={false}
      onRowClick={onRowClick}
      rowKey={record => record.key}
      scroll={{y: 300}}
      rowSelection={rowSelection}
    />
  );

  function onSelect(record, selected, selectedRows) {
    dispatch({
      type: 'exportDialog/selectChange',
      payload: {
        record,
        selected,
      },
    })
  }
  function onSelectAll(selected, selectedRows, changeRows) {
    dispatch({
      type: 'exportDialog/selectAll',
      payload: {
        changeRows,
        selected,
      },
    })
  }

  function onRowClick(record, index, event) {
    dispatch({
      type: 'exportDialog/selectChange',
      payload: {
        record,
        selected:true
      },
    })
  }

}

SelectionPanel.propTypes = {
  selectionList: PropTypes.array,
}


import {connect} from 'dva'
export default connect(({exportDialog}) =>
  ({model: exportDialog}))(SelectionPanel);
