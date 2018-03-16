import {message} from 'antd';

import { Form } from 'components'

import service from 'service';

const Layout = (props) => {
  //按钮条配置
  const actionBar = {
    save: true, //显示保存按钮
    saveAndClose: true, //显示保存并关闭按钮
    edit: true, //显示编辑按钮
    close: true, //显示关闭按钮
  };

  const {record, state} = props.model;

  //表单配置
  const orgTypeOptions = [
    {name: '公司', id: 1},
    {name: '部门', id: 2},
    {name: '子公司', id: 3},
    {name: '工作组', id: 4},
    {name: '场站', id: 5},
    {name: '领导', id: 6},
    {name: '其他', id: 99},
  ];

  const embeddedForm=[
    { row: 1, type:'Input', title:'名称', key:'orgName' },
    { row: 2, type:'Input', title:'编码', key:'orgCode', required:false },
    { row: 3, type:'InputNumber', title:'序号', key:'sortNo' },
    { row: 4, type:'TreeSelect', title:'父机构', key:'parentOrg', required: false,
      labelKey:'orgName', modelName:'orgs', searchParam:{ //搜索条件
        filter: {
          joinFetch: true,
        },
        sort: 'o.sortNo,asc',
        size: 1000, //指定每页记录数
       },
      onSelect: (value) => {
        const href = service.parseRecordUrl(record);
        if (href==value) {
          message.error('父机构不能是当前机构！');
        }
      },
    },
    { row: 5, type:'Select', title:'机构类型', key:'type', required: false,
      labelKey:'name', options: orgTypeOptions,
    },
    { row: 6, type:'Attachment', title:'印章附件', key:'seal',required: false,
    },
  ];

	//显示UI
	return (
    <Form actionBar={actionBar} embeddedForm={embeddedForm} {...props}>
    </Form>
	);
}

import { connect } from 'dva';
export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.orgs})
)(Layout);
