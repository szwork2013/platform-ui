import styled from 'styled-components';
import {Button, Table} from 'antd';

const theme = {
  deleteButtonTop: "15px",
}

const DeleteButton = styled(Button)`
    // position: relative;
     margin-top: ${theme.deleteButtonTop};
`;
const StyledTable = styled(Table)`
  .ant-table-small .ant-table-header > table, .ant-table-small .ant-table-body > table {
    padding: 0px;
  }
  .ant-table-small .ant-table-tbody > tr > td {
    padding: 2px 0px;
  }
  .ant-table-small .ant-table-tbody > tr > td.ant-table-selection-column {
      min-width: 20px;
      width: 25px;
  }
`;

export {
  StyledTable,
  DeleteButton,
  theme
}
