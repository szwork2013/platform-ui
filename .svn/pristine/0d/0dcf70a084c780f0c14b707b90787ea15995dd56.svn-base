import * as service from './service'
import {message} from 'antd';


export default {
  namespace: 'modifyPassword',
  state: {
    modalVisible: false,
  },
  reducers: {
    show(state, {payload}) {
      return {...state, modalVisible: true}
    },
    hide(state) {
      return {...state, modalVisible: false}
    },
  },
  effects: {
    * changePassword({payload}, {select, call, put}) {
      const {currentPassword, newPassword, otherUsers} = payload;
      let response = yield call(service.changePassword, {password: currentPassword, newPassword});

      if (response === "") {
        yield put({type: 'hide'});
        message.success('密码修改成功！', 1);
      }

      //同时修改兼职用户的密码
      let hasError = false;
      for (let user of otherUsers) {
        response = yield call(service.changePassword, {password: currentPassword, newPassword}, user.id);
        if (response!="") {
          hasError = true;
          message.success('兼职用户：'+user.userName+'的密码修改失败！', 1);
        }
      }

      if (!hasError&&otherUsers&&otherUsers.length>0)
        message.success('所有兼职用户密码修改成功！');
    },
  },
}