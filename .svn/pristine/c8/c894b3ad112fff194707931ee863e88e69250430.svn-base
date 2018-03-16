import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import { AppLayout, AppTabs } from 'components';
import LoginLayout from '../../login';
import service from 'service';

const BusinessLayout = (props) => {
  //解构参数
  const {
    children,
    match,
    location,
    dispatch
  } = props;
  //定义模块导航菜单
  const menuItems = [
    {
      path: 'homepage',
      icon: 'home',
      title: '主页'
    }, {
      path: 'publication',
      icon: 'shop',
      title: '政务信息'
    }, {
      path: 'material',
      icon: 'shop',
      title: '物资'
    }, {
      path: 'budget',
      icon: 'shop',
      title: '预算管理'
    }, {
      path: 'institution',
      icon: 'file-text',
      title: '制度'
    },{
      path: 'sysadmin',
      icon: 'login',
      title: '系统管理',
      permission: 'sys.admin'
    }
  ];
  //定义菜单参数
  const menuProps = {
    defaultPath: location.pathname, //缺省路径
    rootPath: match.path, //根路径
    items: menuItems
  }

  const defaultTab = (
    <AppLayout
      key='BusinessAppLayout'
      children={props.children}
      moduleMenu={< AppLayout.ModuleMenu {
        ...menuProps
      } />} />
  );

  //如果未登录，则替换为登录界面
  const webapp = service.isAuthc()
    ? <AppTabs key={'BusinessAppTabs'} defaultTab={defaultTab} />
    : <LoginLayout />

  return webapp;
}
export default connect()(BusinessLayout);
