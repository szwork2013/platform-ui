import styled from 'styled-components';
import {Row} from 'antd'

const theme = {}

const StyledRow = styled(Row).attrs({
  type: "flex",
  gutter: 16,
  justify: "space-between"
})`
  align-items:stretch
`;

export {
  StyledRow,
  theme
}
