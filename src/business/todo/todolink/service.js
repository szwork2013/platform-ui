import {config} from 'utils';
import service from 'service'

const {httprequest} = service;

const {API} = config;

export const setRead = async (selfUrl, param) => {
  return httprequest(selfUrl, {
    method: 'patch',
    data: param
  });
};

export const toDone = async (ids) => {
  return httprequest(`${API}/todo_link/to_done`, {
    method: 'post',
    data: ids
  });
};
