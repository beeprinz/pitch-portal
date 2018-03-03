import axios from 'axios';

const USER = '/customSignUp';
const ROOT_URL = 'http://localhost:3000';

export const NEW_USER_SIGNUP = 'NEW_USER_SIGNUP';
export const TOKEN_RECEIVED = 'TOKEN_RECEIVED';
export const SIGNUP_FULFILLED = 'SIGNUP_FULFILLED';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

const tokenReceived = response => ({
  type: TOKEN_RECEIVED,
  payload: response
});
const signUpData = values => ({
  type: SIGNUP_FULFILLED,
  payload: values
});
const signupError = error => ({
  type: SIGNUP_ERROR,
  payload: error
});

export function signUpNewUser(values, history) {
  const url = `${ROOT_URL}${USER}`;
  //deletes confirmation password from state
  delete values.password2;
  return dispatch => {
    //saves signup data to application state
    axios
      .post(url, values)
      .then(response => {
        //Set authToken and userId into sesh storage
        sessionStorage.setItem('token', response.data.id);
        sessionStorage.setItem('userId', response.data.userId);
        return response
      })
      .then(res => dispatch(tokenReceived(res.data)))
      .then(() => dispatch(signUpData(values)))
      .then(() => history.push(`/company/${values.company}/pitchform`))
      .catch(error => {
        console.log('err',error)
        dispatch(signupError(error));
      });
  };
}
