import {connect} from 'dva';
import {message} from 'antd'
import {Form as  FormLayout} from 'components'
import Form from './EmbeddedForm';
import wfservice from 'wfservice';
import service from 'service';

const FormComponent = (props) => {

  const {model} = props;
  const {record} = model;

  //获取表单能否编辑
  let isNew = FormLayout.isNewRecord(model);
  let formCanEdit = isNew || wfservice.authz(record, ['formEdit']);

  let expenditureExcution = service.getRecordLinkAttr(record, 'expenditureExcution');
  //当从立项新增报账的时候，立项信息在execution字段上
  if (!expenditureExcution) {
    expenditureExcution = record.execution;
  }

  //获取预算申请的金额
  let budget = expenditureExcution.budget;
  //合同的话以中标价格为准。
  if (expenditureExcution.type == 2) {
    budget = expenditureExcution.biddingresultMoney;
    if (expenditureExcution.settlement && expenditureExcution.settlement > 0)
      budget = expenditureExcution.settlement;
    if (expenditureExcution.approve && expenditureExcution.approve > 0)
      budget = expenditureExcution.approve;
  }

  //如果已经支付完成，就不能在发起支付了
  let canNew = true;
  let payMoney = getPayMoney(record.payments, record);
  if (budget && isNew && payMoney >= budget) {
    message.warn('支付金额超过立项申请金额，不能发起支付了！')
    canNew = false;
  }

  const actionBar = {
    edit: true, //显示编辑按钮
    save: isNew ? canNew : formCanEdit, //显示保存按钮
    close: true, //显示关闭按钮
    print: true,
    templateNo: expenditureExcution.type == 2 ? 'contract' : 'expense',
  };

  //显示UI
  return (
    <FormLayout actionBar={actionBar}
                embeddedForm={<Form canNew={canNew} payMoney={payMoney} formCanEdit={formCanEdit}/>} {...props}>
    </FormLayout>
  );


  //获取总的的金额
  function getPayMoney(recordArray, record) {
    if (!record || !record.payments || !Array.isArray(record.payments)) return 0;
    let payMoney = 0;
    recordArray.forEach((item) => {
      let recordHref = service.parseRecordUrl(record);
      if (recordHref != service.parseRecordUrl(item)) {
        payMoney = payMoney + item.paymentMoney;
      }
    })
    return payMoney;
  }

}

export default connect(({apptabs, loading}) =>
  ({apptabs, loading: loading.models.expenditure_payments})
)(FormComponent);
