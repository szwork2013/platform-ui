import React from 'react';
import PropTypes from 'prop-types'
import {StyledTable} from './styled';

const List = (props) => {

  const {loading,columns, listData} = props

  return (
    <StyledTable
      showHeader={true}
      columns={columns}
      loading={loading}
      dataSource={listData}
      pagination={false}
      rowKey={(record,index) => index}
      scroll={{y: 300}}
    />
  );
}

List.propTypes = {
  loading: PropTypes.bool,
  listData: PropTypes.array,
  columns: PropTypes.array
}

export default List;
