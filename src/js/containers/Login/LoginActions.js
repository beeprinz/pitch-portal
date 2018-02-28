import axios from 'axios';

export const types = {
  LOG_USER_IN: 'LOG_USER_IN',
  COMPANY_REDIRECT: 'COMPANY_REDIRECT',
  LOG_IN_ERROR: 'LOG_IN_ERROR'
};

const userLoggedIn = loginData => ({
  type: types.LOG_USER_IN,
  payload: loginData
});

const loginError = error => ({
  type: types.LOG_IN_ERROR,
  payload: error
});

const goToCompanyDash = company => ({
  type: types.COMPANY_REDIRECT,
  payload: company
});

function grabCompany(token, userId) {
  const authAxios = axios.create({
    headers: { Authorization: token }
  });
  return dispatch => {
    authAxios
      .get(`http://localhost:3000/api/users/${userId}`)
      .then(response => {
        dispatch(goToCompanyDash(response.data.company));
      });
  };
}

export function LogUserIn(values) {
  return async dispatch => {
    await axios.post('http://localhost:3000/login', values).then(response => {
      sessionStorage.setItem('userId', response.data.userId);
      sessionStorage.setItem('token', response.data.id);
      dispatch(userLoggedIn(response.data));
    });
    dispatch(
      grabCompany(
        sessionStorage.getItem('token'),
        sessionStorage.getItem('userId')
      ),
    );
  };
}
