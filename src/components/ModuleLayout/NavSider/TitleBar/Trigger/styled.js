import styled from 'styled-components';

import { Icon } from 'antd';

import {theme} from '../styled';

const StyledIcon = styled(Icon)`
  background: transparent !important;
  float: right;
  color: #0d78de;
	font-size: 18px;
  height: ${theme.height}px;
  padding: ${theme.padding}px;
	cursor: pointer;
  transition: color .3s;
  :hover {
  	color: #f50 !important;
	}
`;

export {
  StyledIcon,
}
