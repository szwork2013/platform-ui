import styled from 'styled-components';
import {Icon, Input} from 'antd';

const {TextArea} = Input;
//样式定义
const theme = {
  fontSize: 14,
  marginLeft: 10,
}

const StyledCellDiv = styled.div`
  margin:0;
  padding:0;
  display: flex;
  align-items:center;
  &:hover {
    .anticon-edit {
      visibility:visible;
	  }
	}
`;

const StyledIcon = styled(Icon)`
  width: 28px;
  cursor: pointer;
  flex: none;
  line-height: 28px;
  &:hover {
		color: #108ee9;
	}
`;

const StyledTextArea = styled(TextArea)`
  padding: 5px;
  flex:auto;
  border:0;
  resize: none;
`;

const StyledText = styled.div`
  padding: 5px;
  flex:auto;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  max-width: 290px;
`;

const EditIcon = StyledIcon.extend`
  visibility:hidden;
`;

export {
  StyledCellDiv,
  StyledTextArea,
  StyledText,
  EditIcon,
  StyledIcon,
  theme
}
