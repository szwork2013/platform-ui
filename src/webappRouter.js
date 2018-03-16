import React from 'react';
import {Redirect, Route, Router, Switch} from 'dva/router';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';

import service from 'service';

//应用系统路由
export default function ({app, history}) {
  //动态加载路由
  const loginRoute = dynamic({
    app,
    component: () => import('./login')
  });

  const sysadminRoute = dynamic({
    app,
    component: () => import('./sysadmin')
  });

  const businessRoute = dynamic({
    app,
    component: () => import('./business')
  });

  //计算缺省路由
  const defaultRoute = service.isAdmin() ? '/sysadmin' :
    (service.isAuthc() ? '/business' : '/login');

  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Redirect exact from="/" to={defaultRoute} push={true}/>
          <Route path='/login' component={loginRoute}/>
          <Route path='/sysadmin' component={sysadminRoute}/>
          <Route path='/business' component={businessRoute}/>
        </Switch>
      </Router>
    </LocaleProvider>
  )
}
