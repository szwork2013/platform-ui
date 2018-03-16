import {Form as  FormLayout } from 'components'
import EmbeddedForm_YearDemandDept from './EmbeddedForm_YearDemandDept';
import EmbeddedForm_YearDemandCharge from './EmbeddedForm_YearDemandCharge';
import EmbeddedForm_YearDemandUnit from './EmbeddedForm_YearDemandUnit';
import EmbeddedForm_YearDemandCompany from './EmbeddedForm_YearDemandCompany';
import EmbeddedForm_YearRegularUnit from './EmbeddedForm_YearRegularUnit';
import EmbeddedForm_YearRegularCompany from './EmbeddedForm_YearRegularCompany';
import EmbeddedForm_YearResolveCharge from './EmbeddedForm_YearResolveCharge';
import EmbeddedForm_YearResolveUnit from './EmbeddedForm_YearResolveUnit';
import EmbeddedForm_YearResolveCompany from './EmbeddedForm_YearResolveCompany';
 class FormComponent extends React.Component{
    componentWillMount() {

    }   
   render(){
    //1 解构参数
      let {
        model, //FormContainer注入：模型
        canEdit = true, //FormContainer注入：是否可编辑
        getFieldDecorator,
        setFieldsValue,
        sheets,
        dispatch,
      } = this.props;
    const { record, state } = model; 
    let Form=<EmbeddedForm_YearDemandCompany/>; 
    if(record.reportType==0&&record.periodType==0&&record.orgLevel==1){
         Form=<EmbeddedForm_YearDemandUnit/>;    
    }   
    if(record.reportType==0&&record.periodType==0&&record.orgLevel==2){
         Form=<EmbeddedForm_YearDemandCharge/>;    
    }   
    if(record.reportType==0&&record.periodType==0&&record.orgLevel==3){
         Form=<EmbeddedForm_YearDemandDept/>;    
    }
    if(record.reportType==1&&record.periodType==0&&record.orgLevel==1){
         Form=<EmbeddedForm_YearRegularUnit/>;    
    }   
    if(record.reportType==1&&record.periodType==0&&record.orgLevel==0){
         Form=<EmbeddedForm_YearRegularCompany/>;    
    }      
    if(record.reportType==2&&record.periodType==0&&record.orgLevel==2){
         Form=<EmbeddedForm_YearResolveCharge/>;    
    }   
    if(record.reportType==2&&record.periodType==0&&record.orgLevel==1){
         Form=<EmbeddedForm_YearResolveUnit/>;    
    }    
    if(record.reportType==2&&record.periodType==0&&record.orgLevel==0){
         Form=<EmbeddedForm_YearResolveCompany/>;    
    }        
    const actionBar = {
      save: true, //显示保存按钮
      close: true, //显示关闭按钮
      buttons:[
          { title:'发布', type:'publish', permission: (record, state) => {
              return record.publishedState&&record.publishedState!=2 ? 'institution.admin' : 'nobody';
          }
          },
          { title:'撤回', type:'tackback', permission: (record, state) => {
              return record.publishedState==2 ? 'institution.admin' : 'nobody';
            },
          }
        ],
     };
    //显示UI
    return (
      <FormLayout actionBar={actionBar} embeddedForm={Form} {...this.props}>

      </FormLayout>
    );
   }
}
import { connect } from 'dva';
export default connect(({apptabs, loading}) =>
  ({apptabs, loading:loading.models.budget_report})
)(FormComponent);
