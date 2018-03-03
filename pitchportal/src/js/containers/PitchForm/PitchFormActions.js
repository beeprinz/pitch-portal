import axios from 'axios';

export const types = {
  CREATE_PROJECT: 'CREATE_PROJECT',
  CHANGE_STATUS: 'CHANGE_STATUS'
};
export function createProject(values) {
  return {
    type: types.CREATE_PROJECT,
    payload: axios
            .post('http://localhost:3000/createproject',values)
             .then( response => {
                return response;
             })
             .catch( err => {
                return err;
             })
  };
}
export function changeStatus() {
  return {
    type: types.CHANGE_STATUS,
  };
}
