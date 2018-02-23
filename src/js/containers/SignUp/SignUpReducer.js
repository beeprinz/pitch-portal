import {
  NEW_USER_SIGNUP,
  TOKEN_RECEIVED,
  SIGNUP_FULFILLED,
  SIGNUP_ERROR
} from './SignUpActions';

const INITIAL_STATE = {
  authToken: '',
  firstName: '',
  lastName: '',
  position: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  info: '',
  type: '',
  id: '',
  redirect: false
};

export default function SignUpReducer(state = INITIAL_STATE, action) {
  const { type, payload, error } = action;

  switch (type) {
    case TOKEN_RECEIVED:
      return {
        ...state,
        authToken: payload,
        id: payload.userId,
        redirect: true
      };
      break;
    case SIGNUP_FULFILLED:
      return {
        ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        position: payload.position,
        company: payload.company,
        email: payload.email,
        phone: payload.phone,
        website: payload.website,
        info: payload.info,
        type: payload.type
      };
      break;
    case SIGNUP_ERROR:
      return {
        ...state,
        error: error
      };
      break;
    default:
      return state;
  }
}
