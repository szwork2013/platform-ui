import React from 'react'
import CopySheetPasswordModal from './Modal'
import {StyledButton, StyledButtonsDiv} from './styled';
import {connect} from 'dva';

const CopySheetButton = (props) => {
  const {modalVisible,dispatch} = props;
  function showModal() {
    dispatch({
      type: 'copySheet/show'
    });
  }
  return (
    <StyledButtonsDiv>
      <StyledButton type="primary" onClick={() => showModal()}>UI表拷贝</StyledButton>
      {modalVisible ? <CopySheetPasswordModal/> : null}
    </StyledButtonsDiv>
  )
}

export default connect(({copySheet: {modalVisible}}) =>
  ({modalVisible}))
(CopySheetButton);
