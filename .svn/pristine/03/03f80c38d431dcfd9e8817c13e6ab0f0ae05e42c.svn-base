import PropTypes from 'prop-types';

import {Col, Row} from 'antd';

import AppLogoBanner from './LogoBanner';
import AppMeMenu from './MeMenu';
import AppWelCome from './Welcome';
import AppFooter from './Footer';
//导入styled组件
import {StyledNavBarRow, StyledTopLayout,} from './styled';
import {connect} from 'dva';

//应用框架
const AppLayout = (props) => {
  //解构参数
  const {
    moduleMenu,
    children,
  } = props;

  return (
    <StyledTopLayout>
      <AppLogoBanner/>
      <StyledNavBarRow>
        <Col span={22}>
          {moduleMenu}
        </Col>
        <Col span={1}>
          <AppWelCome/>
        </Col>
        <Col span={1}>
          <AppMeMenu/>
        </Col>
      </StyledNavBarRow>
      <Row>
        {children}
      </Row>
      <Row>
        <AppFooter/>
      </Row>
    </StyledTopLayout>
  )
}

AppLayout.propTypes = {
  moduleMenu: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
}

//不监听apptabs的模型变化，以避免tabs变化事件导致的刷新
export default connect(({apptabs: {none}}) =>
  ({onTabsChange: none})
)(AppLayout);
