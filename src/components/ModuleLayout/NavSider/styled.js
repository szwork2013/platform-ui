import styled from 'styled-components';
import { Layout, message } from 'antd';

const StyledNavSider = styled(Layout.Sider)`
  //子菜单的颜色
  .ant-menu-submenu > .ant-menu {
    background: #fbfbfb !important;
  }
  .ant-menu-submenu-title {
    color: #0e77ca;
  }
  .ant-menu-item {
    color: #0e77ca;
  }
  .ant-menu-item-selected {
  }
  margin: 1px;
  ${props=>props.className};
`;

const StyledMenuDiv = styled.div`
	${props=>props.height? 'height:'+props.height+'px;':''}
	//折叠时保证子菜单能正常弹出显示
	overflow: ${props=>props.collapsed ? 'inherit':'auto'} !important;
  ${props=>props.className};
`;

export {
	StyledNavSider,
	StyledMenuDiv,
}
