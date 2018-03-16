import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';

import {
  AppLayout,
  AppTabs,
} from 'components';

import LoginLayout from '../../login';

import service from 'service';

//定义模块导航菜单
const menuItems = [
  {
    path: 'main',
    icon: 'home',
    title: '主页'
  },
  {
    path: 'template',
    icon: 'file',
    title: '模板'
  },
  {
    path: 'workflow',
    icon: 'fork',
    title: '工作流'
  },
  {
    path: 'business',
    icon: 'login',
    title: '业务系统'
  },
];

const SysadminLayout = (props) => {
  //解构参数
  const {
    children,
    match,
    location,
  } = props;

  //定义菜单参数
  const menuProps = {
    defaultPath: location.pathname, //缺省路径
    rootPath: match.path, //根路径
    items: menuItems,
  }

  const defaultTab = (
    <AppLayout key='SysadminAppLayout' children={props.children}
      moduleMenu={<AppLayout.ModuleMenu {...menuProps} />}
    />
  );

  //如果不是管理员，则替换为登录界面
  const webapp = service.isAdmin() ?
    <AppTabs key={'SysadminAppTabs'} defaultTab={defaultTab} />
  :
    <LoginLayout />

  return webapp;
}

export default SysadminLayout;
