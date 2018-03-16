import {Col, Button, Icon} from 'antd';
import { Form as FormLayout, FormItem } from 'components';

const FormContainer = FormLayout.FormContainer;
const Form = FormContainer.StyledForm;
const Row = FormContainer.StyledRow;

import service from 'service';

//选项设置表单
const OptionsForm = ( props ) => {
  //解构参数
  let {
    record,
    modelName,
    dispatch,
  } = props;

  //构造FormItem的公共参数
  const { getFieldDecorator, setFieldsValue } = props.form;
  const oneItemWidth = ['96%','10%','90%'];
  const itemProps = { 
    canEdit: true, getFieldDecorator,setFieldsValue, width: oneItemWidth,
    controlProps:{allowClear:true}, required: false,
  };

  return (
    <div>
      {renderRangeSelect()}
    </div>
  )

  //构造范围选择组件
  function renderRangeSelect() {
    //1 初始化选项
    let rangeOptions = [
      {'id':'company','name':'公司整体'},
      {'id':'fundSource','name':'场站/项目'},
      //{'id':'dept','name':'部门自行管理/公司统筹'},
    ];

    //2 构造使用权限名称
    let usePermission = '公司统筹';
    if (record.usePermission==1) { //部门自行管理，构造部门名称
      if (record.createdByFullName) {
        usePermission = record.createdByFullName.split('/')[1];
      }
      else {
        usePermission = service.userInfo.user.org.orgName;
      }
    }
    //rangeOptions[0].name = usePermission;

    //3 获取项目或者场站名称
    let fundSource = service.getRecordLinkAttr(record, 'fundSource')||record._fundSource;
    if (fundSource) {
      rangeOptions[1].name = fundSource.name;
    }

    return(
      <FormItem type='RadioGroup' {...itemProps} width={oneItemWidth}
        title='' itemKey='range' list={rangeOptions}
        initialValue={'company'} onChange={handleRangeChange}
      />
    );
  }

  //处理数据范围变化
  function handleRangeChange(e) {
    let range = e.target.value;
    record._historyExecutionsRange = range;
    //发送消息初始化历史数据
    dispatch({
      type: modelName+'/queryHistory',
      payload: {record}
    })
  }

}

//表单字段被修改事件处理
const onFieldsChange = (props, fields) => {
}

import { Form as AntdForm } from 'antd';
const antdOptionsForm = AntdForm.create({
  onFieldsChange: onFieldsChange
})(OptionsForm);

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect()(antdOptionsForm);