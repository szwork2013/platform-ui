import React from 'react';
import {Button} from 'antd';

import { Form as FormLayout, FormItem } from 'components';
const FormContainer = FormLayout.FormContainer;
const Row = FormContainer.StyledRow;

import {formDate} from 'utils';
import materialService from '../../server';

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
      type,
      orgLevel,
      dispatch
    } = this.props;

    //构造FormItem的公共参数
    const itemProps = { canEdit, required: canEdit,
      getFieldDecorator, setFieldsValue,
    };
    const itemWidth = ['96%','10%','90%'];
    const twoItemWidth = ['48%','20%','80%'];
    const threeItemWidth = ['32%', '30%', '70%'];
    const fourItemWidth = ['24%', '40%', '60%'];
    const fiveItemWidth = ['19%', '40%', '60%'];

    //设置数字格式
    const inputNumberProps = {
      precision:0,
      size: 'medium',
    }

    let orgString='机关';
    if(orgLevel==1){
      orgString='二级单位';
    }

    if(!record.description){
      record.description='1、套管性能须符合勘探分公司与相关套管生产厂家签订的《套管采购技术协议》的相关要求，'+
        '其中：机械性能、防腐蚀性能须满足南方探区复杂井各种工况条件下的钻探、测试和长期生产的安全要求。'+
        '具体机械性能技术参数见附件。2、各种产品可以在性能不降低、参数不变化(接头尺寸、通径等)、'+
        '供货时间有保证的前提下选用不同厂家的产品 ';
    }

//显示UI
    return (
    <div>
      <Row>
        <FormItem type='InputNumber' {...itemProps} width={fourItemWidth}
                  title='年度' itemKey='year' initialValue={record.year}
                  placeholder='' controlProps={{...inputNumberProps}} min={1900} max={9999}
        />
        {(type=='ENGINEERING_MATERIALS'||type==4)&&
        <FormItem type='InputNumber' {...itemProps} width={fourItemWidth}
                  title='季度' itemKey='quarter' initialValue={record.quarter}
                  placeholder='' controlProps={{...inputNumberProps}} min={1} max={4}
        />
        }
        {!(type=='ENGINEERING_MATERIALS'||type==4)&&
        <FormItem type='InputNumber' {...itemProps} width={fourItemWidth}
                  title='月份' itemKey='month' initialValue={record.month}
                  placeholder='' controlProps={{...inputNumberProps}} min={1} max={12}
        />
        }
        <FormItem type='InputNumber' {...itemProps} width={fourItemWidth}
                  title='批次' itemKey='batchNo' initialValue={record.batchNo}
                  placeholder='' controlProps={{...inputNumberProps}}
        />
        <FormItem title='采购方式' type='Select' {...itemProps} width={fourItemWidth}
                  itemKey='purchaseWay' initialValue={(record.purchaseWay||record.purchaseWay==0)&&(record.purchaseWay+'')}
                  options={[{id:'0',name:'统采'},{id:'1',name:'自采'}]}
        />
      </Row>
      <Row>
        <FormItem type='Input' {...itemProps} width={fiveItemWidth}
                  title='编号' itemKey='serialNo' initialValue={record.serialNo}
                  placeholder='' canEdit={false}
                  required={false}
        />
        <FormItem type='Input' {...itemProps} width={threeItemWidth}
                  title='编制依据' itemKey='compilationBasis'
                  initialValue={record.compilationBasis
                  ||(orgString+materialService.convertTypeToString(type)+'采购计划'+record.year+'-'+(record.month||record.quarter)+'-'+record.batchNo)}
                  placeholder='' canEdit={false}
                  required={false}
        />
        <FormItem title='交货日期' type='DatePicker' showTime={false} {...itemProps} width={fiveItemWidth}
                  itemKey='deliveryDate' initialValue={record.deliveryDate||undefined} required={false}
        />
        <FormItem type='Input' {...itemProps} width={fourItemWidth}
                  title='备注' itemKey='remark' initialValue={record.remark}
                  placeholder=''
                  required={false}
        />
      </Row>
      {(type=='ENGINEERING_MATERIALS'||type==4)&&
        <Row>
          <FormItem type='TextArea' {...itemProps} width={itemWidth}
                    title='具体要求' itemKey='description' initialValue={record.description}
                    placeholder=''
                    required={false}
          />
        </Row>
      }
    </div>
    );
  }

}
export default PlanContent;
