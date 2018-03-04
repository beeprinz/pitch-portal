import axios from "axios";
import Cookies from 'cookies-js'

export function getUserInfo(userAccountInfo) { 
    // console.log('account settings actions userinfo', userAccountInfo);
  return {
    type: "GET_USER_INFO",
    payload: userAccountInfo  
}   
    //how to plug in city name at request?

  };

  export function changeUserInfo(values) {
    // console.log('values from acct settings actions',values)
    const userId = Cookies.get('userId') 
      return {
          type: "CHANGE_USER_INFO",
          payload: 
          axios
          .patch('http://localhost:3000/api/users/' + userId, values)
          .then(response => {
            console.log("put request acct settings actions", response)
            return response
        })
          .catch(err => {
              return { error: err.message }
    
          })
      }
}

export function savedDone() {
    return {
        type: "CHANGE_STATUS"
    }
}
