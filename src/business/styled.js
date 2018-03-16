import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100% !important;
  border-collapse: collapse;
  border: 1px solid #f04134;
  input, textarea, div {
    background-color: #fff !important;
  }
  //Form样式
  .ant-input {
    padding: 0px 5px 0px 5px !important;
  }
  .ant-input-lg {
    height: 28px !important;
    padding: 0px 5px 0px 5px !important;
  }
  .ant-input-disabled {
    border: 0px !important;
  }
  .ant-input-number-disabled {
    border: 0px !important; 
  }
  .ant-btn {
    margin: 2px;
  }
`;

const StyledTr = styled.tr`
  height: 1px;
`;

const StyledLabelTd = styled.td`
  width: 140px;
  border: 1px solid #f04134;
  text-align: center;
`;

const StyledTd = styled.td`
  padding-top: 2px;
  border: 1px solid #f04134;
`;

//表单标题div
const StyledHeaderDiv = styled.div`
    border-bottom: 1px solid #cececf;
    text-align: center;
    height: 28px;
    font-size: 16px;
    font-weight: bold;
    color: #108ee9;
`;

const StyledHiddenDiv = styled.div`
 display: none;
`;

export {
  StyledTable,
  StyledTr,
  StyledLabelTd,
  StyledTd,
  StyledHeaderDiv,
  StyledHiddenDiv,
}
