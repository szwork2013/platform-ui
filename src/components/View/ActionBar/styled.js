import styled from 'styled-components';

//皮肤定义
const theme = {
	height: 32,
	totalHeight: () => theme.height
}

const StyledActionBarDiv = styled.div`
	width: 100%;
	height: ${props => props.actionBar.barHeight>=0?props.actionBar.barHeight:theme.height}px;
`;

export {
	StyledActionBarDiv,
	theme
}
