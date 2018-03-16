import { ModuleLayout } from 'components';

//导航菜单定义
const menuItems = [
  { path: 'excel', icon: 'file-excel', title: 'Excel模板'},
];

const Layout = ( props ) => {
  return (
    <ModuleLayout trigger siderTitle='模板' siderIcon='file' menu={menuItems} {...props} />
  )
}

export default Layout;
