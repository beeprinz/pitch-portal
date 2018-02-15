import { types } from './LoginActions';
import Cookies from 'cookies-js';

const initialState = {
    LogIn: false,
    information:'',
    // token: Cookie.get('token') ? Cookie.get('token') : null
};

export default function LoginReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case `${types.LOG_USER_IN}_FULFILLED`: {
            return {
                ...state,
                // information: payload.id,
                information: payload,
                LogIn: true
            };
        }
         case types.LOG_USER_IN_FAILED: {
             return {
                ...state,
               LogIn: false
             }
        }
       
        default: {
            return state;
        }
    }

}