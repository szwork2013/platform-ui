import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from 'dva/router';
import dynamic from 'dva/dynamic';

import Layout from './Layout';

const WorkFlowRoute = (props) => {
  //解构参数
  const {
    match
  } = props;

  //动态加载路由
  const historyRoute = dynamic({
    app,
    models:() => [import('./history/model')],
    component: () => import('./history')
  });

  const instanceRoute = dynamic({
    app,
    models:() => [import('./instance/model')],
    component: () => import('./instance')
  });
  const todoRoute = dynamic({
    app,
    models:() => [import('./todo/model')],
    component: () => import('./todo')
  });

  const rootPath = match.path;
  return (
    <Layout {...props}>
      <Switch>
        <Redirect exact from={rootPath}  to={rootPath+'/instance'} push={true}/>
        <Route path={rootPath+'/instance'} component={instanceRoute} />
        <Route path={rootPath+'/history'} component={historyRoute} />
        <Route path={rootPath+'/todo'} component={todoRoute} />
      </Switch>
    </Layout>
  )
}

WorkFlowRoute.propTypes = {
  webapp: PropTypes.object,
  match: PropTypes.object
}

export default WorkFlowRoute;
