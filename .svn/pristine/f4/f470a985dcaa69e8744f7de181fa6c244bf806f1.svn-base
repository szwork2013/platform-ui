import React from 'react';

import TitleBar from './TitleBar';

//导入styled组件
import {
  StyledNavSider,
  StyledMenuDiv,
} from './styled';

import {theme as layoutTheme} from '../styled';

const NavSider = (props) => {
  //解构参数
  const {
    collapsed,
    trigger,
    title,
    icon,
    menu,
    enableCollapsed,
    dispatch,
    ...otherProps
  } = props;

  const siderCollapsed = enableCollapsed ? collapsed : false;

  const {titleBar:titleBarProps, navMenu:menuProps, ...siderProps} = otherProps;

  //计算菜单的高度
  let menuHeight = layoutTheme.content.height()-((trigger||title)?TitleBar.theme.totalHeight():0);

  return (
    <StyledNavSider collapsed={siderCollapsed} {...siderProps}>
      {(trigger||title)&&
      <TitleBar trigger={trigger} title={title} icon={icon}
        siderCollapsed={siderCollapsed}
        onClick={handleTriggerCliked}
        {...titleBarProps}
      />
      }
      <StyledMenuDiv collapsed={siderCollapsed} height={menuHeight} {...menuProps}>
        {menu}
      </StyledMenuDiv>
    </StyledNavSider>
  );

  //处理trigger被点击事件
  function handleTriggerCliked() {
    dispatch({
      type:'webapp/updateSiderState',
      payload:{
        siderCollapsed:!siderCollapsed
      }
    })
  }
}

import PropTypes from 'prop-types';
NavSider.propTypes = {
  menu: PropTypes.node.isRequired,
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({webapp:{siderCollapsed}}) =>
  ({collapsed: siderCollapsed})
)(NavSider);
