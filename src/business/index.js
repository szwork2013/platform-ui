import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';

import AppLayout from './Layout';

//注册公用模型
import { modelRegister } from 'utils';
//机构
import orgModel from '../sysadmin/main/orgs/model';
modelRegister(orgModel);
//人员
import userModel from '../sysadmin/main/users/model';
modelRegister(userModel);
//角色
import roleModel from '../sysadmin/main/roles/model';
modelRegister(roleModel);

import itemModel from './budget/config/item/model';
modelRegister(itemModel);

import reportModel from './budget/report/model';
modelRegister(reportModel);

import reportViewsmodel from './budget/common/ReportViews/model';
modelRegister(reportViewsmodel);

import reportViewmodel from './budget/common/ReportViews/ReportView/model';
modelRegister(reportViewmodel);

//业务系统路由
const businessRoute = (props) => {
  //解构参数
  const {
    match,
  } = props;

  //动态加载路由
  const homepageRoute = dynamic({
    app,
    component: () => import('./homepage')
  });
  const publicationRoute = dynamic({
    app,
    component: () => import('./publication')
});
  const materialRoute = dynamic({
    app,
    component: () => import('./material')
  });
  //预算组件路由
  const budgetRoute = dynamic({
    app,
    component: () => import('./budget')
  });
  const institutionRoute = dynamic({
    app,
    component: () => import('./institution')
  });

  const rootPath = match.path;

  return (
    <AppLayout {...props} key={'BusinessLayout'}>
      <Switch>
        <Redirect exact from={rootPath} to={rootPath + '/homepage'} push={true} />
        <Route path={rootPath + '/homepage'} component={homepageRoute} />
        <Route path={rootPath + '/publication'} component={publicationRoute} />
        <Route path={rootPath + '/material'} component={materialRoute} />
        //预算路由，删老系统路由的请勿删除
        <Route path={rootPath + '/budget'} component={budgetRoute} />
        <Route path={rootPath + '/institution'} component={institutionRoute} />
        <Redirect exact from={rootPath + '/sysadmin'} to={'/sysadmin'} push={true} />
      </Switch>
    </AppLayout>
  )
};

businessRoute.propTypes = {
  match: PropTypes.object
}

export default businessRoute;

//注册模块模型：待办事项需要打开的模块的所有模型需要在这里注册
//待办事项
import todolinkModel from './todo/todolink/model';
modelRegister(todolinkModel);
//已办事项
import donelinkModel from './todo/donelink/model';
modelRegister(donelinkModel);

//制度
import institutionModel from './institution/institution/model';
modelRegister(institutionModel);
import institutionCategoryModel from './institution/category/model';
modelRegister(institutionCategoryModel);

//2017-12-04 zyk  数据补录模型注册
import budget_itemModel from './budget/config/item/model';
modelRegister(budget_itemModel);
import budget_representModel from './budget/config/represent/model';
modelRegister(budget_representModel);
import budget_orgmatchModel from './budget/config/orgmatch/model';
modelRegister(budget_orgmatchModel);
import budget_itemchargeModel from './budget/config/itemcharge/model';
modelRegister(budget_itemchargeModel);
import budget_sheetModel from './budget/config/sheet/model';
modelRegister(budget_sheetModel);
import budget_sheetgroupModel from './budget/config/sheetgroup/model';
modelRegister(budget_sheetgroupModel);

//物资模型注册
import modelDepartmentPlan from './material/itconsumable/department/model';
modelRegister(modelDepartmentPlan);
import modelDemandPlan from './material/itconsumable/company/model';
modelRegister(modelDemandPlan);
import modelPurchasePlan from './material/itconsumable/purchase/model';
modelRegister(modelPurchasePlan);
import modelSupplier from './material/supplier/model';
modelRegister(modelSupplier);
import modelMaterial from './material/material/model';
modelRegister(modelMaterial);
import modelPlanItems from './material/common/PlanItems/model';
modelRegister(modelPlanItems);
import modelDrawLabour from './material/draw/laboursupplies/model';
modelRegister(modelDrawLabour);
import modelInventory from './material/draw/laboursupplies/inventory/model';
modelRegister(modelInventory);
import modelStatistic from './material/statistic/model';
modelRegister(modelStatistic);

//政务信息
import gradeTargetModel from './publication/grademanage/gradetarget/model';
modelRegister(gradeTargetModel);
import draftModel from './publication/draft/model';
modelRegister(draftModel);
import publicationModel from './publication/publication/model';
modelRegister(publicationModel);
