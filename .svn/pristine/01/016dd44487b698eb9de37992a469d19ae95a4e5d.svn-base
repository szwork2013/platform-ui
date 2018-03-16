import React from 'react'
import PropTypes from 'prop-types'

import {Redirect, Route, Switch} from 'dva/router';
import dynamic from 'dva/dynamic';
import Layout from './Layout';

import service from 'service';

//模块路由
const mainRoute = (props) => {
  const {
    match,
  } = props;

  //动态加载路由
const operatingGuideRoute = dynamic({ //2017-12-04 zyk 操作指引
    app,
    component: () => import('../operatingguide')
  });
  const todoLinkRoute = dynamic({
    app,
    component: () => import('../todo/todolink')
  });

  const doneLinkRoute = dynamic({
    app,
    component: () => import('../todo/donelink')
  });

  const rootPath = match.path;
  return (
    <Layout {...props}>
      <Switch>
        <Redirect exact from={rootPath} to={rootPath + '/todo/todolink'} push={true}/>
        <Route path={rootPath + '/todo/todolink'} component={todoLinkRoute}/>
        <Route path={rootPath + '/todo/donelink'} component={doneLinkRoute}/>
        <Route path={rootPath+'/operatingguide'} component={operatingGuideRoute} />
      </Switch>
    </Layout>
  )
}

mainRoute.propTypes = {
  match: PropTypes.object
}

export default mainRoute;
