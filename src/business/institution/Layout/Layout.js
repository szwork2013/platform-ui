import { ModuleLayout } from 'components';

const menuItems = [
  {
    path: 'institutionChm',
    icon: 'file-pdf',
    title: '制度汇编',
  },
  {
    path: 'published',
    icon: 'bars',
    title: '已发布制度',
    //permission: 'institution.admin',
  },
  {
    path: 'draft',
    icon: 'edit',
    title: '制度草稿',
    permission: 'institution.admin',
  },
  {
    path: 'introduceOrg',
    icon: 'bars',
    title: '组织机构文件',
    permission: 'institution.admin',
  },
  {
    path: 'category',
    icon: 'fork',
    title: '制度分类',
    permission: 'institution.admin',
  },
  {
    path: 'orgcategory',
    icon: 'fork',
    title: '组织分类',
    permission: 'institution.admin',
  },
];

const Layout = (props) => {
  return (
    <ModuleLayout trigger siderTitle='制度' siderIcon='file-text' menu={menuItems} {...props} />
  )
}

export default Layout;


