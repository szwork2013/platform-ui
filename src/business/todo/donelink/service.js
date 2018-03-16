import {config} from 'utils';
import service from 'service'

const {httprequest} = service;
const {API} = config;
export const toTodo = async (ids) => {
  return httprequest(`${API}/done_link/to_todo`, {
    method: 'post',
    data: ids
  });
};
