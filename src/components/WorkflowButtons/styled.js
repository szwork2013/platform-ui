import styled from 'styled-components';
import {Button} from 'antd';

const theme = {
  hasActionBar: true,
  fontSize: 14,
  marginLeft : 5,
  paddingTop: 1,
  height: () => theme.hasActionBar ? 33 : 0,
  totalHeight: () => theme.height()+theme.paddingTop,
}

const StyledButton = styled(Button)`
	font-size: ${theme.fontSize}px;
	margin-left: ${theme.marginLeft}px;
`;

const StyledButtonsDiv = styled.div`
 	height: ${theme.height}px;
 	line-height: ${theme.height}px;
 	width: 100%;
 	padding-top: ${theme.paddingTop}px;
 	background: rgba(226, 230, 230, 0.2) !important;
 	display:inline;
`;

export {
  StyledButtonsDiv,
  StyledButton,
  theme
}
