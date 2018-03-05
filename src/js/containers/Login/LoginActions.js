import axios from 'axios';

export const types = {
  LOG_USER_IN: 'LOG_USER_IN',
  COMPANY_REDIRECT: 'COMPANY_REDIRECT',
  LOG_IN_ERROR: 'LOG_IN_ERROR',
  WIPE_STATE: 'WIPE_STATE'
};

const userLoggedIn = loginData => ({
  type: types.LOG_USER_IN,
  payload: loginData
});

const loginError = error => ({
  type: types.LOG_IN_ERROR,
  payload: error
});

export function wipeState() {
  return {
    type: types.WIPE_STATE
  }
};

const goToCompanyDash = userInfo => ({
  type: types.COMPANY_REDIRECT,
  payload: userInfo
});

function grabCompany(token, userId) {
  console.log('grabCompany')
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
        console.log('axios call grabCompany')
        //save company and userName to session storage
        sessionStorage.setItem(
          'company',
          response.data.company.replace(/\s+/g, '')
        );
        sessionStorage.setItem(
          'name',
          response.data.firstName.replace(/\s+/g, '')
        );
        // Updates application state to include company name.
        // Check line 19.
        dispatch(goToCompanyDash(response.data));
      });
  };
}

//This is the main action
export function LogUserIn(values) {
  console.log('LogUserIn')
  // async/await allows data to be there for grabCompany() to work with
  return async dispatch => {
    await axios.post('http://localhost:3000/login', values).then(response => {
      console.log('axiosPost1')
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