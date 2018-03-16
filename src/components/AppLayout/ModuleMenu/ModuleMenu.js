import { Link } from 'dva/router';

import { StyledModuleMenu } from './styled';
import { NavMenu } from 'components';

//模块导航菜单
export default ( props ) => {
  return(
    <NavMenu {...props} routeMapMenu={false}
      StyledMenu={StyledModuleMenu}
      mode="horizontal"
    />
  );
}