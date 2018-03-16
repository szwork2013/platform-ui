import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';


//模块路由
const mainRoute = (props) => {
  const {
    match,
  } = props;

  //动态加载路由

 //物资领用

  //劳保用品
  const drawLabourRoute = dynamic({
    app,
    component: () => import('./laboursupplies')
});
  const drawLabourAllRoute = dynamic({
    app,
    component: () => import('./laboursupplies/AllDepartmentView')
});
  const drawLabourInventoryRoute = dynamic({
    app,
    component: () => import('./laboursupplies/inventory')
});


  const rootPath = match.path;
  return (
      <Switch>
        <Redirect exact from={rootPath} to={rootPath + '/laboursupplies/all'} push={true} />

        <Route path={rootPath + '/laboursupplies/all'} component={drawLabourAllRoute} />
        <Route path={rootPath + '/laboursupplies/department'} component={drawLabourRoute} />
        <Route path={rootPath + '/laboursupplies/inventory'} component={drawLabourInventoryRoute} />

      </Switch>
  )
}

mainRoute.propTypes = {
  match: PropTypes.object
}

export default mainRoute;
