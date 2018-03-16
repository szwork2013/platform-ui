import styled from 'styled-components';
const theme = {
}

const CommentItemDiv = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-left: 5px;
  padding-right: 10px;
`;

const ContentDiv = styled.div`
  color: #333;
`;

const CommentInfoDiv = styled.div`
  text-align: right;
  color: #333;
`;

const UserInfoSpan = styled.span`
`;

export {
  CommentItemDiv,
  ContentDiv,
  CommentInfoDiv,
  UserInfoSpan,
  theme,
}
