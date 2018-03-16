import {config} from 'utils';

import service from 'service'

const {httprequest} = service;
const {API} = config;


export const getUserList = async (param) => {
  return httprequest(`${API}/users/search/sendeeselect?projection=workflow`, {
    method: 'get',
    data: param
  });
};

export const selectChange = (record,selected,multiple,selectedSendee) => {
  if (multiple) {
    if (selected) {
      selectedSendee = [...selectedSendee,record];
    } else {
      selectedSendee = selectedSendee.filter((item) => {
        return item._links.self.href !== record._links.self.href;
      });
    }
  } else {
    if (selected) {
      selectedSendee = [record];
    } else {
      selectedSendee = []
    }
  }
  return selectedSendee;
}
