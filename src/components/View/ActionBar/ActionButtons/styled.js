import styled from 'styled-components';
import {Button} from 'antd';

//样式定义
const theme = {
	fontSize: 14,
	marginLeft : 10,
}

const StyledButton=styled(Button)`
	font-size: ${theme.fontSize}px !important;
	margin-left: ${theme.marginLeft}px;
`;

const StyledButtonsDiv = styled.div`
	display: inline-block;
	> span {
	  display: inline-flex;
	}
`;

export {
  StyledButtonsDiv,
  StyledButton,
  theme
}
