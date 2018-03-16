import { Form } from 'components'

import modelDefinition from '../model';

const FormComponent = (props) => {
  //取得模型名称
  const modelName = modelDefinition.namespace;

  const actionBar = {
    save: true, //显示保存按钮
    close: true, //显示关闭按钮
  };

  //表单配置
  const embeddedForm=[
    { row: 1, type:'Input', title:'序号', key:'sortNo' },
    { row: 3, type:'TreeSelect', title:'上级分类', key:'parent', required: false,
      labelKey:'name', modelName: modelName, searchParam:{ //搜索条件
        filter: {
        },
        size: 1000, //指定每页记录数
        sort: 'o.sortNo,asc', //缺省排序规则
      },
      controlProps: {treeDefaultExpandAll:true},
    },
   {row: 4, type:'Input', title:'组织分类名称', key:'name'},
  ];

   //显示UI
  return (
    <Form actionBar={actionBar} embeddedForm={embeddedForm} {...props}>
    </Form>
  );
}

import { connect } from 'dva';
export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.institution_orgcategories})
)(FormComponent);
