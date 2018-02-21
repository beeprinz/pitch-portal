import axios from 'axios';

const USER = '/users';
const ROOT_URL = 'http://localhost:3000/api';

export const NEW_USER_SIGNUP = 'NEW_USER_SIGNUP';
export const SIGNUP_STARTED = 'SIGNUP_STARTED';
export const SIGNUP_FULFILLED = 'SIGNUP_FULFILLED';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

const signUpNewUserStarted = () => {
  return {
    type: SIGNUP_STARTED
  };
};
const signUpNewUserFulfilled = response => ({
  type: SIGNUP_FULFILLED,
  payload: response
});
const signupError = error => ({
  type: SIGNUP_ERROR,
  error
});

export function signUpNewUser(values) {
  const url = `${ROOT_URL}${USER}`;
  delete values.password2;
  return dispatch => {
    dispatch(signUpNewUserStarted());
    axios
      .post(url, values)
      .then(response => {
        dispatch(signUpNewUserFulfilled(response));
        console.log(response);
      })
      .catch(error => {
        dispatch(signupError(error));
      });
  };
}
