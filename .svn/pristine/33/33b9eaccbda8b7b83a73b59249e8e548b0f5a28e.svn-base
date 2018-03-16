import {StyledDiv, StyledTitleDiv} from './styled';
import {Breadcrumb, Col, Icon, Row} from 'antd';
import Trigger from './Trigger';

const TitleBar = (props) => {
  let {
    siderCollapsed,
    trigger,
    title,
    icon,
    onClick,
    className,
  } = props;

  //构造icon
  let iconComponent;
  if (icon == undefined || typeof icon == 'string') { //icon属性指定的是具体图标
    let iconType = icon || 'laptop';
    iconComponent = <Icon type={iconType} style={{marginTop: 5}}/>;
  }
  else { //icon属性指定的是组件
    iconComponent = icon != false ? icon : undefined;
  }

  return (
    <StyledDiv className={className}>
      <Row>
        <Col span={23}>
          { //如果指定了title，则构造title
            title &&
            <StyledTitleDiv>
              <Breadcrumb>
                {iconComponent &&
                <Breadcrumb.Item>
                  {iconComponent}
                </Breadcrumb.Item>
                }
                <Breadcrumb.Item>
                  {!siderCollapsed && title}
                </Breadcrumb.Item>
              </Breadcrumb>
            </StyledTitleDiv>
          }
        </Col>
        <Col span={1}>
          {//如果指定了trigger，则构造Trigger
            trigger &&
            <Trigger siderCollapsed={siderCollapsed} onClick={onClick}/>
          }
        </Col>
      </Row>
    </StyledDiv>
  );
}

export default TitleBar;
