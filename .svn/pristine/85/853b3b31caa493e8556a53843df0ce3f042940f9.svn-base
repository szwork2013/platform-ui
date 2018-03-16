import React from 'react';
import PropTypes from 'prop-types';
import {StyledButton, StyledButtonsDiv} from './styled';
import {connect} from 'dva';

const PrintButton = (props) => {
  const {title = "打印", templateNo, attachmentLink, fileName = "print", record, dispatch, ...customProps} = props;

  function openPdf() {
    dispatch({
      type: 'print/openPdf',
      payload: {
        templateNo,
        attachmentLink,
        fileName,
        record
      }
    })
  }

  return (
    <StyledButtonsDiv>
      <StyledButton {...{type: "primary", icon: 'printer', ...customProps}} onClick={openPdf}>{title}</StyledButton>
    </StyledButtonsDiv>
  )
}

PrintButton.propTypes = {
  title: PropTypes.string,
  templateNo: PropTypes.string.isRequired,
  attachmentLink: PropTypes.string.isRequired,//实体link,同样也是附件保存路径
  record: PropTypes.object.isRequired,
  fileName: PropTypes.string,
}

export default connect()(PrintButton);
