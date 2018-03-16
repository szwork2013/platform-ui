import styled from 'styled-components';
import {Tabs} from 'antd';

const StyledHeaderDiv = styled.div`
    border-bottom: 1px solid #cececf;
    text-align: center;
    height: 60px;
    font-size: 24px;
    padding-top: 10px;
`;

const StyledTabs = styled(Tabs)`
    height: 98%;
    .ant-tabs-content {
		 height: 100%;
	  }
`;
export {
  StyledHeaderDiv,
  StyledTabs
}
