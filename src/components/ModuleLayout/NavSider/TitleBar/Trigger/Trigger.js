import {StyledIcon} from './styled';

const Trigger =  (props) => {
	const {
		siderCollapsed,
    onClick,
	} = props;

	return(
    <StyledIcon type={siderCollapsed ? 'menu-unfold' : 'menu-fold'}
    	onClick={onClick}
    />
	);
}

import PropTypes from 'prop-types';
Trigger.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Trigger;
