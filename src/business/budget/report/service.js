import service from 'service';
import { message} from 'antd';
import { config} from 'utils';
const { api } = config; //取得RESTful api配置信息

//获取状态的选项
export const getStateOptions = () => {
  return [
    {'id':1, key: 'DRAFT', 'name':'草稿'},
    {'id':2, key: 'BUDGET_CHECK', 'name':'预算检查'},
    {'id':3, key: 'COMPANY_APPROVAL', 'name':'公司审批'},
    {'id':4, key: 'TENDER','name':'招标'},
    {'id':5, key: 'PICKETAGE','name':'定标'},
    {'id':6, key: 'CONTRAC_CHECK','name':'合同审查'},
    {'id':7, key: 'CONTRAC_NO','name':'合同编号'},
    {'id':8, key: 'PAYMENT','name':'支付报销'},
    {'id':9, key: 'END','name':'办结'},
    {'id':0, key: 'ANNUL','name':'废止'},
  ];
}

//状态列的显示文本构造函数
export const colTextRenderOfState = (text, record) => {
  if(!record.state) return '***';
  const options = getStateOptions();
  const option = options.find((r) => r.key==text);
  if (option) {
    return option.name;
  }
  else {
    return '***';
  }
}

//计算项目名称
export const computeProjectName = (record) => {
  const userName = service.userInfo.user.name;

  let ret="";
  if(record.budgetSource.indexOf("差旅费")<0&&record.budgetSource.indexOf("业务招待费")<0){
    return record.projectName; //不是差旅费或业务招待费处理
  }
   
  //差旅费选择处理
  if(record.budgetSource.indexOf("差旅费")>=0){
    let _travel_startTime=record._travel_startTime==undefined?'':(record._travel_startTime.format('YYYY-MM-DD'));
    let _travel_endTime=record._travel_endTime==undefined?'':record._travel_endTime.format('YYYY-MM-DD');
    let _place=record._place==undefined?'':record._place;
    let _reason=record._reason==undefined?'':record._reason;
    let _trasportation=record._trasportation==undefined?'':record._trasportation;
    
    //校验处理
    if(_travel_startTime!=''&&_travel_endTime!=''&&_place!=''&&_reason!=''&&_trasportation!=''){
      if(_travel_startTime>_travel_endTime){
        message.error("结束时间需晚于开始时间！");
        return;
      }

      ret=userName+'/'+_travel_startTime+'至'+_travel_endTime+'/'+_place+'/'+_reason+'/交通方式:'+_trasportation;
    }
    else {
      message.error("所有项目都需要填写！");
      return;
    }

    return ret;
  }

  //业务招待费选择处理
  if(record.budgetSource.indexOf("业务招待费")>=0){
    let _conference_startTime=record._conference_startTime==undefined?'':(record._conference_startTime.format('YYYY-MM-DD'));
    let _conference_endTime=record._conference_endTime==undefined?'':(record._conference_endTime.format('YYYY-MM-DD'));
    let _department=record._department==undefined?'':record._department;
    let _withPeoples=record._withPeoples==undefined?'':record._withPeoples;
    let _people=record._people==undefined?'':record._people;
    let _peopleType=record._peopleType==undefined?'':record._peopleType;
    let _peopleNum=record._peopleType==undefined?'':record._peopleNum;
    let _diningNum=record._diningNum==undefined?'':record._diningNum;
    let _standard=record._standard==undefined?'':record._standard;
    
    //校验处理
    if(_conference_startTime!=''&&_conference_endTime!=''&&_department!=''&&_withPeoples!=''&&_people!=''&&_peopleType!=''&&_peopleNum!=''&&_diningNum!=''&&_standard!=''){
      if(_conference_startTime>_conference_endTime){
        message.error("结束时间需晚于开始时间！");
        return;
      }
      if(_peopleNum>3){
        if(_peopleNum/3<_withPeoples){//陪同人数必须少于招待人数的1/3;
          message.error("陪同人数必须少于招待人数的1/3！");
          return;
        }
      }
      if(_peopleNum<=3){
        if(_withPeoples>1){
          message.error("陪同人数必须少于招待人数的1/3！");
          return;
        }
      }  
     
     ret= _conference_startTime+'至'+_conference_endTime+'/'+_department+'/'+_withPeoples+'人/'+_people+'/'+_peopleType+'/'+_peopleNum+'人/'+_diningNum+'餐/'+_standard;//构造业务招待费明细
     ret=ret.replace(/\人人/g,'人').replace(/\餐餐/g,'餐');
    } else{
      message.error("所有项目都需要填写！");
      return;
    }   
  }
  return ret;
}

//构造预算来源
export const constructBudgetSource = ({fundSource, year, category, expenditureType}) => {
  fundSource = fundSource || {};
  category = category || {};
  year = expenditureType=='operating' ? '/'+year+'/' : '/';

  let budgetSource = (fundSource.budgetSourceName||'')+year+(category.fullName||'');
  return budgetSource;
}