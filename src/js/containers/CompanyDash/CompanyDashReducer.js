const initialState = {
    projectDetails: '',
    projects: null

}
export default function CompanyDashReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'GET_USERS_PROJECTS': {

            return {
                ...state,
                projects: payload
            };
        }
        case 'GET_PROJECT_DETAIL_FULFILLED': {

            return {
                ...state,
                projectDetails: payload
            };
        }
        default: {
            return state;
        }
    }
    case 'GET_DETAIL_FULFILLED': {
      return {
        ...state,
        details: payload
      };
    }
    default: {
      return state;
    }
  }
}
