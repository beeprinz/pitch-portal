import { types } from './LoginActions';

const initialState = {
  redirect: false,
  loggedIn: false,
  name: '',
  token: '',
  ttl: '',
  userId: '',
  created: '',
  errors: '',
  company: ''
};

export default function LoginReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LOG_USER_IN: {
      return {
        ...state,
        loggedIn: true,
        token: payload.id,
        ttl: payload.ttl,
        userId: payload.userId,
        created: payload.created
      };
    }
    case types.LOG_IN_ERROR: {
      return {
        ...state,
        error: {
          code: payload.response.status,
          text: payload.response.statusText
        }
      };
    }
    case types.WIPE_STATE: {
      return {
        ...state,
        redirect: false,
        loggedIn: false,
        name: '',
        token: '',
        ttl: '',
        userId: '',
        created: '',
        errors: '',
        company: ''
      };
    }
    case types.COMPANY_REDIRECT: {
      return {
        ...state,
        company: payload.company,
        name: payload.firstName,
        redirect: true
      };
    }
    default: {
      return state;
    }
  }
}