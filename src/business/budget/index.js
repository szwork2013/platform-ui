import React from 'react'
import PropTypes from 'prop-types'

import {Redirect, Route, Switch} from 'dva/router';
import dynamic from 'dva/dynamic';
import Layout from './Layout';
import {modelRegister} from 'utils';

import itemrealdataUnitMyModel from './report/itemrealdata/unit/my/model';
modelRegister(itemrealdataUnitMyModel);

import numberrelationModel from './config/numberrelation/model';
modelRegister(numberrelationModel);

import independentorgModel from './config/independentorg/model';
modelRegister(independentorgModel);


const mainRoute = (props) => {
  const {match} = props;

  //动态加载路由
  const itemrealdataUnitMyRoute = dynamic({
    app,
    component: () => import('./report/itemrealdata/unit/my')
  });

  const yeardemandCompanyRoute = dynamic({
    app,
    component: () => import('./report/yeardemand/company/my')
  });

  const yeardemandAllUnitRoute = dynamic({
    app,
    component: () => import('./report/yeardemand/unit/all')
  });

  const yeardemandMyUnitRoute = dynamic({
    app,
    component: () => import('./report/yeardemand/unit/my')
  });
  const yearregularCompanyRoute = dynamic({
    app,
    component: () => import('./report/yearregular/company/my')
  });

  const yearregularAllUnitRoute = dynamic({
    app,
    component: () => import('./report/yearregular/unit/all')
  });

  const yearregularMyUnitRoute = dynamic({
    app,
    component: () => import('./report/yearregular/unit/my')
  });

  const yeardemandAllChargeRoute = dynamic({
    app,
    component: () => import('./report/yeardemand/charge/all')
  });

  const yeardemandMyChargeRoute = dynamic({
    app,
    component: () => import('./report/yeardemand/charge/my')
  });

  const yeardemandAlldDeptRoute = dynamic({
    app,
    component: () => import('./report/yeardemand/dept/all')
  });

  const yeardemandMydDeptRoute = dynamic({
    app,
    component: () => import('./report/yeardemand/dept/my')
  });
  const yearresolveCompanyRoute = dynamic({
    app,
    component: () => import('./report/yearresolve/company/my')
  });  
  const yearresolveMyUnitRoute = dynamic({
    app,
    component: () => import('./report/yearresolve/unit/my')
  });
  const yearresolveAllUnitRoute = dynamic({
    app,
    component: () => import('./report/yearresolve/unit/all')
  });   
  const yearresolveMyChargeRoute = dynamic({
    app,
    component: () => import('./report/yearresolve/charge/my')
  });
  const yearresolveAllChargeRoute = dynamic({
    app,
    component: () => import('./report/yearresolve/charge/all')
  });  
  const monthlydemandCompanyRoute = dynamic({
    app,
    component: () => import('./report/monthlydemand/company/my')
  });

  const monthlydemandAllUnitRoute = dynamic({
    app,
    component: () => import('./report/monthlydemand/unit/all')
  });

  const monthlydemandMyUnitRoute = dynamic({
    app,
    component: () => import('./report/monthlydemand/unit/my')
  });

  const monthlydemandAllChargeRoute = dynamic({
    app,
    component: () => import('./report/monthlydemand/charge/all')
  });

  const monthlydemandMyChargeRoute = dynamic({
    app,
    component: () => import('./report/monthlydemand/charge/my')
  });

  const monthlydemandAlldDeptRoute = dynamic({
    app,
    component: () => import('./report/monthlydemand/dept/all')
  });

  const monthlydemandMydDeptRoute = dynamic({
    app,
    component: () => import('./report/monthlydemand/dept/my')
  });
  const monthlyfunddemandCompanyRoute = dynamic({
    app,
    component: () => import('./report/monthlyfunddemand/company/my')
  });

  const monthlyfunddemandAllUnitRoute = dynamic({
    app,
    component: () => import('./report/monthlyfunddemand/unit/all')
  });

  const monthlyfunddemandMyUnitRoute = dynamic({
    app,
    component: () => import('./report/monthlyfunddemand/unit/my')
  });
  const monthlyfunddemandAlldDeptRoute = dynamic({
    app,
    component: () => import('./report/monthlyfunddemand/dept/all')
  });

  const monthlyfunddemandMydDeptRoute = dynamic({
    app,
    component: () => import('./report/monthlyfunddemand/dept/my')
  });
  const budgetSheetRoute = dynamic({
    app,
    component: () => import('./config/sheet')
  });
  const budgetItemRoute = dynamic({
    app,
    component: () => import('./config/item')
  });
  const budgetRepresentRoute = dynamic({
    app,
    component: () => import('./config/represent')
  });
  const budgetOrgMatchRoute = dynamic({
    app,
    component: () => import('./config/orgmatch')
  });
  const budgetItemChargeRoute = dynamic({
    app,
    component: () => import('./config/itemcharge')
  });
  const budgetSheetGroupRoute = dynamic({
    app,
    component: () => import('./config/sheetgroup')
  });
  const budgetNumbeRrelationRoute = dynamic({
    app,
    component: () => import('./config/numberrelation')
  });
  const budgetIndependentorgRoute = dynamic({
    app,
    component: () => import('./config/independentorg')
  });
  const reportAnalyseRoute = dynamic({
    app,
    component: () => import('./report/analyse/route')
  });

  const rootPath = match.path;
  return (
    <Layout {...props}>
      <Switch>
        <Redirect
          exact
          from={rootPath}
          to={rootPath + '/report/yeardemand'}
          push={true}/>
        <Route
          path={rootPath + '/report/yeardemand/company/my'}
          component={yeardemandCompanyRoute}/>
        <Route
          path={rootPath + '/report/itemrealdata/unit/my'}
          component={itemrealdataUnitMyRoute}/>
        <Route
          path={rootPath + '/report/yeardemand/unit/my'}
          component={yeardemandMyUnitRoute}/>
        <Route
          path={rootPath + '/report/yeardemand/unit/all'}
          component={yeardemandAllUnitRoute}/>
        <Route
          path={rootPath + '/report/yeardemand/charge/all'}
          component={yeardemandAllChargeRoute}/>
        <Route
          path={rootPath + '/report/yeardemand/charge/my'}
          component={yeardemandMyChargeRoute}/>
        <Route
          path={rootPath + '/report/yeardemand/dept/all'}
          component={yeardemandAlldDeptRoute}/>
        <Route
          path={rootPath + '/report/yearresolve/company/my'}
          component={yearresolveCompanyRoute}/>          
        <Route
          path={rootPath + '/report/yearresolve/unit/my'}
          component={yearresolveMyUnitRoute}/>
        <Route
          path={rootPath + '/report/yearresolve/unit/all'}
          component={yearresolveAllUnitRoute}/>  
        <Route
          path={rootPath + '/report/yearregular/company/my'}
          component={yearregularCompanyRoute}/>          
        <Route
          path={rootPath + '/report/yearregular/unit/my'}
          component={yearregularMyUnitRoute}/>
        <Route
          path={rootPath + '/report/yearregular/unit/all'}
          component={yearregularAllUnitRoute}/>                   
        <Route
          path={rootPath + '/report/yearresolve/charge/my'}
          component={yearresolveMyChargeRoute}/>
        <Route
          path={rootPath + '/report/yearresolve/charge/all'}
          component={yearresolveAllChargeRoute}/>
        <Route
          path={rootPath + '/report/yeardemand/dept/my'}
          component={yeardemandMydDeptRoute}/>
        <Route path={rootPath + '/report/analyse'} component={reportAnalyseRoute}/>

        <Route path={rootPath + '/config/sheet'} component={budgetSheetRoute}/>
        <Route path={rootPath + '/config/item'} component={budgetItemRoute}/>
        <Route path={rootPath + '/config/numberrelation'} component={budgetNumbeRrelationRoute}/>
        <Route path={rootPath + '/config/represent'} component={budgetRepresentRoute}/>
        <Route path={rootPath + '/config/orgmatch'} component={budgetOrgMatchRoute}/>
        <Route path={rootPath + '/config/itemcharge'} component={budgetItemChargeRoute}/>
        <Route path={rootPath + '/config/sheetgroup'} component={budgetSheetGroupRoute}/>
        <Route path={rootPath + '/config/independentorg'} component={budgetIndependentorgRoute}/>
        <Route
          path={rootPath + '/report/monthlydemand/company/my'}
          component={monthlydemandCompanyRoute}/>
        <Route
          path={rootPath + '/report/monthlydemand/unit/my'}
          component={monthlydemandMyUnitRoute}/>          
        <Route
          path={rootPath + '/report/monthlydemand/unit/all'}
          component={monthlydemandAllUnitRoute}/>
        <Route
          path={rootPath + '/report/monthlydemand/charge/all'}
          component={monthlydemandAllChargeRoute}/>
        <Route
          path={rootPath + '/report/monthlydemand/charge/my'}
          component={monthlydemandMyChargeRoute}/>
        <Route
          path={rootPath + '/report/monthlydemand/dept/all'}
          component={monthlydemandAlldDeptRoute}/>
          <Route
          path={rootPath + '/report/monthlydemand/dept/my'}
          component={monthlydemandMydDeptRoute}/> 
          <Route
          path={rootPath + '/report/monthlyfunddemand/company/my'}
          component={monthlyfunddemandCompanyRoute}/>
        <Route
          path={rootPath + '/report/monthlyfunddemand/unit/my'}
          component={monthlyfunddemandMyUnitRoute}/>          
        <Route
          path={rootPath + '/report/monthlyfunddemand/unit/all'}
          component={monthlyfunddemandAllUnitRoute}/>
        <Route
          path={rootPath + '/report/monthlyfunddemand/dept/all'}
          component={monthlyfunddemandAlldDeptRoute}/>
          <Route
          path={rootPath + '/report/monthlyfunddemand/dept/my'}
          component={monthlyfunddemandMydDeptRoute}/>
      </Switch>
    </Layout>
  )
}
mainRoute.propTypes = {
  match: PropTypes.object
}

export default mainRoute;

