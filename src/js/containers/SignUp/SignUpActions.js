import axios from 'axios';
import Cookies from 'cookies-js';

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

export function signUpNewUser(values) {
	const url = `${ROOT_URL}${USER}`;
	//deletes confirmation password from state
	delete values.password2;
	return dispatch => {
		//saves signup data to application state
		dispatch(signUpData(values));
		axios
			//post call to loopback server to signup new user + log them in
			.post(url, values)
			// receives access token object and saves it to application state
			.then(response => {
				dispatch(tokenReceived(response.data));
				//Set authToken and userId into cookies
				Cookies.set('token', response.data.id);
				Cookies.set('userId', response.data.userId);
				//Set authToken and userId into sesh storage
				sessionStorage.setItem('token', response.data.id);
				sessionStorage.setItem('userId', response.data.userId);
			})
			.catch(error => {
				dispatch(signupError(error));
			});
	};
}
