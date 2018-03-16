import React from 'react';
import {Icon, Menu} from 'antd';
import {StyledMeMenu} from './styled';
import ModifyPassword from '../../ModifyPassword'

import service from 'service';

//个人功能菜单
class MeMenu extends React.Component {

  componentDidMount() {
    const {otherUsers} = this.props;
    if (otherUsers) return; //已有兼职用户列表，无需请求

    //请求兼职用户列表
    this.props.dispatch({
      type:'webapp/queryOtherUsers',
      payload: {}
    })
  }

  render() {
    //解构参数
    const {
      user,
      otherUsers, //其它兼职用户
      dispatch,
    } = this.props;

    return (
      <StyledMeMenu
        mode="horizontal"
        onClick={(e) => this.handleMeMenuClick(e.key)}
      >
        <Menu.SubMenu title={<span><Icon type='user'/>我的功能</span>}>
          <Menu.Item key='password'>
            <a><Icon type='key'/><ModifyPassword/></a>
          </Menu.Item>
          {
            this.renderSwitchToOtherUsersMenu(otherUsers)
          }
          <Menu.Item key='logout'>
            <a><Icon type='logout'/>注销</a>
          </Menu.Item>
          <Menu.Item key='exit'>
            <a><Icon type='close'/>退出</a>
          </Menu.Item>
        </Menu.SubMenu>
      </StyledMeMenu>
    );   
  } // end of render()

  //构造切换到其他用户菜单
  renderSwitchToOtherUsersMenu = (otherUsers) => {
    if (!otherUsers) return null;

    return otherUsers.map((user, index) => 
      <Menu.Item key={'switch/'+user.userName+'/'+user.id+'/'+user.userCode}>
        <a><Icon type='user-add'/>{user.orgFullName.split('/')[0]}</a>
      </Menu.Item>
    );
  }

  //Me菜单点击事件处理
  handleMeMenuClick = (key) => {
    const {dispatch} = this.props;
    (key === 'logout') && dispatch({type: 'webapp/logout'});
    (key === 'password') &&  dispatch({type: 'modifyPassword/show'});
    (key === 'exit') && dispatch(
      {
        type: 'webapp/logout',
        payload: {thenClose: true}
      }
    );
    if (key.startsWith('switch/')) { //切换用户消息
      let keys = key.split('/');
      let userName = keys[1];
      let userId = keys[2];
      let userCode = keys[3];
      dispatch({
        type: 'webapp/switchUser',
        payload: {userName, userId, userCode}
      });
    }
  } // end of handleMeMenuClick()
}

import PropTypes from 'prop-types';
MeMenu.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

//连接模型(model)和组件，使模型变化时，组件属性也跟着变化，从而重新加载组件
import {connect} from 'dva';
export default connect(({users:{viewData},webapp: {user}}) => {
  //郑波2017-12-13修改：解决打开用户后，我的功能菜单混乱的问题
  //获取兼职用户列表
  let otherUsers = null;
  if (viewData) {
    let otherUsersData = viewData.find((r) => r.key=='otherUsers');
    if (otherUsersData) otherUsers = otherUsersData.data.list;
  }

  //返回组件属性
  return {otherUsers, user}
  //---END---
}
)(MeMenu);
