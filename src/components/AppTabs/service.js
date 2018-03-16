import { Modal } from 'antd'
import { isSameObject } from 'utils';

//关闭指定tab
const closeTab = (dispatch, targetKey, model) => {
  //当前标签的内容未被修改，直接关闭
  if (!model || isSameObject(model.record, model.state.origin)) {
    dispatch({
      type: 'apptabs/closeTab',
      payload: {
        key: targetKey
      }
    });
    return;
  }

  Modal.confirm({
    title: '关闭确认',
    content: '您已经修改了当前记录，确定要放弃您的修改？',
    okText: '确定',
    cancelText: '取消',
    onOk() {
      //发送关闭tab消息
      dispatch({
        type: 'apptabs/closeTab',
        payload: {
          key: targetKey
        }
      })
    },
  });
}

export default {
  closeTab
}
