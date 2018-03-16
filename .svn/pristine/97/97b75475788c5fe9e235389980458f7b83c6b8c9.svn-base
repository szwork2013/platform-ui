import React from 'react';

import {ModuleLayout} from 'components';

const menuItems = [
  {
    path: 'todo/donelink',
    icon: 'check-circle-o',
    title: '已办事项'
  },
  {
    path: 'operatingguide',
    icon: 'question',
    title: '操作指引',
    expanded: true,
  },
];

const Layout = (props) => {
  //单独定义待办事项的菜单，设置未处理待办事项个数徽标
  const {model:{viewData}} = props;
  let todoCount = 0;

  if (viewData&&viewData[0]&&viewData[0].page) {
    todoCount = viewData[0].page.totalElements;
  }

  let todoMenuItem = {
    path: 'todo/todolink',
    icon: 'solution',
    title: '待办事项',
    badgeCount: todoCount,
  }

  return (<ModuleLayout trigger siderTitle='常用功能' siderIcon='home' menu={[todoMenuItem, ...menuItems]} {...props}/>)
}

import {connect} from 'dva';
export default connect(({todo_link}) => ({model: todo_link}))(Layout);
