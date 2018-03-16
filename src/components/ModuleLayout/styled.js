import styled from 'styled-components';
import { Layout } from 'antd';

import {
  AppTabs,
  AppLayout,
} from 'components';

//样式定义
const theme = {
  tabs: [], //当前打开的tab数组
  height: () => {
    let height = document.body.clientHeight;
    height -= AppLayout.Footer.theme.totalHeight();
    height -= AppLayout.LogoBanner.theme.totalHeight();
    height -= AppLayout.theme.navbar.totalHeight();
    height -= AppTabs.theme.totalHeight(theme.tabs);

    return height;
  },
  content : {
    padding: 4,
    margin: 0,
    height: () => theme.height(),
  }
}

//内容样式
const StyledContentLayout = styled(Layout)`
  flex-direction: row !important;
  background: #fff;
  height: ${theme.height}px !important;;
`;

//右边内容样式
const StyledRightContent = styled(Layout.Content)`
  padding-top: ${theme.content.padding}px;
  padding-left: ${theme.content.padding}px;
  overflow:hidden;
  height: ${theme.content.height}px !important;;
  width: 100%;
  margin: ${theme.content.margin}px;
  border-top: 1px solid #cececf;
  border-left: 1px solid #cececf;
  border-radius: 3px;
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
`;

export {
  StyledContentLayout,
  StyledRightContent,
  theme,
}
