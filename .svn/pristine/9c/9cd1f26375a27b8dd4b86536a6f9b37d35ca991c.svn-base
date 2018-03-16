import React from 'react';
import {Col,Button} from 'antd';

import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Row = FormContainer.StyledRow;

import {formDate} from 'utils';

//权限定义表单
class PlanContent extends React.Component{

  componentDidMount() {

  }

  render(){
    //解构参数
    let {
      record, //FormContainer注入：模型
      canEdit = true, //FormContainer注入：是否可编辑
      getFieldDecorator,
      setFieldsValue,
      dispatch
    } = this.props;

    //设置数字格式
    const inputNumberProps = {
      precision:0,
      size: 'medium',
    }

    //构造FormItem的公共参数
    const itemProps = { canEdit, required: canEdit,
      getFieldDecorator, setFieldsValue,
    };
    const itemWidth = ['96%','10%','90%'];
    const twoItemWidth = ['48%','20%','80%'];
    const threeItemWidth = ['32%', '30%', '70%'];
    const fourItemWidth = ['24%', '40%', '60%'];
    const fiveItemWidth = ['19%', '40%', '60%'];

  return (
    <div>
      <Row>
        <FormItem type='Input' {...itemProps} width={fiveItemWidth}
                  title='编号' itemKey='no' initialValue={record.no}
                  placeholder=''
        />
        <FormItem type='InputNumber' {...itemProps} width={fiveItemWidth}
                  title='年度' itemKey='year' initialValue={record.year}
                  placeholder='' controlProps={{...inputNumberProps}} min={1900} max={9999}
        />
        {!(record.type=='ENGINEERING_MATERIALS'||record.type==4)&&
        <FormItem type='InputNumber' {...itemProps} width={fiveItemWidth}
                  title='月份' itemKey='month' initialValue={record.month}
                  placeholder='' controlProps={{...inputNumberProps}} min={1} max={12}
        />
        }
        {(record.type=='ENGINEERING_MATERIALS'||record.type==4)&&
        <FormItem type='InputNumber' {...itemProps} width={fiveItemWidth}
                  title='季度' itemKey='quarter' initialValue={record.quarter}
                  placeholder='' controlProps={{...inputNumberProps}} min={1} max={4}
        />
        }
        <FormItem type='Input' {...itemProps} width={fiveItemWidth}
                  title='备注' itemKey='remark' initialValue={record.remark}
                  placeholder=''
                  required={false}
        />
        <Col span={5}>
          编报部门(单位)：{record.orgName}
        </Col>
      </Row>
    </div>
  );
  }
}
export default PlanContent;
