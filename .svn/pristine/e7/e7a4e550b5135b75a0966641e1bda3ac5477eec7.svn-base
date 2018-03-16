import {config} from 'utils';
import service from 'service'

const {httprequest} = service;
const {API} = config;

export const copySheet = async (param) => {
  return httprequest(`${API}/budget_sheet/copyAdd`, {
    method: 'post',
    data: param
  });
};
