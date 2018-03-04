import { WHAT_UP } from './LoginActions';

const initialState = {name: ''};

export default function NavBarReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case WHAT_UP: {
      return {
        name: payload
      };
    }   
    default: {
      return state;
    }
  }
}