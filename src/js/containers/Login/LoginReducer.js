import { types } from './LoginActions';

const initialState = {
  redirect: false,
  pending: false,
  loggedIn: false,
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
        pending: false,
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
    case types.COMPANY_REDIRECT: {
      return {
        ...state,
        company: payload,
        redirect: true
      };
    }
    default: {
      return state;
    }
  }
}
