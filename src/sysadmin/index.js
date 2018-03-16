import React from 'react';
import PropTypes from 'prop-types';

import {Redirect, Route, Switch} from 'dva/router';
import dynamic from 'dva/dynamic';
import {routerRedux} from 'dva/router';

import Layout from './Layout';

//注册公用模型
import {modelRegister} from 'utils';
//机构
import orgModel from './main/orgs/model';
modelRegister(orgModel);
//人员
import userModel from './main/users/model';
modelRegister(userModel);
//角色
import roleModel from './main/roles/model';
modelRegister(roleModel);

//系统管理路由
const sysadminRoute = (props) => {
  //解构参数
  const {
    match
  } = props;

	//动态加载路由
	const mainRoute = dynamic({
    app,
    component: () => import('./main')
  });

  const workflowRoute = dynamic({
    app,
    component: () => import('./workflow')
  });

  const templateRoute = dynamic({
    app,
    component: () => import('./template')
  });

  const rootPath = match.path;
  return (
    <Layout {...props} key={'SysAdminLayout'}>
      <Switch>
        <Redirect exact from={rootPath}  to={rootPath+'/main'} push={true}/>
        <Route path={rootPath+'/main'} component={mainRoute} />
        <Route path={rootPath+'/workflow'} component={workflowRoute} />
        <Route path={rootPath+'/template'} component={templateRoute} />
        <Redirect exact from={rootPath+'/business'}  to={'/business'} push={true}/>
      </Switch>
    </Layout>
  )
};

sysadminRoute.propTypes = {
  match: PropTypes.object
}

export default sysadminRoute;
