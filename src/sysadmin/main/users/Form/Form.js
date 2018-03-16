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

  const {record}=props.model;

  //表单配置userName
  const oneItem = ['96%','10%','58%'];
  const threeItems = ['32%','30%','70%'];
  const embeddedForm=[
    { row: 0, type:'Checkbox', title:'启用', key:'enable' },
    { row: 1, type:'Input', title:'姓名', key:'name', width:threeItems },
    { row: 1, type:'Input', title:'用户名', key:'userName', width:threeItems },
    { row: 1, type:'Input', title:'编码', key:'userCode', width:threeItems, required:false },
    { row: 2, type:'InputNumber', title:'序号', key:'sortNo', width:threeItems },
    { row: 2, type:'Input', title:'重置密码', key:'password', width:threeItems,
      initialValue: '_undefined', required: false, controlProps:{type:'password'} },
    { row: 2, type:'Input', title:'手机号', key:'mobile', width:threeItems,
      required: false },
    { row: 3, type:'TreeSelect', title:'所属机构', key:'org', width:oneItem,
      required: false, treeDefaultExpandAll: false, parentKey: 'parentOrg',
      labelKey:'orgName', modelName:'orgs', searchParam:{ //搜索条件
        filter: {
        },
        size: 1000, //指定每页记录数
        sort: 'o.sortNo,asc' //缺省排序规则
      }
    },
    { row: 4, type:'Select', title:'角色', key:'roles', width:oneItem,
      required: false, multiple: true,
      modelName:'roles', searchParam:{ //搜索条件
        filter:{
        },
        size: 1000, //指定每页记录数
        sort: 'o.sortNo,asc', //缺省排序规则
      }
    },
  ]

	//显示UI
	return (
    <Form actionBar={actionBar} embeddedForm={embeddedForm} {...props}>
    </Form>
	);
}

import { connect } from 'dva';
export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.users})
)(Layout);