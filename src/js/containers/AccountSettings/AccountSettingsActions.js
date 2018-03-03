import axios from 'axios';
const token = sessionStorage.getItem('token');
const authAxios = axios.create({
  headers: { Authorization: token }
});

export function getUserInfo(userAccountInfo) {
  return {
    type: 'GET_USER_INFO',
    payload: userAccountInfo
  };
}

export function changeUserInfo(values) {
  const userId = sessionStorage.getItem('userId');
  return {
    type: 'CHANGE_USER_INFO',
    payload: authAxios
      .patch('http://localhost:3000/api/users/' + userId, values)
      .then(response => {
        return response;
      })
      .catch(err => {
        return { error: err.message };
      })
  };
}

export function savedDone() {
  return {
    type: 'CHANGE_STATUS'
  };
}
