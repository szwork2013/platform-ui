import React from 'react';
import {Icon, Button,Col } from 'antd';

import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Row = FormContainer.StyledRow;

import service from 'service';
import wfservice from 'wfservice';

//权限定义表单
class SearchBar extends React.Component {

  render() {

    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const fourItemWidth = ['24%', '25%', '75%'];
    const itemProps = {
      canEdit: true, getFieldDecorator, setFieldsValue, width: fourItemWidth,
      controlProps: { allowClear: true }, required: false,
    };
    let {
      conditionData, //条件数据
      dispatch,
    } = this.props;

    //显示UI
    return (
      <Row>
        <FormItem type='Input' {...itemProps} placeholder={'年度'}  title="年度"
                  itemKey='year'
                  initialValue={conditionData.year}

        />
        <Button icon="search" type="primary" onClick={()=>{
          dispatch({
            type:'publication/query',
            payload:{
            searchParam :{
              filter:undefined,
              size:undefined,
              sort:undefined,
              search: 'get_statistic_data',
              ...conditionData,
            }
            }
          })
        }}>查询</Button>
      </Row>
    );
  }

}
export default SearchBar;
