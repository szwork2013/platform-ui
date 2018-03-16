import styled from 'styled-components';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

//样式定义
const theme = {
  tabs:[],  //当前打开的tab数组
  tabsBar: {
    tabHeight: 32,
    margin: 5,
    padding: 0,
  },
  tabPane: {
    padding: 0,
    margin: 0,
  },

  //取tabs的总高度：如果没有tab，则高度为0
  totalHeight: (tabs = theme.tabs) => {
    return tabs.length==0 ? 0 : 
      theme.tabsBar.tabHeight+theme.tabsBar.margin*2;
  },
}

const StyledTabs = styled(Tabs)`
  .ant-tabs-bar {
    ${props => props.hidden && 'display:none' }
  }

  height: 100% !important;
  padding: 0px !important;
  margin: 0px !important;
  .ant-tabs-bar {
    height: ${theme.tabsBar.tabHeight}px !important;
    margin:${theme.tabsBar.margin}px !important;
    padding:${theme.tabsBar.padding}px !important;
    font-size: 14px !important;
  }
  .ant-tabs-nav-container {
    font-size: 14px !important;
  }
  .anticon-close {
    font-size: 18px !important;
    top: 10px !important;
  }
`;

const StyledTabPane = styled(TabPane)`
  height: 100%;
  padding: ${theme.tabPane.padding}px !important;
  margin: ${theme.tabPane.margin}px !important;
`;

export {
  StyledTabs,
  StyledTabPane,
  theme,
}
