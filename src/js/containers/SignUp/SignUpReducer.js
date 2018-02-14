import {
  NEW_USER_SIGNUP,
  SIGNUP_STARTED,
  SIGNUP_FULFILLED,
  SIGNUP_ERROR
} from './SignUpActions';

const INITIAL_STATE = {
  pending: false
};

export default function(state = INITIAL_STATE, action) {
  const { type, payload, error } = action;

  switch (type) {
    case SIGNUP_STARTED:
      return {
        ...state,
        pending: true
      };
      break;
    case SIGNUP_FULFILLED:
      return {
        ...state,
        pending: false,
        response
      };
      break;
    case SIGNUP_ERROR:
      return {
        ...state,
        error: error,
        pending: false
      };
      break;
    default:
      return state;
  }
}
