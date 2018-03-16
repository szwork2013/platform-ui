import { Link } from 'dva/router';

import { StyledNavSiderMenu } from './styled';

import { NavMenu } from 'components';

//Sider导航菜单
const menu = ( props ) => {
  let componentProps={
    ...props
  };
  return(
    <NavMenu {...componentProps}
      StyledMenu={StyledNavSiderMenu}
      mode="inline"
      theme="light"
    />
  );
}

import { connect } from 'dva';
export default connect(({webapp:{siderCollapsed}}) =>
  ({collapsed: siderCollapsed})
)(menu);
