import styled from 'styled-components';

//样式定义
const theme = {
	hasActionBar: true,
	fontSize: 14,
}

const StyledFormDiv = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;
	padding-left: 5px;
	padding-right: 5px;
}

`;

const StyledContentDiv = styled.div`
	height: 100%;
	width: 100%;
	overflow: hidden;
`;

export {
	StyledFormDiv,
	StyledContentDiv,
	theme,
}
