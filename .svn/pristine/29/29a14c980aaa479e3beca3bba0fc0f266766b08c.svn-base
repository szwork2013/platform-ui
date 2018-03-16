import React from 'react';

import {message} from 'antd'
import HomeTab from './HomeTab';
import {ModalDialog} from 'components';

import {StyledTabPane, StyledTabs, theme,} from './styled';

import service from './service';
import PropTypes from 'prop-types';
import {connect} from 'dva';

//应用tabs
const AppTabs = (props) => {
  //解构参数
  const {
    model,
    defaultTab,
    dispatch
  } = props;

  theme.tabs = model.tabs;

  //显示UI
  return (
    <div>
      <StyledTabs hidden={model.tabs.length == 0} type="editable-card" hideAdd={true}
                  activeKey={model.activeTabKey || 'HomeTab'}
                  onChange={handleOnChange}
                  onEdit={handleOnEdit}
      >
        {/*主界面tab*/}
        <StyledTabPane tab={<HomeTab/>} key={'HomeTab'} closable={false}>
          {defaultTab}
        </StyledTabPane>

        {/*其它tab*/}
        {renderTabItems(model)}
      </StyledTabs>

      {/*模态对话框*/}
      <ModalDialog/>
    </div>
  )

  //构造tab项
  function renderTabItems(model) {
    return model.tabs.map(tab => {
      return (
        <StyledTabPane tab={tab.title} key={tab.key} closable={true}>
          {
            React.cloneElement(tab.component, {
              modelName: tab.modelName,//sgf 2018-01-26加入模型名称
              key: tab.key,
              href: tab.key,
              model: tab.model,
              state: tab.state,
            })
          }
        </StyledTabPane>
      )
    })
  }

  //处理标签切换
  function handleOnChange(activeKey) {
    dispatch({
      type: 'apptabs/save',
      payload: {
        activeTabKey: activeKey
      }
    })
  }

  //处理tab的增加和删除
  function handleOnEdit(targetKey, action) {
    if (action != 'remove') return;

    //关闭标签事件处理
    const tab = model.tabs.find(tab => tab.key == targetKey);
    if (!tab) {
      message.error('无法在模型中找到key=' + targetKey + '的tab !')
      return;
    }

    service.closeTab(dispatch, targetKey, tab.model);
  }
}

AppTabs.propTypes = {
  model: PropTypes.object.isRequired,
  defaultTab: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(({apptabs}) =>
  ({model: apptabs})
)(AppTabs);
