import {
  NEW_USER_SIGNUP,
  SIGNUP_STARTED,
  SIGNUP_FULFILLED,
  SIGNUP_ERROR
} from './SignUpActions';

const INITIAL_STATE = {
  pending: false,
  status: '',
  firstName: '',
  lastName: '',
  position: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  info: '',
  type: '',
  id: ''
};

export default function SignUpReducer(state = INITIAL_STATE, action) {
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
        status: payload.status,
        firstName: payload.data.firstName,
        lastName: payload.data.lastName,
        position: payload.data.position,
        company: payload.data.company,
        email: payload.data.email,
        phone: payload.data.phone,
        website: payload.data.website,
        info: payload.data.info,
        type: payload.data.type,
        id: payload.data.id
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
