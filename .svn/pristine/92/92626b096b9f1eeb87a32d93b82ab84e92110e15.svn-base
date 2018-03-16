import {config} from 'utils';
import service from 'service'

const {httprequest} = service;
const {API} = config;

export const changePassword = async (param, userId) => {
  let user = service.userInfo.user;
  userId = userId || user.id;
  return httprequest(`${API}/users/${userId}/password`, {
    method: 'patch',
    data: param
  });
};
