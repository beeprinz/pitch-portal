import axios from 'axios'
import Cookies from 'cookies-js'

 export const types = {
    LOG_USER_IN: 'LOG_USER_IN',
    LOG_USER_IN_FAILED: 'LOG_USER_IN_FAILED'
 };

 export function LogUserIn(values) {
    console.log('values form actions',values)
      return {
          type: types.LOG_USER_IN,
          payload: axios
          .post('http://localhost:3000/login', values)
          .then(response => {
              console.log('response',response)
            Cookies.set('userId', response.data.userId);
            Cookies.set('token', response.data.id);
           
              return response
        })
          .catch(err => {
              return { error: err.message }
    
          }),
      }
}
 export function userError(values){
     return{
         type: types.LOG_USER_IN_FAILED,
         payload: values
     }
 }
