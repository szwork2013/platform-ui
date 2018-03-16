import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'dva';
import {Redirect, Route, Switch} from 'dva/router';
import dynamic from 'dva/dynamic';

import Layout from './Layout';

const mainRoute = (props) => {
  //解构参数
  const {
    match
  } = props;

  //动态加载路由
  const excelRoute = dynamic({
    app,
    models:() => [import('./excel/model')],
    component: () => import('./excel')
  });

  const rootPath = match.path;
  return (
    <Layout {...props}>
      <Switch>
        <Redirect exact from={rootPath}  to={rootPath+'/excel'} push={true}/>
        <Route path={rootPath+'/excel'} component={excelRoute} />
      </Switch>
    </Layout>
  )
}

mainRoute.propTypes = {
  webapp: PropTypes.object,
  match: PropTypes.object
}

export default mainRoute;
