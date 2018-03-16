import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import service from 'service';
import Layout from './Layout';
//注册模块模型
import { modelRegister } from 'utils';

import orgcategoryModel from './orgcategory/model';
import introduceorgModel from './introduceorg/model';

modelRegister(orgcategoryModel);
modelRegister(introduceorgModel);
const mainRoute = (props) => {
  //解构参数
  const {
    match
  } = props;

  //动态加载路由
  const categoryRoute = dynamic({
    app,
    component: () => import('./category')
  });
  const postedRoute = dynamic({
    app,
    component: () => import('./institution/PublishedView')
  });
  const draftRoute = dynamic({
    app,
    component: () => import('./institution/DraftView')
  });
  const institutionChmRoute = dynamic({
    app,
    component: () => import('./institution/CHM')
  });
  const orgCategoryRoute = dynamic({
    app,
    component: () => import('./orgcategory')
  });
  const introduceOrgRoute = dynamic({
    app,
    component: () => import('./introduceorg')
  });

  const rootPath = match.path;
  return (
    <Layout {...props}>
      <Switch>
        <Redirect exact from={rootPath} to={rootPath + '/institutionChm'} push={true} />

        <Route path={rootPath + '/published'} component={postedRoute} />

        {service.authz('institution.admin') &&
          <Route path={rootPath + '/draft'} component={draftRoute} />
        }
        {service.authz('institution.admin') &&
          <Route path={rootPath + '/category'} component={categoryRoute} />
        }
        {service.authz('institution.admin') &&
          <Route path={rootPath + '/orgcategory'} component={orgCategoryRoute} />
        }
        {service.authz('institution.admin') &&
          <Route path={rootPath + '/introduceorg'} component={introduceOrgRoute} />
        }
        <Route path={rootPath + '/institutionChm'} component={institutionChmRoute} />
      </Switch>
    </Layout>
  )
}

mainRoute.propTypes = {
  match: PropTypes.object
}

export default mainRoute;