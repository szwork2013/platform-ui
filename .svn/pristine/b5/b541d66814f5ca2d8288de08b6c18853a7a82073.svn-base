import React from 'react'
import PropTypes from 'prop-types'
import {SendeePanelDiv, StyledTag} from './styled'

const SendeePanel = (props) => {
  const {
    removeCallBack,
    selectedSendee,
    closeAble = true,
  } = props;

  return (
    <SendeePanelDiv list={selectedSendee}>
      {selectedSendee && selectedSendee.length > 0 ? renderSendeeTag(selectedSendee) : <span>无人员</span>}
    </SendeePanelDiv>
  )

  function renderSendeeTag(selectedSendee) {
    return selectedSendee.map((user, index) => {
      return <StyledTag key={user._links.self.href} closable={closeAble} onClose={() => removeCallBack(user._links.self.href)}>{user.name}</StyledTag>
    })
  }

}
SendeePanel.propTypes = {
  selectedSendee: PropTypes.array,
  closeAble: PropTypes.bool,
  removeCallBack: PropTypes.func,
}
export default SendeePanel;

