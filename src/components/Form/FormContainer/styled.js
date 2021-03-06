import styled from 'styled-components';
import { Form, Row } from 'antd'
const FormItem = Form.Item

import ActionBar from '../ActionBar'
import { AppTabs } from 'components';

//样式定义
const theme = {
   height:() => {
     let height = document.body.clientHeight;
     height -= AppTabs.theme.totalHeight();
     height -= ActionBar.theme.totalHeight();
     return height;
   }
}

const StyledForm = styled(Form)`
  overflow-x: hidden;
  overflow-y: auto;
  height: ${props=>props.height?props.height:theme.height}px;
  background: rgba(226, 230, 230, 0.1) !important;
  //Form样式
  .ant-form-explain {
    font-size: 14px !important;
  }
  .ant-form-item {
    margin-right: 10px !important;
  }
  .ant-collapse-header {
    padding: 4px 0 4px 34px !important;
    .arrow {
      line-height: 30px !important;
    }
  }
  .ant-collapse-content-box {
    padding: 2px !important;
  }
`;

const StyledRow= styled(Row)`
  margin: 5px;
`;

export {
  StyledForm,
  StyledRow,
  theme,
}
