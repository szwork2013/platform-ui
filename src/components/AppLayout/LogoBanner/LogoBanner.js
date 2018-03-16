import { StyledRow } from './styled';

import {Col} from 'antd';

import logoImg from './image/sys_logo.gif';
import titleImg from './image/sys_title.gif';

export default () => {
	return(
      <StyledRow>
        <Col span={16}>
          <img src={logoImg}></img>
        </Col>
        <Col span={8}>
          <img style={{float:'right'}} src={titleImg}></img>
        </Col>
      </StyledRow>
	);
} 