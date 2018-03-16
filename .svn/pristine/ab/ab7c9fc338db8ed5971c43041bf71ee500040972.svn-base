import React from 'react';
import PropTypes from 'prop-types'
import EditTableCell from './EditTableCell'
import {connect} from 'dva';
import {DeleteButton, StyledTable} from './styled'

class UsefulExpressions extends React.Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'usefulExpression/init',
      payload: {
        userSelfLink: this.props.userSelfLink,
      },
    })
  }

  selectComment = (record, index, event) => {
    this.props.dispatch({
      type: 'commentButton/refresh',
      payload: {
        comment: record.content,
        addAllowed: false,
      },
    })
  }

  deleteComments = () => {
    this.props.dispatch({
      type: 'usefulExpression/del'
    })
  }

  onSelectChange = (selectedRowKeys) => {
    this.props.dispatch({
      type: 'usefulExpression/refresh',
      payload: {
        selectedRowKeys
      },
    })
  }

  onChangeConfirm = (record) => {
    return (value) => {
      record.content = value;
      this.props.dispatch({
        type: 'usefulExpression/update',
        payload: {
          record
        },
      })
    }
  }

  render() {

    const {dispatch, selectedRowKeys, editRowKey, editValue, loading, delLoading, list} = this.props;

    const columns = [
      {
        title: '常用语',
        dataIndex: 'content',
        width: '300px',
        sorter: (a, b) => {
          return a.sortNo - b.sortNo
        },
        sortOrder: 'ascend',
        render: (text, record, index) => (
          <EditTableCell
            record={record}
            editValue={editValue}
            isEdit={record._links.self.href === editRowKey}
            dispatch={dispatch}
            onChangeConfirm={this.onChangeConfirm(record)}
          />
        ),
      }
    ];
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <StyledTable
          title={() => '常用语'}
          showHeader={false}
          columns={columns}
          size="small"
          loading={loading}
          bordered
          dataSource={list}
          onRowClick={this.selectComment}
          rowKey={record => record._links.self.href}
          pagination={false}
          scroll={{y: 300}}
          rowSelection={rowSelection}
        />
        <DeleteButton
          type="danger"
          icon="delete"
          onClick={this.deleteComments}
          disabled={!hasSelected}
          loading={delLoading}
        >
          删除
        </DeleteButton>
      </div>
    );
  }
}

UsefulExpressions.propTypes = {
  userSelfLink: PropTypes.string,
}

export default connect(({usefulExpression, loading}) => {
  return {
    ...usefulExpression,
    loading: loading.models.usefulExpression,
    delLoading: loading.effects['usefulExpression/del']
  }
})(UsefulExpressions);
