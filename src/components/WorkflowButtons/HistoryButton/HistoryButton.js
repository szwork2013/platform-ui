import WorkFlowHistoryModal from './Modal'

import {StyledButton, StyledButtonsDiv} from './styled';
import PropTypes from 'prop-types';
import {connect} from 'dva';

const WorkFlowHistoryButton = (props) => {
  const {instanceId, modalVisible, dispatch, ...customProps} = props

  function showModal() {
    dispatch({
      type: 'workflowHistory/init',
      payload: {
        instanceId,
        modalVisible: true,
      },
    });
  }

  return (
    <StyledButtonsDiv>
      <StyledButton {...{type: "primary", ...customProps}} onClick={showModal}>流程记录</StyledButton>
      {modalVisible ? <WorkFlowHistoryModal/> : null}
    </StyledButtonsDiv>
  )
}

WorkFlowHistoryButton.propTypes = {
  instanceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default connect(({workflowHistory: {modalVisible}}) =>
  ({modalVisible}))
(WorkFlowHistoryButton);
