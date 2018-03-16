import React from 'react';

import service from 'service';

import { Form as FormLayout, FormItem, DropdownSelect } from 'components';
const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
//const Row = FormContainer.StyledRow;

//引入styled组件
import {
  StyledHeaderDiv,
} from './styled';
import {
  StyledTable as Table, 
  StyledTr as Row,
  StyledLabelTd as LabelCol,
  StyledTd as Col,
} from '../../../styled';
//权限定义表单
const InstitutionForm = (props) => {
  //1 解构参数
  let {
    model, //FormContainer注入：模型
    canEdit = true, //FormContainer注入：是否可编辑
    getFieldDecorator,
    setFieldsValue,
    dispatch,
  } = props;

  const { record, state } = model;

  //2 构造FormItem的公共参数
  const itemProps = { canEdit, setFieldsValue, getFieldDecorator };
  const oneItem = ['96%','10%','90%'];
  const threeItem = ['32%','30%','61%'];
  //item宽度样式
  const itemWidth = ['100%','0%','100%'];

  //3 构造发布单位选项的搜索参数
  const orgsSearchParam= { //搜索条件
    filter: { //过滤规则
    },
    size: 1000, //指定每页记录数
    sort: 'o.sortNo,asc' //缺省排序规则
  };

  //4 构造分类选项的搜索参数
  const categorySearchParam = constructCategorySearchParam(record);

	//5 显示UI
	return (
    <Form layout='inline'>
        <StyledHeaderDiv>新能源云南分公司组织机构文件</StyledHeaderDiv>
      <Table>
        <Row>
          <LabelCol>文件名称</LabelCol>
          <Col colSpan={6}>
            <FormItem title='文件名称' type='Input' {...itemProps} width={itemWidth}
              itemKey='name' initialValue={record.name}
            />
          </Col>
          <LabelCol>组织分类</LabelCol>
          <Col colSpan={6}>
          <FormItem title='组织分类' type='Select' {...itemProps} width={itemWidth}
              itemKey='category' initialValue={record.category}
              modelName='institution_orgcategories' labelKey='name' searchParam={orgsSearchParam}
            />
          </Col>
        </Row>
        <Row>
         <LabelCol>机构文件</LabelCol>
          <Col colSpan={12}>
            <FormItem title='机构文件' type='Attachment' {...itemProps} width={itemWidth}
              itemKey='_files' link={service.parseRecordUrl(record)} mode={state.mode}
            />
          </Col>
        </Row>
      </Table>
    </Form>
	);

  //处理机构被选中事件
  function handleOrgOnSelect(value, node) {
    //构造分类搜索参数
    let orgId = node && node.props.dataRef.id;
    let searchParam = constructCategorySearchParam(record, orgId);

    //发送消息让分类选择组件刷新选项数据
    DropdownSelect.queryData({
      controlId: 'category',
      dispatch,
      searchParam,
      modelName: 'institution_categories',
      type: 'Tree',
    });
  }

  //处理机构变化事件
  function handleOrgOnChange(value) {
    record.category = '';

    //情形1：选择了发布机构，onSelect事件已处理，这里就不处理了
    if (value) return;

    //情形2：未选择发布机构，清空分类的选项
    //构造分类搜索参数
    let orgId = -1; 
    let searchParam = constructCategorySearchParam(record, orgId);

    //发送消息让分类选择组件刷新选项数据
    DropdownSelect.queryData({
      controlId: 'category',
      dispatch,
      searchParam,
      modelName: 'institution_categories',
      type: 'Tree',
    });
  }

  //构造分类搜索参数
  function constructCategorySearchParam(record, orgId) {
    //分类所属机构的id
    let org = service.getRecordLinkAttr(record, 'publishedOrg');
    let categoryOrgId = orgId ? orgId : org&&org.id;

    //构造搜索条件
    let where = categoryOrgId ? 'o.org.id='+categoryOrgId : '1=2'

    let categorySearchParam= { //搜索条件
      filter: { //过滤规则
        where: where,
      },
      size: 1000, //指定每页记录数
      sort: 'o.sortNo,asc' //缺省排序规则
    };

    return categorySearchParam;
  }
}

export default InstitutionForm;
