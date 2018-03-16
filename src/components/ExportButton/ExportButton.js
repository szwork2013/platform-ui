import React from 'react'
import PropTypes from 'prop-types'
import ExportModal from './ExportModal'

import {StyledButton, StyledButtonsDiv} from './styled';

const ExportButton = (props) => {

  const {
    dispatch,
    url,
    title = '导出',
    selectionList,
    templateNo,
    ...customProps
  } = props


  function showModal() {
    dispatch({
      type: 'exportDialog/init',
      payload: {
        selectedList: [],
        selectionList: [],
        templateNo,
        url
      },
    });
  }

  return (
    <StyledButtonsDiv>
      <StyledButton {...{type: "primary", ...customProps}} icon="export" onClick={() => showModal()}>{title}</StyledButton>
      <ExportModal/>
    </StyledButtonsDiv>
  )
}

ExportButton.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  selectionList:PropTypes.array
}

import {connect} from 'dva';
export default connect()(ExportButton);
