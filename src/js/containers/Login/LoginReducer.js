import { types } from './LoginActions';

const initialState = {
    LogIn: false,
    information:'',
};

export default function LoginReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        case `${types.LOG_USER_IN}_FULFILLED`: {
            return {
                ...state,
                information: payload.id,
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