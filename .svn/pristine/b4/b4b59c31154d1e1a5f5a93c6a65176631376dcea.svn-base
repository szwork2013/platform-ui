import React from 'react'
import PropTypes from 'prop-types'
import {SendeePanelDiv, StyledTag} from './styled'


const SendeePanel = (props) => {

  const {
    dispatch,
    model,
    closeAble = true,
  } = props;
  let selectedList=model.selectedList;

  return (
    <SendeePanelDiv list={selectedList}>
      {selectedList && selectedList.length > 0 ? renderSendeeTag(selectedList) : <span></span>}
    </SendeePanelDiv>
  )

  function renderSendeeTag(selectedList) {
    return selectedList.map((item, index) => {
      return <StyledTag key={item.key} closable={closeAble}
                        onClose={() => removeSelecte(item)}>{item.name}</StyledTag>
    })
  }

  function removeSelecte(record) {
    dispatch({
      type: 'exportDialog/remove',
      payload: {
        record
      },
    });
  }
}
SendeePanel.propTypes = {
  closeAble: PropTypes.bool,
}

import {connect} from 'dva';
export default connect(({exportDialog}) =>
  ({model: exportDialog}))(SendeePanel);

