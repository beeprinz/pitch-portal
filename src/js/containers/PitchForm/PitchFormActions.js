import axios from 'axios';

export const types = {
  CREATE_PROJECT: 'CREATE_PROJECT'
};
export function createProject(values) {
  return {
    type: types.CREATE_PROJECT,
    payload: axios
            .post('http://localhost:3000/form',values)
             .then( response => {
                return response;
             })
             .catch( err => {
                return err;
             })
  };
}

