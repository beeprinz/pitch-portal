const initialState = {
  projectDetail: null,
  isEditing: false
};

export default function PitchDetailReducer (state = initialState, action) {
  const { type, payload } = action;
  // console.log('reducer payload', payload)
  switch (type) {
      case 'GET_PROJECT' : 
          return {
              ...state,
              projectDetail: payload
          }
      case 'GET_PROJECT_BY_ID_FULFILLED' :
          return {
              ...state,
              projectDetail: payload
          }
      case 'CHANGE_PROJECT_INFO_FULFILLED' :
          return{
              ...state,
              projectDetail: payload,
              isEditing: false
          }
      case 'TOGGLE_EDIT': {
          return {
              ...state,
              isEditing: !state.isEditing
          }
      }
      case 'CHANGE_STATUS_FULFILLED': {
          return {
              ...state,
              projectDetail: payload
          }
      }

          default: {
              return state;
            }
          }
      
      
      }
