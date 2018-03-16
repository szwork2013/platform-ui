import { ModuleLayout } from 'components';

//导航菜单定义
const menuItems = [
  { path: 'orgs', icon: 'team', title: '机构'},
  { path: 'users', icon: 'user', title: '人员', expanded: true,
    children:[
      { path: 'treeview', icon: 'fork', title: '按机构树' },
      { path: 'listview', icon: 'bars', title: '列表' },
    ]  
  },
  { path: 'roles', icon: 'skin', title: '角色' },
  { path: 'permissions', icon: 'safety', title: '权限' },
];

const Layout = ( props ) => {
  return (
    <ModuleLayout trigger siderTitle='机构人员' siderIcon='home' menu={menuItems} {...props} />
  )
}

export default Layout;
