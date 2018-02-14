import axios from 'axios'

 export const types = {
    LOG_USER_IN: 'LOG_USER_IN',
    LOG_USER_IN_FAILED: 'LOG_USER_IN_FAILED'
 };
 
export function LogUserIn(values) {
    console.log('values form actions',values)
      return {
          type: types.LOG_USER_IN,
          payload: axios
          .post('http://localhost:3000/api/users/login', values)
          .then(r => {
              return r.data
          console.log('actions id payload',r.data)})
          .catch(err => {
            console.log(err);
          }), 
       
      }
}
 export function userError(values){
     
     return{
         type: types.LOG_USER_IN_FAILED,
         payload: values
     }
 }