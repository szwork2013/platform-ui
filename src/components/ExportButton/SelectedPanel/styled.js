import styled from 'styled-components';
import {Tag} from 'antd';

const theme = {
  padding: '5px',
}

const SendeePanelDiv = styled.div`
	color: ${props => props.list && props.list.length > 0 ? '#686868' : '#918989'};
  padding: ${theme.padding};
  border: 1px solid #f4f4f4;
  height:100%;
`;
const StyledTag = styled(Tag)`
  margin: 2px;
  .ant-tag-text,i.anticon.anticon-cross {
    font-size: 14px;
  }
`;
export {
  SendeePanelDiv,
  StyledTag,
  theme,
}
