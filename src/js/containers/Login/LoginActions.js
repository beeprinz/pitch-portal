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
  // create an axios instance with correct authorization header
  const authAxios = axios.create({
    headers: { Authorization: token }
  });
  return dispatch => {
    // use the newly created axios instance to make calls
    authAxios
      // this GET call is done so we can get the user's company 
      // and redirect to the correct dashboard
      .get(`http://localhost:3000/api/users/${userId}`)
      .then(response => {
        // Updates application state to include company name.
        // Check line 19.
        dispatch(goToCompanyDash(response.data.company));
      });
  };
}

//This is the main action
export function LogUserIn(values) {
  // async/await allows data to be there for grabCompany() to work with
  return async dispatch => {
    await axios.post('http://localhost:3000/login', values).then(response => {
      //saving userID and accesstoken to sessionStorage
      sessionStorage.setItem('userId', response.data.userId);
      sessionStorage.setItem('token', response.data.id);
      //Saving loggedin data to application state. Check line 9.
      dispatch(userLoggedIn(response.data));
    });
    dispatch(
      // this function uses the token and userID to make 
      // authenticated requests to api. Check line 24.
      grabCompany(
        sessionStorage.getItem('token'),
        sessionStorage.getItem('userId')
      )
    );
  };
}
