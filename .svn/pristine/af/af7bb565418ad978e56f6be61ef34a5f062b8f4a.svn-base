import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import Layout from './Layout';


//模块路由
const mainRoute = (props) => {
  const {
    match,
  } = props;

  //动态加载路由
  const draftRoute = dynamic({
    app,
    component: () => import('./draft')
});
  const publicationRoute = dynamic({
    app,
    component: () => import('./publication')
});
  const gatherPickRoute = dynamic({
    app,
    component: () => import('./gather/pick')
});
  const gatherSortRoute = dynamic({
    app,
    component: () => import('./gather/sort')
});
  const gatherEditRoute = dynamic({
    app,
    component: () => import('./gather/edit')
});
  const gradeManageGradeRoute = dynamic({
    app,
    component: () => import('./grademanage/grade')
});
  const gradeManageGradeTargetRoute = dynamic({
    app,
    component: () => import('./grademanage/gradetarget')
});
  const gradeManageGradeBaseRoute = dynamic({
    app,
    component: () => import('./grademanage/gradebase')
});
  const statisticRoute = dynamic({
    app,
    component: () => import('./statistic')
});

  const rootPath = match.path;
  return (
    <Layout {...props}>
      <Switch>
        <Redirect exact from={rootPath} to={rootPath + '/draft'} push={true} />
        <Route path={rootPath + '/draft'} component={draftRoute}/>
        <Route path={rootPath + '/publication'} component={publicationRoute}/>
        <Route path={rootPath + '/gather/pick'} component={gatherPickRoute}/>
        <Route path={rootPath + '/gather/sort'} component={gatherSortRoute}/>
        <Route path={rootPath + '/gather/edit'} component={gatherEditRoute}/>
        <Route path={rootPath + '/grademanage/grade'} component={gradeManageGradeRoute}/>
        <Route path={rootPath + '/grademanage/gradetarget'} component={gradeManageGradeTargetRoute}/>
        <Route path={rootPath + '/grademanage/gradebase'} component={gradeManageGradeBaseRoute}/>
        <Route path={rootPath + '/statistic'} component={statisticRoute}/>
      </Switch>
    </Layout>
  )
}

mainRoute.propTypes = {
  match: PropTypes.object
}

export default mainRoute;
