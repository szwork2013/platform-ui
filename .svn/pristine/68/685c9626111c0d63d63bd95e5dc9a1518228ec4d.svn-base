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
  const orgRoute = dynamic({
    app,
    component: () => import('./orgs')
  });
  const usersTreeViewRoute = dynamic({
    app,
    component: () => import('./users/TreeView')
  });
  const usersListViewRoute = dynamic({
    app,
    component: () => import('./users/ListView')
  });
  const rolesRoute = dynamic({
    app,
    component: () => import('./roles')
  });

  const permissionsRoute = dynamic({
    app,
    models:() => [import('./permissions/model')],
    component: () => import('./permissions')
  });

  const rootPath = match.path;
  return (
    <Layout {...props}>
      <Switch>
        <Redirect exact from={rootPath}  to={rootPath+'/orgs'} push={true}/>
        <Route path={rootPath+'/orgs'} component={orgRoute} />
        <Route path={rootPath+'/users/treeview'} component={usersTreeViewRoute} />
        <Route path={rootPath+'/users/listview'} component={usersListViewRoute} />
        <Route path={rootPath+'/roles'} component={rolesRoute} />
        <Route path={rootPath+'/permissions'} component={permissionsRoute} />
      </Switch>
    </Layout>
  )
}

mainRoute.propTypes = {
  webapp: PropTypes.object,
  match: PropTypes.object
}

export default mainRoute;
