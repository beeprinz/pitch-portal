import axios from 'axios';

export const types = {
  GET_INFO: 'GET_INFO'
};
export function getInfo(name) {
  return {
    type: types.GET_INFO,
    payload: name,
  };
}

