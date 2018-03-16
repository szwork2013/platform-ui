import React from 'react'
import {Redirect, Route, Switch} from 'dva/router';
import {modelRegister} from 'utils';
import dynamic from "dva/dynamic";
import model from './company/model';

modelRegister(model);

const ReportRoute = (props) => {
  const {match} = props;
  const rootPath = match.path;

  const company = dynamic({
    app,
    component: () => import('./company')
  });

  return (
    <Switch>
      <Redirect
        exact
        from={rootPath}
        to={rootPath + '/company'}
        push={true}/>
      <Route path={rootPath + '/company'} component={company}/>
    </Switch>
  )
}

export default ReportRoute;

