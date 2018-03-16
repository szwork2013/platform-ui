import React from 'react';
import {Form as FormLayout, FormItem} from 'components';
import {Icon, Tabs} from "antd";
import service from 'service'
import SheetRow from "../sheetrow";
import SheetCol from "../sheetcol";

const TabPane = Tabs.TabPane;
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;

class SheetForm extends React.Component {

  componentDidMount() {

  }

  renderTabs(record) {
    return <Row>
      <Tabs tabPosition='top' type="card">
        <TabPane key="row" tab={<span><Icon type="file-text"/>行定义</span>}>
          <SheetRow record={record}/>
        </TabPane>
        <TabPane key="col" tab={<span><Icon type="file-text"/>列定义</span>}>
          <SheetCol record={record}/>
        </TabPane>
      </Tabs>
    </Row>
  }

  render() {
    //解构参数
    let {
      model, //FormContainer注入：模型
      canEdit = true, //FormContainer注入：是否可编辑
      getFieldDecorator,
      setFieldsValue,
      dispatch,
      ...rest
    } = this.props;

    let {record, state} = model;
    let recordId = service.getRecordId(record);
    //构造FormItem的公共参数
    const itemProps = {
      canEdit,
      getFieldDecorator,
      setFieldsValue,
    };

    const threeItemWidth = ['32%', '30%', '70%'];

    const sheetGroupProps = {
      required: false,
      modelName: 'budget_sheetgroup', searchParam: { //搜索条件
        filter: {},
        size: 1000, //指定每页记录数
        sort: 'o.id,desc', //缺省排序规则
      }
    }

    return (
      <Form layout='inline'>
        <Row>
          <FormItem type='Input' title='名称' itemKey='name' initialValue={record.name || ''}
                    width={threeItemWidth} {...itemProps} />
          <FormItem type='Input' title='简称' itemKey='simpleName' initialValue={record.simpleName || ''}
                    width={threeItemWidth} required={false} {...itemProps} />
          <FormItem type='Input' title='编码' itemKey='code' initialValue={record.code || ''}
                    width={threeItemWidth} {...itemProps} />
          <FormItem type='Input' title='列方法' itemKey='colMethod' initialValue={record.colMethod || ''}
                    width={threeItemWidth} required={false} {...itemProps}/>
          <FormItem type='Select' title='报表组' itemKey='sheetgroup' initialValue={record.sheetgroup || ''}
                    width={threeItemWidth} {...itemProps} {...sheetGroupProps}/>
          <FormItem type='InputNumber' title='排序号' itemKey='sortNo' initialValue={record.sortNo || ''}
                    width={threeItemWidth} {...itemProps}/>
        </Row>
        <Row>
          <FormItem type='Input' title='数据方法' itemKey='dataMethod' initialValue={record.dataMethod || ''}
                    width={threeItemWidth} required={false} {...itemProps} />
          <FormItem type='Input' title='默认值获取' itemKey='keyMethod' initialValue={record.keyMethod || ''}
                    width={threeItemWidth} required={false} {...itemProps} />
          <FormItem type='Input' title='默认值字段名' itemKey='keyName' initialValue={record.keyName || ''}
                    width={threeItemWidth} required={false} {...itemProps} />
        </Row>
        {recordId !== -1 ? this.renderTabs(record) : null}
      </Form>
    );
  }
}

export default SheetForm;
