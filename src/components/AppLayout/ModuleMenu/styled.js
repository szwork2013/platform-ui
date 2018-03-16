import styled from 'styled-components';
import { Menu } from 'antd';

//模块菜单样式
const selectedColor = '#f04134';
const StyledModuleMenu = styled(Menu)`
  //菜单无背景色
  background: transparent !important;
  padding-left: 60px;
  .ant-menu-item {
  	span,i {
  		color: #0e77ca;
  	}
  }

  .ant-menu-item-selected {
		border-bottom: 2px solid ${selectedColor};
  	span, i {
  		color: ${selectedColor};
  	}
  }
`;

export {
	StyledModuleMenu,
}
