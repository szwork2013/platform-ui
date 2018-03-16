import React from 'react';
import PropTypes from 'prop-types';

//导入styled组件
import {
  StyledNavSider,
  StyledContentLayout,
  StyledRightContent,
  theme,
} from './styled';

import NavSider from './NavSider';

//模块框架
class ModuleLayout extends React.Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    //解构参数
    const {
      dispatch,
      apptabs,
    } = this.props;

    theme.tabs = apptabs.tabs;

    //发送消息更新皮肤的高度
    dispatch({
      type: 'webapp/updateTheme',
      payload: {
        height: {
          module: theme.height(),
          content: theme.content.height()
        }
      }
    })
  }

  render() {
    //解构参数
    const {
      trigger,
      siderTitle, //sider标题
      siderIcon, //sider标题图标
      siderProps, //sider其它属性
      menu,
      match, //路由注入
      location, //路由注入
      children,
      enableCollapsed=true, //是否允许折叠
      apptabs,
    } = this.props;

    theme.tabs = apptabs.tabs;

    let navMenu = menu;
    if (menu instanceof Array) {
      //定义菜单参数
      const menuProps = {
        defaultPath: location.pathname, //缺省路径
        rootPath: match.path, //根路径
        items: menu,
      }

      navMenu = <NavSider.Menu {...menuProps} />;
    }

    return (
      <StyledContentLayout>
        {/*左边导航条*/}
        <NavSider trigger={trigger} title={siderTitle} icon={siderIcon}
          menu={navMenu} enableCollapsed={enableCollapsed}
          {...siderProps}
        />

        {/*右边的内容*/}
        <StyledRightContent>
          {children}
        </StyledRightContent>
      </StyledContentLayout>
    )
  }
}

ModuleLayout.propTypes = {
  menu: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import { connect } from 'dva';
export default connect(({apptabs}) =>
  ({apptabs})
)(ModuleLayout);
