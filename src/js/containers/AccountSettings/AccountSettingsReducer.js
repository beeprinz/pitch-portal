
const initialState = {
    userInformation:'',
    isSaved: false
  };
  
  export default function AccountSettingsReducer (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'GET_USER_INFO' : 
            return {
                ...state,
                userInformation: payload,
            }
            
        case 'CHANGE_USER_INFO_FULFILLED' :
            return{
                ...state,
                isSaved: true,
            }
        case 'CHANGE_STATUS' :
            return{
                ...state,
                isSaved: false,
            }


    default: {
        return state;
      }
    }


}