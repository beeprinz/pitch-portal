
const initialState = {
    userInformation:''
  };
  
  export default function AccountSettingsReducer (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'GET_USER_INFO' : 
            return {
                ...state,
                userInformation: payload
            }

    default: {
        return state;
      }
    }
}