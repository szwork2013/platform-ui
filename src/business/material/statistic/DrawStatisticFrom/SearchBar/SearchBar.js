import React from 'react';
import {Icon, Button,Col } from 'antd';

import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Row = FormContainer.StyledRow;

import service from 'service';
import wfservice from 'wfservice';
import materialService from '../../../server';

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

    let monthOptions=[
        { 'id': '1', 'name': '1月' },
        { 'id': '2', 'name': '2月' },
        { 'id': '3', 'name': '3月' },
        { 'id': '4', 'name': '4月' },
        { 'id': '5', 'name': '5月' },
        { 'id': '6', 'name': '6月' },
        { 'id': '7', 'name': '7月' },
        { 'id': '8', 'name': '8月' },
        { 'id': '9', 'name': '9月' },
        { 'id': '10', 'name': '10月' },
        { 'id': '11', 'name': '11月' },
        { 'id': '12', 'name': '12月' },
    ];

    let quarterOptions=[
      { 'id': '1', 'name': '1季度' },
      { 'id': '2', 'name': '2季度' },
      { 'id': '3', 'name': '3季度' },
      { 'id': '4', 'name': '4季度' },
    ];

    let currentYear=new Date().getFullYear();
    let yearOptions=[
      { 'id': currentYear, 'name': currentYear+'年' },
      { 'id': currentYear-1, 'name': (currentYear-1)+'年' },
      { 'id': currentYear-1, 'name': (currentYear-2)+'年' },
      { 'id': currentYear-3, 'name': (currentYear-3)+'年' },
      { 'id': currentYear-4, 'name': (currentYear-4)+'年' },
      { 'id': currentYear-5, 'name': (currentYear-5)+'年' },
      { 'id': currentYear-6, 'name': (currentYear-6)+'年' },
      { 'id': currentYear-7, 'name': (currentYear-7)+'年' },
      { 'id': currentYear-8, 'name': (currentYear-8)+'年' },
      { 'id': currentYear-9, 'name': (currentYear-9)+'年' },
    ];


    //显示UI
    return (
      <Row>
        <FormItem type='Select' {...itemProps} placeholder={'物资类型'} title="物资类型"
                  itemKey='type' options={materialService.getAllType()}
                  initialValue={conditionData.type}
        />
        <FormItem type='Select' {...itemProps} placeholder={'年度'}  title="年度"
                  itemKey='year' options={yearOptions}
                  initialValue={conditionData.year}

        />
        {conditionData.type==4&&
        <FormItem type='Select' {...itemProps} placeholder={'季度'}  title="季度"
                  itemKey='quarter' options={quarterOptions}
                  initialValue={conditionData.quarter}

        />
        }
        {conditionData.type != 4 &&
        <FormItem type='Select' {...itemProps} placeholder={'月度'} title="月度"
                  itemKey='month' options={monthOptions}
                  initialValue={conditionData.month}

        />
        }
        <Button icon="search"  type="primary" onClick={()=>{
          dispatch({
            type:'plan_item/query',
            payload:{
            dataKey:'wzlytj',
            searchParam :{
              filter:undefined,
              size:undefined,
              sort:undefined,
              search: 'get_draw_statistic_data',
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
