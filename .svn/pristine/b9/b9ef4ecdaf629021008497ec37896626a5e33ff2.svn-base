import styled from 'styled-components';
import {Form} from 'antd'
const FormItem = Form.Item

//皮肤定义
const theme = {
};

const StyledFormItem = styled(FormItem)`
  width: ${(props)=>(props.width&&props.width[0])?props.width[0]:'48%'};
  .ant-form-item-label {
     width: ${(props)=>(props.width&&props.width[1])?props.width[1]:'20%'};
     text-align:right;
     vertical-align:top !important;
  }
  .ant-form-item-control-wrapper {
    width: ${(props)=>(props.width&&props.width[2])?props.width[2]:'80%'};
    text-align:${(props)=>props.type=='Checkbox'?'center':'left'};
  }
  .ant-form-item-control {
    line-height: 28px !important;
    width: 100%;
  }
  .ant-input-number {
    width: 100%;
  }
  .ant-calendar-picker {
    width: 100% !important;  
  }
  .ant-select-selection__placeholder {
    font-size: 14px;
  }
  ${(props)=>props.customStyle? props.customStyle :''}
`;

export {
  theme,
  StyledFormItem,
}
